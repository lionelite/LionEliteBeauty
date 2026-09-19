// Functional tests for the new-order path.
//
// Run: node --test api/__tests__/order-notification.live.test.mjs
//
// These drive the real api/orders.js handler rather than asserting on source
// text. Two things make that safe and hermetic:
//
//   * No Redis env vars are set, so orders.js falls back to its in-memory store.
//   * globalThis.fetch is stubbed, so the Resend SDK's HTTP call is captured
//     instead of performed. No email is ever actually sent.
//
// RESEND_API_KEY is set to a dummy value purely so the handler does not take its
// "email not configured" early return; the stub means the value is never used
// against a real endpoint.

import test from 'node:test'
import assert from 'node:assert/strict'

process.env.RESEND_API_KEY = 'test-key-not-a-real-credential'
delete process.env.KV_URL
delete process.env.REDIS_URL
delete process.env.UPSTASH_REDIS_REST_URL
delete process.env.ORDER_NOTIFICATION_EMAIL
delete process.env.STRIPE_SECRET_KEY

const { default: handler } = await import('../orders.js')

/** Captures outbound Resend calls; set `failNext` to simulate a provider outage. */
function stubTransport({ fail = false } = {}) {
  const sent = []
  globalThis.fetch = async (url, options = {}) => {
    const target = typeof url === 'string' ? url : url?.url || String(url)
    if (!target.includes('resend')) throw new Error(`unexpected outbound call: ${target}`)
    if (fail) throw new Error('simulated Resend outage')
    const rawBody = options.body || (url && typeof url.text === 'function' ? await url.clone().text() : '{}')
    sent.push(JSON.parse(rawBody || '{}'))
    return new Response(JSON.stringify({ id: 'msg_test' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }
  return sent
}

function mockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this },
    json(payload) { this.body = payload; return this },
  }
}

const orderBody = (orderNumber) => ({
  action: 'create',
  orderNumber,
  name: 'Test Customer',
  email: 'customer@example.com',
  phone: '555-0100',
  address: '1 Test Street',
  paymentMethod: 'zelle',
  items: [{ slug: 'ghk-cu-serum', name: 'GHK-Cu Intensive Serum', quantity: 1, priceNum: 69.99 }],
})

test('a new order is recorded and the owner is emailed', async () => {
  const sent = stubTransport()
  const res = mockRes()

  await handler({ method: 'POST', body: orderBody('LEB-TEST-0001') }, res)

  assert.equal(res.statusCode, 200)
  assert.equal(res.body.success, true)
  assert.equal(res.body.order.orderNumber, 'LEB-TEST-0001')
  // Server-side pricing, not the client's number.
  assert.equal(res.body.order.total, 69.99)

  assert.equal(sent.length, 1, 'exactly one owner notification should go out')
  const email = sent[0]
  assert.deepEqual(
    email.to,
    ['info@lionelitewellness.com', 'orders@lionelitebeauty.com', 'info@lionelitebeauty.com'],
    'must reach the monitored Gmail destination and both Beauty inboxes'
  )
  assert.match(email.subject, /LEB-TEST-0001/)
  assert.match(email.subject, /69\.99/)
  assert.match(email.html, /NEW ORDER/i)
})

test('replaying the same order number does not double-record or double-email', async () => {
  const sent = stubTransport()

  const first = mockRes()
  await handler({ method: 'POST', body: orderBody('LEB-TEST-0003') }, first)
  assert.equal(first.statusCode, 200)
  assert.ok(!first.body.duplicate)

  const second = mockRes()
  await handler({ method: 'POST', body: orderBody('LEB-TEST-0003') }, second)
  assert.equal(second.statusCode, 200)
  assert.equal(second.body.duplicate, true, 'a replay must be reported as a duplicate')

  assert.equal(sent.length, 1, 'a retried checkout must not email the owner twice')
})

test('a notification failure never fails the customer checkout', async () => {
  // The whole point of the try/catch: the customer paid, the order must stand.
  stubTransport({ fail: true })
  const res = mockRes()

  await handler({ method: 'POST', body: orderBody('LEB-TEST-0004') }, res)

  assert.equal(res.statusCode, 200, 'checkout must still succeed when email is down')
  assert.equal(res.body.success, true)
  assert.equal(res.body.order.orderNumber, 'LEB-TEST-0004')
})

test('the order survives a failed notification and a replay retries the owner alert', async () => {
  // LEB-TEST-0004 was stored during the outage above; it must already exist,
  // while its notification remains eligible for recovery.
  const sent = stubTransport()
  const res = mockRes()

  await handler({ method: 'POST', body: orderBody('LEB-TEST-0004') }, res)

  assert.equal(res.body.duplicate, true, 'the order was persisted even though the email failed')
  assert.equal(res.body.notificationRetried, true)
  assert.equal(res.body.ownerNotificationSent, true)
  assert.equal(sent.length, 1, 'a silent order must retry its owner notification')
})

test('an unknown product is rejected before anything is recorded or emailed', async () => {
  const sent = stubTransport()
  const res = mockRes()

  await handler(
    {
      method: 'POST',
      body: { ...orderBody('LEB-TEST-0005'), items: [{ slug: 'not-a-product', quantity: 1, priceNum: 0.5 }] },
    },
    res
  )

  assert.equal(res.statusCode, 400)
  assert.equal(sent.length, 0)
})
