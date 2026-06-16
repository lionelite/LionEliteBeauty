import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import StripePaymentSection from '../components/StripePaymentSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const TIERS = {
  vip: {
    cents: 240000, display: 2400.00, label: 'VIP Transformation Program',
    duration: '6 months', desc: '6-month personalized protocol',
    includes: 'Personalized peptide protocol, bi-weekly check-ins, lab review, protocol adjustments, direct messaging with your specialist.',
    ideal: 'Long-term body composition, health optimization, high performers, maximum accountability.',
  },
  foundation: {
    cents: 29999, display: 299.99, label: 'Foundation Coaching',
    duration: '1 month', desc: 'Monthly coaching program',
    includes: 'Monthly coaching call, personalized wellness roadmap, peptide education & implementation guidance, reconstitution instruction, email support, monthly progress check-in.',
    ideal: 'Beginners, weight loss goals, general wellness, low-cost entry point, professional guidance.',
  },
}

let stripePromise
function getStripe() {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  if (!key) return null
  if (!stripePromise) stripePromise = loadStripe(key)
  return stripePromise
}

export default function ProgramCheckoutPage() {
  const [searchParams] = useSearchParams()
  const vipId = searchParams.get('vip') || ''
  const email = searchParams.get('email') || ''
  const name = searchParams.get('name') || ''
  const program = searchParams.get('program') || 'Wellness Program'
  const tierKey = searchParams.get('tier') || 'vip'
  const tier = TIERS[tierKey] || TIERS.vip

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [sending, setSending] = useState(false)
  const [placed, setPlaced] = useState(false)
  const [stripeError, setStripeError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [showCardForm, setShowCardForm] = useState(false)

  async function handlePay(e) {
    e.preventDefault()
    if (!email.trim() || !name.trim()) return

    if (paymentMethod === 'stripe') {
      setSending(true)
      setStripeError('')
      try {
        const intentRes = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: [{ name: `${tier.label} — ${program}`, price: tier.display, quantity: 1, priceNum: tier.display }],
            discountApplied: false,
            programCheckout: true,
          }),
        })
        const intentData = await intentRes.json()
        if (!intentRes.ok) {
          setStripeError(intentData.error || 'Payment service unavailable')
          setSending(false)
          return
        }
        setClientSecret(intentData.clientSecret)
        setShowCardForm(true)
        setSending(false)
      } catch {
        setStripeError('Payment service temporarily unavailable')
        setSending(false)
      }
    } else {
      await submitOrder()
    }
  }

  function handleCardSuccess() {
    submitOrder('stripe_confirmed')
  }

  function handleCardError(msg) {
    setStripeError(msg)
  }

  async function submitOrder(stripePaymentId = null) {
    setSending(true)
    try {
      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'program_order',
          name, email,
          program,
          tier: tierKey,
          vipId,
          paymentMethod,
          ...(stripePaymentId ? { stripePaymentId } : {}),
        }),
      })
    } catch (err) {
      console.error('API error:', err)
    }
    setSending(false)
    setPlaced(true)
    window.scrollTo(0, 0)
  }

  // ── Order placed ──
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
              className="uppercase">Enrollment Complete</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.6rem', lineHeight: '1.12', marginBottom: '20px' }}
              className="font-normal">
              Welcome to the<br />Lion Elite Family.
            </h1>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '16px' }}>
              {tier.label}
            </p>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
            {paymentMethod === 'stripe' ? (
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '15px', lineHeight: '1.9', marginBottom: '12px' }}>
                ✓ Payment successful. You'll receive your program details by email shortly.
              </p>
            ) : (
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '15px', lineHeight: '1.9', marginBottom: '12px' }}>
                Your enrollment is pending. Send payment via Zelle to confirm.
              </p>
            )}
            {tierKey === 'foundation' ? (
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7', marginBottom: '32px' }}>
                We'll reach out within 24 hours to schedule your first coaching call and get you started on your wellness roadmap.
              </p>
            ) : (
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7', marginBottom: '32px' }}>
                We'll reach out within 24 hours to schedule your onboarding and walk you through your personalized protocol.
              </p>
            )}
            <Link to="/"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
              className="uppercase hover:text-[#C9A96E] transition-colors">
              ← Return to Home
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px', backgroundColor: '#0A0A0A',
    border: '1px solid #1A1A1A', color: '#FAFAF8',
    fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      <SEO title="Program Enrollment" description={`Complete your enrollment for ${tier.label.toLowerCase()} — ${tier.desc}.`} />
      <Navbar />

      <section style={{ paddingTop: '140px', paddingBottom: '64px', borderBottom: '1px solid #1A1A1A' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }}
            className="uppercase">Secure Your Spot — {tier.label}</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.6rem', lineHeight: '1.1' }}
            className="font-normal">Enroll in {tier.label}</h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginTop: '20px' }}></div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-px" style={{ backgroundColor: '#1A1A1A' }}>

            {/* Left — Form */}
            <div className="md:col-span-3" style={{ backgroundColor: '#080808', padding: '40px' }}>
              {!showCardForm ? (
                <form onSubmit={handlePay}>
                  {/* VIP Info */}
                  {vipId && (
                    <div style={{
                      backgroundColor: '#0C0A08', border: '1px solid #C9A96E33', padding: '20px 24px',
                      marginBottom: '24px',
                    }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.15em', fontSize: '9px', marginBottom: '4px' }}
                        className="uppercase">VIP Account</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px' }}>
                        {name} · <span style={{ color: '#C9A96E', letterSpacing: '0.1em' }}>{vipId}</span>
                      </p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', marginTop: '2px' }}>
                        {email} · {program}
                      </p>
                    </div>
                  )}

                  {/* Contact */}
                  <div style={{
                    backgroundColor: '#0A0A0A', border: '1px solid #141414', padding: '28px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ width: '3px', height: '18px', backgroundColor: '#C9A96E' }}></div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600' }}
                        className="uppercase">Contact</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Full Name</label>
                        <input type="text" value={name} disabled style={{ ...inputStyle, opacity: '0.6' }} />
                      </div>
                      <div>
                        <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Email</label>
                        <input type="email" value={email} disabled style={{ ...inputStyle, opacity: '0.6' }} />
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div style={{
                    backgroundColor: '#0A0A0A', border: '1px solid #141414', padding: '28px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ width: '3px', height: '18px', backgroundColor: '#C9A96E' }}></div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600' }}
                        className="uppercase">Payment</p>
                    </div>

                    {/* Stripe */}
                    <div style={{
                      border: paymentMethod === 'stripe' ? '2px solid #C9A96E' : '1px solid #1A1A1A',
                      marginBottom: '12px', overflow: 'hidden',
                    }}>
                      <button type="button" onClick={() => setPaymentMethod('stripe')}
                        style={{
                          width: '100%', backgroundColor: paymentMethod === 'stripe' ? '#0F0E0A' : '#0A0A0A',
                          border: 'none', padding: '16px 20px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                        <div className="flex items-center gap-3">
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            border: paymentMethod === 'stripe' ? '6px solid #C9A96E' : '2px solid #2A2A2A',
                            transition: 'border 0.15s',
                          }}></div>
                          <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '14px', fontWeight: paymentMethod === 'stripe' ? '600' : '400' }}>
                            Credit / Debit Card
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {['Visa', 'MC', 'Amex', 'Disc'].map(m => (
                            <span key={m} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '9px', letterSpacing: '0.08em', border: '1px solid #2A2A2A', padding: '2px 8px' }}>{m}</span>
                          ))}
                        </div>
                      </button>
                      {paymentMethod === 'stripe' && (
                        <div style={{ backgroundColor: '#0F0E0A', borderTop: '1px solid #1A1A1A', padding: '20px 24px' }}>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7' }}>
                            <span style={{ color: '#C9A96E', fontWeight: '600' }}>✦</span> Pay with card, Klarna, Afterpay, or Affirm — secured by Stripe.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Zelle */}
                    <div style={{
                      border: paymentMethod === 'zelle' ? '2px solid #C9A96E' : '1px solid #1A1A1A',
                      marginBottom: '12px', overflow: 'hidden',
                    }}>
                      <button type="button" onClick={() => setPaymentMethod('zelle')}
                        style={{
                          width: '100%', backgroundColor: paymentMethod === 'zelle' ? '#0F0E0A' : '#0A0A0A',
                          border: 'none', padding: '16px 20px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                        <div className="flex items-center gap-3">
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            border: paymentMethod === 'zelle' ? '6px solid #C9A96E' : '2px solid #2A2A2A',
                            transition: 'border 0.15s',
                          }}></div>
                          <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '14px', fontWeight: paymentMethod === 'zelle' ? '600' : '400' }}>
                            Zelle
                          </span>
                        </div>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#6C1FD1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', fontWeight: 'bold' }}>Z</span>
                        </div>
                      </button>
                      {paymentMethod === 'zelle' && (
                        <div style={{ backgroundColor: '#0F0E0A', borderTop: '1px solid #1A1A1A', padding: '20px 24px 24px' }}>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7' }}>
                            Send <strong style={{ color: '#C9A96E' }}>${tier.display.toFixed(2)}</strong> to <strong style={{ color: '#C9A96E' }}>orders@lionelitebeauty.com</strong> via Zelle. Include your name and VIP ID ({vipId}) in the memo.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {stripeError && (
                    <div style={{ backgroundColor: '#1A0A0A', border: '1px solid #E05A5A44', padding: '14px 18px', marginBottom: '16px' }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px' }}>{stripeError}</p>
                    </div>
                  )}

                  <button type="submit" disabled={sending}
                    style={{
                      width: '100%', backgroundColor: sending ? '#5A5040' : '#C9A96E', color: '#000', border: 'none',
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      fontSize: '13px', letterSpacing: '0.2em',
                      padding: '18px', cursor: sending ? 'not-allowed' : 'pointer',
                      boxShadow: sending ? 'none' : '0 2px 12px rgba(201, 169, 110, 0.3)',
                    }}
                    className="uppercase hover:opacity-85 transition-opacity">
                    {sending
                      ? 'Processing…'
                      : paymentMethod === 'stripe'
                        ? `Pay $${tier.display.toFixed(2)} — Secure Payment`
                        : 'Place Enrollment — See Payment Details →'
                    }
                  </button>
                </form>
              ) : null}

              {/* Card payment form — outside main form */}
              {showCardForm && clientSecret && paymentMethod === 'stripe' && (
                <div style={{
                  backgroundColor: '#0A0A0A', border: '2px solid #C9A96E',
                  padding: '28px',
                }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600', marginBottom: '20px' }}
                    className="uppercase">Secure Card Payment</p>

                  <Elements
                    stripe={getStripe()}
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
                    <StripePaymentSection
                      email={email}
                      name={name}
                      finalTotal={tier.display}
                      onSuccess={handleCardSuccess}
                      onError={handleCardError}
                    />
                  </Elements>

                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', marginTop: '16px', textAlign: 'center' }}>
                    Secured by Stripe · Your card details are encrypted
                  </p>
                </div>
              )}
            </div>

            {/* Right — Summary */}
            <div className="md:col-span-2" style={{ backgroundColor: '#080808', padding: '40px' }}>
              <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #141414', padding: '32px', position: 'sticky', top: '120px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }}
                  className="uppercase">Program Summary</p>

                <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px', marginBottom: '16px' }}>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '15px', marginBottom: '4px' }}>{tier.label}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px' }}>{tier.desc}</p>
                </div>

                <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px', marginBottom: '16px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', lineHeight: '1.8' }}>
                    {tier.includes}
                  </p>
                </div>

                <div className="flex justify-between mb-1">
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px' }}>Program Fee</span>
                  <span style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '18px' }}>${tier.display.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '12px' }}>Duration</span>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px' }}>{tier.duration}</span>
                </div>
                <div className="flex justify-between pt-3" style={{ borderTop: '1px solid #1A1A1A', marginTop: '12px' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '14px', letterSpacing: '0.1em' }} className="uppercase">Total</span>
                  <span style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '22px' }}>${tier.display.toFixed(2)}</span>
                </div>

                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', marginTop: '16px', lineHeight: '1.7' }}>
                  By enrolling, you agree to our <Link to="/terms/programs" style={{ color: '#C9A96E', textDecoration: 'none' }}>Program Terms &amp; Conditions</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}