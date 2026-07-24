import { useState } from 'react'
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

  async function loadOrders(e) {
    e?.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list', username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to load orders')
      setOrders(data.orders || [])
      setRole(data.role || '')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function sendTracking(order) {
    const values = tracking[order.orderNumber] || {}
    if (!values.carrier?.trim() || !values.trackingNumber?.trim()) {
      setError('Enter both carrier and tracking number.')
      return
    }
    setSaving(order.orderNumber)
    setError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-tracking', username, password,
          orderNumber: order.orderNumber,
          carrier: values.carrier,
          trackingNumber: values.trackingNumber,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to send tracking')
      setOrders(prev => prev.map(o => o.orderNumber === order.orderNumber ? data.order : o))
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving('')
    }
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
              <p style={eyebrow}>Admin / Rep Portal</p>
              <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.6rem', marginBottom: '8px' }}>Orders & Fulfillment</h1>
              <p style={{ color: '#888', lineHeight: 1.7 }}>Order history, payment status, shipping, and customer tracking notifications.</p>
            </div>
            <Link to="/rep" style={secondaryButton}>← Sales Portal</Link>
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
              <div className="grid sm:grid-cols-3 gap-px" style={{ backgroundColor: '#2A2A2A', marginBottom: '28px' }}>
                <Stat label="Orders" value={orders.length} />
                <Stat label="Processing" value={orders.filter(o => o.fulfillmentStatus === 'processing').length} />
                <Stat label="Shipped" value={orders.filter(o => o.fulfillmentStatus === 'shipped').length} accent />
              </div>
              {error && <p style={{ ...errorStyle, marginBottom: '18px' }}>{error}</p>}
              <div style={panel}>
                {orders.length === 0 ? (
                  <div style={{ padding: '48px 30px', textAlign: 'center', color: '#777' }}>No saved storefront orders yet.</div>
                ) : orders.map(order => (
                  <div key={order.orderNumber} style={{ padding: '26px 28px', borderBottom: '1px solid #262626' }}>
                    <div className="grid lg:grid-cols-12 gap-6 items-start">
                      <div className="lg:col-span-3">
                        <p style={eyebrow}>#{order.orderNumber}</p>
                        <p style={{ fontFamily: 'Georgia, serif', fontSize: '18px', marginBottom: '6px' }}>{order.name}</p>
                        <p style={small}>{order.email}</p>
                        {order.phone && <p style={small}>{order.phone}</p>}
                        <p style={{ ...small, marginTop: '10px', lineHeight: 1.6 }}>{order.address}</p>
                      </div>

                      <div className="lg:col-span-3">
                        <p style={sectionLabel}>Order</p>
                        {(order.items || []).map((item, idx) => <p key={`${item.name}-${idx}`} style={small}>{item.name} × {item.quantity}</p>)}
                        <p style={{ marginTop: '10px', color: '#F5F0E8' }}>{money(order.total)}</p>
                        <p style={small}>{order.paymentMethod} · {order.paymentStatus}</p>
                        {order.rep && <p style={{ ...small, color: '#C9A96E' }}>Rep: {order.rep} · {order.discountCode}</p>}
                      </div>

                      <div className="lg:col-span-2">
                        <p style={sectionLabel}>Status</p>
                        <span style={{ color: order.fulfillmentStatus === 'shipped' ? '#6FB98F' : '#C9A96E', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '.12em' }}>{order.fulfillmentStatus}</span>
                        {order.trackingNumber && <><p style={{ ...small, marginTop: '12px' }}>{order.carrier}</p><p style={{ ...small, wordBreak: 'break-all' }}>{order.trackingNumber}</p></>}
                        <p style={{ ...small, marginTop: '12px' }}>{new Date(order.createdAt).toLocaleString()}</p>
                      </div>

                      <div className="lg:col-span-4">
                        {role === 'admin' ? (
                          <>
                            <p style={sectionLabel}>Fulfillment</p>
                            <div className="grid sm:grid-cols-2 gap-2">
                              <input placeholder="Carrier (USPS, UPS, FedEx)" value={tracking[order.orderNumber]?.carrier || order.carrier || ''} onChange={e => setTracking(prev => ({ ...prev, [order.orderNumber]: { ...prev[order.orderNumber], carrier: e.target.value, trackingNumber: prev[order.orderNumber]?.trackingNumber ?? order.trackingNumber ?? '' } }))} style={{ ...input, marginBottom: 0 }} />
                              <input placeholder="Tracking number" value={tracking[order.orderNumber]?.trackingNumber || order.trackingNumber || ''} onChange={e => setTracking(prev => ({ ...prev, [order.orderNumber]: { ...prev[order.orderNumber], trackingNumber: e.target.value, carrier: prev[order.orderNumber]?.carrier ?? order.carrier ?? '' } }))} style={{ ...input, marginBottom: 0 }} />
                            </div>
                            <button onClick={() => sendTracking(order)} disabled={saving === order.orderNumber} style={{ ...primaryButton, marginTop: '10px' }}>{saving === order.orderNumber ? 'Sending…' : order.trackingSentAt ? 'Update Tracking & Email Customer' : 'Send Tracking to Customer →'}</button>
                            {order.trackingSentAt && <p style={{ ...small, color: '#6FB98F', marginTop: '8px' }}>Tracking email sent {new Date(order.trackingSentAt).toLocaleString()}</p>}
                          </>
                        ) : <p style={small}>Tracking is managed by the administrator. Rep-attributed orders remain visible here for history.</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function Stat({ label: text, value, accent }) {
  return <div style={{ background: '#151515', padding: '26px' }}><p style={sectionLabel}>{text}</p><p style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: accent ? '#C9A96E' : '#F5F0E8' }}>{value}</p></div>
}

const panel = { backgroundColor: '#151515', border: '1px solid #2A2A2A' }
const eyebrow = { color: '#C9A96E', letterSpacing: '.25em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '10px' }
const label = { display: 'block', color: '#C9A96E', letterSpacing: '.16em', textTransform: 'uppercase', fontSize: '10px', marginBottom: '8px' }
const sectionLabel = { color: '#777', letterSpacing: '.14em', textTransform: 'uppercase', fontSize: '9px', marginBottom: '10px' }
const input = { width: '100%', background: '#0D0D0D', color: '#FFF', border: '1px solid #3A3A3A', padding: '13px 14px', marginBottom: '18px', outline: 'none' }
const primaryButton = { width: '100%', background: '#C9A96E', color: '#000', border: 0, padding: '14px 16px', textTransform: 'uppercase', letterSpacing: '.13em', fontSize: '10px', cursor: 'pointer' }
const secondaryButton = { color: '#AAA', border: '1px solid #3A3A3A', padding: '11px 16px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '10px' }
const small = { color: '#999', fontSize: '12px', marginBottom: '4px' }
const errorStyle = { color: '#D98A8A', fontSize: '13px', lineHeight: 1.5 }
