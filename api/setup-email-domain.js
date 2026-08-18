import { Resend } from 'resend'

const DOMAIN = 'lionelitebeauty.com'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'Email service not configured' })

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const listed = await resend.domains.list()
    const domains = listed?.data?.data || listed?.data || []
    let domain = Array.isArray(domains)
      ? domains.find(d => String(d?.name || '').toLowerCase() === DOMAIN)
      : null

    if (!domain) {
      const created = await resend.domains.create({ name: DOMAIN })
      if (created?.error) throw new Error(created.error.message || 'Unable to create Resend domain')
      domain = created?.data || created
    }

    const id = domain?.id
    let detail = domain
    if (id) {
      const fetched = await resend.domains.get(id)
      if (!fetched?.error && fetched?.data) detail = fetched.data
    }

    const records = Array.isArray(detail?.records)
      ? detail.records.map(r => ({ record: r.record, name: r.name, type: r.type, value: r.value, ttl: r.ttl, status: r.status }))
      : []

    return res.status(200).json({
      success: true,
      domain: { id: detail?.id || id || null, name: DOMAIN, status: detail?.status || 'pending' },
      records,
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: String(error?.message || error).slice(0, 300) })
  }
}
