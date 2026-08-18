import { Resend } from 'resend'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const configured = Boolean(process.env.RESEND_API_KEY)
  const base = {
    service: 'lion-elite-beauty-email',
    configured,
    ordersFrom: 'orders@lionelitebeauty.com',
    ordersBusinessTo: 'orders@lionelitebeauty.com',
    infoFrom: 'info@lionelitebeauty.com',
  }

  if (!configured) return res.status(200).json({ ...base, domain: null })

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const result = await resend.domains.list()
    const domains = result?.data?.data || result?.data || []
    const match = Array.isArray(domains)
      ? domains.find(d => String(d?.name || '').toLowerCase() === 'lionelitebeauty.com')
      : null
    return res.status(200).json({
      ...base,
      domain: match ? { name: match.name, status: match.status } : { name: 'lionelitebeauty.com', status: 'not_found' },
    })
  } catch (error) {
    return res.status(200).json({
      ...base,
      domain: { name: 'lionelitebeauty.com', status: 'check_failed', detail: String(error?.message || error).slice(0, 200) },
    })
  }
}
