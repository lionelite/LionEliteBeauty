// ── VIP Program Account API ────────────────────────────────────────────────
// POST /api/vip
// Actions: register, lookup, list-all, update-status, update-progress, lookup-by-id
//
// VIP accounts with file persistence and progress tracking.

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, 'vip-data.json')

let STORE = {}
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'lionelite-admin-secret'

function hashPassword(pw) {
  return createHash('sha256').update(pw).digest('hex')
}

// Load persisted data if available
function load() {
  try {
    if (existsSync(DATA_PATH)) {
      STORE = JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
    }
  } catch { STORE = {} }
}

function save() {
  try {
    writeFileSync(DATA_PATH, JSON.stringify(STORE, null, 2))
  } catch (e) {
    console.error('VIP save error:', e)
  }
}

load()

function generateVipId() {
  const p1 = Math.random().toString(36).substring(2, 6).toUpperCase()
  const p2 = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `LEV-${p1}-${p2}`
}

function generateToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
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
    progress: [], // [{ step: 'week-1', label: 'Week 1 Setup', completed: false, completedAt: null }]
    token: generateToken(),
    notes: '',
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  load() // Always refresh from disk

  const { action, email, name, program, tier, vipId, token, paid, notes, password, progress: progressData } = req.body
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
    STORE[key] = account
    save()
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
    if (!adminToken || adminToken !== ADMIN_TOKEN) {
      return res.status(403).json({ error: 'Unauthorized' })
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
    if (!adminToken || adminToken !== ADMIN_TOKEN) {
      return res.status(403).json({ error: 'Unauthorized' })
    }
    if (!key) return res.status(400).json({ error: 'Email is required' })
    if (!STORE[key]) return res.status(404).json({ error: 'Account not found' })

    if (paid !== undefined) STORE[key].paid = paid
    if (tier) STORE[key].tier = tier
    if (program) STORE[key].program = program
    if (notes !== undefined) STORE[key].notes = notes
    save()
    return res.status(200).json({ ...STORE[key] })
  }

  if (action === 'update-progress') {
    const { token: adminToken } = req.body
    if (!adminToken || adminToken !== ADMIN_TOKEN) {
      return res.status(403).json({ error: 'Unauthorized' })
    }
    if (!key) return res.status(400).json({ error: 'Email is required' })
    if (!STORE[key]) return res.status(404).json({ error: 'Account not found' })

    if (progressData) {
      STORE[key].progress = progressData
    }
    save()
    return res.status(200).json({ ...STORE[key] })
  }

  if (action === 'set-program-steps') {
    // Admin sets the program steps for a client
    const { token: adminToken } = req.body
    if (!adminToken || adminToken !== ADMIN_TOKEN) {
      return res.status(403).json({ error: 'Unauthorized' })
    }
    if (!key) return res.status(400).json({ error: 'Email is required' })
    if (!STORE[key]) return res.status(404).json({ error: 'Account not found' })
    if (progressData) {
      STORE[key].progress = progressData
    }
    save()
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
    save()
    return res.status(200).json({ message: 'Password set successfully.', vipId: account.vipId })
  }

  return res.status(400).json({ error: 'Invalid action' })
}