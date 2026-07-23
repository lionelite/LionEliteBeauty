import { useEffect } from 'react'

const ACTIVE_CODE_KEY = 'leb_active_discount_code'

function setReactInputValue(input, value) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  )?.set

  if (setter) setter.call(input, value)
  else input.value = value

  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

export default function ColinDiscountBridge() {
  useEffect(() => {
    let appliedForVisit = false

    const syncColinDiscount = () => {
      const onCheckout = window.location.pathname === '/checkout'
      if (!onCheckout) {
        appliedForVisit = false
        return
      }

      const inputs = Array.from(document.querySelectorAll('input[placeholder="Enter code"]'))
      const input = inputs.find(el => !el.disabled)

      const params = new URLSearchParams(window.location.search)
      const requestedCode = (params.get('discount') || '').trim().toUpperCase()
      const savedCode = (sessionStorage.getItem(ACTIVE_CODE_KEY) || '').trim().toUpperCase()
      const typedCode = (input?.value || '').trim().toUpperCase()
      const activeCode = requestedCode || savedCode || typedCode

      if (activeCode !== 'COLIN10' || appliedForVisit || !input) return

      sessionStorage.setItem(ACTIVE_CODE_KEY, 'COLIN10')

      // Checkout's existing 10% UI branch recognizes LION10. Translate COLIN10
      // into that branch for calculation, then translate the payment request back
      // to COLIN10 below so Stripe keeps Colin attribution.
      setReactInputValue(input, 'lion10')

      const button = input.parentElement?.querySelector('button')
      if (button && !button.disabled) {
        // Give React one tick to receive the translated input value before Apply.
        window.setTimeout(() => {
          button.click()
          appliedForVisit = true
          requestAnimationFrame(() => {
            input.value = 'COLIN10'
          })
        }, 0)
      }
    }

    // Keep this alive for React Router client-side navigation from /cart to
    // /checkout and for customers manually typing COLIN10 into the code field.
    const timer = window.setInterval(syncColinDiscount, 150)
    syncColinDiscount()

    const originalFetch = window.fetch.bind(window)
    window.fetch = async (input, init = {}) => {
      const url = typeof input === 'string' ? input : input?.url || ''
      const savedCode = (sessionStorage.getItem(ACTIVE_CODE_KEY) || '').trim().toUpperCase()

      if (savedCode === 'COLIN10' && url.includes('/api/create-payment-intent') && init?.body) {
        try {
          const body = JSON.parse(init.body)
          if (body.discountApplied) {
            body.discountCode = 'COLIN10'
            init = { ...init, body: JSON.stringify(body) }
          }
        } catch {
          // Leave non-JSON requests untouched.
        }
      }

      return originalFetch(input, init)
    }

    return () => {
      window.clearInterval(timer)
      window.fetch = originalFetch
    }
  }, [])

  return null
}
