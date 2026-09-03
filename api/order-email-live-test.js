import { finalizeStripeOrder, getStripe, getWebhookSecret } from './_stripe-order.js'

export const config = { api: { bodyParser: false } }

async function readRawBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const stripe = getStripe()
    const secret = await getWebhookSecret()
    const signature = req.headers['stripe-signature']
    const rawBody = await readRawBody(req)
    const event = stripe.webhooks.constructEvent(rawBody, signature, secret)
    if (event.type === 'payment_intent.succeeded') await finalizeStripeOrder(event.data.object)
    return res.status(200).json({ received: true })
  } catch (err) {
    console.error('Stripe webhook failed:', err)
    return res.status(400).json({ error: 'Webhook rejected' })
  }
}
