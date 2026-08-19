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

export function safeEqual(a, b) {
  const bufA = Buffer.from(String(a ?? ''), 'utf8')
  const bufB = Buffer.from(String(b ?? ''), 'utf8')
  if (bufA.length !== bufB.length) {
    timingSafeEqual(bufA, bufA)
    return false
  }
  return timingSafeEqual(bufA, bufB)
}

export function secureToken(bytes = 32) {
  return randomBytes(bytes).toString('base64url')
}

export function secureId(prefix) {
  const raw = randomUUID().replace(/-/g, '').toUpperCase()
  return prefix ? `${prefix}-${raw.slice(0, 4)}-${raw.slice(4, 8)}` : raw
}

export function adminApiToken() {
  const token = process.env.ADMIN_TOKEN
  return token && token.length >= 16 ? token : null
}

export function verifyAdminToken(supplied) {
  const expected = adminApiToken()
  if (!expected) return { ok: false, status: 503, error: 'Admin API is not configured' }
  if (!supplied || !safeEqual(supplied, expected)) return { ok: false, status: 403, error: 'Unauthorized' }
  return { ok: true }
}

// Accept the configured admin username (defaults to "admin") or ADMIN_EMAIL.
// The password remains environment-only and is never committed to this repo.
export function verifyAdminLogin(identifier, password) {
  const expectedEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const expectedUser = String(process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase()
  const expectedPassword = process.env.ADMIN_PASSWORD
  if (!expectedPassword) return { ok: false, status: 503, error: 'Admin login is not configured' }

  const supplied = String(identifier || '').trim().toLowerCase()
  const identityOk = safeEqual(supplied, expectedUser) || (expectedEmail && safeEqual(supplied, expectedEmail))
  const passOk = safeEqual(password, expectedPassword)
  if (!identityOk || !passOk) return { ok: false, status: 403, error: 'Invalid credentials' }
  return { ok: true, email: expectedEmail || null, username: expectedUser }
}

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

export function authenticateDashboard(username, password) {
  const name = String(username || '').trim().toLowerCase()
  if (!name || !password) return null

  const adminEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const adminUser = String(process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD
  const isAdminName = name === adminUser || (adminEmail && name === adminEmail)
  if (isAdminName && adminPassword && safeEqual(password, adminPassword)) {
    return { role: 'admin', code: null, name: 'Administrator' }
  }

  const rep = repRegistry()[name]
  if (rep && rep.password && safeEqual(password, rep.password)) {
    return { role: 'rep', code: String(rep.code || '').toUpperCase() || null, name: rep.name || username }
  }

  return null
}
