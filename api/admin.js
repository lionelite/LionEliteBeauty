// ── Admin API ───────────────────────────────────────────────────────────────
// POST /api/admin
// Actions: login, get-all-accounts
//
// Simple admin authentication for the business dashboard.

import { verifyAdminLogin, adminApiToken, secureToken, safeEqual } from './_auth.js'

// Credentials and tokens are environment-only and fail closed — no literals in
// source, no published defaults. See api/_auth.js.
function generateAdminToken() {
  return `adm-${secureToken(24)}`
}

// NOTE: serverless instances do not share memory, so this session is only
// valid on the instance that issued it. It is a convenience gate in front of
// the env-backed admin token, not the security boundary itself.
let adminSession = null
const SESSION_TTL_MS = 12 * 60 * 60 * 1000

function sessionValid(token) {
  if (!adminSession || !token) return false
  if (Date.now() - Date.parse(adminSession.loggedInAt) > SESSION_TTL_MS) {
    adminSession = null
    return false
  }
  return safeEqual(token, adminSession.token)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { action, email, password, token } = req.body

  if (action === 'login') {
    const login = verifyAdminLogin(email, password)
    if (!login.ok) {
      return res.status(login.status).json({ error: login.error })
    }
    adminSession = { token: generateAdminToken(), loggedInAt: new Date().toISOString() }
    return res.status(200).json({
      message: 'Login successful',
      token: adminSession.token,
      email: login.email,
      // The privileged API token is returned only to an authenticated admin
      // and is never defaulted; if unset server-side this is null.
      vipAdminToken: adminApiToken(),
    })
  }

  if (action === 'get-vip-token') {
    if (!sessionValid(token)) {
      return res.status(403).json({ error: 'Not authenticated' })
    }
    return res.status(200).json({ vipAdminToken: adminApiToken() })
  }

  if (action === 'verify') {
    if (!sessionValid(token)) {
      return res.status(403).json({ error: 'Not authenticated' })
    }
    return res.status(200).json({ valid: true, email: process.env.ADMIN_EMAIL || null })
  }

  if (action === 'logout') {
    adminSession = null
    return res.status(200).json({ message: 'Logged out' })
  }

  return res.status(400).json({ error: 'Invalid action' })
}