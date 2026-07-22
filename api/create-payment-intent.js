import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null

const DISCOUNT_CODES = {
  LION10: { percent: 10, rep: null },
  COLIN10: { percent: 10, rep: 'Colin' },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!stripe) {
    return res.status(503).json({ error: 'Stripe not configured' })
  }

  try {
    const { items, discountApplied, discountCode } = req.body

    if (!items || !items.length) {
      return res.status(400).json({ error: 'No items in order' })
    }

    let totalCents = Math.round(
      items.reduce((sum, i) => sum + (i.priceNum || 0) * i.quantity, 0) * 100
    )

    const normalizedCode = String(discountCode || '').trim().toUpperCase()
    const discount = discountApplied ? DISCOUNT_CODES[normalizedCode] : null

    if (discountApplied && !discount) {
      return res.status(400).json({ error: 'Invalid discount code' })
    }

    if (discount) {
      totalCents = Math.round(totalCents * (1 - discount.percent / 100))
    }

    if (totalCents < 50) {
      return res.status(400).json({ error: 'Order total too low' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'usd',
      payment_method_types: [
        'card',
        'klarna',
        'afterpay_clearpay',
        'affirm',
      ],
      metadata: {
        items: items.map(i => `${i.name} × ${i.quantity}`).join(', '),
        discountCode: discount ? normalizedCode : 'none',
        rep: discount?.rep || 'none',
        discountPercent: discount ? String(discount.percent) : '0',
      },
    })

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: totalCents,
      discountCode: discount ? normalizedCode : null,
    })
  } catch (err) {
    console.error('Stripe error:', err)
    return res.status(500).json({ error: 'Failed to create payment intent' })
  }
}