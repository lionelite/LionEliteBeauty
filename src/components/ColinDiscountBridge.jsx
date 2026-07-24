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
    let appliedPath = ''

    const syncColinDiscount = () => {
      const path = window.location.pathname
      const isCart = path === '/cart'
      const isCheckout = path === '/checkout'

      if (!isCart && !isCheckout) {
        appliedPath = ''
        return
      }

      const inputs = Array.from(document.querySelectorAll('input[placeholder="Enter code"]'))
      const input = inputs.find(el => !el.disabled) || inputs[0]
      if (!input) return

      const params = new URLSearchParams(window.location.search)
      const requestedCode = (params.get('discount') || '').trim().toUpperCase()
      const savedCode = (sessionStorage.getItem(ACTIVE_CODE_KEY) || '').trim().toUpperCase()
      const typedCode = (input.value || '').trim().toUpperCase()
      const activeCode = requestedCode || savedCode || typedCode

      if (activeCode !== 'COLIN10') return

      sessionStorage.setItem(ACTIVE_CODE_KEY, 'COLIN10')

      const button = input.parentElement?.querySelector('button')
      if (!button || button.disabled) return

      const buttonText = (button.textContent || '').trim().toUpperCase()
      if (buttonText === 'REMOVE') {
        appliedPath = path
        return
      }

      if (appliedPath === path) return

      if (isCart) {
        // Cart now understands COLIN10 directly. Re-fire the React input event and
        // trigger Apply once so pasted/autofilled codes work just like typed codes.
        setReactInputValue(input, 'COLIN10')
        window.setTimeout(() => {
          const currentText = (button.textContent || '').trim().toUpperCase()
          if (currentText === 'APPLY') button.click()
          appliedPath = path
        }, 0)
        return
      }

      // Checkout's legacy visible-discount branch still recognizes LION10.
      // Feed that value into React for the 10% calculation while retaining
      // COLIN10 in sessionStorage and in the payment request for Colin attribution.
      setReactInputValue(input, 'LION10')
      window.setTimeout(() => {
        const currentText = (button.textContent || '').trim().toUpperCase()
        if (currentText === 'APPLY') button.click()
        appliedPath = path
        requestAnimationFrame(() => {
          input.value = 'COLIN10'
        })
      }, 0)
    }

    const timer = window.setInterval(syncColinDiscount, 120)
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
