import Stripe from 'stripe'
import { priceOrder } from './_pricing.js'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!stripe) {
    return res.status(503).json({ error: 'Stripe not configured' })
  }

  try {
    const { items, discountApplied, discountCode } = req.body

    // SECURITY: the amount is computed from the server-side catalog. Prices in
    // the request body are ignored entirely — previously a caller could set
    // their own price and be charged it.
    const priced = priceOrder({ items, discountCode, discountApplied })
    if (!priced.ok) {
      return res.status(400).json({ error: priced.error })
    }

    if (priced.totalCents < 50) {
      return res.status(400).json({ error: 'Order total too low' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priced.totalCents,
      currency: 'usd',
      payment_method_types: ['card', 'klarna', 'afterpay_clearpay', 'affirm'],
      metadata: {
        items: priced.lines.map(l => `${l.name} × ${l.quantity}`).join(', ').slice(0, 480),
        discountCode: priced.code || 'none',
        rep: priced.rep || 'none',
        subtotalCents: String(priced.subtotalCents),
        discountCents: String(priced.discountCents),
      },
    })

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      // Authoritative figures so the UI can display exactly what will be charged.
      amount: priced.totalCents,
      subtotalCents: priced.subtotalCents,
      discountCents: priced.discountCents,
      discountCode: priced.code,
    })
  } catch (err) {
    console.error('Stripe error:', err)
    return res.status(500).json({ error: 'Failed to create payment intent' })
  }
}
