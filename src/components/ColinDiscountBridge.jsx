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
    if (window.location.pathname !== '/checkout') return

    const params = new URLSearchParams(window.location.search)
    const requestedCode = (params.get('discount') || '').trim().toUpperCase()
    const savedCode = (sessionStorage.getItem(ACTIVE_CODE_KEY) || '').trim().toUpperCase()
    const activeCode = requestedCode || savedCode

    if (activeCode !== 'COLIN10') return

    sessionStorage.setItem(ACTIVE_CODE_KEY, 'COLIN10')

    // The existing checkout accepts LION10 in its local form state. We use
    // that existing 10% calculation for the UI, while the fetch bridge below
    // sends COLIN10 to the server so Stripe records Colin attribution.
    let attempts = 0
    const applyToCheckout = () => {
      attempts += 1
      const inputs = Array.from(document.querySelectorAll('input[placeholder="Enter code"]'))
      const input = inputs.find(el => !el.disabled)
      if (!input) return attempts < 30

      setReactInputValue(input, 'lion10')

      const container = input.parentElement
      const button = container?.querySelector('button')
      if (button && !button.disabled) {
        button.click()
        // Keep the customer-facing field showing the code they entered.
        requestAnimationFrame(() => {
          if (input) input.value = 'COLIN10'
        })
        return false
      }
      return attempts < 30
    }

    const timer = window.setInterval(() => {
      const keepTrying = applyToCheckout()
      if (!keepTrying) window.clearInterval(timer)
    }, 150)

    const originalFetch = window.fetch.bind(window)
    window.fetch = async (input, init = {}) => {
      const url = typeof input === 'string' ? input : input?.url || ''
      if (url.includes('/api/create-payment-intent') && init?.body) {
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
