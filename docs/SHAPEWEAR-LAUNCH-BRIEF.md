# Lion Elite Beauty Shapewear Launch Brief

**Status:** Build brief for Claude; no product has been purchased or validated yet.  
**Prepared:** November 25, 2026  
**Owner:** Lion Elite Beauty  
**Purpose:** Turn the shapewear research and decisions into a concrete first product test and a website/creative build.

## 1. Direction

Build the first test around one hero product: an **easy-off, tummy-control bodysuit** for everyday outfit styling.

The reason to test this angle is the practical benefit, not generic “snatched” language:

- Comfortable enough for extended wear (must be proven on samples).
- Secure fit that does not roll or shift (must be tested on several body types).
- Bathroom-friendly gusset or closure (confirm exact construction with the supplier).
- Clear, honest size guidance and fit notes.
- Show how it works under real outfits.

Treat the product as a **candidate to validate**, not a proven winner. The market is crowded. Do not place a bulk order or claim performance before samples and landed costs are confirmed.

## 2. Market and competitor signals

These signals justify a low-cost test; they do not prove Lion Elite Beauty will reproduce another seller’s results.

- Third-party TikTok Shop tracking reported KKPeople’s easy-off tummy-control bodysuit as a top U.S. women’s clothing seller for Oct. 21–30, 2026, with 29,223 tracked units over nine days. This is a time-limited third-party estimate, not audited platform data.
- TikTok’s Cali Curves Fajas case study reports 1,000+ purchases, $50K GMV and 4.4 ROAS after $8,500 in spend for a Black Friday Live Shopping campaign. That brand had an established TikTok community (reported 600K+ followers), so this is not a reasonable new-store forecast.
- Brands and ad accounts worth reviewing for positioning/creative patterns: SKIMS, Shapermint, Honeylove, Popilush, Feelingirl, HeyShape, By Bella, and Cali Curves. Review current ads in Meta Ad Library and TikTok Shop/TikTok Creative Center before production. Record the date, hook, offer, body/fit demonstration, CTA, and landing-page angle; do not copy creative or branding.

## 3. Product and supplier validation

Before choosing a supplier, request samples and verify:

1. Fabric composition, stretch/recovery, opacity, seams, gusset construction, wash instructions, and color consistency.
2. Size chart measurements laid flat and recommended body measurements; measure samples across sizes.
3. Fit on multiple body shapes and heights; check rolling, digging, sheerness, straps, crotch/gusset function, and ease of removal.
4. Actual sample cost, unit cost by quantity, shipping, packaging, production lead time, tracking, defect/remake terms, and return address.
5. Whether supplier photos/videos may be used in commercial ads and whether any logo/brand claims are authorized.
6. Fulfillment method, realistic delivery estimate, return/exchange policy, and customer support workflow.

Supplier marketplace listing prices are discovery leads only. They are not validated landed costs or quality evidence. Do not publish an exact delivery claim until the fulfillment path is confirmed.

## 4. Offer and unit economics

Use a provisional **$34.99 single-unit selling-price hypothesis** for modeling only. Final price and promotions require supplier quotes, shipping cost, and customer testing.

Illustrative TikTok Shop calculation:

| Item | Assumption |
| --- | ---: |
| Selling price | $34.99 |
| Product + fulfillment, assumed landed | $8.00 |
| TikTok Shop women's special clothing referral fee (6%) | $2.10 |
| Creator commission (assumed 15%) | $5.25 |
| Contribution before ads, returns, discounts, tax, and other costs | $19.64 |
| Simplified break-even gross ROAS before omitted costs | 1.78x |

Formula: selling price ÷ contribution before ads = simplified break-even ROAS. With the assumptions above, $34.99 ÷ $19.64 = 1.78x. This is only a starting model. Replace every assumption with actual product, shipping, platform, creator, return/refund, discount, and payment costs before spending.

Use **2.5x+ actual gross ROAS as an initial scale-review threshold**, not a promise of profitability. Also track net contribution after refunds, discounts, shipping subsidies, creator commissions, and ad costs. A high ROAS on a tiny sample is not sufficient evidence to scale.

TikTok's current U.S. category schedule lists Women's Special Clothing at a 6% referral rate. Confirm the rate and any other seller fees in Seller Center immediately before launch.

## 5. Creative and channel plan

### TikTok / Reels organic and paid concepts

Produce several vertical 9:16 videos with clear on-screen captions and sound-off comprehension. Film with permission, in real use, with inclusive model sizing. Do not use body-shaming, fake before/after body transformation, or unsupported compression/health claims.

1. **“Bathroom break test”** — demonstrate the actual gusset/closure and how it works; only use if the sampled product genuinely supports the demonstration.
2. **“One bodysuit, three outfits”** — show the full outfit before and after layering; focus on styling and fit.
3. **“Sit, walk, reach”** — ordinary movement test showing whether the garment shifts or rolls. Report only what the recorded wear test demonstrates.
4. **“Size and fit notes”** — model height, usual size, selected product size, and honest fit feedback.
5. **“Comment reply / live try-on”** — answer questions about sizing, fabric, closures, and shipping. Do not state that a feature works until verified on sample.

