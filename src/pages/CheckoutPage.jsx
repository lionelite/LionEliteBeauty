import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [sending, setSending] = useState(false)
  const [placed, setPlaced] = useState(false)
  const [sendError, setSendError] = useState(false)

  async function handlePlaceOrder(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setSending(true)
    setSendError(false)

    const payload = {
      type: 'order',
      name,
      email,
      phone: phone || 'Not provided',
      notes: notes || 'None',
      products: items.map(i => `${i.name} × ${i.quantity}`),
      total: `$${subtotal.toFixed(2)}`,
    }

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('API error')
    } catch (err) {
      console.error('Order error:', err)
      // Don't block — show payment info regardless
    } finally {
      setSending(false)
      setPlaced(true)
      clearCart()
      window.scrollTo(0, 0)
    }
  }

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
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.9', marginBottom: '12px' }}>
              We'll confirm your shipping details within 24 hours.
            </p>

            {/* Payment instructions */}
            <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #C9A96E33', padding: '40px', marginTop: '40px', textAlign: 'left' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.2rem', marginBottom: '20px', textAlign: 'center' }}>
                Send Payment To Complete Your Order
              </p>

              {/* Zelle */}
              <div style={{ backgroundColor: '#111', border: '1px solid #1A1A1A', padding: '24px', marginBottom: '16px' }}>
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

              {/* CashApp */}
              <div style={{ backgroundColor: '#111', border: '1px solid #1A1A1A', padding: '24px', marginBottom: '16px' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div style={{ width: '36px', height: '36px', backgroundColor: '#00D54B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.1em', fontWeight: 'bold' }}>$</span>
                  </div>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '16px' }}>CashApp</p>
                </div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7' }}>
                  Send to: <strong style={{ color: '#C9A96E' }}>$LionElite</strong>
                </p>
              </div>

              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', lineHeight: '1.7', textAlign: 'center' }}>
                Your order will ship once payment is confirmed. We'll notify you by email.
              </p>
            </div>

            <Link to="/"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none', display: 'inline-block', marginTop: '40px' }}
              className="uppercase hover:text-[#C9A96E] transition-colors">
              ← Return Home
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
        <Navbar />
        <section style={{ paddingTop: '140px', paddingBottom: '100px', textAlign: 'center' }}>
          <div className="max-w-2xl mx-auto px-6">
            <p style={{ fontFamily: 'Georgia, serif', color: '#4A4A4A', fontSize: '1.2rem', marginBottom: '24px' }}>
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

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
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
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                    className="uppercase">Contact Information</p>
                  <div className="space-y-4">
                    <div>
                      <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Full Name *</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} required
                        style={{ width: '100%', padding: '14px 18px', backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A', color: '#FAFAF8', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', outline: 'none' }}
                        placeholder="Your full name" />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Email *</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                        style={{ width: '100%', padding: '14px 18px', backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A', color: '#FAFAF8', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', outline: 'none' }}
                        placeholder="your@email.com" />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Phone</label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                        style={{ width: '100%', padding: '14px 18px', backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A', color: '#FAFAF8', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', outline: 'none' }}
                        placeholder="+1 (000) 000-0000" />
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Order Notes</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                        style={{ width: '100%', padding: '14px 18px', backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A', color: '#FAFAF8', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                        placeholder="Anything we should know?" />
                    </div>
                  </div>
                </div>

                {/* Payment methods */}
                <div style={{ marginBottom: '40px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                    className="uppercase">Payment Method</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', marginBottom: '16px' }}>
                    Choose a payment method below. Instructions will appear after your order is placed.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A', padding: '20px', textAlign: 'center' }}>
                      <div style={{ width: '36px', height: '36px', backgroundColor: '#6C1FD1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                        <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.1em', fontWeight: 'bold' }}>Z</span>
                      </div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px' }}>Zelle</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '10px', marginTop: '4px' }}>
                        orders@lionelitebeauty.com
                      </p>
                    </div>
                    <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A', padding: '20px', textAlign: 'center' }}>
                      <div style={{ width: '36px', height: '36px', backgroundColor: '#00D54B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                        <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.1em', fontWeight: 'bold' }}>$</span>
                      </div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px' }}>CashApp</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '10px', marginTop: '4px' }}>
                        $LionElite
                      </p>
                    </div>
                  </div>
                </div>

                {sendError && (
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px', marginBottom: '16px' }}>
                    There was an issue sending your confirmation. You can still complete your order —{' '}
                    <a href={`mailto:orders@lionelitebeauty.com?subject=New Order: ${encodeURIComponent(items.map(i => i.name).join(', '))}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AItems: ${encodeURIComponent(items.map(i => `${i.name} × ${i.quantity}`).join(', '))}%0ATotal: $${subtotal.toFixed(2)}`}
                      style={{ color: '#C9A96E', textDecoration: 'none' }}>email your order instead</a>.
                  </p>
                )}

                <button type="submit" disabled={sending}
                  style={{
                    width: '100%', backgroundColor: sending ? '#6A5A3A' : '#C9A96E', color: '#000', border: 'none',
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: '13px', letterSpacing: '0.2em',
                    padding: '18px', cursor: sending ? 'not-allowed' : 'pointer',
                  }}
                  className="uppercase hover:opacity-90 transition-opacity">
                  {sending ? 'Processing…' : 'Place Order — See Payment Details →'}
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
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', marginTop: '8px' }}>
                    You'll receive payment instructions after placing your order.
                  </p>
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