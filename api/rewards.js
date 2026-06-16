// Lion Elite Beauty Rewards API
// Storage: Upstash Redis (Vercel-integrated) with in-memory fallback for development
// Points: 1 point per $1 spent · 100 welcome points on signup

import { Redis } from '@upstash/redis'

// ── Redis client ──────────────────────────────────────────────────────────
let redis
function getRedis() {
  if (redis) return redis
  const url = process.env.KV_URL || process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (url && token) {
    redis = new Redis({ url, token })
  }
  return redis
}

// ── In-memory fallback (dev mode) ─────────────────────────────────────────
const memStore = new Map()

// ── Helpers ───────────────────────────────────────────────────────────────
function generateRewardId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const block = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `LEB-${block()}-${block()}`
}

function pointsForOrder(amountCents) {
  return Math.floor(amountCents / 100) // 1 point per $1
}

function makeUser(email, name) {
  return {
    rewardId: generateRewardId(),
    email: email.toLowerCase().trim(),
    name: name || email.split('@')[0],
    points: 100, // welcome bonus
    lifetimePoints: 100,
    orderCount: 0,
    createdAt: new Date().toISOString(),
  }
}

function userKey(email) { return `rewards:user:${email.toLowerCase().trim()}` }
function emailKey(rewardId) { return `rewards:email:${rewardId}` }

// ── Storage operations ────────────────────────────────────────────────────
async function storeUser(user) {
  const r = getRedis()
  if (r) {
    await r.set(userKey(user.email), JSON.stringify(user))
    await r.set(emailKey(user.rewardId), user.email)
  } else {
    memStore.set(userKey(user.email), JSON.stringify(user))
    memStore.set(emailKey(user.rewardId), user.email)
  }
}

async function loadUser(email) {
  const r = getRedis()
  const key = userKey(email)
  let raw
  if (r) raw = await r.get(key)
  else raw = memStore.get(key)
  return raw ? JSON.parse(raw) : null
}

async function lookupByRewardId(rewardId) {
  const r = getRedis()
  let email
  if (r) email = await r.get(emailKey(rewardId))
  else email = memStore.get(emailKey(rewardId))
  if (!email) return null
  return loadUser(email)
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { action, email, name, orderAmountCents } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // ── Register ────────────────────────────────────────────────────────
    if (action === 'register') {
      const existing = await loadUser(email)
      if (existing) {
        return res.status(200).json({
          registered: false,
          ...existing,
          message: 'Welcome back! You already have an account.',
        })
      }

      const user = makeUser(email, name)
      await storeUser(user)

      return res.status(200).json({
        registered: true,
        ...user,
        message: `Welcome! You've earned 100 welcome points.`,
      })
    }

    // ── Login / Lookup ──────────────────────────────────────────────────
    if (action === 'login') {
      const user = await loadUser(email)
      if (!user) {
        return res.status(404).json({ error: 'No account found with this email.' })
      }
      return res.status(200).json({ ...user })
    }

    // ── Add points after purchase ───────────────────────────────────────
    if (action === 'add-points') {
      const user = await loadUser(email)
      if (!user) {
        return res.status(404).json({ error: 'Account not found' })
      }

      const earned = orderAmountCents ? pointsForOrder(orderAmountCents) : 0
      user.points += earned
      user.lifetimePoints += earned
      user.orderCount += 1
      await storeUser(user)

      return res.status(200).json({
        ...user,
        pointsEarned: earned,
        message: `You earned ${earned} points! Total balance: ${user.points}`,
      })
    }

    // ── Guest lookup (just return points for info) ──────────────────────
    if (action === 'lookup') {
      const user = await loadUser(email)
      return res.status(200).json({
        found: !!user,
        ...(user ? { rewardId: user.rewardId, points: user.points, lifetimePoints: user.lifetimePoints, orderCount: user.orderCount } : {}),
      })
    }

    return res.status(400).json({ error: `Unknown action: ${action}` })
  } catch (err) {
    console.error('Rewards API error:', err)
    return res.status(500).json({ error: 'Rewards service unavailable' })
  }
}