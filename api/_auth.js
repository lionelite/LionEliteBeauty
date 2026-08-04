// Shared authentication helpers.
//
// SECURITY POSTURE
//  - No credential, hash, or token literal lives in this repository. Every
//    secret is read from the environment.
//  - Missing configuration FAILS CLOSED (access denied), never falls back to a
//    default value. A published default is equivalent to no authentication.
//  - Comparisons are timing-safe.
//  - Tokens/identifiers use a cryptographic RNG, not Math.random().

import { randomUUID, randomBytes, timingSafeEqual } from 'crypto'

/** Timing-safe string compare that does not leak length via early return. */
export function safeEqual(a, b) {
  const bufA = Buffer.from(String(a ?? ''), 'utf8')
  const bufB = Buffer.from(String(b ?? ''), 'utf8')
  if (bufA.length !== bufB.length) {
    // Still burn a comparison so timing does not distinguish "wrong length".
    timingSafeEqual(bufA, bufA)
    return false
  }
  return timingSafeEqual(bufA, bufB)
}

/** Cryptographically secure opaque token. */
export function secureToken(bytes = 32) {
  return randomBytes(bytes).toString('base64url')
}

export function secureId(prefix) {
  const raw = randomUUID().replace(/-/g, '').toUpperCase()
  return prefix ? `${prefix}-${raw.slice(0, 4)}-${raw.slice(4, 8)}` : raw
}

/**
 * The admin API token used by privileged endpoints.
 * Returns null when unset — callers MUST deny access in that case.
 */
export function adminApiToken() {
  const token = process.env.ADMIN_TOKEN
  return token && token.length >= 16 ? token : null
}

/**
 * Verify a supplied admin API token. Denies when the server is unconfigured.
 * @returns {{ok:true}|{ok:false,status:number,error:string}}
 */
export function verifyAdminToken(supplied) {
  const expected = adminApiToken()
  if (!expected) {
    return { ok: false, status: 503, error: 'Admin API is not configured' }
  }
  if (!supplied || !safeEqual(supplied, expected)) {
    return { ok: false, status: 403, error: 'Unauthorized' }
  }
  return { ok: true }
}

/**
 * Verify admin dashboard login against env credentials.
 * ADMIN_EMAIL + ADMIN_PASSWORD must both be set or login is unavailable.
 */
export function verifyAdminLogin(email, password) {
  const expectedEmail = process.env.ADMIN_EMAIL
  const expectedPassword = process.env.ADMIN_PASSWORD
  if (!expectedEmail || !expectedPassword) {
    return { ok: false, status: 503, error: 'Admin login is not configured' }
  }
  const emailOk = safeEqual(String(email || '').trim().toLowerCase(), expectedEmail.trim().toLowerCase())
  const passOk = safeEqual(password, expectedPassword)
  if (!emailOk || !passOk) {
    return { ok: false, status: 403, error: 'Invalid credentials' }
  }
  return { ok: true, email: expectedEmail }
}

/**
 * Sales-rep credentials, configured as JSON in REP_CREDENTIALS, e.g.
 *   {"colin":{"code":"COLIN10","password":"..."}}
 * Absent/invalid config means no rep can authenticate (fail closed).
 */
function repRegistry() {
  const raw = process.env.REP_CREDENTIALS
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

/**
 * Authenticate an admin or rep for the orders/rep dashboards.
 * @returns {{role:'admin'|'rep', code:string|null, name:string}|null}
 */
export function authenticateDashboard(username, password) {
  const name = String(username || '').trim().toLowerCase()
  if (!name || !password) return null

  const adminEmail = process.env.ADMIN_EMAIL
  const adminUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD
  const isAdminName = name === adminUser || (adminEmail && name === adminEmail.trim().toLowerCase())
  if (isAdminName && adminPassword && safeEqual(password, adminPassword)) {
    return { role: 'admin', code: null, name: 'Administrator' }
  }

  const rep = repRegistry()[name]
  if (rep && rep.password && safeEqual(password, rep.password)) {
    return { role: 'rep', code: String(rep.code || '').toUpperCase() || null, name: rep.name || username }
  }

  return null
}
