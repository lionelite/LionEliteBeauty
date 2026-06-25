// ── Admin API ───────────────────────────────────────────────────────────────
// POST /api/admin
// Actions: login, get-all-accounts
//
// Simple admin authentication for the business dashboard.

const ADMIN_EMAIL = 'admin@lionelitebeauty.com'
const ADMIN_PASSWORD = 'lionelite2024'

function generateAdminToken() {
  return 'adm-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

let adminSession = null

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, email, password, token } = req.body

  if (action === 'login') {
    if (email?.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(403).json({ error: 'Invalid credentials' })
    }
    adminSession = { token: generateAdminToken(), loggedInAt: new Date().toISOString() }
    return res.status(200).json({
      message: 'Login successful',
      token: adminSession.token,
      email: ADMIN_EMAIL,
    })
  }

  if (action === 'verify') {
    if (!token || token !== adminSession?.token) {
      return res.status(403).json({ error: 'Not authenticated' })
    }
    return res.status(200).json({ valid: true, email: ADMIN_EMAIL })
  }

  if (action === 'logout') {
    adminSession = null
    return res.status(200).json({ message: 'Logged out' })
  }

  return res.status(400).json({ error: 'Invalid action' })
}