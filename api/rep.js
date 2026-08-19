import Stripe from 'stripe'
import { authenticateDashboard } from './_auth.js'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

function normalizeCode(code) {
  return String(code || '').trim().toUpperCase()
}

function normalizeUsername(username) {
  return String(username || '').trim().toLowerCase()
}

// Rep metadata and credentials are driven by one environment registry so new
// reps automatically appear in the portal without a code deployment.
// REP_CREDENTIALS example:
// {
//   "colin": {
//     "name": "Colin",
//     "code": "COLIN10",
//     "password": "...",
//     "discountPercent": 10,
//     "commissionPercent": 20
//   }
// }
function getReps() {
  const raw = process.env.REP_CREDENTIALS
  if (!raw) return {}

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}

    return Object.fromEntries(
      Object.entries(parsed)
        .map(([key, value]) => {
          if (!value || typeof value !== 'object') return null
          const username = normalizeUsername(key)
          const code = normalizeCode(value.code)
          if (!username || !code) return null

          return [username, {
            name: String(value.name || key).trim(),
            username: String(value.username || key).trim(),
            code,
            discountPercent: Number.isFinite(Number(value.discountPercent)) ? Number(value.discountPercent) : 10,
            commissionPercent: Number.isFinite(Number(value.commissionPercent)) ? Number(value.commissionPercent) : 20,
          }]
        })
        .filter(Boolean),
    )
  } catch {
    return {}
  }
}

async function getAllPaymentIntents() {
  const all = []
  let startingAfter

  for (let page = 0; page < 20; page += 1) {
    const batch = await stripe.paymentIntents.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    })
    all.push(...batch.data)
    if (!batch.has_more || batch.data.length === 0) break
    startingAfter = batch.data[batch.data.length - 1].id
  }

  return all
}

function saleFromIntent(pi, commissionPercent = 0) {
  const revenueCents = pi.amount_received || pi.amount || 0
  return {
    id: pi.id,
    date: new Date((pi.created || 0) * 1000).toISOString(),
    items: pi.metadata?.items || 'Order',
    revenue: revenueCents / 100,
    commission: Math.round(revenueCents * commissionPercent / 100) / 100,
    status: 'Paid',
    code: normalizeCode(pi.metadata?.discountCode),
    rep: pi.metadata?.rep && pi.metadata.rep !== 'none' ? pi.metadata.rep : null,
  }
}

function parseItems(itemsText) {
  return String(itemsText || '')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const match = part.match(/^(.*?)(?:\s*[×x]\s*(\d+))?$/)
      return {
        name: (match?.[1] || part).trim(),
        quantity: Number(match?.[2] || 1),
      }
    })
}

