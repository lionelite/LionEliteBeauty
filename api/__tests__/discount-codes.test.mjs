import test from 'node:test'
import assert from 'node:assert/strict'
import { DISCOUNT_CODES } from '../../src/data/discountCodes.js'
import { priceOrder } from '../_pricing.js'

for (const [code, config] of Object.entries(DISCOUNT_CODES)) {
  test(`${code} is accepted by authoritative pricing`, () => {
    const result = priceOrder({
      items: [{ slug: 'ghk-cu-serum', quantity: 1 }],
      discountCode: code,
      discountApplied: true,
    })

    assert.equal(result.ok, true)
    assert.equal(result.code, code)
    assert.equal(result.rep, config.rep || null)
    assert.equal(result.discountCents, Math.round(6999 * (config.percent / 100)))
    assert.equal(result.totalCents, 6999 - result.discountCents)
  })
}

test('discount registry remains browser-safe and deterministic', () => {
  for (const [code, config] of Object.entries(DISCOUNT_CODES)) {
    assert.match(code, /^[A-Z0-9_-]+$/)
    assert.equal(Number.isFinite(config.percent), true)
    assert.equal(config.percent > 0 && config.percent < 100, true)
  }
})
