import { Resend } from 'resend'

const DOMAIN = 'lionelitebeauty.com'

function keyCandidates(rawValue) {
  const raw = String(rawValue || '')
  const trimmed = raw.trim()
  const withoutAssignment = trimmed.replace(/^RESEND_API_KEY\s*=\s*/i, '').trim()
  const unquote = value => {
    const v = String(value || '').trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1).trim()
    return v
  }
  const candidates = [
    ['raw', raw],
    ['trimmed', trimmed],
    ['assignment_stripped', withoutAssignment],
    ['unquoted', unquote(trimmed)],
    ['assignment_stripped_unquoted', unquote(withoutAssignment)],
  ]
  const seen = new Set()
  return candidates.filter(([, value]) => {
    if (!value || seen.has(value)) return false
    seen.add(value)
    return true
  })
}

async function validateKey(value) {
  try {
    const resend = new Resend(value)
    const listed = await resend.domains.list()
    if (listed?.error) return { ok: false, error: listed.error.message || 'Resend rejected key' }
    const domains = listed?.data?.data || listed?.data || []
    const match = Array.isArray(domains)
      ? domains.find(d => String(d?.name || '').toLowerCase() === DOMAIN)
      : null
    return {
      ok: true,
      domain: match ? { id: match.id || null, name: match.name, status: match.status || null } : { name: DOMAIN, status: 'not_found' },
    }
  } catch (error) {
    return { ok: false, error: String(error?.message || error).slice(0, 200) }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const rawKey = process.env.RESEND_API_KEY
  const base = {
    service: 'lion-elite-beauty-email',
    configured: Boolean(rawKey),
    ordersFrom: 'orders@lionelitebeauty.com',
    ordersBusinessTo: 'orders@lionelitebeauty.com',
    infoFrom: 'info@lionelitebeauty.com',
  }

  if (!rawKey) return res.status(200).json({ ...base, keyVariant: null, domain: null })

  const attempts = []
  for (const [variant, value] of keyCandidates(rawKey)) {
    const result = await validateKey(value)
    attempts.push({ variant, ok: result.ok, error: result.ok ? null : result.error })
    if (result.ok) {
      return res.status(200).json({
        ...base,
        validKey: true,
        keyVariant: variant,
        domain: result.domain,
        attempts: attempts.map(a => ({ variant: a.variant, ok: a.ok, error: a.error })),
      })
    }
  }

  return res.status(200).json({
    ...base,
    validKey: false,
    keyVariant: null,
    domain: { name: DOMAIN, status: 'unavailable' },
    attempts: attempts.map(a => ({ variant: a.variant, ok: a.ok, error: a.error })),
  })
}
