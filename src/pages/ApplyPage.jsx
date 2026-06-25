import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import StripePaymentSection from '../components/StripePaymentSection'

let stripePromise
function getStripe() {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  if (!key) return null
  if (!stripePromise) stripePromise = loadStripe(key)
  return stripePromise
}

const programs = [
  { value: 'muscle', label: 'Muscle & Recovery', accent: '#C9A96E' },
  { value: 'neuro', label: 'Neuro / Cognitive', accent: '#8A9E85' },
  { value: 'fertility', label: 'Fertility & Hormonal', accent: '#B8A4D4' },
  { value: 'hair', label: 'Hair Restoration', accent: '#C4A265' },
  { value: 'weight', label: 'Weight & Metabolic', accent: '#5BA87A' },
  { value: 'longevity', label: 'Longevity & Anti-Aging', accent: '#7A9FBF' },
  { value: 'skin', label: 'Skin Improvement', accent: '#C9A96E' },
  { value: 'general', label: 'General Wellness', accent: '#8A9E85' },
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  goal: '',
  experience: '',
  struggle: '',
  timeline: '',
  investment: '',
  commitment: '',
  health: '',
}

export default function ApplyPage() {
  const [searchParams] = useSearchParams()
  const programTag = searchParams.get('program') || ''
  const prefilledName = searchParams.get('name') || ''
  const prefilledEmail = searchParams.get('email') || ''
  const [form, setForm] = useState({ ...initialForm, goal: programTag, name: prefilledName, email: prefilledEmail })
  // Only show Foundation ($299) tier when coming via ?program=foundation
  const showFoundationTier = programTag === 'foundation'
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState({})
  // ── VIP account ─────────────────────────────────────────────────────────
  const [vipAccount, setVipAccount] = useState(null)

  // ── Inline payment ──────────────────────────────────────────────────────
  const [selectedTier, setSelectedTier] = useState(null)
  const [payMethod, setPayMethod] = useState('stripe')
  const [paySending, setPaySending] = useState(false)
  const [payError, setPayError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [showCardForm, setShowCardForm] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [creatingVipAfterPayment, setCreatingVipAfterPayment] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [submitted])

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.goal) e.goal = 'Please select a goal'
    if (!form.experience) e.experience = 'Please select one'
    if (!form.timeline) e.timeline = 'Please select one'
    if (!form.investment) e.investment = 'Please select one'
    if (!form.commitment) e.commitment = 'Please select one'
    return e
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSending(true)

    const goalLabel = programs.find(p => p.value === form.goal)?.label || form.goal

    const payload = {
      name:        form.name,
      email:       form.email,
      phone:       form.phone || 'Not provided',
      program:     goalLabel,
      experience:  form.experience,
      struggle:    form.struggle || 'Not provided',
      timeline:    form.timeline,
      investment:  form.investment,
      commitment:  form.commitment,
      health:      form.health || 'Not provided',
    }

    try {
      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.error('API submission error:', err)
    } finally {
      setSending(false)
    }
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  // ── Inline payment handlers ──────────────────────────────────────────────
  async function handleStartPayment(tierKey) {
    setSelectedTier(tierKey)
    const isVip = tierKey === 'vip'
    const cents = isVip ? 240000 : 29999
    const display = isVip ? 2400.00 : 299.99
    const label = isVip ? 'VIP Transformation Program' : 'Foundation Coaching'

    setPaySending(true)
    setPayError('')
    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ name: `${label} — ${vipAccount.program}`, price: display, quantity: 1, priceNum: display }],
          discountApplied: false,
          programCheckout: true,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setPayError(data.error || 'Payment service unavailable')
        setPaySending(false)
        return
      }
      setClientSecret(data.clientSecret)
      setShowCardForm(true)
    } catch {
      setPayError('Payment service temporarily unavailable')
    }
    setPaySending(false)
  }

  async function handleZelleSubmit(tierKey) {
    setSelectedTier(tierKey)
    setPayError('')
    setPaySending(true)
    const isVip = tierKey === 'vip'
    const label = isVip ? 'VIP Transformation Program' : 'Foundation Coaching'
    try {
      // Create VIP account first
      const vipRes = await fetch('/api/vip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          email: form.email,
          name: form.name,
          program: programs.find(p => p.value === form.goal)?.label || form.goal,
          tier: tierKey,
        }),
      })
      const vipData = await vipRes.json()
      if (!vipRes.ok) {
        setPayError(vipData.error || 'Unable to create account')
        setPaySending(false)
        return
      }

      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'program_order',
          name: form.name,
          email: form.email,
          program: vipData.program,
          tier: tierKey,
          vipId: vipData.vipId,
          paymentMethod: 'zelle',
        }),
      })
      setVipAccount(vipData)
    } catch (err) {
      console.error('API error:', err)
      setPayError('Something went wrong. We\'ll follow up by email.')
    }
    setPaySending(false)
    setPaymentSuccess(true)
    window.scrollTo(0, 0)
  }

  function handleCardSuccess() {
    setPaymentSuccess(true)
    setCreatingVipAfterPayment(true)
    // Create VIP account asynchronously after payment
    fetch('/api/vip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'register',
        email: form.email,
        name: form.name,
        program: programs.find(p => p.value === form.goal)?.label || form.goal,
        tier: selectedTier,
      }),
    })
      .then(r => r.json())
      .then(data => {
        setVipAccount(data)
        setCreatingVipAfterPayment(false)
        // Send confirmation email
        fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'program_order',
            name: form.name,
            email: form.email,
            program: data.program,
            tier: selectedTier,
            vipId: data.vipId,
            paymentMethod: 'stripe',
            stripePaymentId: 'paid_inline',
          }),
        }).catch(() => {})
      })
      .catch(() => {
        setCreatingVipAfterPayment(false)
      })
    window.scrollTo(0, 0)
  }

  function handleCardError(msg) {
    setPayError(msg)
  }

  if (submitted) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
        <SEO title="Application Received" description="Your application for a personalized peptide program has been received. We'll respond within 24-48 hours." />
        <Navbar />
        <section style={{ paddingTop: '140px', paddingBottom: '100px' }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div style={{ width: '56px', height: '56px', border: '1px solid #C9A96E44', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
              <span style={{ color: '#C9A96E', fontSize: '22px' }}>✔</span>
            </div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '20px' }}
              className="uppercase">Application Received</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2.6rem', lineHeight: '1.12', marginBottom: '20px' }}
              className="font-normal">
              We've received<br />your application.
            </h1>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '16px', lineHeight: '1.9', marginBottom: '48px' }}>
              We review every application personally. You'll hear from us within <strong style={{ color: '#2A2A2A' }}>24–48 hours</strong> with next steps tailored to your goals.
            </p>

            {/* ── Consultation call ── */}
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DDD0', padding: '40px', marginBottom: '32px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }}
                className="uppercase">Want to move faster?</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.4rem', lineHeight: '1.3', marginBottom: '12px' }}
                className="font-normal">Book a consultation call directly.</h2>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8', marginBottom: '24px' }}>
                Skip the wait — schedule a 20-minute call and we'll walk through your goals and the right protocol for you.
              </p>
              <a href="https://calendly.com/a-ringfield-trustetc" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '16px 40px', textDecoration: 'none' }}
                className="uppercase hover:opacity-90 transition-opacity">
                Book Your Call →
              </a>
            </div>

            {/* ── VIP Account ── */}
            <div style={{
              backgroundColor: '#FFFFFF', border: '1px solid #C9A96E33', padding: '40px',
              marginBottom: '32px', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '0', right: '0', width: '50px', height: '50px',
                background: 'linear-gradient(135deg, transparent 50%, #C9A96E10 50%)',
              }}></div>

              {!paymentSuccess ? (
                <>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '9px', marginBottom: '12px' }}
                    className="uppercase">Lion Elite VIP</p>
                  <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.3rem', lineHeight: '1.3', marginBottom: '12px' }}
                    className="font-normal">Choose your program tier</h2>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7', marginBottom: '20px' }}>
                    Select your tier and pay now. Your VIP account will be created automatically after payment — linking all your program details in one place.
                  </p>

                  <div style={{ borderTop: '1px solid #E8DDD0', paddingTop: '24px' }}>

                    {/* VIP — Primary */}
                    <div style={{
                      backgroundColor: '#F5F0E8', border: '1px solid #C9A96E', padding: '24px',
                      marginBottom: '16px', position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{
                        position: 'absolute', top: 0, right: 0,
                        background: 'linear-gradient(135deg, transparent 50%, #C9A96E15 50%)',
                        width: '60px', height: '60px',
                      }}></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.15em', fontSize: '9px', marginBottom: '4px' }}
                            className="uppercase">Most Popular</p>
                          <h3 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.1rem' }}>VIP Transformation Program</h3>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '22px', lineHeight: '1' }}>$2,400</p>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.1em' }}>/ 6 MONTHS</p>
                        </div>
                      </div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', lineHeight: '1.7', marginBottom: '16px' }}>
                        Full biomarker testing, fully personalized protocol, bi-weekly check-ins, lab review, direct messaging with your specialist.
                      </p>

                      {/* Payment buttons */}
                      <div className="flex flex-col gap-2">
                        <button onClick={() => handleStartPayment('vip')} disabled={paySending}
                          style={{
                            display: 'inline-block', backgroundColor: '#C9A96E', color: '#000',
                            fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em',
                            padding: '16px 40px', textDecoration: 'none', width: '100%', textAlign: 'center',
                            border: 'none', cursor: paySending ? 'not-allowed' : 'pointer',
                          }}
                          className="uppercase hover:opacity-90 transition-opacity">
                          {paySending && selectedTier === 'vip' ? 'Processing…' : 'Pay with Card — $2,400'}
                        </button>
                        <button onClick={() => handleZelleSubmit('vip')} disabled={paySending}
                          style={{
                            display: 'inline-block', backgroundColor: 'transparent', color: '#6A6A6A',
                            fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.15em',
                            padding: '12px', textDecoration: 'none', width: '100%', textAlign: 'center',
                            border: '1px solid #E0D5C5', cursor: paySending ? 'not-allowed' : 'pointer',
                          }}
                          className="uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all">
                          Pay via Zelle — +1 (216) 326-0050
                        </button>
                      </div>

                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '10px', marginTop: '8px', marginBottom: selectedTier === 'vip' && showCardForm && clientSecret ? '0' : '0' }}>
                        Send payment to <strong>+1 (216) 326-0050</strong> via Zelle. Include your name in the memo.
                      </p>

                      {selectedTier === 'vip' && showCardForm && clientSecret && (
                        <div style={{
                          marginTop: '16px', backgroundColor: '#FFFFFF', border: '2px solid #C9A96E',
                          padding: '20px',
                        }}>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600', marginBottom: '16px' }}
                            className="uppercase">Secure Card Payment</p>
                          <Elements
                            stripe={getStripe()}
                            options={{
                              clientSecret,
                              appearance: {
                                theme: 'stripe',
                                variables: {
                                  colorPrimary: '#C9A96E',
                                  colorBackground: '#FFFFFF',
                                  colorText: '#2A2A2A',
                                  fontFamily: 'Helvetica Neue, Arial, sans-serif',
                                  borderRadius: '0px',
                                },
                              },
                            }}
                          >
                            <StripePaymentSection
                              email={form.email}
                              name={form.name}
                              finalTotal={2400.00}
                              onSuccess={handleCardSuccess}
                              onError={handleCardError}
                            />
                          </Elements>
                        </div>
                      )}
                    </div>

                    {/* Foundation — Secondary (only shown for foundation applications) */}
                    {showFoundationTier && <div style={{
                      backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '18px 20px',
                      marginBottom: '12px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div>
                          <p style={{ fontFamily: 'Georgia, serif', fontSize: '14px', marginBottom: '2px' }}>Foundation Coaching</p>
                          <p style={{ color: '#8A8A8A', fontSize: '11px' }}>Monthly coaching &amp; wellness roadmap</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontFamily: 'Georgia, serif', color: '#6A6A6A', fontSize: '16px' }}>$299.99</p>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '9px', letterSpacing: '0.1em' }}>/ MONTH</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => handleStartPayment('foundation')} disabled={paySending}
                          style={{
                            display: 'inline-block', backgroundColor: '#C9A96E', color: '#000',
                            fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em',
                            padding: '14px 32px', textDecoration: 'none', width: '100%', textAlign: 'center',
                            border: 'none', cursor: paySending ? 'not-allowed' : 'pointer',
                          }}
                          className="uppercase hover:opacity-90 transition-opacity">
                          {paySending && selectedTier === 'foundation' ? 'Processing…' : 'Pay with Card — $299.99'}
                        </button>
                        <button onClick={() => handleZelleSubmit('foundation')} disabled={paySending}
                          style={{
                            display: 'inline-block', backgroundColor: 'transparent', color: '#8A8A8A',
                            fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.15em',
                            padding: '10px', textDecoration: 'none', width: '100%', textAlign: 'center',
                            border: '1px solid #E0D5C5', cursor: paySending ? 'not-allowed' : 'pointer',
                          }}
                          className="uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all">
                          Pay via Zelle — +1 (216) 326-0050
                        </button>
                      </div>

                      {selectedTier === 'foundation' && showCardForm && clientSecret && (
                        <div style={{
                          marginTop: '16px', backgroundColor: '#FFFFFF', border: '2px solid #C9A96E',
                          padding: '20px',
                        }}>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600', marginBottom: '16px' }}
                            className="uppercase">Secure Card Payment</p>
                          <Elements
                            stripe={getStripe()}
                            options={{
                              clientSecret,
                              appearance: {
                                theme: 'stripe',
                                variables: {
                                  colorPrimary: '#C9A96E',
                                  colorBackground: '#FFFFFF',
                                  colorText: '#2A2A2A',
                                  fontFamily: 'Helvetica Neue, Arial, sans-serif',
                                  borderRadius: '0px',
                                },
                              },
                            }}
                          >
                            <StripePaymentSection
                              email={form.email}
                              name={form.name}
                              finalTotal={299.99}
                              onSuccess={handleCardSuccess}
                              onError={handleCardError}
                            />
                          </Elements>
                        </div>
                      )}
                    </div>}

                    {payError && (
                      <div style={{ backgroundColor: '#FFF0F0', border: '1px solid #E05A5A44', padding: '14px 18px', marginTop: '16px' }}>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px' }}>{payError}</p>
                      </div>
                    )}
                  </div>
                </>
              ) : creatingVipAfterPayment ? (
                <>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '9px', marginBottom: '12px' }}
                    className="uppercase">✓ Payment Received</p>
                  <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.3rem', lineHeight: '1.3', marginBottom: '12px' }}
                    className="font-normal">Creating your VIP account…</h2>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7' }}>
                    Just a moment — we're setting up your VIP portal with all your program details.
                  </p>
                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      width: '32px', height: '32px', border: '2px solid #E8DDD0',
                      borderTopColor: '#C9A96E', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }}></div>
                  </div>
                </>
              ) : !vipAccount ? (
                <>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '9px', marginBottom: '12px' }}
                    className="uppercase">✓ Payment Successful</p>
                  <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.3rem', lineHeight: '1.3', marginBottom: '12px' }}
                    className="font-normal">Almost there…</h2>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7' }}>
                    We're finalizing your VIP account. You'll receive your program details by email shortly.
                  </p>
                </>
              ) : (
                <>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '9px', marginBottom: '12px' }}
                    className="uppercase">✓ Enrollment Complete</p>
                  <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.3rem', lineHeight: '1.3', marginBottom: '8px' }}
                    className="font-normal">Welcome to the Lion Elite Family!</h2>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '14px', marginBottom: '16px' }}>
                    ✓ Payment received. You'll receive your program details by email shortly.
                  </p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', marginBottom: '4px' }}>
                    VIP ID: <strong style={{ color: '#C9A96E', letterSpacing: '0.15em' }}>{vipAccount.vipId}</strong>
                  </p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px' }}>
                    Program: {vipAccount.program}
                  </p>
                </>
              )}
            </div>

            <Link to="/"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
              className="uppercase hover:text-[#C9A96E] transition-colors">
              ← Return to Home
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="Apply for a Program" description="Apply for a personalized peptide optimization program. We review every application personally and respond within 24-48 hours." />
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#FAF7F2', paddingTop: '140px', paddingBottom: '64px', borderBottom: '1px solid #E8DDD0' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '20px' }}
            className="uppercase">Program Application</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '3rem', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '24px' }}
            className="font-normal">
            Apply for a Personalized<br />Peptide Optimization Program.
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '16px', lineHeight: '1.9', maxWidth: '560px', marginBottom: '16px' }}>
            This short application helps us understand your goals and determine the best protocol for you. Every response is reviewed personally before we reach out.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '10px 16px' }}>
            <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', letterSpacing: '0.08em' }}>We only take on a limited number of clients at a time.</p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ backgroundColor: '#F5F0E8', padding: '80px 0' }}>
        <div className="max-w-3xl mx-auto px-6">
          <form onSubmit={handleSubmit} noValidate>

            {/* ── 1. Basic Info ── */}
            <FormBlock label="01" title="Your Details" subtitle="Keep it brief — just the basics.">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Full Name *" error={errors.name}>
                  <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)}
                    placeholder="Your full name" style={inputStyle(errors.name)} />
                </Field>
                <Field label="Email Address *" error={errors.email}>
                  <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)}
                    placeholder="you@email.com" style={inputStyle(errors.email)} />
                </Field>
              </div>
              <Field label="Phone Number (optional)">
                <input type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)}
                  placeholder="+1 (000) 000-0000" style={inputStyle()} />
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 2. Primary Goal ── */}
            <FormBlock label="02" title="Primary Goal" subtitle="What are you looking to achieve? Select the one that fits best.">
              <Field label="What is your main goal? *" error={errors.goal}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {programs.map(p => (
                    <button key={p.value} type="button"
                      onClick={() => handleChange('goal', p.value)}
                      style={{
                        padding: '12px 8px',
                        backgroundColor: form.goal === p.value ? '#FFFFFF' : '#FAFAF8',
                        border: form.goal === p.value ? `1px solid ${p.accent}` : '1px solid #E0D5C5',
                        color: form.goal === p.value ? '#2A2A2A' : '#6A6A6A',
                        fontFamily: 'Helvetica Neue, Arial, sans-serif',
                        fontSize: '11px', letterSpacing: '0.08em',
                        cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center',
                        lineHeight: '1.4',
                      }}>
                      {p.label}
                    </button>
                  ))}
                </div>
                {errors.goal && <p style={{ color: '#E05A5A', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', marginTop: '8px' }}>{errors.goal}</p>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 3. Current Situation ── */}
            <FormBlock label="03" title="Your Current Situation" subtitle="This helps us calibrate the right starting point.">
              <Field label="Where are you currently at? *" error={errors.experience}>
                <div className="space-y-2">
                  {[
                    { value: 'beginner', label: 'Beginner', sub: 'New to peptides or optimization protocols' },
                    { value: 'some', label: 'Some Experience', sub: 'I\'ve tried a few supplements or protocols before' },
                    { value: 'advanced', label: 'Advanced', sub: 'I\'ve used structured peptide protocols previously' },
                  ].map(opt => (
                    <RadioCard key={opt.value} selected={form.experience === opt.value}
                      onClick={() => handleChange('experience', opt.value)}
                      label={opt.label} sub={opt.sub} />
                  ))}
                </div>
                {errors.experience && <ErrorMsg>{errors.experience}</ErrorMsg>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 4. Pain Points ── */}
            <FormBlock label="04" title="What You're Struggling With" subtitle="Be specific — this is where we start building your protocol.">
              <Field label="What are you currently struggling with?">
                <textarea value={form.struggle} onChange={e => handleChange('struggle', e.target.value)}
                  rows={4} placeholder="E.g. Low energy despite good sleep, early signs of skin aging, difficulty with body composition, brain fog..."
                  style={{ ...inputStyle(), resize: 'vertical', minHeight: '100px' }} />
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 5. Timeline ── */}
            <FormBlock label="05" title="Your Timeline" subtitle="How urgent is this for you?">
              <Field label="How soon are you looking to start? *" error={errors.timeline}>
                <div className="space-y-2">
                  {[
                    { value: 'asap', label: 'As soon as possible', sub: 'I\'m ready to commit and get started now' },
                    { value: '2-4weeks', label: 'Within 2–4 weeks', sub: 'I want to start soon but need a little time to prepare' },
                    { value: 'exploring', label: 'Just exploring', sub: 'I\'m researching options and not ready to commit yet' },
                  ].map(opt => (
                    <RadioCard key={opt.value} selected={form.timeline === opt.value}
                      onClick={() => handleChange('timeline', opt.value)}
                      label={opt.label} sub={opt.sub} />
                  ))}
                </div>
                {errors.timeline && <ErrorMsg>{errors.timeline}</ErrorMsg>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 6. Investment ── */}
            <FormBlock label="06" title="Investment Level"
              subtitle="This helps us recommend the right tier of program for your goals.">
              <Field label="What level of investment are you comfortable with for a personalized program? *" error={errors.investment}>
                <div className="space-y-2">
                  {[
                    { value: '100-300', label: '$100–300 / month', sub: 'Entry-level protocol with core support' },
                    { value: '300-700', label: '$300–700 / month', sub: 'Full protocol with check-ins and adjustments' },
                    { value: '700+', label: '$700+ / month', sub: 'Premium, fully personalized and managed protocol' },
                  ].map(opt => (
                    <RadioCard key={opt.value} selected={form.investment === opt.value}
                      onClick={() => handleChange('investment', opt.value)}
                      label={opt.label} sub={opt.sub} />
                  ))}
                </div>
                {errors.investment && <ErrorMsg>{errors.investment}</ErrorMsg>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 7. Commitment ── */}
            <FormBlock label="07" title="Commitment Level" subtitle="Peptide optimization requires consistency. Be honest with yourself.">
              <Field label="How committed are you to following a structured protocol? *" error={errors.commitment}>
                <div className="space-y-2">
                  {[
                    { value: 'very', label: 'Very committed', sub: 'I\'ll follow the protocol as prescribed — no excuses' },
                    { value: 'somewhat', label: 'Somewhat committed', sub: 'I\'ll do my best but life happens' },
                    { value: 'exploring', label: 'Still deciding', sub: 'I\'m not sure I\'m ready to fully commit yet' },
                  ].map(opt => (
                    <RadioCard key={opt.value} selected={form.commitment === opt.value}
                      onClick={() => handleChange('commitment', opt.value)}
                      label={opt.label} sub={opt.sub} />
                  ))}
                </div>
                {errors.commitment && <ErrorMsg>{errors.commitment}</ErrorMsg>}
              </Field>
            </FormBlock>

            <Divider />

            {/* ── 8. Health Background ── */}
            <FormBlock label="08" title="Health Background" subtitle="Optional — only share what you're comfortable with.">
              <Field label="Any relevant health conditions or concerns we should be aware of?">
                <textarea value={form.health} onChange={e => handleChange('health', e.target.value)}
                  rows={3} placeholder="E.g. thyroid condition, recent surgery, allergies, ongoing medication..."
                  style={{ ...inputStyle(), resize: 'vertical' }} />
              </Field>
            </FormBlock>

            <Divider />

            {/* ── Submit ── */}
            <div style={{ paddingTop: '48px' }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '40px', marginBottom: '32px' }}>
                <div className="flex items-start gap-3 mb-4">
                  <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%', flexShrink: 0, marginTop: '7px' }}></div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8' }}>
                    Your application is reviewed personally. We'll follow up within <span style={{ color: '#2A2A2A' }}>24–48 hours</span> with a tailored response and next steps.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%', flexShrink: 0, marginTop: '7px' }}></div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8' }}>
                    After submitting, you'll have the option to book a direct consultation call to accelerate the process.
                  </p>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px', marginBottom: '20px', letterSpacing: '0.05em' }}>
                  Please complete all required fields before submitting.
                </p>
              )}

              <button type="submit"
                disabled={sending}
                style={{
                  width: '100%', backgroundColor: sending ? '#B0A080' : '#C9A96E', color: '#000',
                  fontFamily: 'Helvetica Neue, Arial, sans-serif',
                  fontSize: '13px', letterSpacing: '0.2em',
                  padding: '20px', border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase', transition: 'background-color 0.2s',
                }}
                className="hover:opacity-90 transition-opacity">
                {sending ? 'Sending…' : 'Submit My Application →'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FormBlock({ label, title, subtitle, children }) {
  return (
    <div style={{ marginBottom: '0' }}>
      <div className="flex items-start gap-6 mb-8">
        <div style={{ width: '40px', height: '40px', border: '1px solid #C9A96E44', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '12px' }}>{label}</span>
        </div>
        <div>
          <h3 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.2rem', marginBottom: '4px' }}>{title}</h3>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px' }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ paddingLeft: '0' }}>{children}</div>
    </div>
  )
}

