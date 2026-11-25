# Lion Elite Beauty Coaching Transformation Rollout

## Business objective

Reposition the public website at `lionelitebeauty.com` as a client-acquisition funnel centered on **real client transformations and coaching programs**.

The primary goal is to generate more qualified coaching applications. Lion Elite Beauty should no longer present itself as a skincare storefront. Physical beauty and wellness products belong on **Lion Elite Wellness**.

## Scope boundary

- This rollout applies only to the public website in this repository.
- **Do not modify the separate Base44 coaching app.**
- Keep a clear **Client Login** link to the coaching app.
- Implement on this feature branch and submit the finished work through a PR.
- Do not deploy directly to production without owner review.

## New positioning

Primary message:

> **Real Coaching. Real Accountability. Real Transformations.**

Supporting message:

> Personalized transformation coaching built around your goals, lifestyle, and starting point—with a real coach guiding every step.

The site should feel like a premium transformation brand: bold, clean, human, aspirational, and proof-driven. Use black, white, warm neutrals, strong typography, and transformation-led photography. Reduce clinical and product-heavy language.

## Primary conversion goal

Use one dominant CTA throughout the site:

**Apply for Coaching**

Secondary CTA:

**View Transformations**

Utility CTA:

**Client Login**

Avoid competing shopping calls to action.

## Navigation

- Home
- Transformations
- Coaching
- How It Works
- About
- Apply
- Client Login

Include a visually secondary outbound link to Lion Elite Wellness for products.

## Homepage structure

1. Transformation-focused hero
2. Featured before-and-after transformation
3. Transformation gallery and client success stories
4. Outcomes clients can pursue
5. How Lion Elite coaching works
6. Coaching program comparison
7. Coach and brand story
8. Testimonials
9. Application CTA
10. Footer with Client Login and Lion Elite Wellness link

## Homepage hero

Headline:

**Real Coaching. Real Accountability. Real Transformations.**

Supporting copy:

**Personalized transformation coaching built around your goals, lifestyle, and starting point—with a real coach guiding every step.**

Primary CTA: **Apply for Coaching**

Secondary CTA: **See Client Transformations**

## Coaching offer architecture

Simplify the current six overlapping optimization offers into two easy-to-understand paths.

### Elite Transformation Coaching

Personalized training, nutrition, supplementation education, accountability, progress tracking, and coach support.

### VIP Transformation Coaching

Everything in Elite plus deeper personalization, more frequent calls, priority support, and advanced optimization guidance.

Only use prices and deliverables that are verified in existing approved content. Do not invent pricing or inclusions. Preserve the current application behavior and preselect the chosen program where appropriate.

## Transformation proof

- Make real client transformations the strongest visual element.
- Use only verified client photos, names, timelines, metrics, and quotes that are approved and available.
- Never fabricate results, testimonials, measurements, or timeframes.
- Use clear Before and After labels with concise client stories.
- Add accessible alt text.
- If verified coaching transformations are unavailable, build the reusable component/data structure but do not publish fake placeholder results. List missing assets in the PR.

## Skincare and product migration

Remove skincare and product shopping from the primary navigation, homepage, main footer columns, and conversion path.

Do **not** destructively delete Stripe, order, product, or API code in this phase. Preserve commerce implementation until the migration to Lion Elite Wellness is verified.

For current product routes:

- Show a migration message and outbound link to `https://lionelitewellness.com`, or redirect only when an exact destination is verified.
- Do not guess individual destination URLs.
- Remove Bag/cart from the main navigation.
- Remove skincare-first homepage metadata.

## Conversion requirements

- Repeat **Apply for Coaching** after major proof and offer sections.
- Keep forms short and mobile-friendly.
- Maintain existing application submission behavior.
- Provide clear success and error states.
- Make mobile CTAs easy to tap.
- Avoid large walls of text.
- Pass program selection into the application form.
- Preserve existing lead-delivery integrations unless a required change is documented.

## SEO and content

Update titles, descriptions, headings, Open Graph content, structured content, and footer language around:

- personalized transformation coaching
- body transformation coaching
- fitness and lifestyle coaching
- accountability coaching
- client transformations

Remove skincare-first metadata from the homepage.

## Technical acceptance criteria

- Follow the existing React/Vite architecture.
- Responsive on mobile, tablet, and desktop.
- No broken internal links.
- Existing application form remains functional.
- Existing Client Login destination remains functional.
- Commerce code remains preserved but removed from the primary funnel.
- No fabricated transformation content.
- `npm run build`, `npm run lint`, and `npm test` pass, or pre-existing failures are documented.
- PR includes screenshots of the updated desktop and mobile homepage.
- PR summary identifies any content still needed from the owner.

## Content to request if absent

Flag these in the PR instead of inventing them:

- approved coaching before-and-after images
- permission to publish client names and photos
- verified timelines and measurable outcomes
- approved client quotes
- coach bio and headshot
- final Elite and VIP prices and inclusions
- exact Client Login URL if it is not already configured

## Final deliverable

Create a focused implementation PR that makes Lion Elite Beauty feel like a results-led coaching company and guides every qualified visitor toward applying for coaching.
