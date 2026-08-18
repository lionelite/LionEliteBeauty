export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  return res.status(200).json({
    service: 'lion-elite-beauty-email',
    configured: Boolean(process.env.RESEND_API_KEY),
    ordersFrom: 'orders@lionelitebeauty.com',
    ordersBusinessTo: 'orders@lionelitebeauty.com',
    infoFrom: 'info@lionelitebeauty.com'
  })
}
