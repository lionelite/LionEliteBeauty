// ── VIP Program Account API ────────────────────────────────────────────────
// POST /api/vip
// Actions: register, lookup, list-all, update-status, update-progress, lookup-by-id
//
// VIP accounts with file persistence and progress tracking.

import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'
import { Redis } from '@upstash/redis'
import { secureToken, secureId, verifyAdminToken } from './_auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, 'vip-data.json')

let STORE = {}

function hashPassword(pw) {
  return createHash('sha256').update(pw).digest('hex')
}

// ── Persistence ───────────────────────────────────────────────────────────
// The serverless filesystem is read-only and ephemeral, so the previous
// writeFileSync persistence silently discarded every account created after
// deploy (paid coaching clients included). Accounts now live in Redis; the
// bundled JSON file is used only as a read-only seed for local development.
const STORE_KEY = 'vip:accounts'

let redis
function getRedis() {
  if (redis) return redis
  const url = process.env.KV_URL || process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (url && token) redis = new Redis({ url, token })
  return redis
}

function seedFromDisk() {
  try {
    if (existsSync(DATA_PATH)) return JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
  } catch { /* ignore */ }
  return {}
}

// Durable load. Must be awaited before touching STORE.
async function load() {
  const r = getRedis()
  if (!r) {
    STORE = seedFromDisk()
    return STORE
  }
  try {
    const raw = await r.get(STORE_KEY)
    if (raw) {
      STORE = typeof raw === 'string' ? JSON.parse(raw) : raw
    } else {
      STORE = seedFromDisk()
      if (Object.keys(STORE).length) await r.set(STORE_KEY, JSON.stringify(STORE))
    }
  } catch (e) {
    console.error('VIP load error:', e)
    STORE = seedFromDisk()
  }
  return STORE
}

/**
 * Durable save. Throws when no store is configured so a caller can surface the
 * failure instead of silently losing a paying customer's account.
 */
async function save() {
  const r = getRedis()
  if (!r) {
    throw new Error('VIP_STORE_UNAVAILABLE: Redis is not configured; refusing to accept data that cannot be persisted.')
  }
  await r.set(STORE_KEY, JSON.stringify(STORE))
}

function generateVipId() {
  return secureId('LEV')
}

function generateToken() {
  return secureToken()
}

