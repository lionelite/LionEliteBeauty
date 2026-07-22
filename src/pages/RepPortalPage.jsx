import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function RepPortalPage() {
  const [username, setUsername] = useState('Colin')
  const [password, setPassword] = useState('')
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
        body: JSON.stringify({ action: 'login', username, password }),
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
        <div className="max-w-6xl mx-auto px-6">
          {!dashboard ? (
            <div style={{ maxWidth: '520px', margin: '0 auto' }}>
              <p style={{ color: '#C9A96E', letterSpacing: '0.28em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '16px' }}>
                Lion Elite Beauty
              </p>
              <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.8rem', lineHeight: 1.05, marginBottom: '14px' }}>
                Rep Portal
              </h1>
              <p style={{ color: '#9A9A9A', lineHeight: 1.8, marginBottom: '36px' }}>
                Sign in to see your tracked sales, revenue, commission and referral performance.
              </p>

              <form onSubmit={login} style={{ backgroundColor: '#151515', border: '1px solid #2A2A2A', padding: '34px' }}>
                <label style={labelStyle}>Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" style={inputStyle} />

                <label style={labelStyle}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" style={{ ...inputStyle, marginBottom: '18px' }} />

                {error && <p style={{ color: '#D98A8A', fontSize: '13px', marginBottom: '16px', lineHeight: 1.5 }}>{error}</p>}

                <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#C9A96E', color: '#000', border: 0, padding: '15px 18px', letterSpacing: '0.16em', fontSize: '11px', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer' }}>
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
                  <p style={{ color: '#8A8A8A' }}>Every completed order using {dashboard.rep.code} is tracked here.</p>
                </div>
                <button onClick={() => { setDashboard(null); setPassword('') }} style={{ background: 'transparent', border: '1px solid #3A3A3A', color: '#AAA', padding: '10px 18px', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Sign Out
                </button>
              </div>

              {!dashboard.rep.commissionConfigured && (
                <div style={{ border: '1px solid #C9A96E55', backgroundColor: '#1A1711', color: '#D7C29B', padding: '14px 18px', marginBottom: '24px', fontSize: '13px', lineHeight: 1.6 }}>
                  Commission tracking is connected, but the commission percentage still needs to be configured by the administrator.
                </div>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: '#2A2A2A', marginBottom: '34px' }}>
                <Stat label="Completed Sales" value={dashboard.stats.completedOrders} />
                <Stat label="Sales Revenue" value={money(dashboard.stats.referredRevenue)} />
                <Stat label="Commission Rate" value={`${dashboard.rep.commissionPercent}%`} />
                <Stat label="Commission Earned" value={money(dashboard.stats.totalCommission)} />
              </div>

              <div className="grid md:grid-cols-2 gap-6" style={{ marginBottom: '34px' }}>
                <Card title="Customer Discount Code">
                  <div className="flex items-center justify-between gap-4" style={{ border: '1px solid #3A3A3A', padding: '18px 20px' }}>
                    <strong style={{ color: '#C9A96E', fontFamily: 'Georgia, serif', fontSize: '1.55rem', letterSpacing: '0.08em' }}>{dashboard.rep.code}</strong>
                    <button onClick={() => copy(dashboard.rep.code, 'code')} style={copyButtonStyle}>{copied === 'code' ? 'Copied ✓' : 'Copy'}</button>
                  </div>
                  <p style={helperStyle}>Customers enter this code at checkout and receive {dashboard.rep.discountPercent}% off their order.</p>
                </Card>

                <Card title="Share Link">
                  <div style={{ border: '1px solid #3A3A3A', padding: '16px 18px', color: '#B8B8B8', fontSize: '12px', lineHeight: 1.6, wordBreak: 'break-all', marginBottom: '12px' }}>
                    {dashboard.rep.shareLink}
                  </div>
                  <button onClick={() => copy(dashboard.rep.shareLink, 'link')} style={{ ...copyButtonStyle, width: '100%', padding: '13px' }}>
                    {copied === 'link' ? 'Link Copied ✓' : 'Copy Share Link'}
                  </button>
                  <p style={helperStyle}>The link automatically preloads {dashboard.rep.code} for the customer at checkout.</p>
                </Card>
              </div>

              <div style={{ backgroundColor: '#151515', border: '1px solid #2A2A2A' }}>
                <div style={{ padding: '26px 28px', borderBottom: '1px solid #2A2A2A' }}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <p style={{ color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '6px' }}>Sales & Commission Breakdown</p>
                      <p style={{ color: '#777', fontSize: '12px' }}>{dashboard.commissionBasis}</p>
                    </div>
                    {dashboard.stats.latestSale && <p style={{ color: '#777', fontSize: '11px' }}>Latest sale: {new Date(dashboard.stats.latestSale).toLocaleString()}</p>}
                  </div>
                </div>

                {dashboard.sales.length === 0 ? (
                  <div style={{ padding: '42px 28px', color: '#777', textAlign: 'center' }}>No completed sales have been tracked with {dashboard.rep.code} yet.</div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
                      <thead>
                        <tr>
                          <Th>Date</Th><Th>Order</Th><Th>Products</Th><Th align="right">Sale</Th><Th align="right">Commission</Th><Th>Status</Th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboard.sales.map(sale => (
                          <tr key={sale.id} style={{ borderTop: '1px solid #242424' }}>
                            <Td>{new Date(sale.date).toLocaleDateString()}</Td>
                            <Td><span style={{ color: '#888', fontFamily: 'monospace', fontSize: '11px' }}>{sale.id.slice(-10)}</span></Td>
                            <Td><span style={{ color: '#B8B8B8' }}>{sale.items}</span></Td>
                            <Td align="right"><strong style={{ color: '#F5F0E8' }}>{money(sale.revenue)}</strong></Td>
                            <Td align="right"><strong style={{ color: '#C9A96E' }}>{money(sale.commission)}</strong></Td>
                            <Td><span style={{ color: '#6FB98F', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{sale.status}</span></Td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

const labelStyle = { display: 'block', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }
const inputStyle = { width: '100%', backgroundColor: '#0D0D0D', border: '1px solid #3A3A3A', color: '#FFF', padding: '14px 16px', marginBottom: '20px', outline: 'none' }
const copyButtonStyle = { backgroundColor: '#C9A96E', color: '#000', border: 0, padding: '9px 15px', cursor: 'pointer', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }
const helperStyle = { color: '#777', fontSize: '12px', lineHeight: 1.7, marginTop: '14px' }

function Card({ title, children }) {
  return <div style={{ backgroundColor: '#151515', border: '1px solid #2A2A2A', padding: '30px' }}><p style={{ color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px' }}>{title}</p>{children}</div>
}

function Stat({ label, value }) {
  return <div style={{ backgroundColor: '#151515', padding: '30px' }}><p style={{ color: '#777', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>{label}</p><p style={{ color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '2rem' }}>{value}</p></div>
}

function Th({ children, align = 'left' }) {
  return <th style={{ textAlign: align, padding: '14px 18px', color: '#777', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 400 }}>{children}</th>
}

function Td({ children, align = 'left' }) {
  return <td style={{ textAlign: align, padding: '16px 18px', fontSize: '12px', color: '#AAA', verticalAlign: 'top' }}>{children}</td>
}
