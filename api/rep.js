import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

const REPS = {
  colin: {
    name: 'Colin',
    username: 'Colin',
    code: 'COLIN10',
    discountPercent: 10,
    passwordEnv: 'COLIN_REP_PASSWORD',
    commissionEnv: 'COLIN_COMMISSION_PERCENT',
  },
}

function normalizeCode(code) {
  return String(code || '').trim().toUpperCase()
}

function normalizeUsername(username) {
  return String(username || '').trim().toLowerCase()
}

async function getAllPaymentIntents() {
  const all = []
  let startingAfter

  // Pull enough history for a real rep dashboard while respecting Stripe pagination.
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, code, username, password } = req.body || {}

  if (action === 'validate-code') {
    const normalizedCode = normalizeCode(code)
    const rep = Object.values(REPS).find(r => r.code === normalizedCode)
    if (!rep) return res.status(404).json({ valid: false })
    return res.status(200).json({
      valid: true,
      code: rep.code,
      discountPercent: rep.discountPercent,
    })
  }

  if (action !== 'login') {
    return res.status(400).json({ error: 'Unknown action' })
  }

  const rep = REPS[normalizeUsername(username)]
  if (!rep) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const expectedPassword = process.env[rep.passwordEnv]
  if (!expectedPassword) {
    return res.status(503).json({ error: 'Rep portal password has not been configured yet.' })
  }

  if (String(password || '') !== String(expectedPassword)) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  if (!stripe) {
    return res.status(503).json({ error: 'Stripe is not configured' })
  }

  const commissionPercentRaw = Number(process.env[rep.commissionEnv])
  const commissionPercent = Number.isFinite(commissionPercentRaw) && commissionPercentRaw >= 0
    ? commissionPercentRaw
    : 0

  try {
    const intents = await getAllPaymentIntents()
    const matched = intents
      .filter(pi =>
        pi.status === 'succeeded' &&
        normalizeCode(pi.metadata?.discountCode) === rep.code
      )
      .sort((a, b) => (b.created || 0) - (a.created || 0))

    const sales = matched.map(pi => {
      const revenueCents = pi.amount_received || pi.amount || 0
      const commissionCents = Math.round(revenueCents * commissionPercent / 100)
      return {
        id: pi.id,
        date: new Date((pi.created || 0) * 1000).toISOString(),
        items: pi.metadata?.items || 'Order',
        revenue: revenueCents / 100,
        commission: commissionCents / 100,
        status: 'Paid',
      }
    })

    const revenueCents = matched.reduce((sum, pi) => sum + (pi.amount_received || pi.amount || 0), 0)
    const commissionCents = Math.round(revenueCents * commissionPercent / 100)

    return res.status(200).json({
      authenticated: true,
      rep: {
        name: rep.name,
        username: rep.username,
        code: rep.code,
        discountPercent: rep.discountPercent,
        commissionPercent,
        commissionConfigured: commissionPercentRaw >= 0 && Number.isFinite(commissionPercentRaw),
        shareLink: `https://lionelitebeauty.com/checkout?discount=${rep.code}`,
      },
      stats: {
        completedOrders: sales.length,
        referredRevenue: revenueCents / 100,
        totalCommission: commissionCents / 100,
        latestSale: sales.length ? sales[0].date : null,
      },
      sales,
      commissionBasis: 'Commission is calculated on the amount actually collected after the customer discount.',
    })
  } catch (err) {
    console.error('Rep portal error:', err)
    return res.status(500).json({ error: 'Unable to load rep dashboard' })
  }
}
