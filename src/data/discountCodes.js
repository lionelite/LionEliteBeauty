// Single source of truth for Lion Elite Beauty discount codes.
// Add future codes here once and the cart, checkout, and server pricing all pick them up.
export const DISCOUNT_CODES = {
  LION10: { percent: 10, rep: null },
  COLIN10: { percent: 10, rep: 'Colin' },
  DAYLEN10: { percent: 10, rep: 'Daylen' },
}

export function normalizeDiscountCode(value) {
  return String(value || '').trim().toUpperCase()
}

export function getDiscount(code) {
  return DISCOUNT_CODES[normalizeDiscountCode(code)] || null
}

export function isValidDiscountCode(code) {
  return Boolean(getDiscount(code))
}
