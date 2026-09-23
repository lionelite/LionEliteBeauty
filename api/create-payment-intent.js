import { priceOrder } from './_pricing.js'
import { createPendingOrder, ensureStripeWebhook, getStripe, newOrderNumber } from './_stripe-order.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let stripe
  try {
    stripe = getStripe()
  } catch (err) {
    console.error('Stripe configuration failed:', err)
    return res.status(503).json({ error: 'Checkout is temporarily unavailable. No payment was taken.' })
  }

  // Keep the authoritative webhook/order-lock path when infrastructure is healthy,
  // but do not take the entire storefront offline if webhook provisioning or durable
  // storage is temporarily unavailable. The browser still completes the existing
  // post-payment order + email flow as a recovery path.
  let webhookReady = false
  try {
    await ensureStripeWebhook()
    webhookReady = true
  } catch (err) {
    console.error('Stripe webhook prerequisite unavailable; continuing in checkout fallback mode:', err)
  }

  try {
    const { items, discountApplied, discountCode } = req.body || {}
    const priced = priceOrder({ items, discountCode, discountApplied })
    if (!priced.ok) return res.status(400).json({ error: priced.error })
    if (priced.totalCents < 50) return res.status(400).json({ error: 'Order total too low' })

    const orderNumber = newOrderNumber()
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priced.totalCents,
      currency: 'usd',
      payment_method_types: ['card', 'klarna', 'afterpay_clearpay', 'affirm'],
      metadata: {
        orderNumber,
        items: priced.lines.map(l => `${l.name} × ${l.quantity}`).join(', ').slice(0, 480),
        discountCode: priced.code || 'none',
        rep: priced.rep || 'none',
        subtotalCents: String(priced.subtotalCents),
        discountCents: String(priced.discountCents),
      },
    })

    let durableOrder = false
    try {
      await createPendingOrder({ paymentIntent, priced })
      durableOrder = true
      res.setHeader('Set-Cookie', `leb_pending_order=${encodeURIComponent(orderNumber)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=1800`)
    } catch (persistErr) {
      console.error('Pending order persistence unavailable; continuing in checkout fallback mode:', persistErr)
    }

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderNumber,
      amount: priced.totalCents,
      subtotalCents: priced.subtotalCents,
      discountCents: priced.discountCents,
      discountCode: priced.code,
      durableOrder,
      webhookReady,
    })
  } catch (err) {
    console.error('Stripe error:', err)
    return res.status(500).json({ error: 'Failed to create payment intent' })
  }
}
