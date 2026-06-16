import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useCart } from '../context/CartContext'
import StripePaymentForm from '../components/StripePaymentForm'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

// Lazy-init stripe promise — preserved across renders
let stripePromise
function getStripe() {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  if (!key) return null
  if (!stripePromise) {
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [sending, setSending] = useState(false)
  const [placed, setPlaced] = useState(false)
  const [stripeError, setStripeError] = useState('')
  const [clientSecret, setClientSecret] = useState('')

  function handleApplyDiscount() {
    if (discountCode.trim().toUpperCase() === 'WELCOME10') {
      setDiscountApplied(true)
    } else {
      alert('Invalid discount code')
    }
  }

  async function handlePlaceOrder(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !address.trim() || !city.trim() || !state.trim() || !zip.trim()) return

    if (paymentMethod === 'stripe') {
      setSending(true)
      setStripeError('')
      try {
        const intentRes = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items, discountApplied }),
        })
        const intentData = await intentRes.json()
        if (!intentRes.ok) {
          setStripeError(intentData.error || 'Payment service unavailable')
          setSending(false)
          return
        }
        setClientSecret(intentData.clientSecret)
        setSending(false)
      } catch (err) {
        setStripeError('Payment service temporarily unavailable')
        setSending(false)
      }
    } else {
      // Zelle / CashApp — submit order with payment instructions
      await submitOrder()
    }
  }

  async function submitOrder(stripePaymentId = null) {
    setSending(true)
    try {
      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order',
          name,
          email,
          phone: phone || 'Not provided',
          address: `${address}, ${city}, ${state} ${zip}`,
          discountCode: discountApplied ? discountCode : 'None',
          items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.priceNum })),
          paymentMethod,
          ...(stripePaymentId ? { stripePaymentId } : {}),
        }),
      })
    } catch (err) {
      console.error('API error:', err)
    }
    setSending(false)
    setPlaced(true)
    clearCart()
    window.scrollTo(0, 0)
  }

  // ── Stripe card payment view ─────────────────────────────────────────────
  if (clientSecret) {
    const stripe = getStripe()
    const finalTotal = discountApplied ? (subtotal * 0.9) : subtotal
    return (
      <Elements
        stripe={stripe}
        options={{
          clientSecret,
          appearance: {
            theme: 'night',
            labels: 'floating',
            variables: {
              colorPrimary: '#C9A96E',
              colorBackground: '#0A0A0A',
              colorText: '#FAFAF8',
              colorDanger: '#E05A5A',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              borderRadius: '0px',
            },
          },
        }}
      >
        <StripePaymentForm
          finalTotal={finalTotal}
          email={email}
          name={name}
          onBack={() => setClientSecret('')}
          onSuccess={() => submitOrder('stripe_confirmed')}
        />
      </Elements>
    )
  }

  // ── Order placed confirmation ────────────────────────────────────────────
  if (placed) {
    return (
      <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
        <Navbar />
        <section style={{ paddingTop: '140px', paddingBottom: '100px' }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div style={{ width: '56px', height: '56px', border: '1px solid #C9A96E44', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
              <span style={{ color: '#C9A96E', fontSize: '22px' }}>✔</span>
            </div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '20px' }}
              className="uppercase">Order Placed</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.6rem', lineHeight: '1.12', marginBottom: '20px' }}
              className="font-normal">
              Your order has been<br />received.
            </h1>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>

            {paymentMethod === 'stripe' && (
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '15px', lineHeight: '1.9', marginBottom: '12px' }}>
                ✓ Payment successful. You'll receive a confirmation email shortly.
              </p>
            )}

            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.9', marginBottom: '32px' }}>
              We'll confirm your shipping details within 24 hours.
            </p>

            {/* Offline payment instructions */}
            {paymentMethod !== 'stripe' && (
              <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #C9A96E33', padding: '40px', marginTop: '24px', textAlign: 'left' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.2rem', marginBottom: '20px', textAlign: 'center' }}>
                  Send Payment To Complete Your Order
                </p>

                {paymentMethod === 'zelle' && (
                  <div style={{ backgroundColor: '#111', border: '1px solid #1A1A1A', padding: '24px' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div style={{ width: '36px', height: '36px', backgroundColor: '#6C1FD1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.1em', fontWeight: 'bold' }}>Z</span>
                      </div>
                      <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '16px' }}>Zelle</p>
                    </div>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7' }}>
                      Send payment to: <strong style={{ color: '#C9A96E' }}>orders@lionelitebeauty.com</strong>
                    </p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', lineHeight: '1.6', marginTop: '8px' }}>
                      Include your order name in the memo so we can match it.
                    </p>
                  </div>
                )}

                {paymentMethod === 'cashapp' && (
                  <div style={{ backgroundColor: '#111', border: '1px solid #1A1A1A', padding: '24px' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div style={{ width: '36px', height: '36px', backgroundColor: '#00D54B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.1em', fontWeight: 'bold' }}>$</span>
                      </div>
                      <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '16px' }}>CashApp</p>
                    </div>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7' }}>
                      Send to: <strong style={{ color: '#C9A96E' }}>{'$LionElite'}</strong>
                    </p>
                  </div>
                )}

                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', lineHeight: '1.7', textAlign: 'center', marginTop: '20px' }}>
                  Your order will ship once payment is confirmed. We'll notify you by email.
                </p>
              </div>
            )}

            <Link to="/"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none', display: 'inline-block', marginTop: '40px' }}
              className="uppercase hover:text-[#C9A96E] transition-colors">
              ← Return Home
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  // ── Empty cart ───────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
        <Navbar />
        <section style={{ paddingTop: '140px', paddingBottom: '100px', textAlign: 'center' }}>
          <div className="max-w-2xl mx-auto px-6">
            <p style={{ fontFamily: 'Georgia, serif', color: '#7A7A7A', fontSize: '1.2rem', marginBottom: '24px' }}>
              Your cart is empty.
            </p>
            <Link to="/skincare"
              style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em', padding: '16px 40px', textDecoration: 'none' }}
              className="uppercase hover:opacity-90 transition-opacity">
              Browse Products →
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px', backgroundColor: '#0A0A0A',
    border: '1px solid #2A2A2A', color: '#FAFAF8',
    fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const finalTotal = discountApplied ? (subtotal * 0.9) : subtotal

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      <SEO title="Checkout" description="Complete your order for peptide skincare and wellness products." />
      <Navbar />

      <section style={{ paddingTop: '140px', paddingBottom: '64px', borderBottom: '1px solid #111' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }}
            className="uppercase">Checkout</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.6rem', lineHeight: '1.1' }}
            className="font-normal">Complete Your Order</h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginTop: '20px' }}></div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10">

            {/* Left — Form */}
            <div className="md:col-span-3">
              <form onSubmit={handlePlaceOrder}>

                {/* Contact */}
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                    className="uppercase">Contact Information</p>
                  <div className="space-y-4">
                    <div>
                      <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Full Name *</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} required
                        style={inputStyle} placeholder="Your full name" />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Email *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                        style={inputStyle} placeholder="your@email.com" />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Phone</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        style={inputStyle} placeholder="+1 (000) 000-0000" />
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                    className="uppercase">Shipping Address</p>
                  <div className="space-y-4">
                    <div>
                      <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Street Address *</label>
                      <input type="text" value={address} onChange={e => setAddress(e.target.value)} required
                        style={inputStyle} placeholder="123 Main Street" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-1">
                        <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">City *</label>
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} required
                          style={inputStyle} placeholder="City" />
                      </div>
                      <div className="col-span-1">
                        <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">State *</label>
                        <input type="text" value={state} onChange={e => setState(e.target.value)} required
                          style={inputStyle} placeholder="State" />
                      </div>
                      <div className="col-span-1">
                        <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Zip Code *</label>
                        <input type="text" value={zip} onChange={e => setZip(e.target.value)} required
                          style={inputStyle} placeholder="00000" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discount Code */}
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                    className="uppercase">Discount Code</p>
                  <div className="flex gap-3">
                    <input type="text" value={discountCode} onChange={e => setDiscountCode(e.target.value)}
                      style={{ ...inputStyle, flex: 1 }} placeholder="Enter code"
                      disabled={discountApplied} />
                    <button type="button" onClick={handleApplyDiscount}
                      disabled={discountApplied || !discountCode.trim()}
                      style={{
                        backgroundColor: discountApplied ? '#5BA87A' : '#C9A96E',
                        color: '#000', border: 'none', padding: '14px 24px',
                        fontFamily: 'Helvetica Neue, Arial, sans-serif',
                        fontSize: '10px', letterSpacing: '0.2em', cursor: 'pointer',
                      }}
                      className="uppercase hover:opacity-90 transition-opacity whitespace-nowrap">
                      {discountApplied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                  {discountApplied && (
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '12px', marginTop: '8px' }}>
                      10% discount applied — reflected in the total below.
                    </p>
                  )}
                </div>

                {/* Payment Methods */}
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                    className="uppercase">Payment Method</p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {/* Stripe / Card + BNPL */}
                    <button type="button" onClick={() => setPaymentMethod('stripe')}
                      style={{
                        backgroundColor: paymentMethod === 'stripe' ? '#0C0A08' : '#0A0A0A',
                        border: paymentMethod === 'stripe' ? '1px solid #C9A96E' : '1px solid #2A2A2A',
                        padding: '20px', textAlign: 'center', cursor: 'pointer',
                      }}>
                      <div style={{ width: '36px', height: '36px', backgroundColor: paymentMethod === 'stripe' ? '#C9A96E' : '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                        <span style={{ color: paymentMethod === 'stripe' ? '#000' : '#8A8A8A', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.1em', fontWeight: 'bold' }}>C</span>
                      </div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: paymentMethod === 'stripe' ? '#C9A96E' : '#FAFAF8', fontSize: '11px' }}>Card + Pay Later</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '9px', marginTop: '2px' }}>Klarna · Afterpay · Affirm</p>
                    </button>

                    {/* Zelle */}
                    <button type="button" onClick={() => setPaymentMethod('zelle')}
                      style={{
                        backgroundColor: paymentMethod === 'zelle' ? '#0C0A08' : '#0A0A0A',
                        border: paymentMethod === 'zelle' ? '1px solid #C9A96E' : '1px solid #2A2A2A',
                        padding: '20px', textAlign: 'center', cursor: 'pointer',
                      }}>
                      <div style={{ width: '36px', height: '36px', backgroundColor: '#6C1FD1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                        <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.1em', fontWeight: 'bold' }}>Z</span>
                      </div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: paymentMethod === 'zelle' ? '#C9A96E' : '#FAFAF8', fontSize: '11px' }}>Zelle</p>
                    </button>

                    {/* CashApp */}
                    <button type="button" onClick={() => setPaymentMethod('cashapp')}
                      style={{
                        backgroundColor: paymentMethod === 'cashapp' ? '#0C0A08' : '#0A0A0A',
                        border: paymentMethod === 'cashapp' ? '1px solid #C9A96E' : '1px solid #2A2A2A',
                        padding: '20px', textAlign: 'center', cursor: 'pointer',
                      }}>
                      <div style={{ width: '36px', height: '36px', backgroundColor: '#00D54B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                        <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.1em', fontWeight: 'bold' }}>$</span>
                      </div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: paymentMethod === 'cashapp' ? '#C9A96E' : '#FAFAF8', fontSize: '11px' }}>CashApp</p>
                    </button>
                  </div>

                  {paymentMethod === 'stripe' && (
                    <div style={{ backgroundColor: '#111', border: '1px solid #1A1A1A', padding: '20px' }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.7', marginBottom: '12px' }}>
                        Pay with <strong style={{ color: '#C9A96E' }}>credit/debit card</strong>, or choose <strong style={{ color: '#C9A96E' }}>Klarna</strong>, <strong style={{ color: '#C9A96E' }}>Afterpay</strong>, or <strong style={{ color: '#C9A96E' }}>Affirm</strong> to pay in installments — all processed securely through Stripe.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['Visa', 'Mastercard', 'Amex', 'Discover', 'Klarna', 'Afterpay', 'Affirm'].map(m => (
                          <span key={m} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.1em', border: '1px solid #2A2A2A', padding: '4px 10px' }}>{m}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {paymentMethod === 'zelle' && (
                    <div style={{ backgroundColor: '#111', border: '1px solid #1A1A1A', padding: '20px' }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.7' }}>
                        Send payment to <strong style={{ color: '#C9A96E' }}>orders@lionelitebeauty.com</strong> via Zelle. Your order will be processed once payment is confirmed.
                      </p>
                    </div>
                  )}
                  {paymentMethod === 'cashapp' && (
                    <div style={{ backgroundColor: '#111', border: '1px solid #1A1A1A', padding: '20px' }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.7' }}>
                        Send payment to <strong style={{ color: '#C9A96E' }}>{'$LionElite'}</strong> via CashApp. Your order will be processed once payment is confirmed.
                      </p>
                    </div>
                  )}
                </div>

                {stripeError && (
                  <div style={{ backgroundColor: '#1A0A0A', border: '1px solid #E05A5A44', padding: '14px 18px', marginBottom: '20px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px' }}>{stripeError}</p>
                  </div>
                )}

                <button type="submit" disabled={sending}
                  style={{
                    width: '100%', backgroundColor: sending ? '#6A5A3A' : '#C9A96E', color: '#000', border: 'none',
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: '13px', letterSpacing: '0.2em',
                    padding: '18px', cursor: sending ? 'not-allowed' : 'pointer',
                  }}
                  className="uppercase hover:opacity-90 transition-opacity">
                  {sending
                    ? 'Processing…'
                    : paymentMethod === 'stripe'
                      ? `Pay $${finalTotal.toFixed(2)} — Place Order`
                      : 'Place Order — See Payment Details →'
                  }
                </button>
              </form>
            </div>

            {/* Right — Order Summary */}
            <div className="md:col-span-2">
              <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A', padding: '32px', position: 'sticky', top: '120px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }}
                  className="uppercase">Order Summary</p>

                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.slug} className="flex justify-between items-start" style={{ borderBottom: '1px solid #141414', paddingBottom: '12px' }}>
                      <div>
                        <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '14px', marginBottom: '2px' }}>{item.name}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px' }}>Qty: {item.quantity}</p>
                      </div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '14px' }}>
                        ${(item.priceNum * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #1A1A1A', paddingTop: '16px' }}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px' }}>Subtotal</span>
                    <span style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '18px' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '13px' }}>Discount (10%)</span>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '14px' }}>−${(subtotal * 0.1).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3" style={{ borderTop: '1px solid #1A1A1A', marginTop: '12px' }}>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '14px', letterSpacing: '0.1em' }} className="uppercase">Total</span>
                    <span style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '22px' }}>${finalTotal.toFixed(2)}</span>
                  </div>
                  {paymentMethod === 'stripe' ? (
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '11px', marginTop: '12px' }}>
                      Your payment will be processed immediately upon placing the order.
                    </p>
                  ) : (
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '11px', marginTop: '12px' }}>
                      You'll receive payment instructions after placing your order.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}