import { ensureStripeWebhook, getRedisStrict } from './_stripe-order.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const redis = getRedisStrict()
    await redis.set('health:beauty:orders', new Date().toISOString(), { ex: 300 })
    const webhook = await ensureStripeWebhook()
    return res.status(200).json({ ok: true, persistentOrders: true, webhook: { configured: webhook.configured, url: webhook.url, source: webhook.source } })
  } catch (err) {
    console.error('Stripe order health check failed:', err)
    return res.status(503).json({ ok: false, error: 'Order safety prerequisites are not fully configured.' })
  }
}
