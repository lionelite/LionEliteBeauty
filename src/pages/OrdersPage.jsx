import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const CREAM = '#FBF7F0'
const IVORY = '#FFFDFC'
const BLUSH = '#F6EEE7'
const GOLD = '#C8A56A'
const GOLD_DARK = '#A9854D'
const INK = '#34302E'
const MUTED = '#837A73'
const BORDER = '#E8DDD1'
const GREEN = '#7D9C88'
const ROSE = '#B98282'

export default function OrdersPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [orders, setOrders] = useState([])
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState('')
  const [tracking, setTracking] = useState({})
  const [lastRefresh, setLastRefresh] = useState(null)

  const pendingPayments = useMemo(() => orders.filter(o => o.paymentStatus !== 'paid' && o.fulfillmentStatus !== 'cancelled'), [orders])
  const activeFulfillment = useMemo(() => orders.filter(o => ['processing', 'packed'].includes(o.fulfillmentStatus)), [orders])
  const needsAttention = useMemo(() => orders.filter(o => o.paymentStatus !== 'paid' || ['processing', 'packed'].includes(o.fulfillmentStatus)), [orders])

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

  async function runAction(order, action, extra = {}, successMessage = '') {
    setSaving(`${action}:${order.orderNumber}`)
    setError('')
    setNotice('')
    try {
      const data = await request({ action, username, password, orderNumber: order.orderNumber, ...extra })
      replaceOrder(data.order)
      if (successMessage) setNotice(successMessage)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving('')
    }
  }

  async function sendTracking(order) {
    const values = tracking[order.orderNumber] || {}
    const carrier = values.carrier ?? order.carrier ?? ''
    const trackingNumber = values.trackingNumber ?? order.trackingNumber ?? ''
    if (!carrier.trim() || !trackingNumber.trim()) {
      setError('Enter both the carrier and tracking number before sending.')
      return
    }
    await runAction(
      order,
      'update-tracking',
      { carrier, trackingNumber },
      `Tracking sent to ${order.email}.`
    )
  }

  const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0))

  return (
    <div style={{ background: `linear-gradient(180deg, ${IVORY} 0%, ${CREAM} 48%, #F8F1E9 100%)`, minHeight: '100vh', color: INK }}>
      <SEO title="Orders & Fulfillment — Lion Elite Beauty" />

      <header style={{ borderBottom: `1px solid ${BORDER}`, background: 'rgba(255,253,252,.94)', backdropFilter: 'blur(14px)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div className="max-w-7xl mx-auto px-6" style={{ minHeight: '88px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: INK }}>
            <div style={{ fontFamily: 'Georgia, serif', letterSpacing: '.18em', fontSize: '18px' }}>LION ELITE BEAUTY</div>
            <div style={{ marginTop: '5px', color: GOLD, letterSpacing: '.2em', fontSize: '9px', textTransform: 'uppercase' }}>Orders & Fulfillment</div>
          </Link>
          <div className="flex gap-2 flex-wrap" style={{ justifyContent: 'flex-end' }}>
            {role && <button onClick={() => loadOrders()} style={softButton}>Refresh</button>}
            <Link to="/" style={softButton}>Back to site</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6" style={{ paddingTop: '58px', paddingBottom: '90px' }}>
        <section style={{ marginBottom: '32px' }}>
          <p style={eyebrow}>Beauty Operations</p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2.3rem,5vw,4rem)', lineHeight: 1.02, margin: '0 0 12px' }}>Orders, beautifully organized.</h1>
              <p style={{ color: MUTED, maxWidth: '720px', lineHeight: 1.8, margin: 0 }}>Confirm payments, prepare packages, send tracking details, and keep every Lion Elite Beauty order moving from checkout to delivery.</p>
            </div>
            {role === 'admin' && needsAttention.length > 0 && <span style={attentionBadge}>{needsAttention.length} need attention</span>}
          </div>
          {lastRefresh && <p style={{ color: '#AAA09A', fontSize: '11px', marginTop: '12px' }}>Auto-refreshes every 30 seconds · Updated {lastRefresh.toLocaleTimeString()}</p>}
        </section>

        {!role ? (
          <section style={{ ...card, maxWidth: '520px', padding: '34px' }}>
            <p style={eyebrow}>Private access</p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '28px', margin: '0 0 24px' }}>Open your order desk</h2>
            <form onSubmit={loadOrders}>
              <label style={label}>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} style={input} autoComplete="username" />
              <label style={label}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={input} autoComplete="current-password" />
              {error && <p style={errorStyle}>{error}</p>}
              <button type="submit" disabled={loading} style={primaryButton}>{loading ? 'Opening…' : 'Open Orders Dashboard'}</button>
            </form>
          </section>
        ) : (
          <>
            <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '26px' }}>
              <Stat label="All Orders" value={orders.length} />
              <Stat label="Pending Payment" value={pendingPayments.length} tone="warm" />
              <Stat label="Processing / Packed" value={activeFulfillment.length} tone="sage" />
              <Stat label="Shipped / Delivered" value={orders.filter(o => ['shipped', 'delivered'].includes(o.fulfillmentStatus)).length} tone="gold" />
            </section>

            {notice && <div style={successBanner}>{notice}</div>}
            {error && <div style={errorBanner}>{error}</div>}

            {orders.length === 0 ? (
              <section style={{ ...card, padding: '60px 30px', textAlign: 'center', color: MUTED }}>No saved storefront orders yet.</section>
            ) : (
              <section style={{ display: 'grid', gap: '18px' }}>
                {orders.map(order => {
                  const paymentPending = order.paymentStatus !== 'paid'
                  const isZelle = String(order.paymentMethod || '').toLowerCase() === 'zelle'
                  const t = tracking[order.orderNumber] || {}
                  return (
                    <article key={order.orderNumber} style={{ ...card, overflow: 'hidden' }}>
                      <div style={{ padding: '18px 24px', background: paymentPending ? '#FBF1E2' : '#F2F6F1', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                        <div>
                          <p style={{ ...eyebrow, marginBottom: '5px' }}>Order #{order.orderNumber}</p>
                          <p style={{ margin: 0, color: MUTED, fontSize: '12px' }}>{new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <StatusChip value={order.paymentStatus} type="payment" />
                          <StatusChip value={order.fulfillmentStatus} type="fulfillment" />
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-12 gap-7" style={{ padding: '28px 24px' }}>
                        <div className="lg:col-span-3">
                          <p style={sectionLabel}>Customer</p>
                          <h3 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '22px', margin: '0 0 8px' }}>{order.name || 'Customer'}</h3>
                          <a href={`mailto:${order.email}`} style={textLink}>{order.email}</a>
                          {order.phone && <p style={small}>{order.phone}</p>}
                          <p style={{ ...small, marginTop: '12px', lineHeight: 1.7 }}>{order.address}</p>
                        </div>

                        <div className="lg:col-span-3">
                          <p style={sectionLabel}>Order summary</p>
                          {(order.items || []).map((item, idx) => (
                            <div key={`${item.name}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '7px 0', borderBottom: `1px solid ${BORDER}` }}>
                              <span style={{ color: '#5D5651', fontSize: '13px' }}>{item.name} × {item.quantity}</span>
                              <span style={{ color: GOLD_DARK, fontSize: '13px', whiteSpace: 'nowrap' }}>{money(Number(item.price || 0) * Number(item.quantity || 1))}</span>
                            </div>
                          ))}
                          {order.subtotal != null && <p style={{ ...small, marginTop: '12px' }}>Subtotal {money(order.subtotal)}</p>}
                          {order.discountCode && <p style={{ ...small, color: GOLD_DARK }}>Discount code {order.discountCode}</p>}
                          <p style={{ fontFamily: 'Georgia, serif', fontSize: '24px', margin: '12px 0 0', color: INK }}>{money(order.total)}</p>
                        </div>

                        <div className="lg:col-span-2">
                          <p style={sectionLabel}>Payment</p>
                          <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 6px', textTransform: 'capitalize' }}>{order.paymentMethod}</p>
                          <p style={small}>{paymentPending ? 'Awaiting confirmation' : 'Payment confirmed'}</p>
                          {order.paymentConfirmedAt && <p style={{ ...small, marginTop: '8px' }}>Confirmed {new Date(order.paymentConfirmedAt).toLocaleString()}</p>}
                          {order.trackingNumber && (
                            <div style={{ marginTop: '18px', padding: '14px', background: CREAM, border: `1px solid ${BORDER}` }}>
                              <p style={{ ...sectionLabel, marginBottom: '6px' }}>Tracking</p>
                              <p style={{ ...small, color: INK }}>{order.carrier}</p>
                              <p style={{ ...small, color: INK, wordBreak: 'break-all' }}>{order.trackingNumber}</p>
                            </div>
                          )}
                        </div>

                        <div className="lg:col-span-4">
                          {role === 'admin' ? (
                            <div style={{ background: BLUSH, border: `1px solid ${BORDER}`, padding: '20px' }}>
                              <p style={sectionLabel}>Fulfillment actions</p>

                              {isZelle && paymentPending && (
                                <button
                                  onClick={() => runAction(order, 'mark-paid', {}, `Payment confirmed for order ${order.orderNumber}.`)}
                                  disabled={saving === `mark-paid:${order.orderNumber}`}
                                  style={{ ...primaryButton, marginBottom: '12px' }}>
                                  {saving === `mark-paid:${order.orderNumber}` ? 'Confirming…' : 'Confirm Zelle Payment'}
                                </button>
                              )}

                              <div className="grid grid-cols-2 gap-2" style={{ marginBottom: '14px' }}>
                                <button onClick={() => runAction(order, 'update-fulfillment', { fulfillmentStatus: 'processing' })} style={miniButton}>Processing</button>
                                <button onClick={() => runAction(order, 'update-fulfillment', { fulfillmentStatus: 'packed' })} style={miniButton}>Packed</button>
                                <button onClick={() => runAction(order, 'update-fulfillment', { fulfillmentStatus: 'delivered' })} style={miniButton}>Delivered</button>
                                <button onClick={() => runAction(order, 'update-fulfillment', { fulfillmentStatus: 'cancelled' })} style={{ ...miniButton, color: ROSE }}>Cancel</button>
                              </div>

                              <p style={{ ...sectionLabel, marginTop: '18px' }}>Shipping</p>
                              <div className="grid sm:grid-cols-2 gap-2">
                                <input
                                  placeholder="Carrier — USPS, UPS, FedEx"
                                  value={t.carrier ?? order.carrier ?? ''}
                                  onChange={e => setTracking(prev => ({ ...prev, [order.orderNumber]: { ...prev[order.orderNumber], carrier: e.target.value } }))}
                                  style={{ ...input, marginBottom: 0 }}
                                />
                                <input
                                  placeholder="Tracking number"
                                  value={t.trackingNumber ?? order.trackingNumber ?? ''}
                                  onChange={e => setTracking(prev => ({ ...prev, [order.orderNumber]: { ...prev[order.orderNumber], trackingNumber: e.target.value } }))}
                                  style={{ ...input, marginBottom: 0 }}
                                />
                              </div>
                              <button onClick={() => sendTracking(order)} disabled={saving === `update-tracking:${order.orderNumber}`} style={{ ...primaryButton, marginTop: '10px' }}>
                                {saving === `update-tracking:${order.orderNumber}` ? 'Sending…' : order.trackingSentAt ? 'Update Tracking & Email Customer' : 'Ship + Email Tracking'}
                              </button>
                              {order.trackingSentAt && <p style={{ ...small, color: GREEN, marginTop: '9px' }}>Tracking email sent {new Date(order.trackingSentAt).toLocaleString()}</p>}
                            </div>
                          ) : <p style={small}>Tracking and fulfillment are managed by the administrator.</p>}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  )
}

function Stat({ label: text, value, tone }) {
  const bg = tone === 'warm' ? '#FBF1E2' : tone === 'sage' ? '#F1F5F0' : tone === 'gold' ? '#F7F0E4' : IVORY
  const color = tone === 'sage' ? GREEN : tone === 'gold' || tone === 'warm' ? GOLD_DARK : INK
  return <div style={{ ...card, padding: '22px 24px', background: bg }}><p style={sectionLabel}>{text}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: '2.1rem', margin: 0, color }}>{value}</p></div>
}

function StatusChip({ value, type }) {
  const v = String(value || 'unknown').toLowerCase()
  const good = ['paid', 'shipped', 'delivered'].includes(v)
  const warn = ['pending', 'processing', 'packed', 'unverified'].includes(v)
  const color = good ? GREEN : warn ? GOLD_DARK : ROSE
  const bg = good ? '#EEF5EF' : warn ? '#FBF2E4' : '#FAEEEE'
  return <span style={{ display: 'inline-block', border: `1px solid ${color}55`, background: bg, color, borderRadius: '999px', padding: '6px 10px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '.12em' }}>{type === 'payment' ? `Payment: ${v}` : v}</span>
}

const card = { background: IVORY, border: `1px solid ${BORDER}`, boxShadow: '0 18px 45px rgba(97,77,61,.06)', borderRadius: '2px' }
const eyebrow = { color: GOLD_DARK, letterSpacing: '.28em', fontSize: '10px', textTransform: 'uppercase', margin: '0 0 10px' }
const label = { display: 'block', color: GOLD_DARK, letterSpacing: '.15em', textTransform: 'uppercase', fontSize: '9px', marginBottom: '8px' }
const sectionLabel = { color: '#9B9088', letterSpacing: '.16em', textTransform: 'uppercase', fontSize: '9px', margin: '0 0 10px' }
const input = { width: '100%', background: '#FFFDFC', color: INK, border: `1px solid ${BORDER}`, padding: '13px 14px', marginBottom: '18px', outline: 'none', borderRadius: 0 }
const primaryButton = { width: '100%', background: GOLD, color: '#fff', border: 0, padding: '14px 16px', textTransform: 'uppercase', letterSpacing: '.13em', fontSize: '10px', cursor: 'pointer' }
const miniButton = { background: IVORY, color: '#625A55', border: `1px solid ${BORDER}`, padding: '10px 12px', textTransform: 'uppercase', letterSpacing: '.1em', fontSize: '9px', cursor: 'pointer' }
const softButton = { color: '#736A64', border: `1px solid ${BORDER}`, background: IVORY, padding: '10px 14px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.1em', fontSize: '9px', cursor: 'pointer' }
const small = { color: MUTED, fontSize: '12px', margin: '0 0 4px' }
const textLink = { color: GOLD_DARK, fontSize: '12px', textDecoration: 'none', display: 'block', marginBottom: '4px' }
const errorStyle = { color: ROSE, fontSize: '13px', lineHeight: 1.5 }
const attentionBadge = { background: '#F6E9D8', color: GOLD_DARK, border: `1px solid ${GOLD}55`, padding: '7px 10px', borderRadius: '999px', fontSize: '9px', letterSpacing: '.12em', textTransform: 'uppercase' }
const successBanner = { background: '#EFF5EF', color: '#557661', border: '1px solid #CFE0D2', padding: '13px 16px', marginBottom: '18px', fontSize: '13px' }
const errorBanner = { background: '#FBEEEE', color: '#9C6868', border: '1px solid #E8CBCB', padding: '13px 16px', marginBottom: '18px', fontSize: '13px' }
