---
name: design-taste
description: Design references and quality bar for Lion Elite websites and UI. Use before designing, building, or reviewing any page, landing page, store, or component.
---

# Design Taste — Lion Elite

Before building any UI, pick 2–3 references below that match the job, open them (Playwright screenshot or Figma), and name what you are borrowing: layout, type scale, spacing rhythm, motion. Never copy logos, copy, or imagery — borrow principles.

## Reference library

**Premium body / shapewear / beauty (Lion Elite Beauty)**
- skims.com — product-first grids, neutral palette, nude-tone swatches, confident minimal copy
- rhodeskin.com — huge whitespace, one product per viewport, soft type
- aesop.com — editorial typography, restrained color, slow calm motion
- glossier.com — friendly, clean product cards, clear CTAs
- summerfridays.com — warm photography, simple shopping flow

**Clinical / science / trust (Lion Elite Wellness)**
- hims.com / forhers.com — clean clinical trust, clear benefit blocks
- function.health — data-forward, calm, credible
- oura.com — premium hardware feel, dark/light balance, spec sections
- eightsleep.com — dark premium, crisp product storytelling

**High-ticket coaching / personal brand**
- linear.app — sharp hierarchy, dark mode done right, subtle motion
- stripe.com — gradient polish, perfect spacing, dense but readable
- apple.com — one message per section, scroll-led storytelling
- vercel.com — monochrome, strong type, fast feel

**Galleries for fresh ideas:** godly.website, land-book.com, mobbin.com, siteinspire.com, awwwards.com

## The bar (check every page against this)

1. **Hierarchy:** one clear focal point per section; headline → proof → CTA.
2. **Type:** max 2 families; a real scale (e.g. 14/16/20/28/40/56); body 16–18px, line-height 1.5; headlines tight (1.05–1.2), slight negative tracking.
3. **Spacing:** 4/8px grid only; generous section padding (96–160px desktop); consistent gutters. When unsure, add space.
4. **Color:** neutral base + one accent; contrast ≥ 4.5:1 for text; no rainbow gradients.
5. **Imagery:** large, high-quality, consistent crop and lighting. No stock-photo clichés.
6. **Motion:** 150–300ms, ease-out, purposeful (enter, hover, press). Respect prefers-reduced-motion. Follow emil-design-eng for details.
7. **Mobile first:** thumb-reachable CTAs, sticky add-to-cart on product pages, no horizontal scroll.
8. **Copy:** simple, confident, benefit-led. Short headlines.
9. **Anti-slop:** no default purple gradients, no emoji bullets, no generic 3-icon feature rows, no centered-everything, no "Unlock your potential".

## Workflow

1. Pick references → state what you borrow.
2. If a Figma file is linked, pull it with the Figma MCP (get_design_context, get_variable_defs, get_screenshot) and treat it as the source of truth.
3. Build, using impeccable (`/impeccable shape` before, `/impeccable polish` and `audit` after) and emil-design-eng for motion and interaction.
4. Verify visually: run `node scripts/visual-qa.mjs <url>` (or Playwright MCP) at 375, 768, 1440px. Look at every screenshot. Fix, re-shoot, repeat until it passes the bar above.
5. Never publish or push customer-visible changes without the owner's approval.
