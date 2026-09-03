import ordersHandler from './orders.js'
import { finalizeStripeOrder, getStripe, lockCheckout } from './_stripe-order.js'

export default async function handler(req, res) {
  // /api/checkout-lock is rewritten here. This must succeed before the browser
  // is allowed to confirm a Stripe payment.
  if (req.method === 'POST' && req.body?.checkout && !req.body?.action) {
    try {
      const order = await lockCheckout({
        cookieHeader: req.headers.cookie,
        checkout: req.body.checkout,
      })
      return res.status(200).json({ success: true, orderNumber: order.orderNumber })
    } catch (err) {
      console.error('Checkout lock failed:', err)
      return res.status(409).json({ error: err?.message || 'Could not safely lock checkout before payment.' })
    }
  }

  // /api/orders is also rewritten here. Successful Stripe payments are first
  // reconciled to the canonical server-created order number, then the existing
  // orders handler continues normally. This prevents browser retries from
  // creating duplicate fulfillment records.
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
    console.error('Stripe order reconciliation gateway failed:', err)
  }

  return ordersHandler(req, res)
}
