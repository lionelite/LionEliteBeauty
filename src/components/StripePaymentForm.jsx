import { useState, useEffect } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import Navbar from './Navbar'
import Footer from './Footer'

export default function StripePaymentForm({ finalTotal, email, name, onBack, onSuccess }) {
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

    const { error: payError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: email,
        payment_method_data: {
          billing_details: { name, email },
        },
      },
      redirect: 'if_required',
    })

    if (payError) {
      setError(payError.message || 'Payment failed')
      setSending(false)
      return
    }

    // Payment succeeded — notify parent
    onSuccess()
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <Navbar />
      <section style={{ paddingTop: '140px' }}>
        <div className="max-w-lg mx-auto px-6">
          <button onClick={onBack}
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', display: 'block', marginBottom: '32px' }}
            className="uppercase hover:text-[#C9A96E] transition-colors">
            ← Back to Checkout
          </button>

          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '12px' }}
            className="uppercase">Card Payment</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2rem', lineHeight: '1.15', marginBottom: '8px' }}
            className="font-normal">Enter your card details</h1>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', marginBottom: '8px' }}>
            Total: <strong style={{ color: '#C9A96E', fontSize: '1.4rem' }}>${finalTotal.toFixed(2)}</strong>
          </p>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '20px 0 32px' }}></div>

          <form onSubmit={handlePay}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px', marginBottom: '24px', minHeight: '100px' }}>
              {stripe && elements ? (
                <PaymentElement options={{
                  defaultValues: { billingDetails: { name, email } },
                }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px' }}>
                  <div style={{ width: '20px', height: '20px', border: '2px solid #2A2A2A', borderTopColor: '#C9A96E', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                  <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                </div>
              )}
            </div>

            {error && (
              <div style={{ backgroundColor: '#FFF0F0', border: '1px solid #E05A5A44', padding: '14px 18px', marginBottom: '20px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px' }}>{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={onBack}
                style={{
                  flex: 1, backgroundColor: 'transparent', border: '1px solid #D0C8BA', color: '#6A6A6A',
                  fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em',
                  padding: '16px', cursor: 'pointer',
                }}
                className="uppercase hover:border-[#C9A96E44] transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={sending || !stripe || !elements}
                style={{
                  flex: 1, backgroundColor: sending ? '#8A8A8A' : '#C9A96E', color: '#000', border: 'none',
                  fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em',
                  padding: '16px', cursor: (sending || !stripe || !elements) ? 'not-allowed' : 'pointer',
                }}
                className="uppercase hover:opacity-90 transition-opacity">
                {sending ? 'Processing…' : `Pay $${finalTotal.toFixed(2)}`}
              </button>
            </div>
          </form>

          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', textAlign: 'center', marginTop: '24px', marginBottom: '60px' }}>
            Secured by Stripe · Your card details are encrypted
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}