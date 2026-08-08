// Order-notification regression tests.
//
// Run: node --test api/__tests__/order-notification.test.mjs
//
// Orders were arriving with no owner email. Three separate defects caused it,
// and each one is locked in below. These are source assertions rather than
// live sends: the handlers construct a Resend client at import time, so
// exercising them for real would require an API key and would actually email.

import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')

const sendV2 = read('api/send-v2.js')
const orders = read('api/orders.js')
const checkout = read('src/pages/CheckoutPage.jsx')
const vercelJson = JSON.parse(read('vercel.json'))

// ── Defect 1: alerts went to an unmonitored mailbox ────────────────────────
// Both handlers defaulted to orders@lionelitebeauty.com. Sends "succeeded" and
// landed somewhere nobody reads, so the owner saw nothing.

test('owner notifications default to the inbox the owner actually reads', () => {
  for (const [name, source] of [['send-v2.js', sendV2], ['orders.js', orders]]) {
    assert.match(
      source,
      /process\.env\.ORDER_NOTIFICATION_EMAIL \|\| 'info@lionelitewellness\.com'/,
      `${name} must fall back to the monitored owner inbox`
    )
    assert.doesNotMatch(
      source,
      /\|\| 'orders@lionelitebeauty\.com'/,
      `${name} must not fall back to the unmonitored orders@ mailbox`
    )
  }
})

test('the recipient stays overridable by environment', () => {
  assert.match(sendV2, /process\.env\.ORDER_NOTIFICATION_EMAIL/)
  assert.match(orders, /process\.env\.ORDER_NOTIFICATION_EMAIL/)
})

// ── Defect 2: successful orders were never recorded ────────────────────────
// /api/orders create ran only in the else-branch of a failed /api/send, so a
// clean checkout stored nothing and the admin dashboard missed every good order.

test('checkout records the order before sending any email', () => {
  const createIndex = checkout.indexOf("action: 'create'")
  const sendIndex = checkout.indexOf("fetch('/api/send'")
  assert.notEqual(createIndex, -1, 'checkout must call /api/orders create')
  assert.notEqual(sendIndex, -1, 'checkout must call /api/send')
  assert.ok(
    createIndex < sendIndex,
    'the order record must be written before emails, matching the Wellness store'
  )
})

test('the order record is not conditional on the email succeeding', () => {
  // The old shape was `if (sendRes.ok) { ... } else { fetch('/api/orders' ...) }`.
  const beforeCreate = checkout.slice(0, checkout.indexOf("action: 'create'"))
  assert.doesNotMatch(
    beforeCreate.slice(-400),
    /else\s*\{/,
    'create must not sit in the else-branch of the send result'
  )
})

// ── Defect 3: duplicate owner emails once both paths ran ───────────────────

test('the owner copy is suppressed only when the order was already recorded', () => {
  assert.match(checkout, /skipAdmin: recorded/, 'checkout must tie skipAdmin to the record result')
  assert.match(sendV2, /b\.skipAdmin/, 'send-v2 must honour skipAdmin')
  // Fail-open: if recording failed, the owner must still be emailed.
  assert.match(checkout, /recorded = orderRes\.ok/)
})

test('send-v2 reuses the persisted order number instead of minting a second one', () => {
  assert.match(sendV2, /String\(b\.orderNumber \|\| ''\)\.trim\(\) \|\| orderNumber\(\)/)
})

// ── The rewrite that makes api/send.js inert ───────────────────────────────

test('/api/send is rewritten to send-v2, so send.js is not the live path', () => {
  const rewrite = vercelJson.rewrites.find((r) => r.source === '/api/send')
  assert.ok(rewrite, 'vercel.json must still declare the /api/send rewrite')
  assert.equal(rewrite.destination, '/api/send-v2')
})
