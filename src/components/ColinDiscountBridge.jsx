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
    let replayingApply = false

    const rememberColin = (event) => {
      const input = event.target
      if (!(input instanceof window.HTMLInputElement)) return
      if (input.placeholder !== 'Enter code') return
      if (String(input.value || '').trim().toUpperCase() === 'COLIN10') {
        sessionStorage.setItem(ACTIVE_CODE_KEY, 'COLIN10')
      }
    }

    // Checkout's legacy handler only recognizes LION10. Keep COLIN10 visible while
    // the customer types; translate to LION10 only for the actual Apply handler,
    // then immediately restore the visible field to COLIN10.
    const handleApplyCapture = (event) => {
      if (replayingApply || window.location.pathname !== '/checkout') return

      const button = event.target?.closest?.('button')
      if (!button) return
      if (String(button.textContent || '').trim().toUpperCase() !== 'APPLY') return

      const input = button.parentElement?.querySelector('input[placeholder="Enter code"]')
      if (!input) return

      const code = String(input.value || '').trim().toUpperCase()
      if (code !== 'COLIN10') return

      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation?.()
      sessionStorage.setItem(ACTIVE_CODE_KEY, 'COLIN10')

      setReactInputValue(input, 'LION10')
      replayingApply = true

      window.setTimeout(() => {
        button.click()
        replayingApply = false
        window.setTimeout(() => {
          input.value = 'COLIN10'
        }, 0)
      }, 0)
    }

    document.addEventListener('input', rememberColin, true)
    document.addEventListener('click', handleApplyCapture, true)

    // Preserve COLIN10 attribution at payment time. The server validates COLIN10
    // directly and records rep=Colin in Stripe metadata.
    const originalFetch = window.fetch.bind(window)
    window.fetch = async (input, init = {}) => {
      const url = typeof input === 'string' ? input : input?.url || ''
      const savedCode = String(sessionStorage.getItem(ACTIVE_CODE_KEY) || '').trim().toUpperCase()

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
      document.removeEventListener('input', rememberColin, true)
      document.removeEventListener('click', handleApplyCapture, true)
      window.fetch = originalFetch
    }
  }, [])

  return null
}
