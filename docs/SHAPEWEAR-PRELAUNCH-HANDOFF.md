# Shapewear prelaunch page: owner inputs and launch switch

**Route:** `/shapewear` (new "Shapewear" tab in the main navigation, desktop and mobile)
**State:** prelaunch. Nothing can be ordered, no checkout or payment link exists, and the page is set to `noindex` so it stays out of search results until launch.
**Brief:** `docs/SHAPEWEAR-LAUNCH-BRIEF.md`, section 6.

## Files

| File | What it does |
| --- | --- |
| `src/pages/ShapewearPage.jsx` | The page: hero, photo placeholders, product detail with size selector, feature cards, size guide, shipping and returns, FAQ, contact. |
| `src/data/shapewearProduct.js` | Every product value in one place. Anything with `verified: false` or `null` shows a "Pending" badge or "To be confirmed" on the page. |
| `src/lib/shapewearAnalytics.js` | Analytics event map and a dispatcher that sends nothing to any third party. |
| `src/App.jsx` | Adds the `/shapewear` route. |
| `src/components/Navbar.jsx` | Adds the "Shapewear" tab. |
| `src/components/SEO.jsx` | Adds an optional `noindex` prop (default off, so every other page is unchanged). |

Coaching pages, theme, checkout code and redirects in `vercel.json` are untouched.

## Owner inputs still needed

Fill these in `src/data/shapewearProduct.js` and set the matching `verified` flag to `true` only once the value is confirmed.

| # | Input | Field | Currently shows |
| --- | --- | --- | --- |
| 1 | Final product name | `name` | "The Easy-Off Bodysuit" (placeholder, badged) |
| 2 | Final supplier and tested SKU | `supplier`, `sku` | Not shown |
| 3 | Final retail price | `price.value` | "Price to be announced" |
| 4 | Sizes actually offered | `sizes.options` | XS to 3XL placeholder list, badged |
| 5 | Size chart (waist and hips per size, measured on samples) | `sizeChart.rows` | Dashes, badged |
| 6 | In-between-size fit advice | page copy, size guide step 3 | "will be added once samples are wear-tested" |
| 7 | Colors offered | `colors.options` | "Colors to be announced" |
| 8 | Fabric composition | `fabric.value` | "To be confirmed" |
| 9 | Care instructions | `care.value` | "To be confirmed" |
| 10 | Verified comfort, fit/hold and closure claims | `features[]` (edit `body`, set `verified`) | Three feature cards, each badged |
| 11 | Exact gusset or closure construction | `features[easy-off]`, FAQ answer | Generic description, badged |
| 12 | Photos and video with commercial usage rights | `media[].src` | Four striped placeholders labelled "Replace with final asset" |
| 13 | Shipping origin, processing time, delivery estimate | `shipping` | "To be confirmed" |
| 14 | Return and exchange window and conditions | `returns` | "To be confirmed" |
| 15 | Support email and workflow | `contactEmail` | `info@lionelitebeauty.com` (same as the site footer) |
| 16 | Real inventory per size and color | not built yet, see below | Nothing claims stock |
| 17 | Checkout system (site Stripe, TikTok Shop, or other) | not built yet, see below | Button reads "Not available yet" |
| 18 | Which analytics tool to connect, if any | `shapewearAnalytics.js` listener | Nothing is sent |
| 19 | Policy text for shapewear on `/policies` | new policy section | Not linked yet |

`modelingPriceHypothesis: 34.99` is kept in the data file for reference only and is never rendered. It is the brief's modeling assumption, not a price.

## How to switch from prelaunch to purchasable

Do these in order, on a branch, and review before merging.

1. Complete every row above and set each `verified` flag to `true`.
2. Decide the checkout path. The site's product cart and `/checkout` currently redirect to coaching (`vercel.json` redirects and `App.jsx` routes), so shapewear needs either:
   - a new cart and Stripe checkout flow for physical goods (with shipping address, tax and an order email via the existing `orders@lionelitebeauty.com` sender), or
   - an outbound link to a TikTok Shop or other storefront listing.
3. Add per-size and per-color inventory, and disable any size or color that is out of stock in the selector.
4. Wire the "Add to bag" button to the chosen checkout and fire `add_to_cart`, `begin_checkout` and `purchase` from it (see event map below). The events are already defined; `activeInPrelaunch` in the map is documentation only.
5. Publish shapewear shipping, returns and terms on the policies pages and link them from the shipping and returns cards.
6. Change `status` to `SHAPEWEAR_STATUS.PURCHASABLE`. This enables the button, removes the "Coming soon" banner and availability notice, and lets search engines index the page.
7. Add `/shapewear` to `public/sitemap.xml`.

## Analytics event map

No tracker is installed. `trackShapewearEvent(name, params)` dispatches a browser event named `lionelite:analytics` with `{ event, params, ts }`. A tracker you approve later can listen in one place:

```js
window.addEventListener('lionelite:analytics', (e) => {
  // e.detail.event, e.detail.params
})
```

| Event | Fires when | Live now | Params |
| --- | --- | --- | --- |
| `view_item` | Page loads | Yes | `item_id`, `item_name`, `item_category`, `status` |
| `select_size` | Shopper picks a size | Yes | `item_id`, `size`, `status` |
| `add_to_cart` | Shopper adds to cart | No, until purchasable | `item_id`, `item_name`, `size`, `color`, `price`, `currency`, `quantity` |
| `begin_checkout` | Checkout starts | No, until purchasable | `item_id`, `value`, `currency`, `quantity` |
| `purchase` | Order confirmed | No, until purchasable | `transaction_id`, `item_id`, `value`, `currency`, `quantity` |

Payloads hold product data only, never names, emails, addresses or body measurements.

## Copy rules kept on the page

- Every unverified feature is described as "designed to" and badged "Pending product validation".
- No reviews, ratings, stock counts, countdowns, scarcity language or before/after claims.
- No health or compression claims.
- No delivery promise until the fulfillment path is confirmed.