function makeAccount(name, email, program, tier, passwordHash) {
  return {
    vipId: generateVipId(),
    name,
    email,
    program: program || 'Not specified',
    tier: tier || null,
    paid: false,
    created: new Date().toISOString(),
    passwordHash: passwordHash || null,
    progress: [], // [{ step: 'week-1', label: 'Week 1 Setup', done: false, completedAt: null }]
    token: generateToken(),
    notes: '',
    // Extended coaching portal fields
    phone: '',
    dob: '',
    emergencyContact: '',
    timezone: '',
    goals: { primary: '', secondary: [], targetTimeline: '' },
    measurements: { weight: '', height: '', bodyFat: '', updated: null },
    healthData: null, // health screening questionnaire responses
    habits: null, // current habits baseline
    checkins: [], // [{ date, type: 'daily'|'weekly', responses: {}, adherence: 0 }]
    plan: { phase: '', nutrition: null, training: null, cardio: null, recovery: null, habits: [] },
    callSchedule: { credits: 0, lastCall: null, nextCall: null, history: [] },
    questionnaires: {}, // { healthScreening: null, lifestyle: null, familyHistory: null, ... }
    coachNotes: '',
    adminNotes: '',
    riskFlags: { level: 'green', notes: '' },
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  await load() // Always refresh from the durable store

  const { action, email, name, program, tier, vipId, token, paid, notes, password, progress: progressData, healthData, habits, questionnaires, checkin, goals, plan, callSchedule, riskFlags, coachNotes, phone, dob, timezone, measurements } = req.body
  const key = email?.trim().toLowerCase()

  if (action === 'register') {
    if (!key) return res.status(400).json({ error: 'Email is required' })

    if (STORE[key]) {
      const existing = STORE[key]
      return res.status(200).json({
        message: 'Welcome back! Your VIP account already exists.',
        ...existing,
        token: existing.token,
      })
    }
    const pwHash = password ? hashPassword(password) : null
    const account = makeAccount(name || key.split('@')[0], key, program, tier, pwHash)
    // Auto-mark as paid for card payments
    if (paid === true) account.paid = true
    STORE[key] = account
    await save()
    console.log('VIP account created:', account.vipId, key)
    return res.status(200).json({
      message: `Welcome to the Lion Elite VIP family, ${account.name}!`,
      ...account,
    })
  }

  if (action === 'lookup') {
    if (!key) return res.status(400).json({ error: 'Email is required' })
    const account = STORE[key]
    if (!account) return res.status(404).json({ error: 'No VIP account found with this email.' })
    return res.status(200).json({ ...account })
  }

  if (action === 'lookup-by-id') {
    if (!vipId) return res.status(400).json({ error: 'VIP ID is required' })
    const account = Object.values(STORE).find(a => a.vipId === vipId)
    if (!account) return res.status(404).json({ error: 'No VIP account found with this ID.' })
    return res.status(200).json({ ...account })
  }

  if (action === 'login') {
    if (!key) return res.status(400).json({ error: 'Email is required' })
    const account = STORE[key]
    if (!account) return res.status(404).json({ error: 'No VIP account found with this email.' })

    // Payment gate: only allow access if paid
    if (!account.paid) {
      return res.status(403).json({
        error: 'Your account is pending payment confirmation. You will receive access once your payment is confirmed. If you paid by card and this is an error, please contact us at orders@lionelitebeauty.com.',
        paymentPending: true,
      })
    }

    // Two login methods:
    // 1) Email + password (primary, easier for users)
    // 2) Email + VIP ID (legacy fallback)
    if (password) {
      const pwHash = hashPassword(password)
      if (!account.passwordHash || account.passwordHash !== pwHash) {
        return res.status(403).json({ error: 'Invalid password.' })
      }
      return res.status(200).json({ ...account, token: account.token })
    }
    if (vipId) {
      if (account.vipId !== vipId) return res.status(403).json({ error: 'VIP ID does not match this account.' })
      return res.status(200).json({ ...account, token: account.token })
    }
    return res.status(400).json({ error: 'Password or VIP ID is required.' })
  }

  if (action === 'list-all') {
    const { token: adminToken } = req.body
    const adminCheck = verifyAdminToken(adminToken)
    if (!adminCheck.ok) {
      return res.status(adminCheck.status).json({ error: adminCheck.error })
    }
    const list = Object.values(STORE).map(a => ({
      vipId: a.vipId,
      name: a.name,
      email: a.email,
      program: a.program,
      tier: a.tier,
      paid: a.paid,
      created: a.created,
      progress: a.progress || [],
      notes: a.notes || '',
    }))
    return res.status(200).json({ accounts: list })
  }

  if (action === 'update-status') {
    const { token: adminToken } = req.body
    const adminCheck = verifyAdminToken(adminToken)
    if (!adminCheck.ok) {
      return res.status(adminCheck.status).json({ error: adminCheck.error })
    }
    if (!key) return res.status(400).json({ error: 'Email is required' })
    if (!STORE[key]) return res.status(404).json({ error: 'Account not found' })

    if (paid !== undefined) STORE[key].paid = paid
    if (tier) STORE[key].tier = tier
    if (program) STORE[key].program = program
    if (notes !== undefined) STORE[key].notes = notes
    await save()
    return res.status(200).json({ ...STORE[key] })
  }

  if (action === 'update-progress') {
    const { token: adminToken } = req.body
    const adminCheck = verifyAdminToken(adminToken)
    if (!adminCheck.ok) {
      return res.status(adminCheck.status).json({ error: adminCheck.error })
    }
    if (!key) return res.status(400).json({ error: 'Email is required' })
    if (!STORE[key]) return res.status(404).json({ error: 'Account not found' })

    if (progressData) {
      STORE[key].progress = progressData
    }
    await save()
    return res.status(200).json({ ...STORE[key] })
  }

  if (action === 'set-program-steps') {
    // Admin sets the program steps for a client
    const { token: adminToken } = req.body
    const adminCheck = verifyAdminToken(adminToken)
    if (!adminCheck.ok) {
      return res.status(adminCheck.status).json({ error: adminCheck.error })
    }
    if (!key) return res.status(400).json({ error: 'Email is required' })
    if (!STORE[key]) return res.status(404).json({ error: 'Account not found' })
    if (progressData) {
      STORE[key].progress = progressData
    }
    await save()
    return res.status(200).json({ ...STORE[key] })
  }

  if (action === 'set-password') {
    // Allows existing accounts to set or reset their password
    if (!key) return res.status(400).json({ error: 'Email is required' })
    if (!password) return res.status(400).json({ error: 'Password is required' })
    const account = STORE[key]
    if (!account) return res.status(404).json({ error: 'No VIP account found with this email.' })
    // Require VIP ID auth to set a password (or existing password)
    const pwHash = hashPassword(password)
    account.passwordHash = pwHash
    await save()
    return res.status(200).json({ message: 'Password set successfully.', vipId: account.vipId })
  }

  if (action === 'update-client') {
    // Admin or client updates their profile data
    const { token: authToken } = req.body
    if (!authToken || authToken !== ADMIN_TOKEN) {
      return res.status(403).json({ error: 'Unauthorized' })
    }
    if (!key) return res.status(400).json({ error: 'Email is required' })
    if (!STORE[key]) return res.status(404).json({ error: 'Account not found' })

    if (healthData !== undefined) STORE[key].healthData = healthData
    if (habits !== undefined) STORE[key].habits = habits
    if (questionnaires !== undefined) STORE[key].questionnaires = { ...(STORE[key].questionnaires || {}), ...questionnaires }
    if (goals !== undefined) STORE[key].goals = goals
    if (plan !== undefined) STORE[key].plan = plan
    if (callSchedule !== undefined) STORE[key].callSchedule = callSchedule
    if (riskFlags !== undefined) STORE[key].riskFlags = riskFlags
    if (coachNotes !== undefined) STORE[key].coachNotes = coachNotes
    if (phone !== undefined) STORE[key].phone = phone
    if (dob !== undefined) STORE[key].dob = dob
    if (timezone !== undefined) STORE[key].timezone = timezone
    if (measurements !== undefined) STORE[key].measurements = measurements
    await save()
    return res.status(200).json({ ...STORE[key] })
  }

  if (action === 'add-checkin') {
    // Client submits a daily or weekly check-in
    if (!key) return res.status(400).json({ error: 'Email is required' })
    if (!STORE[key]) return res.status(404).json({ error: 'Account not found' })
    if (!checkin) return res.status(400).json({ error: 'Check-in data is required' })

    STORE[key].checkins = STORE[key].checkins || []
    STORE[key].checkins.push({ ...checkin, date: checkin.date || new Date().toISOString() })
    await save()
    return res.status(200).json({ checkins: STORE[key].checkins })
  }

  return res.status(400).json({ error: 'Invalid action' })
}