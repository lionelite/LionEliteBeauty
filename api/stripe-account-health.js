import { getStripe } from './_stripe-order.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const publishableConfigured = Boolean(process.env.VITE_WELLNESS_STRIPE_PUBLISHABLE_KEY)
  const secretConfigured = Boolean(process.env.WELLNESS_STRIPE_SECRET_KEY)

  if (!secretConfigured) {
    return res.status(503).json({
      configured: false,
      provider: 'stripe',
      accountPurpose: 'lion_elite_wellness_shared',
      publishableConfigured,
      secretConfigured,
    })
  }

  try {
    const stripe = getStripe()
    const account = await stripe.accounts.retrieve()
    return res.status(200).json({
      configured: true,
      provider: 'stripe',
      accountPurpose: 'lion_elite_wellness_shared',
      accountId: account.id,
      businessName: account.business_profile?.name || account.settings?.dashboard?.display_name || null,
      chargesEnabled: Boolean(account.charges_enabled),
      payoutsEnabled: Boolean(account.payouts_enabled),
      publishableConfigured,
      secretConfigured,
    })
  } catch (error) {
    console.error('Stripe account health failed:', error)
    return res.status(503).json({
      configured: false,
      provider: 'stripe',
      accountPurpose: 'lion_elite_wellness_shared',
      publishableConfigured,
      secretConfigured,
      error: 'Stripe account could not be verified',
    })
  }
}
