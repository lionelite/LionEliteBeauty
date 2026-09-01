import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { DISCOUNT_CODES } from './src/data/discountCodes.js'

// Checkout source transformer keeps the existing checkout page small while
// making every configured discount code work automatically. Add a future code
// once in src/data/discountCodes.js and checkout links/manual entry pick it up.
function affiliateCheckoutPlugin() {
  const validCodes = Object.keys(DISCOUNT_CODES).map(code => code.toLowerCase())
  const validCodesSource = JSON.stringify(validCodes)

  return {
    name: 'lion-elite-beauty-affiliate-checkout',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('/src/pages/CheckoutPage.jsx') && !id.endsWith('\\src\\pages\\CheckoutPage.jsx')) return null

      let next = code

      next = next.replace(
        "useEffect(() => { window.scrollTo(0, 0) }, [])",
        `useEffect(() => {\n    window.scrollTo(0, 0)\n    const promo = new URLSearchParams(window.location.search).get('discount')\n    if (promo && ${validCodesSource}.includes(promo.trim().toLowerCase())) {\n      setDiscountCode(promo.trim().toUpperCase())\n      setDiscountApplied(true)\n    }\n  }, [])`
      )

      next = next.replace(
        "if (discountCode.trim().toLowerCase() === 'lion10') {",
        `if (${validCodesSource}.includes(discountCode.trim().toLowerCase())) {`
      )

      next = next.replace(
        'body: JSON.stringify({ items, discountApplied }),',
        'body: JSON.stringify({ items, discountApplied, discountCode }),'
      )

      return next === code ? null : { code: next, map: null }
    },
  }
}

export default defineConfig({
  plugins: [affiliateCheckoutPlugin(), react(), tailwindcss()],
})
