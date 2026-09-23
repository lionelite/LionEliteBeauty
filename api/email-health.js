import ordersHandler from './orders.js'
import sendHandler from './send-v2.js'
import { finalizeStripeOrder, getStripe, lockCheckout } from './_stripe-order.js'

async function canonicalizeStripeOrder(body) {
  if (!body?.stripePaymentId) return null
  const stripe = getStripe()
  const intent = await stripe.paymentIntents.retrieve(String(body.stripePaymentId))
  if (intent?.status !== 'succeeded') return intent
  await finalizeStripeOrder(intent)
  const canonical = intent.metadata?.orderNumber
  if (canonical) body.orderNumber = canonical
  return intent
}

function isInfrastructureLockFailure(err) {
  const message = String(err?.message || err || '')
  return /Persistent Redis is required|Secure order reference is missing|Pending order record was not found/i.test(message)
}

export default async function handler(req, res) {
  // /api/checkout-lock is rewritten here. Use the durable lock whenever it is
  // available. If infrastructure is unavailable, allow the existing browser-side
  // post-payment order + email recovery flow to keep checkout operational.
  if (req.method === 'POST' && req.body?.checkout && !req.body?.action) {
    try {
      const order = await lockCheckout({
        cookieHeader: req.headers.cookie,
        checkout: req.body.checkout,
      })
      return res.status(200).json({ success: true, orderNumber: order.orderNumber, durable: true })
    } catch (err) {
      console.error('Checkout lock failed:', err)
      if (isInfrastructureLockFailure(err)) {
        return res.status(200).json({
          success: true,
          durable: false,
          fallback: true,
          warning: 'Durable checkout lock unavailable; browser recovery flow enabled.',
        })
      }
      return res.status(409).json({ error: err?.message || 'Could not safely lock checkout before payment.' })
    }
  }

  // /api/send is rewritten here so the customer receipt uses the same canonical
  // order number stored in the fulfillment dashboard.
  if (req.method === 'POST' && req.body?.type === 'order' && !req.body?.action) {
    try { await canonicalizeStripeOrder(req.body) } catch (err) { console.error('Customer receipt canonicalization failed:', err) }
    return sendHandler(req, res)
  }

  // /api/orders is also rewritten here. Successful Stripe payments are first
  // reconciled to the canonical server-created order number, then the existing
  // orders handler continues normally. This prevents browser retries from
  // creating duplicate fulfillment records.
  try {
    if (req.method === 'POST' && req.body?.action === 'create' && req.body?.stripePaymentId) {
      await canonicalizeStripeOrder(req.body)
    }
  } catch (err) {
    console.error('Stripe order reconciliation gateway failed:', err)
  }

  return ordersHandler(req, res)
}
