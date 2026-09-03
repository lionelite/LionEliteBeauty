import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

export default function StripePaymentSection({ email, name, finalTotal, onSuccess, onError, saveOrderData }) {
  const stripe = useStripe()
  const elements = useElements()
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handlePay(e) {
    e.preventDefault()
    if (!stripe || !elements) return
    setSending(true)
    setError('')

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message || 'Payment validation error')
      setSending(false)
      return
    }

    // CRITICAL SAFETY GATE: CheckoutPage stores the complete cart, contact, and
    // shipping payload before it creates the PaymentIntent. Persist that full
    // payload on the server now, BEFORE Stripe is allowed to charge anything.
    // If this fails, confirmation is blocked and the customer is not charged.
    try {
      const raw = sessionStorage.getItem('leb_checkout')
      const checkout = raw ? JSON.parse(raw) : null
      const lockRes = await fetch('/api/checkout-lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkout }),
      })
      const lockData = await lockRes.json().catch(() => ({}))
      if (!lockRes.ok) {
        const message = lockData.error || 'We could not safely record your order. You have not been charged. Please retry.'
        setError(message)
        onError?.(message)
        setSending(false)
        return
      }
    } catch (lockErr) {
      const message = 'We could not safely record your order. You have not been charged. Please retry.'
      console.error('Pre-payment order lock failed:', lockErr)
      setError(message)
      onError?.(message)
      setSending(false)
      return
    }

    // Preserve the existing redirect recovery payload only after the authoritative
    // server-side order record is safely locked.
    if (saveOrderData) saveOrderData()

    const { error: payError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/checkout',
        receipt_email: email,
        payment_method_data: {
          billing_details: { name, email },
        },
      },
      redirect: 'if_required',
    })

    if (payError) {
      setError(payError.message || 'Payment failed')
      onError?.(payError.message || 'Payment failed')
      setSending(false)
      return
    }

    if (!paymentIntent?.id || !paymentIntent?.client_secret) {
      const message = 'Payment completed but the confirmation reference was unavailable. Please contact support before retrying.'
      setError(message)
      onError?.(message)
      setSending(false)
      return
    }

    // Route all successful payments through the same recovery path. The server
    // webhook is already the source of truth, so this redirect is an additional
    // browser-side fallback rather than the fulfillment trigger.
    const secret = encodeURIComponent(paymentIntent.client_secret)
    window.location.assign(`/checkout?payment_intent_client_secret=${secret}`)
  }

  return (
    <form onSubmit={handlePay}>
      <div style={{ minHeight: '100px', marginBottom: '20px' }}>
        {stripe && elements ? (
          <PaymentElement options={{
            defaultValues: { billingDetails: { name, email } },
          }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px' }}>
            <div style={{ width: '20px', height: '20px', border: '2px solid #E0D5C5', borderTopColor: '#C9A96E', borderRadius: '50%', animation: 'pulse 0.8s linear infinite' }}></div>
            <style>{`@keyframes pulse { to { transform: rotate360deg); } }`}</style>
          </div>
        )}
      </div>

      {error && (
        <div style={{ backgroundColor: '#FFF0F0', border: '1px solid #E05A5A44', padding: '14px 18px', marginBottom: '16px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px' }}>{error}</p>
        </div>
      )}

      <button type="submit" disabled={sending || !stripe || !elements}
        style={{
          width: '100%', backgroundColor: sending ? '#8A8A8A' : '#C9A96E', color: '#000', border: 'none',
          fontFamily: 'Helvetica Neue, Arial, sans-serif',
          fontSize: '13px', letterSpacing: '0.2em',
          padding: '18px', cursor: (sending || !stripe || !elements) ? 'not-allowed' : 'pointer',
        }}
        className="uppercase hover:opacity-90 transition-opacity">
        {sending ? 'Processing…' : `Confirm Payment · $${finalTotal.toFixed(2)}`}
      </button>
    </form>
  )
}