function Divider() {
  return <div style={{ borderTop: '1px solid #E0D5C5', margin: '52px 0' }}></div>
}

function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{ display: 'block', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '8px' }}
          className="uppercase">
          {label}
        </label>
      )}
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  )
}

function ErrorMsg({ children }) {
  return (
    <p style={{ color: '#E05A5A', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', marginTop: '6px' }}>{children}</p>
  )
}

function RadioCard({ selected, onClick, label, sub }) {
  return (
    <button type="button" onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', padding: '16px 20px',
        backgroundColor: selected ? '#FFFFFF' : '#FAFAF8',
        border: selected ? '1px solid #C9A96E' : '1px solid #E0D5C5',
        cursor: 'pointer', transition: 'all 0.15s',
        display: 'flex', alignItems: 'center', gap: '14px',
      }}>
      <div style={{
        width: '14px', height: '14px', borderRadius: '50%', flexShrink: 0,
        border: selected ? '1px solid #C9A96E' : '1px solid #C0B5A5',
        backgroundColor: selected ? '#C9A96E' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {selected && <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#000' }}></div>}
      </div>
      <div>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: selected ? '#2A2A2A' : '#6A6A6A', fontSize: '13px', marginBottom: '2px' }}>{label}</p>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '11px' }}>{sub}</p>
      </div>
    </button>
  )
}

function inputStyle(error) {
  return {
    width: '100%', backgroundColor: '#FFFFFF',
    border: error ? '1px solid #E05A5A' : '1px solid #E0D5C5',
    color: '#2A2A2A', fontFamily: 'Helvetica Neue, Arial, sans-serif',
    fontSize: '14px', padding: '14px 16px',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  }
}
