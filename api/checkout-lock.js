import { lockCheckout } from './_stripe-order.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const order = await lockCheckout({
      cookieHeader: req.headers.cookie,
      checkout: req.body?.checkout,
    })
    return res.status(200).json({ success: true, orderNumber: order.orderNumber })
  } catch (err) {
    console.error('Checkout lock failed:', err)
    return res.status(409).json({ error: err?.message || 'Could not safely lock checkout before payment.' })
  }
}
