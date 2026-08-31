(() => {
  'use strict'

  const AFFILIATE_CODE = 'DAYLEN10'
  let affiliateCode = null

  const normalize = value => String(value || '').trim().toUpperCase()
  const isCheckout = () => window.location.pathname === '/checkout'
  const getDiscountInput = () => [...document.querySelectorAll('input')].find(input => input.placeholder === 'Enter code')

  function setReactInputValue(input, value) {
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
    if (setter) setter.call(input, value)
    else input.value = value
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }

  document.addEventListener('input', event => {
    if (!isCheckout()) return
    const input = event.target
    if (!(input instanceof HTMLInputElement) || input.placeholder !== 'Enter code') return
    affiliateCode = normalize(input.value) === AFFILIATE_CODE ? AFFILIATE_CODE : null
  }, true)

  // The current checkout UI has a legacy client-side allow-list containing only
  // LION10. Translate DAYLEN10 through that UI gate, then restore the actual code
  // so the order record and payment metadata preserve affiliate attribution.
  document.addEventListener('click', event => {
    if (!isCheckout()) return
    const button = event.target.closest('button')
    if (!button || button.textContent.trim().toLowerCase() !== 'apply') return
    const input = getDiscountInput()
    if (!input || normalize(input.value) !== AFFILIATE_CODE) return

    affiliateCode = AFFILIATE_CODE
    event.preventDefault()
    event.stopImmediatePropagation()
    setReactInputValue(input, 'LION10')

    setTimeout(() => {
      button.click()
      setTimeout(() => {
        const current = getDiscountInput()
        if (current) setReactInputValue(current, AFFILIATE_CODE)
      }, 0)
    }, 0)
  }, true)

  const originalFetch = window.fetch.bind(window)
  window.fetch = (input, init = {}) => {
    const url = typeof input === 'string' ? input : input?.url
    if (affiliateCode === AFFILIATE_CODE && String(url || '').includes('/api/create-payment-intent') && typeof init.body === 'string') {
      try {
        const body = JSON.parse(init.body)
        body.discountApplied = true
        body.discountCode = AFFILIATE_CODE
        init = { ...init, body: JSON.stringify(body) }
      } catch {
        // Leave non-JSON requests untouched.
      }
    }
    return originalFetch(input, init)
  }

  // Affiliate share links can prefill and apply the code automatically.
  if (isCheckout() && normalize(new URLSearchParams(window.location.search).get('discount')) === AFFILIATE_CODE) {
    affiliateCode = AFFILIATE_CODE
    let attempts = 0
    const timer = setInterval(() => {
      attempts += 1
      const input = getDiscountInput()
      if (input) {
        clearInterval(timer)
        setReactInputValue(input, AFFILIATE_CODE)
        const apply = [...document.querySelectorAll('button')].find(button => button.textContent.trim().toLowerCase() === 'apply')
        if (apply) apply.click()
      } else if (attempts >= 40) {
        clearInterval(timer)
      }
    }, 100)
  }
})()
