# Lion Elite Beauty → Lion Elite Wellness Stripe migration

Lion Elite Beauty now uses the Lion Elite Wellness Stripe account through dedicated environment variables.

## Required production variables

- `WELLNESS_STRIPE_SECRET_KEY` — Wellness Stripe secret key
- `VITE_WELLNESS_STRIPE_PUBLISHABLE_KEY` — matching Wellness Stripe publishable key
- `WELLNESS_STRIPE_WEBHOOK_SECRET` — optional explicit webhook secret. If omitted, Beauty provisions and stores its own webhook signing secret in Redis.
- `SITE_URL=https://lionelitebeauty.com`

Do not reuse the old Beauty Stripe account keys.

## Account migration behavior

On the first checkout after the Wellness key is installed:

1. Beauty calls Stripe and reads the active Stripe account ID.
2. If that account differs from the account associated with the cached Beauty webhook, the old cached webhook signing secret is discarded.
3. Beauty creates a fresh webhook endpoint under the currently active Wellness Stripe account for:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - payment_intent.canceled
4. The new webhook signing secret and Stripe account ID are stored in Redis.

This prevents a stale webhook secret from the inaccessible Beauty Stripe account from breaking paid-order fulfillment.

## Verification

After deploying the environment values, request:

`GET /api/stripe-account-health`

Expected:
- configured: true
- accountPurpose: lion_elite_wellness_shared
- accountId: the Wellness Stripe account ID
- chargesEnabled: true

Then run one Stripe test-mode checkout and confirm:
- the PaymentIntent appears in the Wellness Stripe dashboard
- the Beauty order is recorded
- the owner notification arrives
- the customer confirmation arrives
