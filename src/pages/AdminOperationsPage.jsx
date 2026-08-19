import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const CREAM = '#FAF7F2'
const WHITE = '#FFFFFF'
const GOLD = '#C9A96E'
const INK = '#2A2A2A'
const MUTED = '#77736F'
const BORDER = '#E0D5C5'

export default function AdminOperationsPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [orders, setOrders] = useState([])
  const [clients, setClients] = useState([])
  const [repDashboard, setRepDashboard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastRefresh, setLastRefresh] = useState(null)

  const paidOrders = useMemo(() => orders.filter(o => o.paymentStatus === 'paid'), [orders])
  const revenue = useMemo(() => paidOrders.reduce((sum, o) => sum + Number(o.total || 0), 0), [paidOrders])
  const pendingPayment = useMemo(() => orders.filter(o => o.paymentStatus !== 'paid' && o.fulfillmentStatus !== 'cancelled').length, [orders])
  const openFulfillment = useMemo(() => orders.filter(o => ['processing', 'packed'].includes(o.fulfillmentStatus)).length, [orders])
  const repCount = repDashboard?.reps?.length || 0
  const repRevenue = repDashboard?.stats?.repRevenue || 0
  const commissions = repDashboard?.stats?.totalCommission || 0

  async function post(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Request failed')
    return data
  }

  async function loadEverything(vipAdminToken) {
    const results = await Promise.allSettled([
      post('/api/orders', { action: 'list', username, password }),
      post('/api/rep', { action: 'login', username, password }),
      vipAdminToken ? post('/api/vip', { action: 'list-all', token: vipAdminToken }) : Promise.resolve({ accounts: [] }),
    ])

    if (results[0].status === 'fulfilled') setOrders(results[0].value.orders || [])
    if (results[1].status === 'fulfilled') setRepDashboard(results[1].value)
    if (results[2].status === 'fulfilled') setClients(results[2].value.accounts || [])
    setLastRefresh(new Date())
  }

  async function login(e) {
    e?.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await post('/api/admin', { action: 'login', email: username, password })
      setToken(data.token)
      setLoggedIn(true)
      await loadEverything(data.vipAdminToken || '')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function refresh() {
    setLoading(true)
    setError('')
    try {
      const data = await post('/api/admin', { action: 'get-vip-token', token })
      await loadEverything(data.vipAdminToken || '')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await post('/api/admin', { action: 'logout', token }).catch(() => {})
    setLoggedIn(false)
    setToken('')
    setOrders([])
    setClients([])
    setRepDashboard(null)
    setPassword('')
  }

  const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n || 0))

  if (!loggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: CREAM }}>
        <SEO title="Admin Portal — Lion Elite Beauty" />
        <Navbar />
        <main className="max-w-md mx-auto px-6" style={{ paddingTop: '150px', paddingBottom: '100px' }}>
          <section style={panel}>
            <p style={eyebrow}>Lion Elite Beauty</p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, color: INK, fontSize: '2.2rem', marginBottom: '10px' }}>Admin Operations</h1>
            <p style={{ color: MUTED, lineHeight: 1.7, marginBottom: '28px' }}>Orders, fulfillment, affiliates, commissions, customers and coaching clients in one control center.</p>
            <form onSubmit={login}>
              <label style={label}>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} style={input} autoComplete="username" />
              <label style={label}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={input} autoComplete="current-password" />
              {error && <p style={{ color: '#B64F4F', fontSize: '12px', lineHeight: 1.5 }}>{error}</p>}
              <button type="submit" disabled={loading} style={primary}>{loading ? 'Opening…' : 'Open Admin Portal →'}</button>
            </form>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  const latestOrders = orders.slice(0, 8)
  const topReps = [...(repDashboard?.reps || [])].sort((a, b) => Number(b.revenue || 0) - Number(a.revenue || 0)).slice(0, 6)

  return (
    <div style={{ minHeight: '100vh', background: CREAM }}>
      <SEO title="Admin Operations — Lion Elite Beauty" />
      <Navbar />
      <main className="max-w-7xl mx-auto px-6" style={{ paddingTop: '112px', paddingBottom: '90px' }}>
        <div className="flex items-end justify-between gap-5 flex-wrap" style={{ marginBottom: '26px' }}>
          <div>
            <p style={eyebrow}>Administrator Dashboard</p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, color: INK, fontSize: 'clamp(2.2rem,4vw,3.6rem)', margin: '0 0 8px' }}>Lion Elite Beauty Operations</h1>
            <p style={{ color: MUTED, margin: 0 }}>Live storefront, fulfillment, affiliate and client overview.</p>
            {lastRefresh && <p style={{ color: '#AAA', fontSize: '11px', marginTop: '8px' }}>Last refreshed {lastRefresh.toLocaleTimeString()}</p>}
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={refresh} disabled={loading} style={softButton}>{loading ? 'Refreshing…' : 'Refresh All'}</button>
            <button onClick={logout} style={softButton}>Sign Out</button>
          </div>
        </div>

        {error && <div style={{ background: '#FFF1F1', border: '1px solid #E3BABA', padding: '12px 16px', color: '#9C3B3B', marginBottom: '20px' }}>{error}</div>}

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '30px' }}>
          <Stat label="All Orders" value={orders.length} />
          <Stat label="Paid Revenue" value={money(revenue)} />
          <Stat label="Pending Payment" value={pendingPayment} />
          <Stat label="Open Fulfillment" value={openFulfillment} />
          <Stat label="Affiliates" value={repCount} />
          <Stat label="Affiliate Revenue" value={money(repRevenue)} />
          <Stat label="Commission Owed" value={money(commissions)} accent />
          <Stat label="Coaching Clients" value={clients.length} />
        </section>

        <section className="grid md:grid-cols-3 gap-4" style={{ marginBottom: '30px' }}>
          <NavCard title="Orders & Fulfillment" text="Every Stripe and Zelle order, payment confirmation, processing, packing, tracking and delivery controls." href="/admin/orders" cta="Open Order Desk" />
          <NavCard title="Affiliates & Reps" text="Create affiliates, generate codes and invites, view rep sales, revenue and commission balances." href="/admin/affiliates" cta="Open Affiliate Control" />
          <NavCard title="Clients & Coaching" text="VIP accounts, questionnaires, payment status, notes and client risk flags." href="/admin/clients" cta="Open Client Admin" />
        </section>

        <section className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3" style={panel}>
            <div style={sectionHeader}>
              <div><p style={eyebrow}>Latest Orders</p><h2 style={sectionTitle}>Recent Store Activity</h2></div>
              <Link to="/admin/orders" style={textLink}>View all →</Link>
            </div>
            {latestOrders.length === 0 ? <Empty text="No saved storefront orders yet." /> : (
              <div style={{ overflowX: 'auto' }}>
                <table style={table}>
                  <thead><tr>{['Order','Customer','Payment','Fulfillment','Total'].map(h => <th key={h} style={th}>{h}</th>)}</tr></thead>
                  <tbody>{latestOrders.map(o => <tr key={o.orderNumber} style={{ borderTop: `1px solid ${BORDER}` }}>
                    <td style={td}>#{o.orderNumber}</td>
                    <td style={td}><strong>{o.name || 'Customer'}</strong><br/><span style={{ color: MUTED }}>{o.email}</span></td>
                    <td style={td}><Status value={o.paymentStatus} /></td>
                    <td style={td}><Status value={o.fulfillmentStatus} /></td>
                    <td style={td}><strong>{money(o.total)}</strong></td>
                  </tr>)}</tbody>
                </table>
              </div>
            )}
          </div>

          <div className="lg:col-span-2" style={panel}>
            <div style={sectionHeader}><div><p style={eyebrow}>Affiliate Performance</p><h2 style={sectionTitle}>Top Reps</h2></div><Link to="/admin/affiliates" style={textLink}>Manage →</Link></div>
            {topReps.length === 0 ? <Empty text="No affiliates configured yet." /> : topReps.map(rep => (
              <div key={rep.code} style={{ padding: '15px 0', borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <div><strong style={{ color: INK }}>{rep.name}</strong><div style={{ color: MUTED, fontSize: '11px', marginTop: '4px' }}>{rep.code} · {rep.completedOrders} orders · {rep.commissionPercent}%</div></div>
                <div style={{ textAlign: 'right' }}><strong style={{ color: GOLD }}>{money(rep.commission)}</strong><div style={{ color: MUTED, fontSize: '11px' }}>{money(rep.revenue)} sales</div></div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function Stat({ label: name, value, accent }) {
  return <div style={{ ...panel, padding: '22px' }}><p style={{ ...eyebrow, marginBottom: '8px' }}>{name}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: '1.9rem', color: accent ? GOLD : INK, margin: 0 }}>{value}</p></div>
}

function NavCard({ title, text, href, cta }) {
  return <Link to={href} style={{ ...panel, padding: '25px', textDecoration: 'none', display: 'block' }}><p style={eyebrow}>{title}</p><p style={{ color: MUTED, lineHeight: 1.7, minHeight: '70px' }}>{text}</p><span style={{ color: GOLD, fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase' }}>{cta} →</span></Link>
}

function Status({ value }) {
  const v = String(value || 'unknown')
  const good = ['paid','shipped','delivered'].includes(v)
  return <span style={{ fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', padding: '5px 8px', background: good ? '#EDF5EF' : '#FBF1E2', color: good ? '#54715D' : '#946B34' }}>{v}</span>
}

function Empty({ text }) { return <div style={{ color: MUTED, padding: '30px 0', textAlign: 'center' }}>{text}</div> }

const panel = { background: WHITE, border: `1px solid ${BORDER}`, padding: '30px' }
const eyebrow = { color: GOLD, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', margin: '0 0 10px' }
const label = { display: 'block', color: MUTED, fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: '7px' }
const input = { width: '100%', border: `1px solid ${BORDER}`, background: CREAM, padding: '14px 15px', color: INK, marginBottom: '18px', boxSizing: 'border-box' }
const primary = { width: '100%', background: GOLD, color: '#111', border: 0, padding: '15px', marginTop: '8px', cursor: 'pointer', letterSpacing: '.14em', textTransform: 'uppercase', fontSize: '10px' }
const softButton = { background: WHITE, border: `1px solid ${BORDER}`, color: MUTED, padding: '10px 15px', cursor: 'pointer', textDecoration: 'none', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase' }
const sectionHeader = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '14px' }
const sectionTitle = { fontFamily: 'Georgia, serif', fontWeight: 400, color: INK, fontSize: '1.45rem', margin: 0 }
const textLink = { color: GOLD, fontSize: '11px', textDecoration: 'none' }
const table = { width: '100%', borderCollapse: 'collapse', minWidth: '620px' }
const th = { textAlign: 'left', padding: '10px', color: MUTED, fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 400 }
const td = { padding: '13px 10px', color: INK, fontSize: '12px', verticalAlign: 'top' }
