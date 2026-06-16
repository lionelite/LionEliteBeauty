import Stripe from 'stripe'

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
    const { items, discountApplied } = req.body

    if (!items || !items.length) {
      return res.status(400).json({ error: 'No items in order' })
    }

    // Calculate total amount in cents
    let totalCents = Math.round(
      items.reduce((sum, i) => sum + (i.priceNum || 0) * i.quantity, 0) * 100
    )

    // Apply 10% discount if WELCOME10 was applied
    if (discountApplied) {
      totalCents = Math.round(totalCents * 0.9)
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
        discountApplied: discountApplied ? 'WELCOME10' : 'none',
      },
    })

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      amount: totalCents,
    })
  } catch (err) {
    console.error('Stripe error:', err)
    return res.status(500).json({ error: 'Failed to create payment intent' })
  }
}