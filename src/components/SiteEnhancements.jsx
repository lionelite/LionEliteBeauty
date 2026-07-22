import { useEffect } from 'react'

const ACTIVE_CODE_KEY = 'leb_active_discount_code'
const SUPPORTED_REP_CODE = 'COLIN10'

function setReactInputValue(input, value) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
  setter?.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

export default function SiteEnhancements() {
  useEffect(() => {
    // Carry an affiliate code from cart/share links into checkout.
    const params = new URLSearchParams(window.location.search)
    const incoming = String(params.get('discount') || '').trim().toUpperCase()
    if (incoming === SUPPORTED_REP_CODE) sessionStorage.setItem(ACTIVE_CODE_KEY, incoming)

    const originalFetch = window.fetch.bind(window)
    window.fetch = async (input, init = {}) => {
      const url = typeof input === 'string' ? input : input?.url || ''
      const activeCode = sessionStorage.getItem(ACTIVE_CODE_KEY)

      if (activeCode === SUPPORTED_REP_CODE && init?.body && (url.includes('/api/create-payment-intent') || url.includes('/api/send'))) {
        try {
          const body = JSON.parse(init.body)
          if (url.includes('/api/create-payment-intent')) {
            body.discountApplied = true
            body.discountCode = SUPPORTED_REP_CODE
          }
          if (url.includes('/api/send') && body.type === 'order') {
            body.discountCode = SUPPORTED_REP_CODE
          }
          init = { ...init, body: JSON.stringify(body) }
        } catch {
          // Preserve the original request if it is not JSON.
        }
      }
      return originalFetch(input, init)
    }

    const enhancePage = () => {
      // Remove any legacy PRE-ORDER badge anywhere on the storefront.
      document.querySelectorAll('span, p, div').forEach(el => {
        if (el.children.length === 0 && el.textContent?.trim().toLowerCase() === 'pre-order') {
          const parent = el.parentElement
          if (parent && parent.children.length === 1) parent.style.display = 'none'
          else el.style.display = 'none'
        }
      })

      if (!window.location.pathname.startsWith('/checkout')) return
      const input = document.querySelector('input[placeholder="Enter code"]')
      if (!input) return

      const activeCode = sessionStorage.getItem(ACTIVE_CODE_KEY)
      if (activeCode === SUPPORTED_REP_CODE) {
        if (!input.disabled && input.value.toUpperCase() !== 'LION10') {
          // Checkout's legacy state accepts LION10; network attribution remains COLIN10.
          setReactInputValue(input, 'lion10')
          const apply = [...document.querySelectorAll('button')].find(b => b.textContent?.trim().toLowerCase() === 'apply')
          apply?.click()
        }
        if (input.disabled && input.value !== SUPPORTED_REP_CODE) {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
          setter?.call(input, SUPPORTED_REP_CODE)
        }
      }
    }

    const captureApply = (event) => {
      const button = event.target?.closest?.('button')
      if (!button || button.textContent?.trim().toLowerCase() !== 'apply') return
      const input = document.querySelector('input[placeholder="Enter code"]')
      if (!input) return
      if (input.value.trim().toUpperCase() === SUPPORTED_REP_CODE) {
        sessionStorage.setItem(ACTIVE_CODE_KEY, SUPPORTED_REP_CODE)
        setReactInputValue(input, 'lion10')
      }
    }

    document.addEventListener('click', captureApply, true)
    const observer = new MutationObserver(enhancePage)
    observer.observe(document.body, { childList: true, subtree: true, attributes: true })
    enhancePage()

    return () => {
      observer.disconnect()
      document.removeEventListener('click', captureApply, true)
      window.fetch = originalFetch
    }
  }, [])

  return null
}
