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

    // CheckoutPage has already saved the complete order payload to sessionStorage.
    // That same saved payload is used after both redirect and non-redirect Stripe
    // payments, so a browser navigation can never discard the order details.
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

    // IMPORTANT: CheckoutPage already has a hardened redirect-return flow that
    // retrieves this PaymentIntent from Stripe and calls submitOrder with the
    // REAL paymentIntent.id. Route card payments through that same path instead
    // of its legacy handleCardSuccess('stripe_confirmed') path.
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
            <style>{`@keyframes pulse { to { transform: rotate(360deg) } }`}</style>
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