Opening-hook drafts:
- “Shapewear should be easy to take off. Let’s test this closure.”
- “Three outfits, one base layer. Here’s how it fits under each.”
- “I wore this through a full day. Here’s what stayed put—and what didn’t.”

### Meta / Instagram

- Use full-body outfit demonstrations and clear product context. Avoid tight crops centered on body parts.
- Test creator-style demonstrations, a carousel explaining fit/features, and outfit-styling variations.
- Keep claims factual and the landing page consistent with the ad.

### TikTok Shop / creators

- If eligible and operationally ready, seed a small number of samples to relevant creators and disclose paid/gifted relationships.
- Start with modest creator commissions and track creator-attributed orders and net contribution.
- Live selling can be tested after sizing, inventory, shipping, and Q&A are ready. The Cali Curves results are an established-brand case study, not a forecast for this store.

## 6. Website build brief for Claude

Work in the existing LionEliteBeauty Vite/React application. First inspect current routes, design system, product/checkout architecture, policies, and existing coaching content. Do not replace unrelated coaching pages or deploy changes to production as part of this initial build.

Implement a **shapewear launch landing/product experience** that can be reviewed before any real product is stocked:

- A polished mobile-first hero section with product name placeholder, concise value proposition, primary CTA, and product photography placeholders that are clearly marked for replacement.
- Feature sections for comfort, fit/hold, and bathroom-friendly design, but keep all unverified attributes editable and visibly marked as pending product validation.
- Size/fit guide, measurement instructions, shipping and returns sections, FAQ, and contact/help path.
- Product card/product-detail page structure with size and color selection only if supported by the current app architecture; never imply an option is in stock when it is not.
- Clear unavailable/prelaunch state until owner supplies supplier, SKU, price, inventory, photos, shipping, and return details. Do not create a fake checkout, payment link, fabricated reviews, fake scarcity, or real stock claim.
- Accessible labels, keyboard operation, responsive layout, semantic headings, image alt text, and appropriate page metadata.
- Brand styling should remain within the current Lion Elite Beauty identity; inspect existing theme before changing it.
- Add an analytics-ready event map for view_item, select_size, add_to_cart, begin_checkout, and purchase, but don't add third-party trackers or collect sensitive data without confirmation.
- Document every owner-supplied value still needed and how to switch from prelaunch to purchasable state.

### Suggested implementation sequence

1. Audit existing routes, components, checkout, tracking, policies, and deployment triggers.
2. Build the landing page with explicit pending-data states and local placeholders.
3. Add product/size UI and accessibility states without enabling payment or asserting inventory.
4. Capture a preview and report files changed, open owner inputs, and any behavior that needs approval.
5. Keep work on a feature branch and request review before merge/deployment.

## 7. Initial test plan

1. Source 2–3 samples across the candidate style/size range.
2. Complete product/fit/quality and delivery checks before taking paid orders.
3. Capture 6–10 short creative variations from the sample; test hooks and demos before expanding spend.
4. Start small, use platform conversion tracking where configured, and evaluate after enough purchases to avoid reacting to one-off results.
5. Track: product-page sessions, size-guide use, add-to-cart, checkout completion, purchases, average order value, return/refund rate, delivery time, creator commission, customer feedback, and net contribution after ads.
6. Pause or revise if fit issues, unclear sizing, shipping delays, or negative feedback outweigh conversion results.

## 8. Owner inputs needed before checkout goes live

- Final supplier and tested product/SKU.
- Product photography/video rights and final assets.
- Final retail price, costs, available sizes/colors, and real inventory.
- Shipping origin, processing time, delivery estimates, return/exchange rules.
- Verified feature claims, fabric composition, and care details.
- Support/contact workflow and approved policies.
- Confirmation of payment/checkout system and whether TikTok Shop is available to the business.
- Approved paid-media budget and creator commission.

## 9. Source links

- TikTok Shop U.S. category referral rates: https://seller-us.tiktok.com/university/essay?knowledge_id=5988482086864682
- TikTok for Business, Cali Curves Fajas case study: https://ads.tiktok.com/business/en-US/inspiration/cali-curves-fajas-live-shopping-ads
- Third-party TikTok Shop category/product tracking (reported Oct. 21–30, 2026): https://deviantly.ai/reports/best-selling-womens-clothing-tiktok-shop-us-oct-21-30-2026
- TikTok Shop shapewear product results: https://shop.tiktok.com/us/k/shapewear-tiktok-viral
- Alibaba shapewear listing discovery page (verify suppliers independently): https://apparel.alibaba.com/product/seamless-tummy-control-shapewear-bodysuit-women
- Meta Ad Library: https://www.facebook.com/ads/library/
- TikTok Ads policy: https://ads.tiktok.com/resources/help/article/tiktok-ads-policy-other-products-and-services
- Meta advertising standards overview: https://www.facebook.com/business/learn/lessons/advertising-standards-best-practices
