// ── VIP Program Account API ────────────────────────────────────────────────
// POST /api/vip
// Actions: register, lookup
//
// VIP accounts let program applicants create a secure account
// to access program checkout and their program portal.

const STORE = {}

function generateVipId() {
  const p1 = Math.random().toString(36).substring(2, 6).toUpperCase()
  const p2 = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `LEV-${p1}-${p2}`
}

function makeAccount(name, email, program) {
  return {
    vipId: generateVipId(),
    name,
    email,
    program: program || 'Not specified',
    paid: false,
    created: new Date().toISOString(),
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, email, name, program } = req.body
  const key = email?.trim().toLowerCase()

  if (!key) return res.status(400).json({ error: 'Email is required' })

  if (action === 'register') {
    if (STORE[key]) {
      return res.status(200).json({
        message: 'Welcome back! Your VIP account already exists.',
        ...STORE[key],
      })
    }
    const account = makeAccount(name || key.split('@')[0], key, program)
    STORE[key] = account
    console.log('VIP account created:', account.vipId, key)
    return res.status(200).json({
      message: `Welcome to the Lion Elite VIP family, ${account.name}!`,
      ...account,
    })
  }

  if (action === 'lookup') {
    const account = STORE[key]
    if (!account) return res.status(404).json({ error: 'No VIP account found with this email.' })
    return res.status(200).json({ ...account })
  }

  return res.status(400).json({ error: 'Invalid action' })
}