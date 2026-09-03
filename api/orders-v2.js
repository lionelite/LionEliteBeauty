import ordersHandler from './orders.js'
import { finalizeStripeOrder, getStripe } from './_stripe-order.js'

export default async function handler(req, res) {
  try {
    if (req.method === 'POST' && req.body?.action === 'create' && req.body?.stripePaymentId) {
      const stripe = getStripe()
      const intent = await stripe.paymentIntents.retrieve(String(req.body.stripePaymentId))
      if (intent?.status === 'succeeded') {
        await finalizeStripeOrder(intent)
        const canonical = intent.metadata?.orderNumber
        if (canonical) req.body.orderNumber = canonical
      }
    }
  } catch (err) {
    console.error('Stripe order reconciliation wrapper failed:', err)
  }
  return ordersHandler(req, res)
}
