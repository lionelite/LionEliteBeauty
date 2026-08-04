// Security regression tests.
//
// Run: node --test api/__tests__/security.test.mjs
//
// These lock in the fixes for issues found in the 2026-07-28 audit. If any of
// these fail, a previously-exploitable defect has been reintroduced.

import test from 'node:test'
import assert from 'node:assert/strict'
import { priceOrder, resolveLineItems } from '../_pricing.js'
import { verifyAdminToken, verifyAdminLogin, authenticateDashboard, safeEqual, secureToken } from '../_auth.js'

// ── Price tampering ────────────────────────────────────────────────────────
// Previously the charge amount was summed from client-supplied `priceNum`,
// so a crafted request bought a $69.99 product for $0.50.

test('client-supplied prices are ignored in favour of the catalog', () => {
  const r = priceOrder({
    items: [{ slug: 'ghk-cu-serum', name: 'GHK-Cu Intensive Serum', priceNum: 0.5, price: 0.5, quantity: 1 }],
  })
  assert.equal(r.ok, true)
  assert.equal(r.totalCents, 6999, 'must charge the catalog price, not the submitted one')
})

test('unknown products are rejected rather than priced at zero', () => {
  assert.equal(priceOrder({ items: [{ name: 'Free Stuff', priceNum: 0, quantity: 1 }] }).ok, false)
})

test('invalid quantities are rejected', () => {
  for (const quantity of [-5, 0, 0.5, 99999, 'many', null]) {
    assert.equal(priceOrder({ items: [{ slug: 'ghk-cu-serum', quantity }] }).ok, false, `quantity ${quantity}`)
  }
})

test('empty and oversized carts are rejected', () => {
  assert.equal(resolveLineItems([]).ok, false)
  assert.equal(resolveLineItems(new Array(51).fill({ slug: 'ghk-cu-serum', quantity: 1 })).ok, false)
})

test('quantity multiplies correctly', () => {
  const r = priceOrder({ items: [{ slug: 'ghk-cu-serum', quantity: 3 }] })
  assert.equal(r.totalCents, 6999 * 3)
})

// ── Discounts ──────────────────────────────────────────────────────────────

test('COLIN10 applies exactly 10% and attributes the rep', () => {
  const r = priceOrder({ items: [{ slug: 'ghk-cu-serum', quantity: 1 }], discountCode: 'COLIN10', discountApplied: true })
  assert.equal(r.subtotalCents, 6999)
  assert.equal(r.discountCents, 700)
  assert.equal(r.totalCents, 6299)
  assert.equal(r.rep, 'Colin')
})

test('unknown discount codes are rejected, not silently ignored', () => {
  assert.equal(priceOrder({ items: [{ slug: 'ghk-cu-serum', quantity: 1 }], discountCode: 'FREE100', discountApplied: true }).ok, false)
})

// ── Auth fails closed ──────────────────────────────────────────────────────
// Previously ADMIN_TOKEN fell back to a value published in this repo.

test('privileged endpoints deny access when the server is unconfigured', () => {
  const prev = process.env.ADMIN_TOKEN
  delete process.env.ADMIN_TOKEN
  const r = verifyAdminToken('anything')
  assert.equal(r.ok, false)
  assert.equal(r.status, 503, 'must fail closed, not fall back to a default')
  if (prev !== undefined) process.env.ADMIN_TOKEN = prev
})

test('the previously published default token is not accepted', () => {
  process.env.ADMIN_TOKEN = 'a-real-long-random-token-value'
  assert.equal(verifyAdminToken('lionelite-admin-secret').ok, false)
  assert.equal(verifyAdminToken('a-real-long-random-token-value').ok, true)
  delete process.env.ADMIN_TOKEN
})

test('admin login is unavailable unless configured via env', () => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env
  delete process.env.ADMIN_EMAIL
  delete process.env.ADMIN_PASSWORD
  const r = verifyAdminLogin('admin@lionelitebeauty.com', 'LionElite9903')
  assert.equal(r.ok, false)
  assert.equal(r.status, 503)
  assert.equal(authenticateDashboard('admin', 'LionElite9903'), null)
  if (ADMIN_EMAIL) process.env.ADMIN_EMAIL = ADMIN_EMAIL
  if (ADMIN_PASSWORD) process.env.ADMIN_PASSWORD = ADMIN_PASSWORD
})

test('reps cannot authenticate without REP_CREDENTIALS', () => {
  delete process.env.REP_CREDENTIALS
  assert.equal(authenticateDashboard('colin', 'anything'), null)
})

test('configured rep credentials authenticate and carry their code', () => {
  process.env.REP_CREDENTIALS = JSON.stringify({ colin: { name: 'Colin', code: 'COLIN10', password: 'test-secret' } })
  const auth = authenticateDashboard('Colin', 'test-secret')
  assert.equal(auth?.role, 'rep')
  assert.equal(auth?.code, 'COLIN10')
  assert.equal(authenticateDashboard('Colin', 'wrong'), null)
  delete process.env.REP_CREDENTIALS
})

// ── Primitives ─────────────────────────────────────────────────────────────

test('safeEqual compares correctly including length mismatches', () => {
  assert.equal(safeEqual('abc', 'abc'), true)
  assert.equal(safeEqual('abc', 'abd'), false)
  assert.equal(safeEqual('abc', 'abcd'), false)
  assert.equal(safeEqual('', ''), true)
})

test('tokens are long and non-repeating', () => {
  assert.ok(secureToken().length >= 32)
  assert.notEqual(secureToken(), secureToken())
})
