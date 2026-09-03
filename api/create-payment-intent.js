import { priceOrder } from './_pricing.js'
import { createPendingOrder, ensureStripeWebhook, getStripe, newOrderNumber } from './_stripe-order.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let stripe
  try {
    stripe = getStripe()
    // Fail closed: if we cannot guarantee Stripe can call us back, do not expose
    // a client secret that could accept money without a fulfillment record.
    await ensureStripeWebhook()
  } catch (err) {
    console.error('Checkout safety prerequisites failed:', err)
    return res.status(503).json({ error: 'Checkout is temporarily unavailable. No payment was taken.' })
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

    try {
      // The order record exists in persistent storage BEFORE the browser receives
      // a client secret. If persistence fails, the intent is canceled and cannot
      // be paid.
      await createPendingOrder({ paymentIntent, priced })
    } catch (persistErr) {
      console.error('Could not persist pending order:', persistErr)
      try { await stripe.paymentIntents.cancel(paymentIntent.id) } catch {}
      return res.status(503).json({ error: 'We could not safely record your order. No payment was taken.' })
    }

    res.setHeader('Set-Cookie', `leb_pending_order=${encodeURIComponent(orderNumber)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=1800`)
    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderNumber,
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
