import { useEffect } from 'react'

export default function SiteEnhancements() {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window)
    window.fetch = async (input, init = {}) => {
      const url = typeof input === 'string' ? input : input?.url || ''
      let orderBody = null

      if (init?.body && url.includes('/api/send')) {
        try {
          const parsed = JSON.parse(init.body)
          if (parsed.type === 'order') orderBody = parsed
        } catch {
          orderBody = null
        }
      }

      const response = await originalFetch(input, init)

      // Once both admin + customer confirmation emails succeed, persist the same
      // order in the fulfillment database using the exact confirmation number.
      if (url.includes('/api/send') && orderBody?.type === 'order' && response.ok) {
        try {
          const result = await response.clone().json()
          if (result?.orderNumber) {
            await originalFetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ action: 'create', orderNumber: result.orderNumber, ...orderBody }),
            })
          }
        } catch (err) {
          console.error('Order persistence error:', err)
        }
      }

      return response
    }

    const enhancePage = () => {
      document.querySelectorAll('span, p, div').forEach(el => {
        if (el.children.length === 0 && el.textContent?.trim().toLowerCase() === 'pre-order') {
          const parent = el.parentElement
          if (parent && parent.children.length === 1) {
            if (parent.style.display !== 'none') parent.style.display = 'none'
          } else if (el.style.display !== 'none') {
            el.style.display = 'none'
          }
        }
      })

    }
    const observer = new MutationObserver(enhancePage)
    observer.observe(document.body, { childList: true, subtree: true, attributes: true })
    enhancePage()

    return () => {
      observer.disconnect()
      window.fetch = originalFetch
    }
  }, [])

  return null
}
