import { Resend } from 'resend'

const DOMAIN = 'lionelitebeauty.com'

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
    const listed = await resend.domains.list()
    const domains = listed?.data?.data || listed?.data || []
    let match = Array.isArray(domains)
      ? domains.find(d => String(d?.name || '').toLowerCase() === DOMAIN)
      : null

    if (!match) {
      const created = await resend.domains.create({ name: DOMAIN })
      if (created?.error) throw new Error(created.error.message || 'Unable to create Resend domain')
      match = created?.data || created
    }

    let detail = match
    if (match?.id) {
      const fetched = await resend.domains.get(match.id)
      if (!fetched?.error && fetched?.data) detail = fetched.data
    }

    const records = Array.isArray(detail?.records)
      ? detail.records.map(r => ({
          record: r.record,
          name: r.name,
          type: r.type,
          value: r.value,
          ttl: r.ttl,
          status: r.status,
        }))
      : []

    return res.status(200).json({
      ...base,
      domain: {
        id: detail?.id || match?.id || null,
        name: DOMAIN,
        status: detail?.status || match?.status || 'pending',
        records,
      },
    })
  } catch (error) {
    return res.status(200).json({
      ...base,
      domain: { name: DOMAIN, status: 'check_failed', detail: String(error?.message || error).slice(0, 200) },
    })
  }
}
