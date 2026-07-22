import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Checkout source transformer keeps affiliate-code support centralized without
// duplicating the large checkout page. It enables both the house code and
// rep codes, passes the applied code to Stripe, and supports share links such
// as /checkout?discount=COLIN10.
function affiliateCheckoutPlugin() {
  return {
    name: 'lion-elite-beauty-affiliate-checkout',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('/src/pages/CheckoutPage.jsx') && !id.endsWith('\\src\\pages\\CheckoutPage.jsx')) return null

      let next = code

      next = next.replace(
        "useEffect(() => { window.scrollTo(0, 0) }, [])",
        `useEffect(() => {\n    window.scrollTo(0, 0)\n    const promo = new URLSearchParams(window.location.search).get('discount')\n    if (promo && ['lion10', 'colin10'].includes(promo.trim().toLowerCase())) {\n      setDiscountCode(promo.trim().toUpperCase())\n      setDiscountApplied(true)\n    }\n  }, [])`
      )

      next = next.replace(
        "if (discountCode.trim().toLowerCase() === 'lion10') {",
        "if (['lion10', 'colin10'].includes(discountCode.trim().toLowerCase())) {"
      )

      next = next.replace(
        'body: JSON.stringify({ items, discountApplied }),',
        'body: JSON.stringify({ items, discountApplied, discountCode }),'
      )

      return next === code ? null : { code: next, map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [affiliateCheckoutPlugin(), react(), tailwindcss()],
})