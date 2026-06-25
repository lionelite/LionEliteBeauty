import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function VIPPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [vipId, setVipId] = useState('')
  const [vipEmail, setVipEmail] = useState('')
  const [loginVipId, setLoginVipId] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [account, setAccount] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/vip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email: loginEmail, vipId: loginVipId }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Invalid credentials'); setLoading(false); return }
      setAccount(data)
      setVipId(data.vipId)
      setVipEmail(data.email)
      setLoggedIn(true)
    } catch { setError('Connection error'); setLoading(false) }
  }

  function handleLogout() {
    setLoggedIn(false)
    setAccount(null)
    setLoginEmail('')
    setLoginVipId('')
    setError('')
  }

  if (!loggedIn) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
        <SEO title="VIP Account Access — Lion Elite" />
        <Navbar />
        <div style={{ paddingTop: '140px' }} className="max-w-lg mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Customer Portal</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2rem', marginBottom: '8px' }} className="font-normal">Access Your VIP Account</h1>
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 24px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.7' }}>
              Enter the VIP ID and email address you received after enrolling to view your program details.
            </p>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '40px' }}>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }} className="uppercase">VIP ID</label>
                <input type="text" value={loginVipId} onChange={e => setLoginVipId(e.target.value)}
                  placeholder="e.g. LEO-123ABC"
                  style={{ width: '100%', padding: '14px 16px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', color: '#2A2A2A', outline: 'none', letterSpacing: '0.12em', boxSizing: 'border-box' }}
                  required />
              </div>
              <div style={{ marginBottom: '28px' }}>
                <label style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }} className="uppercase">Email Address</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  placeholder="you@email.com"
                  style={{ width: '100%', padding: '14px 16px', border: '1px solid #E0D5C5', backgroundColor: '#FAF7F2', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px', color: '#2A2A2A', outline: 'none', boxSizing: 'border-box' }}
                  required />
              </div>
              {error && <p style={{ color: '#C0392B', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
              <button type="submit" disabled={loading}
                style={{ width: '100%', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', padding: '16px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }} className="uppercase">
                {loading ? 'Verifying...' : 'Access My Account \u2192'}
              </button>
            </form>
          </div>

          <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '11px' }}>
            Don\u2019t have a VIP ID yet?{' '}
            <Link to="/apply" style={{ color: '#C9A96E', textDecoration: 'none' }}>Enroll in a program \u2192</Link>
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  const tierLabel = account.tier === 'foundation' ? 'Foundation Coaching' : account.tier === 'vip' ? 'VIP Transformation Program' : account.tier || '\u2014'
  const paidLabel = account.paid ? 'Paid' : 'Pending'

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="My VIP Account — Lion Elite" />
      <Navbar />
      <div style={{ paddingTop: '120px' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }} className="uppercase hover:text-[#C9A96E] transition-colors">
              \u2190 Home
            </Link>
            <p style={{ color: '#BABABA', fontSize: '12px' }}>/</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', letterSpacing: '0.15em' }} className="uppercase">My VIP Account</p>
            <button onClick={handleLogout}
              style={{ marginLeft: 'auto', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.15em', background: 'none', border: '1px solid #E0D5C5', padding: '10px 20px', cursor: 'pointer' }}
              className="uppercase hover:text-[#C0392B] transition-colors">
              Sign Out
            </button>
          </div>

          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2rem', marginBottom: '4px' }} className="font-normal">Welcome, {account.name}</h1>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', marginBottom: '32px' }}>
            VIP ID: <strong style={{ color: '#C9A96E', letterSpacing: '0.15em' }}>{account.vipId}</strong>
          </p>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '32px' }}></div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Program</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '18px', marginBottom: '4px' }}>{account.program || '\u2014'}</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', margin: 0 }}>Tier: {tierLabel}</p>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Payment Status</p>
              <div className="flex items-center gap-2 mb-1">
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: account.paid ? '#5BA87A' : '#C9A96E' }}></span>
                <p style={{ fontFamily: 'Georgia, serif', color: account.paid ? '#5BA87A' : '#C9A96E', fontSize: '18px', margin: 0 }}>{paidLabel}</p>
              </div>
              {account.paid
                ? <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', margin: '8px 0 0' }}>Your enrollment is confirmed and your spot is secured.</p>
                : <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', margin: '8px 0 0' }}>Payment pending. We\u2019ll confirm once received.</p>
              }
            </div>
          </div>

          {/* Progress */}
          {account.progress && account.progress.length > 0 && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '28px', marginBottom: '28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '16px' }} className="uppercase">Program Progress</p>
              <div className="space-y-3">
                {account.progress.map((step, i) => (
                  <div key={i} className="flex items-start gap-3" style={{ padding: '12px 0', borderBottom: i < account.progress.length - 1 ? '1px solid #F0EAE0' : 'none' }}>
                    <div style={{
                      width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, marginTop: '4px',
                      backgroundColor: step.done ? '#5BA87A' : '#E0D5C5',
                    }}></div>
                    <div className="flex-1">
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: step.done ? '#5BA87A' : '#4A4A4A', fontSize: '13px', marginBottom: '2px' }}>{step.label || step.step}</p>
                      {step.note && <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px' }}>{step.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {account.notes && (
            <div style={{ backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', padding: '20px 24px', marginBottom: '28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '8px' }} className="uppercase">Notes from Your Specialist</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>{account.notes}</p>
            </div>
          )}

          <div style={{ backgroundColor: '#F9F7F4', border: '1px solid #E0D5C5', padding: '20px 24px', marginBottom: '48px' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '4px' }} className="uppercase">Account Details</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', margin: '0 0 2px' }}>Email: {account.email}</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', margin: 0 }}>Enrolled: {account.created ? new Date(account.created).toLocaleDateString() : '\u2014'}</p>
          </div>

          <p style={{ textAlign: 'center', marginBottom: '80px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '11px' }}>
            Questions? Email <a href="mailto:orders@lionelitebeauty.com" style={{ color: '#C9A96E', textDecoration: 'none' }}>orders@lionelitebeauty.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}