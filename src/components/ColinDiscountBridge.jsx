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

      const params = new URLSearchParams(window.location.search)
      const requestedCode = (params.get('discount') || '').trim().toUpperCase()
      const savedCode = (sessionStorage.getItem(ACTIVE_CODE_KEY) || '').trim().toUpperCase()
      const activeCode = requestedCode || savedCode

      if (activeCode !== 'COLIN10' || appliedForVisit) return

      sessionStorage.setItem(ACTIVE_CODE_KEY, 'COLIN10')

      // Checkout currently uses its existing LION10 branch for the visible 10%
      // calculation. The payment request is translated back to COLIN10 below so
      // Stripe stores Colin attribution and the server validates the correct code.
      const inputs = Array.from(document.querySelectorAll('input[placeholder="Enter code"]'))
      const input = inputs.find(el => !el.disabled)
      if (!input) return

      setReactInputValue(input, 'lion10')

      const button = input.parentElement?.querySelector('button')
      if (button && !button.disabled) {
        button.click()
        appliedForVisit = true
        requestAnimationFrame(() => {
          input.value = 'COLIN10'
        })
      }
    }

    // Keep this alive for React Router client-side navigation from /cart to
    // /checkout. The component itself stays mounted, so a one-time pathname
    // check would miss that transition.
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
