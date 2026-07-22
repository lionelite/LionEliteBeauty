import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

const REPS = {
  COLIN10: {
    name: 'Colin',
    discountPercent: 10,
    pinEnv: 'COLIN_REP_PIN',
  },
}

function normalizeCode(code) {
  return String(code || '').trim().toUpperCase()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, code, pin } = req.body || {}
  const normalizedCode = normalizeCode(code)
  const rep = REPS[normalizedCode]

  if (action === 'validate-code') {
    if (!rep) return res.status(404).json({ valid: false })
    return res.status(200).json({
      valid: true,
      code: normalizedCode,
      discountPercent: rep.discountPercent,
    })
  }

  if (action !== 'login') {
    return res.status(400).json({ error: 'Unknown action' })
  }

  if (!rep) {
    return res.status(401).json({ error: 'Invalid rep code' })
  }

  const expectedPin = process.env[rep.pinEnv]
  if (!expectedPin) {
    return res.status(503).json({ error: 'Rep portal PIN has not been configured yet.' })
  }

  if (String(pin || '') !== String(expectedPin)) {
    return res.status(401).json({ error: 'Invalid PIN' })
  }

  if (!stripe) {
    return res.status(503).json({ error: 'Stripe is not configured' })
  }

  try {
    // Pull recent payment intents and attribute only completed purchases that
    // were created using this rep's code. No customer PII is returned.
    const intents = await stripe.paymentIntents.list({ limit: 100 })
    const sales = intents.data.filter(pi =>
      pi.status === 'succeeded' &&
      normalizeCode(pi.metadata?.discountCode) === normalizedCode
    )

    const revenueCents = sales.reduce((sum, pi) => sum + (pi.amount_received || pi.amount || 0), 0)
    const latestSale = sales.length
      ? new Date(Math.max(...sales.map(pi => (pi.created || 0) * 1000))).toISOString()
      : null

    return res.status(200).json({
      authenticated: true,
      rep: {
        name: rep.name,
        code: normalizedCode,
        discountPercent: rep.discountPercent,
        shareLink: `https://lionelitebeauty.com/checkout?discount=${normalizedCode}`,
      },
      stats: {
        completedOrders: sales.length,
        referredRevenue: revenueCents / 100,
        latestSale,
      },
    })
  } catch (err) {
    console.error('Rep portal error:', err)
    return res.status(500).json({ error: 'Unable to load rep dashboard' })
  }
}