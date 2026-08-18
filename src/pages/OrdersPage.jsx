import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function OrdersPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [orders, setOrders] = useState([])
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState('')
  const [tracking, setTracking] = useState({})
  const [lastRefresh, setLastRefresh] = useState(null)

  const pendingPayments = useMemo(() => orders.filter(o => o.paymentStatus !== 'paid' && o.fulfillmentStatus !== 'cancelled'), [orders])
  const needsAttention = useMemo(() => orders.filter(o => o.fulfillmentStatus === 'processing' || o.fulfillmentStatus === 'packed' || o.paymentStatus !== 'paid'), [orders])

  async function request(body) {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Order action failed')
    return data
  }

  async function loadOrders(e, silent = false) {
    e?.preventDefault()
    if (!silent) setLoading(true)
    setError('')
    try {
      const data = await request({ action: 'list', username, password })
      setOrders(data.orders || [])
      setRole(data.role || '')
      setLastRefresh(new Date())
    } catch (err) {
      if (!silent) setError(err.message)
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    if (!role) return undefined
    const timer = setInterval(() => loadOrders(null, true), 30000)
    return () => clearInterval(timer)
  }, [role, username, password])

  function replaceOrder(updated) {
    setOrders(prev => prev.map(o => o.orderNumber === updated.orderNumber ? updated : o))
  }

  async function runAction(order, action, extra = {}) {
    setSaving(`${action}:${order.orderNumber}`)
    setError('')
    try {
      const data = await request({ action, username, password, orderNumber: order.orderNumber, ...extra })
      replaceOrder(data.order)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving('')
    }
  }

  async function sendTracking(order) {
    const values = tracking[order.orderNumber] || {}
    if (!values.carrier?.trim() || !values.trackingNumber?.trim()) {
      setError('Enter both carrier and tracking number.')
      return
    }
    await runAction(order, 'update-tracking', {
      carrier: values.carrier,
      trackingNumber: values.trackingNumber,
    })
  }

  const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0))

  return (
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', color: '#F5F0E8' }}>
      <SEO title="Order Fulfillment — Lion Elite Beauty" />
      <Navbar />
      <main style={{ paddingTop: '140px', paddingBottom: '90px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap" style={{ marginBottom: '34px' }}>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <p style={eyebrow}>Admin / Rep Portal</p>
                {role === 'admin' && needsAttention.length > 0 && (
                  <span style={attentionBadge}>{needsAttention.length} need attention</span>
                )}
              </div>
              <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.6rem', marginBottom: '8px' }}>Orders & Fulfillment</h1>
              <p style={{ color: '#888', lineHeight: 1.7 }}>Live storefront orders, payment verification, packing, shipping, and delivery.</p>
              {lastRefresh && <p style={{ ...small, marginTop: '8px' }}>Auto-refreshes every 30 sec · Updated {lastRefresh.toLocaleTimeString()}</p>}
            </div>
            <div className="flex gap-2 flex-wrap">
              {role && <button onClick={() => loadOrders()} style={secondaryButton}>Refresh now</button>}
              <Link to="/rep" style={secondaryButton}>← Sales Portal</Link>
            </div>
          </div>

          {!role ? (
            <form onSubmit={loadOrders} style={{ ...panel, maxWidth: '520px', padding: '30px' }}>
              <label style={label}>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} style={input} autoComplete="username" />
              <label style={label}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={input} autoComplete="current-password" />
              {error && <p style={errorStyle}>{error}</p>}
              <button type="submit" disabled={loading} style={primaryButton}>{loading ? 'Loading…' : 'Open Orders →'}</button>
            </form>
          ) : (
            <>
              <div className="grid sm:grid-cols-4 gap-px" style={{ backgroundColor: '#2A2A2A', marginBottom: '28px' }}>
                <Stat label="All Orders" value={orders.length} />
                <Stat label="Pending Payment" value={pendingPayments.length} warn />
                <Stat label="Processing / Packed" value={orders.filter(o => ['processing', 'packed'].includes(o.fulfillmentStatus)).length} />
                <Stat label="Shipped / Delivered" value={orders.filter(o => ['shipped', 'delivered'].includes(o.fulfillmentStatus)).length} accent />
              </div>

              {error && <p style={{ ...errorStyle, marginBottom: '18px' }}>{error}</p>}

              {role === 'admin' && needsAttention.length > 0 && (
                <div style={{ ...panel, padding: '18px 22px', marginBottom: '20px', borderColor: '#6B542F' }}>
                  <p style={{ ...sectionLabel, color: '#C9A96E' }}>Order notifications</p>
                  <p style={{ margin: 0, color: '#E9D9B8', fontSize: '13px' }}>
                    {needsAttention.length} order{needsAttention.length === 1 ? '' : 's'} currently require payment confirmation or fulfillment action.
                  </p>
                </div>
              )}

              <div style={panel}>
                {orders.length === 0 ? (
                  <div style={{ padding: '48px 30px', textAlign: 'center', color: '#777' }}>No saved storefront orders yet.</div>
                ) : orders.map(order => {
                  const paymentPending = order.paymentStatus !== 'paid'
                  const isZelle = String(order.paymentMethod || '').toLowerCase() === 'zelle'
                  return (
                    <div key={order.orderNumber} style={{ padding: '26px 28px', borderBottom: '1px solid #262626', background: paymentPending ? '#17140F' : '#151515' }}>
                      <div className="grid lg:grid-cols-12 gap-6 items-start">
                        <div className="lg:col-span-3">
                          <div className="flex gap-2 items-center flex-wrap" style={{ marginBottom: '8px' }}>
                            <p style={{ ...eyebrow, marginBottom: 0 }}>#{order.orderNumber}</p>
                            {paymentPending && <span style={pendingChip}>PAYMENT PENDING</span>}
                          </div>
                          <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '6px' }}>{order.name}</p>
                          <p style={small}>{order.email}</p>
                          {order.phone && <p style={small}>{order.phone}</p>}
                          <p style={{ ...small, marginTop: '10px', lineHeight: 1.6 }}>{order.address}</p>
                        </div>

                        <div className="lg:col-span-3">
                          <p style={sectionLabel}>Order</p>
                          {(order.items || []).map((item, idx) => <p key={`${item.name}-${idx}`} style={small}>{item.name} × {item.quantity} · {money(Number(item.price || 0) * Number(item.quantity || 1))}</p>)}
                          {order.subtotal != null && <p style={{ ...small, marginTop: '10px' }}>Subtotal: {money(order.subtotal)}</p>}
                          {order.discountCode && <p style={{ ...small, color: '#C9A96E' }}>Discount: {order.discountCode}</p>}
                          <p style={{ marginTop: '4px', color: '#F5F0E8', fontFamily: 'Georgia, serif', fontSize: '20px' }}>{money(order.total)}</p>
                          {order.rep && <p style={{ ...small, color: '#C9A96E' }}>Rep: {order.rep}</p>}
                        </div>

                        <div className="lg:col-span-2">
                          <p style={sectionLabel}>Payment & status</p>
                          <StatusChip value={order.paymentStatus} type="payment" />
                          <p style={{ ...small, marginTop: '8px', textTransform: 'capitalize' }}>{order.paymentMethod}</p>
                          <div style={{ height: '10px' }} />
                          <StatusChip value={order.fulfillmentStatus} type="fulfillment" />
                          {order.trackingNumber && <><p style={{ ...small, marginTop: '12px' }}>{order.carrier}</p><p style={{ ...small, wordBreak: 'break-all' }}>{order.trackingNumber}</p></>}
                          <p style={{ ...small, marginTop: '12px' }}>{new Date(order.createdAt).toLocaleString()}</p>
                        </div>

                        <div className="lg:col-span-4">
                          {role === 'admin' ? (
                            <>
                              <p style={sectionLabel}>Admin actions</p>

                              {isZelle && paymentPending && (
                                <button
                                  onClick={() => runAction(order, 'mark-paid')}
                                  disabled={saving === `mark-paid:${order.orderNumber}`}
                                  style={{ ...primaryButton, marginBottom: '10px' }}>
                                  {saving === `mark-paid:${order.orderNumber}` ? 'Confirming…' : 'Confirm Zelle Payment →'}
                                </button>
                              )}

                              <div className="grid grid-cols-2 gap-2" style={{ marginBottom: '10px' }}>
                                <button onClick={() => runAction(order, 'update-fulfillment', { fulfillmentStatus: 'processing' })} style={miniButton}>Processing</button>
                                <button onClick={() => runAction(order, 'update-fulfillment', { fulfillmentStatus: 'packed' })} style={miniButton}>Packed</button>
                                <button onClick={() => runAction(order, 'update-fulfillment', { fulfillmentStatus: 'delivered' })} style={miniButton}>Delivered</button>
                                <button onClick={() => runAction(order, 'update-fulfillment', { fulfillmentStatus: 'cancelled' })} style={{ ...miniButton, color: '#D98A8A' }}>Cancel</button>
                              </div>

                              <div className="grid sm:grid-cols-2 gap-2">
                                <input placeholder="Carrier (USPS, UPS, FedEx)" value={tracking[order.orderNumber]?.carrier || order.carrier || ''} onChange={e => setTracking(prev => ({ ...prev, [order.orderNumber]: { ...prev[order.orderNumber], carrier: e.target.value, trackingNumber: prev[order.orderNumber]?.trackingNumber ?? order.trackingNumber ?? '' } }))} style={{ ...input, marginBottom: 0 }} />
                                <input placeholder="Tracking number" value={tracking[order.orderNumber]?.trackingNumber || order.trackingNumber || ''} onChange={e => setTracking(prev => ({ ...prev, [order.orderNumber]: { ...prev[order.orderNumber], trackingNumber: e.target.value, carrier: prev[order.orderNumber]?.carrier ?? order.carrier ?? '' } }))} style={{ ...input, marginBottom: 0 }} />
                              </div>
                              <button onClick={() => sendTracking(order)} disabled={saving === `update-tracking:${order.orderNumber}`} style={{ ...primaryButton, marginTop: '10px' }}>{saving === `update-tracking:${order.orderNumber}` ? 'Sending…' : order.trackingSentAt ? 'Update Tracking & Email Customer' : 'Ship + Email Tracking →'}</button>
                              {order.trackingSentAt && <p style={{ ...small, color: '#6FB98F', marginTop: '8px' }}>Tracking email sent {new Date(order.trackingSentAt).toLocaleString()}</p>}
                            </>
                          ) : <p style={small}>Tracking and fulfillment are managed by the administrator.</p>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Stat({ label: text, value, accent, warn }) {
  return <div style={{ background: '#151515', padding: '26px' }}><p style={sectionLabel}>{text}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: warn ? '#E0B84D' : accent ? '#C9A96E' : '#F5F0E8' }}>{value}</p></div>
}

function StatusChip({ value, type }) {
  const v = String(value || 'unknown').toLowerCase()
  const good = ['paid', 'shipped', 'delivered'].includes(v)
  const warn = ['pending', 'processing', 'packed', 'unverified'].includes(v)
  const color = good ? '#6FB98F' : warn ? '#E0B84D' : '#D98A8A'
  return <span style={{ display: 'inline-block', border: `1px solid ${color}`, color, padding: '5px 8px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.12em' }}>{type === 'payment' ? `Payment: ${v}` : v}</span>
}

const panel = { backgroundColor: '#151515', border: '1px solid #2A2A2A' }
const eyebrow = { color: '#C9A96E', letterSpacing: '.25em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '10px' }
const label = { display: 'block', color: '#C9A96E', letterSpacing: '.16em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '8px' }
const sectionLabel = { color: '#777', letterSpacing: '.14em', textTransform: 'uppercase', fontSize: '9px', marginBottom: '10px' }
const input = { width: '100%', background: '#0D0D0D', color: '#FFF', border: '1px solid #3A3A3A', padding: '13px 14px', marginBottom: '18px', outline: 'none' }
const primaryButton = { width: '100%', background: '#C9A96E', color: '#000', border: 0, padding: '14px 16px', textTransform: 'uppercase', letterSpacing: '.13em', fontSize: '10px', cursor: 'pointer' }
const miniButton = { background: '#0D0D0D', color: '#BBB', border: '1px solid #3A3A3A', padding: '10px 12px', textTransform: 'uppercase', letterSpacing: '.11em', fontSize: '9px', cursor: 'pointer' }
const secondaryButton = { color: '#AAA', border: '1px solid #3A3A3A', background: 'transparent', padding: '11px 16px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px', cursor: 'pointer' }
const small = { color: '#999', fontSize: '12px', marginBottom: '4px' }
const errorStyle = { color: '#D98A8A', fontSize: '13px', lineHeight: 1.5 }
const attentionBadge = { background: '#C9A96E', color: '#000', padding: '5px 8px', borderRadius: '999px', fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase' }
const pendingChip = { color: '#E0B84D', border: '1px solid #6B542F', padding: '4px 7px', fontSize: '8px', letterSpacing: '.11em' }
