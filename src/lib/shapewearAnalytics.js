// Analytics-ready event map for the shapewear product page.
//
// No third-party tracker is loaded here and nothing is sent anywhere.
// `trackShapewearEvent` only dispatches a browser CustomEvent named
// 'lionelite:analytics' on `window`, so a tracker the owner approves later
// (for example a Meta or TikTok pixel, or GA4) can listen for it in one place.
//
// Payloads carry product data only: never names, emails, addresses, body
// measurements or any other personal data.

export const SHAPEWEAR_ANALYTICS_EVENT = 'lionelite:analytics'

export const shapewearEventMap = {
  view_item: {
    firesWhen: 'The shapewear product page loads.',
    activeInPrelaunch: true,
    params: ['item_id', 'item_name', 'item_category', 'status'],
  },
  select_size: {
    firesWhen: 'A shopper picks a size in the size selector.',
    activeInPrelaunch: true,
    params: ['item_id', 'size', 'status'],
  },
  add_to_cart: {
    firesWhen: 'A shopper adds the bodysuit to the cart. Disabled until purchasable.',
    activeInPrelaunch: false,
    params: ['item_id', 'item_name', 'size', 'color', 'price', 'currency', 'quantity'],
  },
  begin_checkout: {
    firesWhen: 'A shopper starts checkout with the bodysuit in the cart. Disabled until purchasable.',
    activeInPrelaunch: false,
    params: ['item_id', 'value', 'currency', 'quantity'],
  },
  purchase: {
    firesWhen: 'An order containing the bodysuit is confirmed. Disabled until purchasable.',
    activeInPrelaunch: false,
    params: ['transaction_id', 'item_id', 'value', 'currency', 'quantity'],
  },
}

export function trackShapewearEvent(name, params = {}) {
  if (!shapewearEventMap[name]) {
    if (import.meta.env?.DEV) console.warn(`Unknown shapewear analytics event: ${name}`)
    return
  }
  if (typeof window === 'undefined') return
  const detail = { event: name, params, ts: Date.now() }
  window.dispatchEvent(new CustomEvent(SHAPEWEAR_ANALYTICS_EVENT, { detail }))
  if (import.meta.env?.DEV) console.debug('[analytics]', name, params)
}
