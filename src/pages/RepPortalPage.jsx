import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function RepPortalPage() {
  const [code, setCode] = useState('COLIN10')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dashboard, setDashboard] = useState(null)
  const [copied, setCopied] = useState('')

  async function login(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/rep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', code, pin }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to sign in')
      setDashboard(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function copy(text, type) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(''), 1800)
    } catch {
      setCopied('')
    }
  }

  const money = value => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 2,
  }).format(value || 0)

  return (
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', color: '#FAF7F2' }}>
      <SEO title="Rep Portal" description="Lion Elite Beauty representative portal." />
      <Navbar />

      <section style={{ paddingTop: '150px', paddingBottom: '110px' }}>
        <div className="max-w-5xl mx-auto px-6">
          {!dashboard ? (
            <div style={{ maxWidth: '520px', margin: '0 auto' }}>
              <p style={{ color: '#C9A96E', letterSpacing: '0.28em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '16px' }}>
                Lion Elite Beauty
              </p>
              <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.8rem', lineHeight: 1.05, marginBottom: '14px' }}>
                Rep Portal
              </h1>
              <p style={{ color: '#9A9A9A', lineHeight: 1.8, marginBottom: '36px' }}>
                Access your referral code, share link, completed order count, and referred sales activity.
              </p>

              <form onSubmit={login} style={{ backgroundColor: '#151515', border: '1px solid #2A2A2A', padding: '34px' }}>
                <label style={{ display: 'block', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Rep Code
                </label>
                <input value={code} onChange={e => setCode(e.target.value.toUpperCase())}
                  autoComplete="username"
                  style={{ width: '100%', backgroundColor: '#0D0D0D', border: '1px solid #3A3A3A', color: '#FFF', padding: '14px 16px', marginBottom: '20px', outline: 'none' }} />

                <label style={{ display: 'block', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Portal PIN
                </label>
                <input type="password" value={pin} onChange={e => setPin(e.target.value)} autoComplete="current-password"
                  style={{ width: '100%', backgroundColor: '#0D0D0D', border: '1px solid #3A3A3A', color: '#FFF', padding: '14px 16px', marginBottom: '18px', outline: 'none' }} />

                {error && <p style={{ color: '#D98A8A', fontSize: '13px', marginBottom: '16px', lineHeight: 1.5 }}>{error}</p>}

                <button type="submit" disabled={loading}
                  style={{ width: '100%', backgroundColor: '#C9A96E', color: '#000', border: 0, padding: '15px 18px', letterSpacing: '0.16em', fontSize: '11px', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer' }}>
                  {loading ? 'Opening Portal…' : 'Enter Portal →'}
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ marginBottom: '42px' }}>
                <div>
                  <p style={{ color: '#C9A96E', letterSpacing: '0.28em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '12px' }}>Representative Dashboard</p>
                  <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.6rem', marginBottom: '8px' }}>Welcome, {dashboard.rep.name}</h1>
                  <p style={{ color: '#8A8A8A' }}>Your Lion Elite Beauty referral performance.</p>
                </div>
                <button onClick={() => { setDashboard(null); setPin('') }}
                  style={{ background: 'transparent', border: '1px solid #3A3A3A', color: '#AAA', padding: '10px 18px', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Sign Out
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: '#2A2A2A', marginBottom: '34px' }}>
                <Stat label="Completed Orders" value={dashboard.stats.completedOrders} />
                <Stat label="Referred Revenue" value={money(dashboard.stats.referredRevenue)} />
                <Stat label="Customer Discount" value={`${dashboard.rep.discountPercent}%`} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card title="Your Discount Code">
                  <div className="flex items-center justify-between gap-4" style={{ border: '1px solid #3A3A3A', padding: '18px 20px' }}>
                    <strong style={{ color: '#C9A96E', fontFamily: 'Georgia, serif', fontSize: '1.55rem', letterSpacing: '0.08em' }}>{dashboard.rep.code}</strong>
                    <button onClick={() => copy(dashboard.rep.code, 'code')} style={copyButtonStyle}>{copied === 'code' ? 'Copied ✓' : 'Copy'}</button>
                  </div>
                  <p style={helperStyle}>Customers receive {dashboard.rep.discountPercent}% off when this code is entered at checkout.</p>
                </Card>

                <Card title="Your Share Link">
                  <div style={{ border: '1px solid #3A3A3A', padding: '16px 18px', color: '#B8B8B8', fontSize: '12px', lineHeight: 1.6, wordBreak: 'break-all', marginBottom: '12px' }}>
                    {dashboard.rep.shareLink}
                  </div>
                  <button onClick={() => copy(dashboard.rep.shareLink, 'link')} style={{ ...copyButtonStyle, width: '100%', padding: '13px' }}>
                    {copied === 'link' ? 'Link Copied ✓' : 'Copy Share Link'}
                  </button>
                  <p style={helperStyle}>This link automatically applies {dashboard.rep.code} when the customer reaches checkout.</p>
                </Card>
              </div>

              <div style={{ marginTop: '28px', color: '#666', fontSize: '12px' }}>
                {dashboard.stats.latestSale
                  ? `Latest tracked sale: ${new Date(dashboard.stats.latestSale).toLocaleString()}`
                  : 'No completed Stripe orders have been tracked with this code yet.'}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

const copyButtonStyle = {
  backgroundColor: '#C9A96E', color: '#000', border: 0, padding: '9px 15px', cursor: 'pointer',
  fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0,
}
const helperStyle = { color: '#777', fontSize: '12px', lineHeight: 1.7, marginTop: '14px' }

function Card({ title, children }) {
  return (
    <div style={{ backgroundColor: '#151515', border: '1px solid #2A2A2A', padding: '30px' }}>
      <p style={{ color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px' }}>{title}</p>
      {children}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div style={{ backgroundColor: '#151515', padding: '30px' }}>
      <p style={{ color: '#777', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>{label}</p>
      <p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '2rem' }}>{value}</p>
    </div>
  )
}