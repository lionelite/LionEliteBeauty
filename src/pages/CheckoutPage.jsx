import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useCart } from '../context/CartContext'
import StripePaymentSection from '../components/StripePaymentSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

let stripePromise
function getStripe() {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  if (!key) return null
  if (!stripePromise) stripePromise = loadStripe(key)
  return stripePromise
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // ── Handle redirect return from Affirm / Klarna / Afterpay ────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const piSecret = params.get('payment_intent_client_secret')
    if (!piSecret) return

    window.history.replaceState({}, '', '/checkout')

    const saved = sessionStorage.getItem('leb_checkout')
    if (saved) {
      const data = JSON.parse(saved)
      checkoutDataRef.current = data
      setName(data.name || '')
      setEmail(data.email || '')
      setPhone(data.phone || '')
      setAddress(data.address || '')
      setCity(data.city || '')
      setState(data.state || '')
      setZip(data.zip || '')
      setDiscountCode(data.discountCode || '')
      setDiscountApplied(data.discountApplied || false)
      setPaymentMethod(data.paymentMethod || 'stripe')
      if (data.rewardData) setRewardData(data.rewardData)
      if (data.rewardMode) setRewardMode(data.rewardMode)

      const stripe = getStripe()
      if (stripe) {
        stripe.retrievePaymentIntent(piSecret).then(({ paymentIntent }) => {
          if (paymentIntent.status === 'succeeded') {
            submitOrder(paymentIntent.id)
          } else if (paymentIntent.status === 'processing') {
            setStripeError('Your payment is still processing. Please check your email for confirmation.')
          } else {
            setStripeError('Payment was not completed. You can try again.')
          }
        })
      }
    }
  }, [])

  // ── Form state ──────────────────────────────────────────────────────────
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
  const [showCardForm, setShowCardForm] = useState(false)

  // Ref to hold checkout data for redirect return (Affirm/Klarna/Afterpay)
  const checkoutDataRef = useRef({})

  // ── Address validation ──────────────────────────────────────────────────
  const [addressErrors, setAddressErrors] = useState({})
  const [addressTouched, setAddressTouched] = useState({})

  function validateAddressField(field, value) {
    switch (field) {
      case 'address':
        return value.trim().length < 5 ? 'Enter a valid street address' : ''
      case 'city':
        return value.trim().length < 2 ? 'Enter a valid city' : ''
      case 'state':
        return !value ? 'Select a state' : ''
      case 'zip': {
        const clean = value.replace(/[^0-9-]/g, '')
        if (!/^\d{5}(-\d{4})?$/.test(clean)) return 'Enter a valid 5-digit ZIP code'
        return ''
      }
      default:
        return ''
    }
  }

  function formatZip(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`
    return digits
  }

  function handleAddressBlur(field) {
    setAddressTouched(prev => ({ ...prev, [field]: true }))
    const val = field === 'zip' ? zip : field === 'state' ? state : field === 'address' ? address : city
    const err = validateAddressField(field, val)
    setAddressErrors(prev => ({ ...prev, [field]: err }))
  }

  function allAddressValid() {
    return (
      !validateAddressField('address', address) &&
      !validateAddressField('city', city) &&
      !validateAddressField('state', state) &&
      !validateAddressField('zip', zip)
    )
  }

  // ── Discount code ──────────────────────────────────────────────────────
  function handleApplyDiscount() {
    if (discountCode.trim().toLowerCase() === 'lion10') {
      setDiscountApplied(true)
    } else {
      alert('Invalid discount code')
    }
  }

  // ── Rewards state ──────────────────────────────────────────────────────
  const [rewardMode, setRewardMode] = useState('guest') // 'guest' | 'join' | 'login'
  const [rewardData, setRewardData] = useState(null)    // { rewardId, points, lifetimePoints, ... }
  const [rewardLoading, setRewardLoading] = useState(false)
  const [rewardMessage, setRewardMessage] = useState('')
  const [pointsEarned, setPointsEarned] = useState(0)   // points from this order

  const finalTotal = discountApplied ? (subtotal * 0.9) : subtotal
  const estPointsEarned = finalTotal > 0 ? Math.floor(finalTotal) : 0

  // ── Rewards: Register or Login ─────────────────────────────────────────
  async function handleRewardAction(action) {
    if (!email.trim()) {
      setRewardMessage('Enter your email first')
      return
    }
    setRewardLoading(true)
    setRewardMessage('')
    try {
      const res = await fetch('/api/rewards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, email: email.trim(), name: name.trim() || email.split('@')[0] }),
      })
      const data = await res.json()
      if (!res.ok) {
        setRewardMessage(data.error || 'Rewards service unavailable')
      } else {
        setRewardData(data)
        setRewardMessage(data.message || '')
      }
    } catch {
      setRewardMessage('Rewards service unavailable')
    }
    setRewardLoading(false)
  }

  async function handlePayNow(e) {
    e.preventDefault()

    // Validate all address fields
    const errs = {
      address: validateAddressField('address', address),
      city: validateAddressField('city', city),
      state: validateAddressField('state', state),
      zip: validateAddressField('zip', zip),
    }
    setAddressErrors(errs)
    setAddressTouched({ address: true, city: true, state: true, zip: true })
    if (Object.values(errs).some(Boolean)) return
    if (!name.trim() || !email.trim()) return

    // Save order data in case of redirect (Affirm/Klarna/Afterpay)
    const checkoutData = {
      name: name.trim(), email: email.trim(), phone,
      address, city, state, zip,
      discountCode, discountApplied,
      paymentMethod,
      rewardData, rewardMode,
      items, finalTotal,
    }
    checkoutDataRef.current = checkoutData
    sessionStorage.setItem('leb_checkout', JSON.stringify(checkoutData))

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
    const d = checkoutDataRef.current
    if (!d.items || d.items.length === 0) {
      setSending(false)
      setPlaced(true)
      clearCart()
      window.scrollTo(0, 0)
      return
    }
    setSending(true)
    try {
      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order',
          name: d.name, email: d.email,
          phone: d.phone || 'Not provided',
          address: `${d.address}, ${d.city}, ${d.state} ${d.zip}`,
          discountCode: d.discountApplied ? d.discountCode : 'None',
          items: d.items.map(i => ({ name: i.name, quantity: i.quantity, price: i.priceNum })),
          paymentMethod: d.paymentMethod,
          ...(stripePaymentId ? { stripePaymentId } : {}),
        }),
      })

      // Add points if user has a rewards account
      const finalTotalVal = d.discountApplied ? (d.items.reduce((s, i) => s + (i.priceNum || 0) * i.quantity, 0) * 0.9) : d.items.reduce((s, i) => s + (i.priceNum || 0) * i.quantity, 0)
      const rewData = d.rewardData
      const rewMode = d.rewardMode
      const rewEmail = d.email

      if (rewData?.rewardId && finalTotalVal > 0) {
        const ptsRes = await fetch('/api/rewards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'add-points',
            email: rewEmail,
            orderAmountCents: Math.round(finalTotalVal * 100),
          }),
        })
        if (ptsRes.ok) {
          const ptsData = await ptsRes.json()
          setPointsEarned(ptsData.pointsEarned || 0)
          setRewardData(ptsData)
        }
      } else if (rewMode === 'join' && !rewData) {
        const regRes = await fetch('/api/rewards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'register', email: rewEmail, name: d.name || rewEmail.split('@')[0],
          }),
        })
        if (regRes.ok) {
          const regData = await regRes.json()
          setRewardData(regData)
        }
      } else if (rewData?.rewardId && finalTotalVal > 0) {
        const ptsRes = await fetch('/api/rewards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'add-points', email: rewEmail,
            orderAmountCents: Math.round(finalTotalVal * 100),
          }),
        })
        if (ptsRes.ok) {
          const ptsData = await ptsRes.json()
          setPointsEarned(ptsData.pointsEarned || 0)
          setRewardData(ptsData)
        } else {
          setRewardData(regData)
        }
      }
    } catch (err) {
      console.error('API error:', err)
    }
    setSending(false)
    setPlaced(true)
    clearCart()
    sessionStorage.removeItem('leb_checkout')
    window.scrollTo(0, 0)
  }

  // ── Order placed confirmation ────────────────────────────────────────────
  if (placed) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
        <Navbar />
        <section style={{ paddingTop: '140px', paddingBottom: '100px' }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div style={{ width: '56px', height: '56px', border: '1px solid #C9A96E44', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
              <span style={{ color: '#C9A96E', fontSize: '22px' }}>✔</span>
            </div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '20px' }}
              className="uppercase">Order Placed</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2.6rem', lineHeight: '1.12', marginBottom: '20px' }}
              className="font-normal">
              Your order has been<br />received.
            </h1>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
            {paymentMethod === 'stripe' && (
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '15px', lineHeight: '1.9', marginBottom: '12px' }}>
                ✓ Payment successful. You'll receive a confirmation email shortly.
              </p>
            )}
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.9', marginBottom: '32px' }}>
              We'll confirm your shipping details within 24 hours.
            </p>

            {/* ── Rewards earned ── */}
            {(rewardData || pointsEarned > 0) && (
              <div style={{ backgroundColor: '#F5F0E8', border: '1px solid #E0D5C5', padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.25em', fontSize: '9px', marginBottom: '12px' }} className="uppercase">
                  Lion Elite Rewards
                </p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.6rem', marginBottom: '4px' }}>
                  +{pointsEarned || estPointsEarned} points earned
                </p>
                {rewardData?.rewardId && (
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', marginBottom: '8px' }}>
                    Reward ID: <span style={{ color: '#C9A96E', fontWeight: 'bold', letterSpacing: '0.1em' }}>{rewardData.rewardId}</span>
                  </p>
                )}
                {rewardData?.points !== undefined && (
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px' }}>
                    Total Balance: <strong style={{ color: '#2A2A2A' }}>{rewardData.points} points</strong>
                  </p>
                )}
              </div>
            )}

            {paymentMethod !== 'stripe' && (
              <div style={{ backgroundColor: '#F5F0E8', border: '1px solid #E0D5C5', padding: '40px', marginTop: '24px', textAlign: 'left' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.2rem', marginBottom: '20px', textAlign: 'center' }}>
                  Send Payment To Complete Your Order</p>
                {paymentMethod === 'zelle' && (
                  <div style={{ backgroundColor: '#FAF7F2', border: '1px solid #E0D5C5', padding: '24px' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div style={{ width: '36px', height: '36px', backgroundColor: '#6C1FD1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.1em', fontWeight: 'bold' }}>Z</span>
                      </div>
                      <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '16px' }}>Zelle</p>
                    </div>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7' }}>
                      Send payment to: <strong style={{ color: '#C9A96E' }}>orders@lionelitebeauty.com</strong>
                    </p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', lineHeight: '1.6', marginTop: '8px' }}>
                      Include your order name in the memo so we can match it.
                    </p>
                  </div>
                )}
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', lineHeight: '1.7', textAlign: 'center', marginTop: '20px' }}>
                  Your order will ship once payment is confirmed. We'll notify you by email.
                </p>
              </div>
            )}
            <Link to="/"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none', display: 'inline-block', marginTop: '40px' }}
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
  if (items.length === 0 && !placed) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
        <Navbar />
        <section style={{ paddingTop: '140px', paddingBottom: '100px', textAlign: 'center' }}>
          <div className="max-w-2xl mx-auto px-6">
            <p style={{ fontFamily: 'Georgia, serif', color: '#6A6A6A', fontSize: '1.2rem', marginBottom: '24px' }}>
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
    width: '100%', padding: '14px 18px', backgroundColor: '#FFFFFF',
    border: '1px solid #E0D5C5', color: '#2A2A2A',
    fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="Checkout" description="Complete your order for peptide skincare and wellness products." />
      <Navbar />

      <section style={{ paddingTop: '140px', paddingBottom: '64px', borderBottom: '1px solid #E8DDD0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }}
            className="uppercase">Checkout</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2.6rem', lineHeight: '1.1' }}
            className="font-normal">Complete Your Order</h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginTop: '20px' }}></div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-px" style={{ backgroundColor: '#E0D5C5' }}>

            {/* ── Left — Form ─────────────────────────────────────────────── */}
            <div className="md:col-span-3" style={{ backgroundColor: '#FAF7F2', padding: '40px' }}>

              {!showCardForm && (
                <form onSubmit={handlePayNow}>

                  {/* Contact */}
                  <div style={{
                    backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ width: '3px', height: '18px', backgroundColor: '#C9A96E' }}></div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600' }}
                        className="uppercase">Contact</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Full Name *</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} placeholder="Your full name" />
                      </div>
                      <div>
                        <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Email *</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} placeholder="your@email.com" />
                      </div>
                      <div>
                        <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Phone</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} placeholder="+1 (000) 000-0000" />
                      </div>
                    </div>
                  </div>

                  {/* Shipping */}
                  <div style={{
                    backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ width: '3px', height: '18px', backgroundColor: '#C9A96E' }}></div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600' }}
                        className="uppercase">Shipping</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Street Address *</label>
                        <input type="text" value={address}
                          onChange={e => setAddress(e.target.value)}
                          onBlur={() => handleAddressBlur('address')}
                          style={{
                            ...inputStyle,
                            borderColor: addressErrors.address && addressTouched.address ? '#E05A5A' : addressTouched.address && !addressErrors.address ? '#5BA87A' : inputStyle.borderColor,
                          }}
                          placeholder="123 Main Street" />
                        {addressErrors.address && addressTouched.address && (
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '11px', marginTop: '4px' }}>{addressErrors.address}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                          <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">City *</label>
                          <input type="text" value={city}
                            onChange={e => setCity(e.target.value)}
                            onBlur={() => handleAddressBlur('city')}
                            style={{
                              ...inputStyle,
                              borderColor: addressErrors.city && addressTouched.city ? '#E05A5A' : addressTouched.city && !addressErrors.city ? '#5BA87A' : inputStyle.borderColor,
                            }}
                            placeholder="City" />
                          {addressErrors.city && addressTouched.city && (
                            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '11px', marginTop: '4px' }}>{addressErrors.city}</p>
                          )}
                        </div>
                        <div className="col-span-1">
                          <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">State *</label>
                          <select value={state}
                            onChange={e => setState(e.target.value)}
                            onBlur={() => handleAddressBlur('state')}
                            style={{
                              ...inputStyle,
                              borderColor: addressErrors.state && addressTouched.state ? '#E05A5A' : addressTouched.state && !addressErrors.state ? '#5BA87A' : inputStyle.borderColor,
                              appearance: 'none', cursor: 'pointer',
                              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 fill=%27%236A6A6A%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M8 11L3 6h10z%27/%3E%3C/svg%3E")',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 14px center',
                              paddingRight: '36px',
                            }}>
                            <option value="" style={{ color: '#8A8A8A' }}>State</option>
                            {US_STATES.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                          {addressErrors.state && addressTouched.state && (
                            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '11px', marginTop: '4px' }}>{addressErrors.state}</p>
                          )}
                        </div>
                        <div className="col-span-1">
                          <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.1em', display: 'block', marginBottom: '6px' }} className="uppercase">Zip Code *</label>
                          <input type="text" value={zip}
                            onChange={e => setZip(formatZip(e.target.value))}
                            onBlur={() => handleAddressBlur('zip')}
                            style={{
                              ...inputStyle,
                              borderColor: addressErrors.zip && addressTouched.zip ? '#E05A5A' : addressTouched.zip && !addressErrors.zip ? '#5BA87A' : inputStyle.borderColor,
                            }}
                            placeholder="00000" maxLength={10} />
                          {addressErrors.zip && addressTouched.zip && (
                            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '11px', marginTop: '4px' }}>{addressErrors.zip}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Discount Code */}
                  <div style={{
                    backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ width: '3px', height: '18px', backgroundColor: '#C9A96E' }}></div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600' }}
                        className="uppercase">Discount</p>
                    </div>
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
                        10% discount applied — reflected in the total.
                      </p>
                    )}
                  </div>

                  {/* Payment Methods */}
                  <div style={{
                    backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px',
                    marginBottom: '16px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ width: '3px', height: '18px', backgroundColor: '#C9A96E' }}></div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600' }}
                        className="uppercase">Payment</p>
                    </div>

                    {/* Credit/Debit Card */}
                    <div style={{
                      border: paymentMethod === 'stripe' ? '2px solid #C9A96E' : '1px solid #E0D5C5',
                      marginBottom: '12px', overflow: 'hidden',
                    }}>
                      <button type="button" onClick={() => setPaymentMethod('stripe')}
                        style={{
                          width: '100%', backgroundColor: paymentMethod === 'stripe' ? '#FDF8F0' : '#F9F7F4',
                          border: 'none', padding: '16px 20px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <div className="flex items-center gap-3">
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            border: paymentMethod === 'stripe' ? '6px solid #C9A96E' : '2px solid #D0C8BA',
                            transition: 'border 0.15s',
                          }}></div>
                          <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '14px', fontWeight: paymentMethod === 'stripe' ? '600' : '400' }}>
                            Credit / Debit Card
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {['Visa', 'MC', 'Amex', 'Disc'].map(m => (
                            <span key={m} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '9px', letterSpacing: '0.08em', border: '1px solid #D0C8BA', padding: '2px 8px' }}>{m}</span>
                          ))}
                        </div>
                      </button>
                      {paymentMethod === 'stripe' && (
                        <div style={{ backgroundColor: '#FDF8F0', borderTop: '1px solid #E0D5C5', padding: '20px 24px' }}>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7' }}>
                            <span style={{ color: '#C9A96E', fontWeight: '600' }}>✦</span> Pay with card, Klarna, Afterpay, or Affirm — secured by Stripe.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Zelle */}
                    <div style={{
                      border: paymentMethod === 'zelle' ? '2px solid #C9A96E' : '1px solid #E0D5C5',
                      marginBottom: '12px', overflow: 'hidden',
                    }}>
                      <button type="button" onClick={() => setPaymentMethod('zelle')}
                        style={{
                          width: '100%', backgroundColor: paymentMethod === 'zelle' ? '#FDF8F0' : '#F9F7F4',
                          border: 'none', padding: '16px 20px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <div className="flex items-center gap-3">
                          <div style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            border: paymentMethod === 'zelle' ? '6px solid #C9A96E' : '2px solid #D0C8BA',
                            transition: 'border 0.15s',
                          }}></div>
                          <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '14px', fontWeight: paymentMethod === 'zelle' ? '600' : '400' }}>
                            Zelle
                          </span>
                        </div>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#6C1FD1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: '#FFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', fontWeight: 'bold' }}>Z</span>
                        </div>
                      </button>
                      {paymentMethod === 'zelle' && (
                        <div style={{ backgroundColor: '#FDF8F0', borderTop: '1px solid #E0D5C5', padding: '20px 24px 24px' }}>
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.7' }}>
                            Send payment to <strong style={{ color: '#C9A96E' }}>orders@lionelitebeauty.com</strong> via Zelle. Your order will be processed once payment is confirmed.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {stripeError && (
                    <div style={{ backgroundColor: '#FFF0F0', border: '1px solid #E05A5A44', padding: '14px 18px', marginBottom: '16px' }}>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#E05A5A', fontSize: '13px' }}>{stripeError}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button type="submit" disabled={sending}
                    style={{
                      width: '100%', backgroundColor: sending ? '#6A5A3A' : '#C9A96E', color: '#000', border: 'none',
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      fontSize: '13px', letterSpacing: '0.2em',
                      padding: '18px', cursor: sending ? 'not-allowed' : 'pointer',
                      boxShadow: sending ? 'none' : '0 2px 12px rgba(201, 169, 110, 0.3)',
                    }}
                    className="uppercase hover:opacity-90 transition-opacity">
                    {sending
                      ? 'Processing…'
                      : paymentMethod === 'stripe'
                        ? `Pay $${finalTotal.toFixed(2)} — Secure Payment`
                        : 'Place Order — See Payment Details →'
                    }
                  </button>
                </form>
              )}

              {/* Inline Card Payment Form — OUTSIDE main form to prevent nested form bug */}
              {showCardForm && clientSecret && paymentMethod === 'stripe' && (
                <div style={{
                  backgroundColor: '#FFFFFF', border: '2px solid #C9A96E',
                  padding: '28px',
                }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', letterSpacing: '0.2em', fontSize: '10px', fontWeight: '600', marginBottom: '20px' }}
                    className="uppercase">Secure Card Payment</p>

                  <Elements
                    stripe={getStripe()}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        labels: 'floating',
                        variables: {
                          colorPrimary: '#C9A96E',
                          colorBackground: '#FFFFFF',
                          colorText: '#2A2A2A',
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
                      finalTotal={finalTotal}
                      onSuccess={handleCardSuccess}
                      onError={handleCardError}
                      saveOrderData={() => {
                        sessionStorage.setItem('leb_checkout', JSON.stringify({
                          name: name.trim(), email: email.trim(), phone,
                          address, city, state, zip,
                          discountCode, discountApplied,
                          paymentMethod,
                          rewardData, rewardMode,
                        }))
                      }}
                    />
                  </Elements>

                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', marginTop: '16px', textAlign: 'center' }}>
                    Secured by Stripe · Your card details are encrypted
                  </p>
                </div>
              )}
            </div>

            {/* ── Right — Rewards + Order Summary ──────────────────────────── */}
            <div className="md:col-span-2" style={{ backgroundColor: '#FAF7F2', padding: '40px' }}>
              <div style={{
                background: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 55%, #1E1E1E 100%)',
                border: '1px solid #C9A96E44', padding: '36px', position: 'relative', overflow: 'hidden',
                marginBottom: '24px',
              }}>
                {/* Decorative corner accent */}
                <div style={{
                  position: 'absolute', top: '0', right: '0', width: '60px', height: '60px',
                  background: 'linear-gradient(135deg, transparent 50%, #C9A96E22 50%)',
                }}></div>
                <div style={{
                  position: 'absolute', bottom: '0', left: '0', width: '60px', height: '60px',
                  background: 'linear-gradient(315deg, transparent 50%, #C9A96E22 50%)',
                }}></div>

                {/* Crown / title */}
                <div style={{ textAlign: 'center', marginBottom: '28px', position: 'relative' }}>
                  <p style={{
                    fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '10px',
                    letterSpacing: '0.4em', marginBottom: '6px', textTransform: 'uppercase',
                  }}>Lion Elite Beauty</p>
                  <p style={{
                    fontFamily: 'Georgia, serif', color: '#B89A5A', fontSize: '19px', fontWeight: 'bold',
                    letterSpacing: '0.12em',
                  }}>REWARDS</p>
                  <div style={{ width: '36px', height: '1px', backgroundColor: '#C9A96E66', margin: '8px auto' }}></div>
                </div>

                {/* Points earned badge */}
                <div style={{
                  textAlign: 'center', marginBottom: '22px', padding: '16px',
                  background: 'linear-gradient(135deg, #C9A96E20, #C9A96E08)',
                  border: '1px solid #C9A96E30',
                }}>
                  <p style={{
                    fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E',
                    fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '6px',
                  }}>Points This Order</p>
                  <p style={{
                    fontFamily: 'Georgia, serif', color: '#E5D5A0', fontSize: '38px',
                    fontWeight: 'bold', lineHeight: '1.1',
                  }}>+{estPointsEarned}</p>
                  <p style={{
                    fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A',
                    fontSize: '11px', marginTop: '2px',
                  }}>on this ${finalTotal.toFixed(2)} order</p>
                </div>

                {/* Forex signup hint */}
                <p style={{
                  fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#777',
                  fontSize: '11px', textAlign: 'center', lineHeight: '1.6', marginBottom: '16px',
                }}>
                  Create an account to earn <span style={{ color: '#C9A96E', fontWeight: 'bold' }}>100 welcome bonus</span> points plus this order's points.
                </p>

                {/* Tab-style selection */}
                <div className="flex gap-0" style={{ border: '1px solid #C9A96E33', marginBottom: '14px' }}>
                  {[
                    { key: 'guest', label: 'Guest' },
                    { key: 'join', label: 'Create Account' },
                    { key: 'login', label: 'Log In' },
                  ].map(tab => (
                    <button key={tab.key} type="button" onClick={() => { setRewardMode(tab.key); setRewardData(null); setRewardMessage('') }}
                      style={{
                        flex: 1, padding: '10px 4px', border: 'none', cursor: 'pointer',
                        backgroundColor: rewardMode === tab.key ? '#C9A96E' : '#1E1E1E',
                        color: rewardMode === tab.key ? '#000' : '#6A6A6A',
                        fontFamily: 'Helvetica Neue, Arial, sans-serif',
                        fontSize: '9.5px', letterSpacing: '0.12em',
                        transition: 'all 0.15s',
                      }} className="uppercase">
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Rewards mode content */}
                {rewardMode === 'guest' && (
                  <div style={{ padding: '0 4px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#666', fontSize: '12px', lineHeight: '1.6', marginBottom: '8px' }}>
                      You won't earn rewards points on this order.
                    </p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#555', fontSize: '11px', lineHeight: '1.5' }}>
                      Create an account to start collecting rewards.
                    </p>
                  </div>
                )}

                {rewardMode === 'join' && (
                  <div style={{ padding: '0 4px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#999', fontSize: '12px', lineHeight: '1.6', marginBottom: '12px' }}>
                      Create a rewards account with <strong style={{ color: '#C9A96E' }}>{email || 'your email'}</strong>.
                    </p>
                    {!rewardData && (
                      <button type="button" onClick={() => handleRewardAction('register')}
                        disabled={rewardLoading || !email.trim()}
                        style={{
                          width: '100%', backgroundColor: rewardLoading ? '#5A5040' : '#C9A96E',
                          color: '#000', border: 'none',
                          fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10.5px', letterSpacing: '0.18em',
                          padding: '12px', cursor: rewardLoading || !email.trim() ? 'not-allowed' : 'pointer',
                        }}
                        className="uppercase hover:opacity-85 transition-opacity">
                        {rewardLoading ? 'Creating…' : 'Create Account & Get Points →'}
                      </button>
                    )}
                    {rewardMessage && (
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: rewardData ? '#C9A96E' : '#E05A5A', fontSize: '11px', marginTop: '10px' }}>
                        {rewardMessage}
                      </p>
                    )}
                    {rewardData && (
                      <div style={{ marginTop: '12px' }}>
                        {rewardData.rewardId && (
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CCC', fontSize: '12px' }}>
                            Reward ID: <span style={{ color: '#C9A96E', fontWeight: 'bold', letterSpacing: '0.1em' }}>{rewardData.rewardId}</span>
                          </p>
                        )}
                        {rewardData.points !== undefined && (
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '13px', marginTop: '4px' }}>
                            Balance: <strong>{rewardData.points} pts</strong>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {rewardMode === 'login' && (
                  <div style={{ padding: '0 4px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#999', fontSize: '12px', lineHeight: '1.6', marginBottom: '12px' }}>
                      Log in to earn points on this order.
                    </p>
                    {!rewardData && (
                      <button type="button" onClick={() => handleRewardAction('login')}
                        disabled={rewardLoading || !email.trim()}
                        style={{
                          width: '100%', backgroundColor: rewardLoading ? '#5A5040' : '#C9A96E',
                          color: '#000', border: 'none',
                          fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10.5px', letterSpacing: '0.18em',
                          padding: '12px', cursor: rewardLoading || !email.trim() ? 'not-allowed' : 'pointer',
                        }}
                        className="uppercase hover:opacity-85 transition-opacity">
                        {rewardLoading ? 'Looking up…' : 'Log In →'}
                      </button>
                    )}
                    {rewardMessage && (
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: rewardData ? '#C9A96E' : '#E05A5A', fontSize: '11px', marginTop: '10px' }}>
                        {rewardMessage}
                      </p>
                    )}
                    {rewardData && (
                      <div style={{ marginTop: '12px' }}>
                        {rewardData.rewardId && (
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CCC', fontSize: '12px' }}>
                            Reward ID: <span style={{ color: '#C9A96E', fontWeight: 'bold', letterSpacing: '0.1em' }}>{rewardData.rewardId}</span>
                          </p>
                        )}
                        {rewardData.points !== undefined && (
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '13px', marginTop: '4px' }}>
                            Balance: <strong>{rewardData.points} pts</strong>
                          </p>
                        )}
                        {rewardData.orderCount !== undefined && (
                          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#666', fontSize: '11px', marginTop: '4px' }}>
                            Orders: {rewardData.orderCount}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Order Summary card */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '32px', position: 'sticky', top: '120px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }}
                  className="uppercase">Order Summary</p>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.slug} className="flex justify-between items-start" style={{ borderBottom: '1px solid #E8DDD0', paddingBottom: '12px' }}>
                      <div>
                        <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '14px', marginBottom: '2px' }}>{item.name}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px' }}>Qty: {item.quantity}</p>
                      </div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '14px' }}>
                        ${(item.priceNum * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #E8DDD0', paddingTop: '16px' }}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px' }}>Subtotal</span>
                    <span style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '18px' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '13px' }}>Discount (10%)</span>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '14px' }}>−${(subtotal * 0.1).toFixed(2)}</span>
                    </div>
                  )}
                  {/* Points earned preview */}
                  {rewardMode !== 'guest' && estPointsEarned > 0 && (
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.08em' }} className="uppercase">Points Earned</span>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '13px' }}>+{estPointsEarned}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3" style={{ borderTop: '1px solid #E8DDD0', marginTop: '12px' }}>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '14px', letterSpacing: '0.1em' }} className="uppercase">Total</span>
                    <span style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '22px' }}>${finalTotal.toFixed(2)}</span>
                  </div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', marginTop: '12px' }}>
                    {showCardForm
                      ? 'Complete your card details above and confirm payment.'
                      : paymentMethod === 'stripe'
                        ? 'Your payment will be processed immediately upon placing the order.'
                        : 'You\'ll receive payment instructions after placing your order.'}
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