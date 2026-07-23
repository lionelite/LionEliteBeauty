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

  const signOut = () => { setDashboard(null); setPassword('') }

  return (
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', color: '#FAF7F2' }}>
      <SEO title="Rep Portal" description="Lion Elite Beauty representative and admin portal." />
      <Navbar />

      <section style={{ paddingTop: '150px', paddingBottom: '110px' }}>
        <div className="max-w-6xl mx-auto px-6">
          {!dashboard ? (
            <div style={{ maxWidth: '520px', margin: '0 auto' }}>
              <p style={eyebrow}>Lion Elite Beauty</p>
              <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.8rem', lineHeight: 1.05, marginBottom: '14px' }}>Rep Portal</h1>
              <p style={{ color: '#9A9A9A', lineHeight: 1.8, marginBottom: '36px' }}>
                Representatives and administrators sign in here to view tracked sales, revenue and commissions.
              </p>

              <form onSubmit={login} style={panelStyle}>
                <label style={labelStyle}>Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" style={inputStyle} />
                <label style={labelStyle}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" style={{ ...inputStyle, marginBottom: '18px' }} />
                {error && <p style={{ color: '#D98A8A', fontSize: '13px', marginBottom: '16px', lineHeight: 1.5 }}>{error}</p>}
                <button type="submit" disabled={loading} style={primaryButtonStyle}>{loading ? 'Opening Portal…' : 'Enter Portal →'}</button>
              </form>
            </div>
          ) : dashboard.role === 'admin' ? (
            <AdminDashboard dashboard={dashboard} money={money} signOut={signOut} />
          ) : (
            <RepDashboard dashboard={dashboard} money={money} signOut={signOut} copy={copy} copied={copied} />
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

function AdminDashboard({ dashboard, money, signOut }) {
  return (
    <>
      <DashboardHeader eyebrowText="Administrator Dashboard" title="Lion Elite Beauty Sales Control" subtitle="All completed Stripe sales, product movement and representative commissions in one place." signOut={signOut} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px" style={{ backgroundColor: '#2A2A2A', marginBottom: '34px' }}>
        <Stat label="All Completed Orders" value={dashboard.stats.completedOrders} />
        <Stat label="Total Revenue" value={money(dashboard.stats.totalRevenue)} />
        <Stat label="Rep Orders" value={dashboard.stats.repOrders} />
        <Stat label="Rep Revenue" value={money(dashboard.stats.repRevenue)} />
        <Stat label="Commission Owed" value={money(dashboard.stats.totalCommission)} accent />
      </div>

      <Section title="Commission by Representative" subtitle="Sales attributed through each representative's checkout code.">
        {dashboard.reps.length === 0 ? <Empty>No representatives configured.</Empty> : (
          <Table minWidth="800px" headers={['Rep', 'Code', 'Orders', 'Revenue', 'Rate', 'Commission', 'Latest Sale']}>
            {dashboard.reps.map(rep => (
              <tr key={rep.code} style={rowStyle}>
                <Td><strong style={{ color: '#F5F0E8' }}>{rep.name}</strong></Td>
                <Td>{rep.code}</Td>
                <Td>{rep.completedOrders}</Td>
                <Td>{money(rep.revenue)}</Td>
                <Td>{rep.commissionPercent}%</Td>
                <Td><strong style={{ color: '#C9A96E' }}>{money(rep.commission)}</strong></Td>
                <Td>{rep.latestSale ? new Date(rep.latestSale).toLocaleDateString() : '—'}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Section>

      <Section title="Product Sales Breakdown" subtitle="Units and completed orders by product across Stripe sales.">
        {dashboard.products.length === 0 ? <Empty>No completed product sales yet.</Empty> : (
          <Table minWidth="620px" headers={['Product', 'Units Sold', 'Completed Orders']}>
            {dashboard.products.map(product => (
              <tr key={product.name} style={rowStyle}>
                <Td><strong style={{ color: '#F5F0E8' }}>{product.name}</strong></Td>
                <Td>{product.units}</Td>
                <Td>{product.orders}</Td>
              </tr>
            ))}
          </Table>
        )}
        <p style={{ color: '#666', fontSize: '11px', lineHeight: 1.7, padding: '16px 20px', borderTop: '1px solid #242424' }}>{dashboard.note}</p>
      </Section>

      <Section title="All Completed Sales" subtitle="Includes direct sales, house discounts and representative-attributed sales.">
        {dashboard.sales.length === 0 ? <Empty>No completed sales yet.</Empty> : (
          <Table minWidth="900px" headers={['Date', 'Order', 'Products', 'Rep / Code', 'Sale', 'Commission', 'Status']}>
            {dashboard.sales.map(sale => (
              <tr key={sale.id} style={rowStyle}>
                <Td>{new Date(sale.date).toLocaleDateString()}</Td>
                <Td><span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{sale.id.slice(-10)}</span></Td>
                <Td>{sale.items}</Td>
                <Td>{sale.rep ? `${sale.rep} · ${sale.code}` : sale.code && sale.code !== 'NONE' ? sale.code : 'Direct'}</Td>
                <Td><strong style={{ color: '#F5F0E8' }}>{money(sale.revenue)}</strong></Td>
                <Td><strong style={{ color: sale.commission ? '#C9A96E' : '#777' }}>{money(sale.commission)}</strong></Td>
                <Td><span style={{ color: '#6FB98F' }}>{sale.status}</span></Td>
              </tr>
            ))}
          </Table>
        )}
      </Section>
    </>
  )
}

function RepDashboard({ dashboard, money, signOut, copy, copied }) {
  return (
    <>
      <DashboardHeader eyebrowText="Representative Dashboard" title={`Welcome, ${dashboard.rep.name}`} subtitle={`Every completed order using ${dashboard.rep.code} is tracked here.`} signOut={signOut} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: '#2A2A2A', marginBottom: '34px' }}>
        <Stat label="Completed Sales" value={dashboard.stats.completedOrders} />
        <Stat label="Sales Revenue" value={money(dashboard.stats.referredRevenue)} />
        <Stat label="Commission Rate" value={`${dashboard.rep.commissionPercent}%`} />
        <Stat label="Commission Earned" value={money(dashboard.stats.totalCommission)} accent />
      </div>

      <div className="grid md:grid-cols-2 gap-6" style={{ marginBottom: '34px' }}>
        <Card title="Customer Discount Code">
          <div className="flex items-center justify-between gap-4" style={{ border: '1px solid #3A3A3A', padding: '18px 20px' }}>
            <strong style={{ color: '#C9A96E', fontFamily: 'Georgia, serif', fontSize: '1.55rem', letterSpacing: '0.08em' }}>{dashboard.rep.code}</strong>
            <button onClick={() => copy(dashboard.rep.code, 'code')} style={copyButtonStyle}>{copied === 'code' ? 'Copied ✓' : 'Copy'}</button>
          </div>
          <p style={helperStyle}>Customers receive {dashboard.rep.discountPercent}% off. Your commission is {dashboard.rep.commissionPercent}% of the amount collected.</p>
        </Card>

        <Card title="Share Link">
          <div style={{ border: '1px solid #3A3A3A', padding: '16px 18px', color: '#B8B8B8', fontSize: '12px', lineHeight: 1.6, wordBreak: 'break-all', marginBottom: '12px' }}>{dashboard.rep.shareLink}</div>
          <button onClick={() => copy(dashboard.rep.shareLink, 'link')} style={{ ...copyButtonStyle, width: '100%', padding: '13px' }}>{copied === 'link' ? 'Link Copied ✓' : 'Copy Share Link'}</button>
        </Card>
      </div>

      <Section title="Sales & Commission Breakdown" subtitle={dashboard.commissionBasis}>
        {dashboard.sales.length === 0 ? <Empty>No completed sales have been tracked with {dashboard.rep.code} yet.</Empty> : (
          <Table minWidth="760px" headers={['Date', 'Order', 'Products', 'Sale', 'Commission', 'Status']}>
            {dashboard.sales.map(sale => (
              <tr key={sale.id} style={rowStyle}>
                <Td>{new Date(sale.date).toLocaleDateString()}</Td>
                <Td><span style={{ fontFamily: 'monospace', fontSize: '11px' }}>{sale.id.slice(-10)}</span></Td>
                <Td>{sale.items}</Td>
                <Td><strong style={{ color: '#F5F0E8' }}>{money(sale.revenue)}</strong></Td>
                <Td><strong style={{ color: '#C9A96E' }}>{money(sale.commission)}</strong></Td>
                <Td><span style={{ color: '#6FB98F' }}>{sale.status}</span></Td>
              </tr>
            ))}
          </Table>
        )}
      </Section>
    </>
  )
}

function DashboardHeader({ eyebrowText, title, subtitle, signOut }) {
  return <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6" style={{ marginBottom: '42px' }}><div><p style={eyebrow}>{eyebrowText}</p><h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.6rem', marginBottom: '8px' }}>{title}</h1><p style={{ color: '#8A8A8A' }}>{subtitle}</p></div><button onClick={signOut} style={secondaryButtonStyle}>Sign Out</button></div>
}

function Section({ title, subtitle, children }) {
  return <div style={{ ...panelStyle, padding: 0, marginBottom: '34px' }}><div style={{ padding: '24px 28px', borderBottom: '1px solid #2A2A2A' }}><p style={{ color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '6px' }}>{title}</p><p style={{ color: '#777', fontSize: '12px' }}>{subtitle}</p></div>{children}</div>
}

function Table({ headers, children, minWidth }) {
  return <div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', minWidth }}><thead><tr>{headers.map(h => <Th key={h}>{h}</Th>)}</tr></thead><tbody>{children}</tbody></table></div>
}

function Empty({ children }) { return <div style={{ padding: '42px 28px', color: '#777', textAlign: 'center' }}>{children}</div> }
function Card({ title, children }) { return <div style={{ ...panelStyle, padding: '30px' }}><p style={{ color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '20px' }}>{title}</p>{children}</div> }
function Stat({ label, value, accent }) { return <div style={{ backgroundColor: '#151515', padding: '30px' }}><p style={{ color: '#777', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '10px' }}>{label}</p><p style={{ color: accent ? '#C9A96E' : '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '2rem' }}>{value}</p></div> }
function Th({ children }) { return <th style={{ textAlign: 'left', padding: '14px 18px', color: '#777', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 400 }}>{children}</th> }
function Td({ children }) { return <td style={{ textAlign: 'left', padding: '16px 18px', fontSize: '12px', color: '#AAA', verticalAlign: 'top' }}>{children}</td> }

const eyebrow = { color: '#C9A96E', letterSpacing: '0.28em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '12px' }
const panelStyle = { backgroundColor: '#151515', border: '1px solid #2A2A2A' }
const rowStyle = { borderTop: '1px solid #242424' }
const labelStyle = { display: 'block', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }
const inputStyle = { width: '100%', backgroundColor: '#0D0D0D', border: '1px solid #3A3A3A', color: '#FFF', padding: '14px 16px', marginBottom: '20px', outline: 'none' }
const primaryButtonStyle = { width: '100%', backgroundColor: '#C9A96E', color: '#000', border: 0, padding: '15px 18px', letterSpacing: '0.16em', fontSize: '11px', textTransform: 'uppercase', cursor: 'pointer' }
const secondaryButtonStyle = { background: 'transparent', border: '1px solid #3A3A3A', color: '#AAA', padding: '10px 18px', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }
const copyButtonStyle = { backgroundColor: '#C9A96E', color: '#000', border: 0, padding: '9px 15px', cursor: 'pointer', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }
const helperStyle = { color: '#777', fontSize: '12px', lineHeight: 1.7, marginTop: '14px' }
