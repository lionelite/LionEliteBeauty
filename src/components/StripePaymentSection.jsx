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

    // Save order data before redirect (for Affirm/Klarna/Afterpay return)
    if (saveOrderData) saveOrderData()

    const { error: payError } = await stripe.confirmPayment({
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

    // Success
    onSuccess()
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