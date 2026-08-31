// Authoritative server-side pricing.
//
// SECURITY: order totals must never be derived from values supplied by the
// browser. Every price is resolved here from the product catalog by product
// identifier; the request body is treated as untrusted and is used only to
// choose WHICH product and HOW MANY.

import { skincareProducts } from '../src/data/skincareProducts.js'

// Discount codes and their percentage. Server-side only.
export const DISCOUNT_CODES = {
  LION10: { percent: 10, rep: null },
  COLIN10: { percent: 10, rep: 'Colin' },
  DAYLEN10: { percent: 10, rep: 'Daylen' },
}

// Coaching program tiers (authoritative amounts, in cents).
export const PROGRAM_TIERS = {
  foundation: { cents: 29999, label: 'Foundation Coaching' },
  vip: { cents: 240000, label: 'VIP Transformation Program' },
}

const MAX_QTY_PER_LINE = 25

function catalogEntry(item) {
  const slug = String(item?.slug || '').trim().toLowerCase()
  if (slug) {
    const bySlug = skincareProducts.find(p => p.slug.toLowerCase() === slug)
    if (bySlug) return bySlug
  }
  // Older checkout builds send only the display name.
  const name = String(item?.name || '').trim().toLowerCase()
  if (!name) return null
  return skincareProducts.find(
    p => p.name.toLowerCase() === name || p.shortName?.toLowerCase() === name
  ) || null
}

function safeQuantity(raw) {
  const n = Number(raw)
  if (!Number.isFinite(n)) return null
  const q = Math.floor(n)
  if (q < 1 || q > MAX_QTY_PER_LINE) return null
  return q
}

/**
 * Resolve untrusted request items against the catalog.
 * Returns { ok:true, lines, subtotalCents } or { ok:false, error }.
 * `lines` carry SERVER prices — never the client's.
 */
export function resolveLineItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: 'No items in order' }
  }
  if (items.length > 50) {
    return { ok: false, error: 'Too many line items' }
  }

  const lines = []
  let subtotalCents = 0

  for (const item of items) {
    const product = catalogEntry(item)
    if (!product) {
      return { ok: false, error: `Unknown product: ${String(item?.name || item?.slug || 'unnamed').slice(0, 60)}` }
    }
    const quantity = safeQuantity(item?.quantity)
    if (quantity === null) {
      return { ok: false, error: `Invalid quantity for ${product.name}` }
    }
    const unitCents = Math.round(Number(product.priceNum) * 100)
    if (!Number.isFinite(unitCents) || unitCents <= 0) {
      return { ok: false, error: `Catalog price unavailable for ${product.name}` }
    }
    subtotalCents += unitCents * quantity
    lines.push({
      slug: product.slug,
      name: product.name,
      quantity,
      unitCents,
      lineCents: unitCents * quantity,
      price: Number(product.priceNum), // server value, for records/emails
    })
  }

  return { ok: true, lines, subtotalCents }
}

/** Normalize a discount code and return its server-side definition (or null). */
export function resolveDiscount(discountCode, discountApplied) {
  const normalized = String(discountCode || (discountApplied ? 'LION10' : ''))
    .trim()
    .toUpperCase()
  if (!normalized) return { code: null, discount: null }
  const discount = DISCOUNT_CODES[normalized] || null
  return { code: discount ? normalized : normalized, discount }
}

/**
 * Full server-side total. Returns { ok, subtotalCents, discountCents,
 * totalCents, lines, code, rep } or { ok:false, error }.
 */
export function priceOrder({ items, discountCode, discountApplied }) {
  const resolved = resolveLineItems(items)
  if (!resolved.ok) return resolved

  const { code, discount } = resolveDiscount(discountCode, discountApplied)
  if (discountApplied && !discount) {
    return { ok: false, error: 'Invalid discount code' }
  }

  const discountCents = discount
    ? Math.round(resolved.subtotalCents * (discount.percent / 100))
    : 0
  const totalCents = resolved.subtotalCents - discountCents

  return {
    ok: true,
    lines: resolved.lines,
    subtotalCents: resolved.subtotalCents,
    discountCents,
    totalCents,
    code: discount ? code : null,
    rep: discount?.rep || null,
  }
}