function buildAdminDashboard(intents, reps) {
  const succeeded = intents
    .filter(pi => pi.status === 'succeeded')
    .sort((a, b) => (b.created || 0) - (a.created || 0))

  const repRows = Object.values(reps).map(rep => {
    const matched = succeeded.filter(pi => normalizeCode(pi.metadata?.discountCode) === rep.code)
    const revenueCents = matched.reduce((sum, pi) => sum + (pi.amount_received || pi.amount || 0), 0)
    const commissionCents = Math.round(revenueCents * rep.commissionPercent / 100)
    return {
      name: rep.name,
      username: rep.username,
      code: rep.code,
      discountPercent: rep.discountPercent,
      commissionPercent: rep.commissionPercent,
      completedOrders: matched.length,
      revenue: revenueCents / 100,
      commission: commissionCents / 100,
      latestSale: matched.length ? new Date((matched[0].created || 0) * 1000).toISOString() : null,
    }
  })

  const repCodeMap = new Map(Object.values(reps).map(rep => [rep.code, rep]))
  const sales = succeeded.map(pi => {
    const code = normalizeCode(pi.metadata?.discountCode)
    const rep = repCodeMap.get(code)
    return saleFromIntent(pi, rep?.commissionPercent || 0)
  })

  const productMap = new Map()
  succeeded.forEach(pi => {
    const orderItems = parseItems(pi.metadata?.items)
    const seenInOrder = new Set()
    orderItems.forEach(item => {
      const key = item.name.toLowerCase()
      const current = productMap.get(key) || { name: item.name, units: 0, orders: 0 }
      current.units += item.quantity
      if (!seenInOrder.has(key)) {
        current.orders += 1
        seenInOrder.add(key)
      }
      productMap.set(key, current)
    })
  })

  const products = [...productMap.values()].sort((a, b) => b.units - a.units || b.orders - a.orders)
  const totalRevenueCents = succeeded.reduce((sum, pi) => sum + (pi.amount_received || pi.amount || 0), 0)
  const totalCommission = repRows.reduce((sum, rep) => sum + rep.commission, 0)
  const repRevenue = repRows.reduce((sum, rep) => sum + rep.revenue, 0)
  const repOrders = repRows.reduce((sum, rep) => sum + rep.completedOrders, 0)

  return {
    authenticated: true,
    role: 'admin',
    admin: { username: 'admin' },
    stats: {
      completedOrders: succeeded.length,
      totalRevenue: totalRevenueCents / 100,
      repOrders,
      repRevenue,
      totalCommission,
      latestSale: sales.length ? sales[0].date : null,
    },
    reps: repRows,
    products,
    sales,
    note: 'Product counts include completed Stripe orders. Representative sales and commissions update automatically from successful Stripe payment intents and the rep code stored in checkout metadata.',
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, code, username, password } = req.body || {}
  const reps = getReps()

  if (action === 'validate-code') {
    const normalizedCode = normalizeCode(code)
    const rep = Object.values(reps).find(r => r.code === normalizedCode)
    if (!rep) return res.status(404).json({ valid: false })
    return res.status(200).json({
      valid: true,
      code: rep.code,
      rep: rep.name,
      discountPercent: rep.discountPercent,
    })
  }

  if (action !== 'login') {
    return res.status(400).json({ error: 'Unknown action' })
  }

  if (!stripe) {
    return res.status(503).json({ error: 'Stripe is not configured' })
  }

  const normalizedUsername = normalizeUsername(username)
  const auth = authenticateDashboard(username, password)
  if (!auth) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  try {
    const intents = await getAllPaymentIntents()

    if (auth.role === 'admin') {
      return res.status(200).json(buildAdminDashboard(intents, reps))
    }

    const rep = reps[normalizedUsername]
      || Object.values(reps).find(r => r.code === normalizeCode(auth.code))

    if (!rep) {
      return res.status(401).json({ error: 'Rep account is not configured' })
    }

    const matched = intents
      .filter(pi => pi.status === 'succeeded' && normalizeCode(pi.metadata?.discountCode) === rep.code)
      .sort((a, b) => (b.created || 0) - (a.created || 0))

    const sales = matched.map(pi => saleFromIntent(pi, rep.commissionPercent))
    const revenueCents = matched.reduce((sum, pi) => sum + (pi.amount_received || pi.amount || 0), 0)
    const commissionCents = Math.round(revenueCents * rep.commissionPercent / 100)

    return res.status(200).json({
      authenticated: true,
      role: 'rep',
      rep: {
        name: rep.name,
        username: rep.username,
        code: rep.code,
        discountPercent: rep.discountPercent,
        commissionPercent: rep.commissionPercent,
        commissionConfigured: true,
        shareLink: `https://lionelitebeauty.com/checkout?discount=${rep.code}`,
      },
      stats: {
        completedOrders: sales.length,
        referredRevenue: revenueCents / 100,
        totalCommission: commissionCents / 100,
        latestSale: sales.length ? sales[0].date : null,
      },
      sales,
      commissionBasis: `Commission is calculated automatically at ${rep.commissionPercent}% of the amount actually collected after the customer discount.`,
    })
  } catch (err) {
    console.error('Rep portal error:', err)
    return res.status(500).json({ error: 'Unable to load portal dashboard' })
  }
}
