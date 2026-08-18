import { Redis } from '@upstash/redis'
import { Resend } from 'resend'
import Stripe from 'stripe'
import { authenticateDashboard } from './_auth.js'
import { priceOrder } from './_pricing.js'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null
const ORDERS_EMAIL = 'orders@lionelitebeauty.com'

let redis
const memStore = new Map()

function getRedis() {
  if (redis) return redis
  const url = process.env.KV_URL || process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (url && token) redis = new Redis({ url, token })
  return redis
}

function normalizeCode(code) {
  const value = String(code || '').trim().toUpperCase()
  return value === 'NONE' ? '' : value
}

function orderKey(orderNumber) {
  return `orders:beauty:${orderNumber}`
}

const INDEX_KEY = 'orders:beauty:index'

async function saveOrder(order) {
  const r = getRedis()
  if (r) {
    await r.set(orderKey(order.orderNumber), JSON.stringify(order))
    await r.zadd(INDEX_KEY, { score: Date.parse(order.createdAt), member: order.orderNumber })
  } else {
    memStore.set(orderKey(order.orderNumber), JSON.stringify(order))
    const index = JSON.parse(memStore.get(INDEX_KEY) || '[]')
    if (!index.includes(order.orderNumber)) index.unshift(order.orderNumber)
    memStore.set(INDEX_KEY, JSON.stringify(index))
  }
}

async function loadOrder(orderNumber) {
  const r = getRedis()
  const raw = r ? await r.get(orderKey(orderNumber)) : memStore.get(orderKey(orderNumber))
  if (!raw) return null
  return typeof raw === 'string' ? JSON.parse(raw) : raw
}

async function listOrders() {
  const r = getRedis()
  const ids = r
    ? await r.zrange(INDEX_KEY, 0, 499, { rev: true })
    : JSON.parse(memStore.get(INDEX_KEY) || '[]').slice(0, 500)

  const orders = []
  for (const id of ids || []) {
    const order = await loadOrder(id)
    if (order) orders.push(order)
  }
  return orders
}

const authenticate = authenticateDashboard

async function verifyStripePayment(paymentIntentId, expectedCents) {
  if (!stripe) return { ok: false, reason: 'stripe_not_configured' }
  try {
    const intent = await stripe.paymentIntents.retrieve(String(paymentIntentId))
    if (!intent || intent.status !== 'succeeded') return { ok: false, reason: `payment_status_${intent?.status || 'unknown'}` }
    if (Number(intent.amount_received ?? intent.amount) !== Number(expectedCents)) return { ok: false, reason: 'amount_mismatch' }
    return { ok: true }
  } catch (err) {
    console.error('Stripe verification failed:', err?.message)
    return { ok: false, reason: 'verification_error' }
  }
}

function carrierTrackingUrl(carrier, trackingNumber) {
  const c = String(carrier || '').trim().toLowerCase()
  const n = encodeURIComponent(String(trackingNumber || '').trim())
  if (c.includes('usps')) return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${n}`
  if (c.includes('ups')) return `https://www.ups.com/track?tracknum=${n}`
  if (c.includes('fedex')) return `https://www.fedex.com/fedextrack/?trknbr=${n}`
  if (c.includes('dhl')) return `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${n}`
  return ''
}

function trackingEmailHtml(order) {
  const url = carrierTrackingUrl(order.carrier, order.trackingNumber)
  const items = (order.items || []).map(i => `<li style="margin-bottom:7px;">${i.name} × ${i.quantity}</li>`).join('')
  return `<!doctype html><html><body style="margin:0;background:#fbf7f0;font-family:Arial,sans-serif;color:#34302e">
    <div style="padding:34px 14px">
      <div style="max-width:620px;margin:0 auto;background:#fffdfc;border:1px solid #e8ddd1;padding:38px">
        <div style="font-family:Georgia,serif;letter-spacing:.18em;font-size:18px;color:#34302e">LION ELITE BEAUTY</div>
        <div style="margin-top:6px;color:#c8a56a;letter-spacing:.22em;font-size:10px;text-transform:uppercase">Shipping Update</div>
        <h1 style="font-family:Georgia,serif;font-weight:400;font-size:31px;margin:32px 0 16px">Your order is on its way.</h1>
        <p style="line-height:1.75;color:#736a64">Hi ${order.name || 'there'}, your order <strong>#${order.orderNumber}</strong> has shipped.</p>
        <div style="background:#f6eee7;border:1px solid #e8ddd1;padding:20px;margin:26px 0">
          <div style="font-size:12px;color:#9b9088;text-transform:uppercase;letter-spacing:.15em;margin-bottom:10px">Shipping details</div>
          <div style="margin-bottom:8px"><strong>Carrier:</strong> ${order.carrier}</div>
          <div><strong>Tracking:</strong> ${order.trackingNumber}</div>
        </div>
        ${url ? `<a href="${url}" style="display:inline-block;background:#c8a56a;color:#fff;text-decoration:none;padding:14px 22px;letter-spacing:.12em;text-transform:uppercase;font-size:10px">Track package →</a>` : ''}
        ${items ? `<div style="margin-top:30px;font-size:10px;color:#9b9088;text-transform:uppercase;letter-spacing:.15em">Items</div><ul style="padding-left:20px;color:#736a64;line-height:1.7">${items}</ul>` : ''}
        <p style="margin-top:32px;color:#9b9088;font-size:12px;line-height:1.7">Questions? Reply to this email and our team will help.</p>
      </div>
    </div>
  </body></html>`
}

function newOrderEmailHtml(order) {
  const paid = order.paymentStatus === 'paid'
  const adminUrl = `${process.env.SITE_URL || 'https://lionelitebeauty.com'}/admin/orders`
  const rows = (order.items || []).map(i => `
    <tr>
      <td style="padding:13px 0;border-bottom:1px solid #e8ddd1;color:#4d4743;font-size:14px">${i.name}</td>
      <td style="padding:13px 8px;border-bottom:1px solid #e8ddd1;text-align:center;color:#736a64;font-size:14px">${i.quantity}</td>
      <td style="padding:13px 0;border-bottom:1px solid #e8ddd1;text-align:right;color:#a9854d;font-weight:bold;font-size:14px">$${(Number(i.price || 0) * Number(i.quantity || 1)).toFixed(2)}</td>
    </tr>`).join('')

  return `<!doctype html><html><body style="margin:0;background:#fbf7f0;font-family:Arial,sans-serif;color:#34302e">
    <div style="padding:34px 14px">
      <div style="max-width:640px;margin:0 auto;background:#fffdfc;border:1px solid #e8ddd1">
        <div style="padding:36px 34px 28px;border-bottom:1px solid #e8ddd1;background:#fffdfc">
          <div style="font-family:Georgia,serif;letter-spacing:.18em;font-size:19px;color:#34302e">LION ELITE BEAUTY</div>
          <div style="margin-top:7px;color:#c8a56a;letter-spacing:.24em;font-size:10px;text-transform:uppercase">New Order · Internal Notification</div>
          <h1 style="font-family:Georgia,serif;font-weight:400;font-size:34px;line-height:1.15;margin:30px 0 8px;color:#34302e">A new order has arrived.</h1>
          <div style="font-family:Georgia,serif;font-size:20px;color:#a9854d">#${order.orderNumber}</div>
        </div>

        <div style="padding:26px 34px;background:#f6eee7;border-bottom:1px solid #e8ddd1">
          <div style="display:inline-block;background:${paid ? '#eef5ef' : '#fbf1e2'};border:1px solid ${paid ? '#cfe0d2' : '#ead4ae'};color:${paid ? '#557661' : '#9a733f'};padding:7px 11px;border-radius:999px;font-size:10px;text-transform:uppercase;letter-spacing:.12em">${paid ? 'Payment confirmed' : 'Payment pending confirmation'}</div>
          <div style="margin-top:12px;color:#736a64;font-size:13px">Payment via <strong style="color:#34302e;text-transform:capitalize">${order.paymentMethod}</strong></div>
        </div>

        <div style="padding:28px 34px 10px">
          <a href="${adminUrl}" style="display:block;background:#c8a56a;color:#fff;text-decoration:none;text-align:center;padding:16px 18px;letter-spacing:.15em;text-transform:uppercase;font-size:10px">Open Orders Dashboard →</a>
        </div>

        <div style="padding:22px 34px">
          <div style="color:#9b9088;font-size:10px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:12px">Customer</div>
          <div style="font-family:Georgia,serif;font-size:22px;color:#34302e;margin-bottom:5px">${order.name || ''}</div>
          <div style="color:#a9854d;font-size:13px;margin-bottom:3px">${order.email}</div>
          ${order.phone ? `<div style="color:#736a64;font-size:13px;margin-bottom:3px">${order.phone}</div>` : ''}
          ${order.address ? `<div style="color:#736a64;font-size:13px;line-height:1.65;margin-top:8px">${order.address}</div>` : ''}
        </div>

        <div style="padding:10px 34px 34px">
          <div style="color:#9b9088;font-size:10px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:8px">Order summary</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #c8a56a;color:#9b9088;font-size:10px;letter-spacing:.12em">PRODUCT</td>
              <td style="padding:10px 8px;border-bottom:1px solid #c8a56a;text-align:center;color:#9b9088;font-size:10px;letter-spacing:.12em">QTY</td>
              <td style="padding:10px 0;border-bottom:1px solid #c8a56a;text-align:right;color:#9b9088;font-size:10px;letter-spacing:.12em">PRICE</td>
            </tr>
            ${rows}
            <tr>
              <td colspan="2" style="padding:18px 0 0;text-align:right;font-family:Georgia,serif;font-size:18px;color:#34302e">Total</td>
              <td style="padding:18px 0 0;text-align:right;font-family:Georgia,serif;font-size:22px;color:#a9854d">$${Number(order.total || 0).toFixed(2)}</td>
            </tr>
          </table>
          ${order.discountCode ? `<div style="margin-top:14px;color:#9b9088;font-size:12px">Discount code: <strong style="color:#736a64">${order.discountCode}</strong>${order.rep ? ` · Rep: ${order.rep}` : ''}</div>` : ''}
        </div>
      </div>
    </div>
  </body></html>`
}

async function sendNewOrderNotification(order) {
  if (!process.env.RESEND_API_KEY) return { skipped: 'no_resend_key' }
  const result = await resend.emails.send({
    from: `Lion Elite Beauty <${ORDERS_EMAIL}>`,
    to: [ORDERS_EMAIL],
    subject: `🛒 New Order #${order.orderNumber} — Lion Elite Beauty — $${Number(order.total || 0).toFixed(2)}`,
    html: newOrderEmailHtml(order),
  })
  if (result?.error) throw new Error(result.error.message || 'Order notification failed')
  return { sent: true, to: ORDERS_EMAIL }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const body = req.body || {}

  try {
    if (body.action === 'create') {
      if (!body.orderNumber || !body.email || !Array.isArray(body.items)) return res.status(400).json({ error: 'Missing order data' })

      const existing = await loadOrder(body.orderNumber)
      if (existing) return res.status(200).json({ success: true, order: existing, duplicate: true })

      const code = normalizeCode(body.discountCode)
      const priced = priceOrder({ items: body.items, discountCode: code, discountApplied: Boolean(code) })
      if (!priced.ok) return res.status(400).json({ error: priced.error })

      let paymentStatus = 'pending'
      let paymentNote = null
      if (body.paymentMethod === 'stripe') {
        if (!body.stripePaymentId) {
          paymentStatus = 'pending'
          paymentNote = 'missing_payment_intent'
        } else {
          const verified = await verifyStripePayment(body.stripePaymentId, priced.totalCents)
          paymentStatus = verified.ok ? 'paid' : 'unverified'
          if (!verified.ok) paymentNote = verified.reason
        }
      }

      const order = {
        orderNumber: body.orderNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: body.name || '',
        email: String(body.email || '').trim().toLowerCase(),
        phone: body.phone || '',
        address: body.address || '',
        items: priced.lines.map(l => ({ name: l.name, slug: l.slug, quantity: l.quantity, price: l.price })),
        subtotal: Math.round(priced.subtotalCents) / 100,
        total: Math.round(priced.totalCents) / 100,
        paymentMethod: body.paymentMethod || 'unknown',
        paymentStatus,
        paymentNote,
        stripePaymentId: body.stripePaymentId || null,
        discountCode: priced.code || null,
        rep: priced.rep || null,
        rewardsGranted: false,
        fulfillmentStatus: 'processing',
        carrier: '',
        trackingNumber: '',
        trackingSentAt: null,
      }

      await saveOrder(order)
      try { await sendNewOrderNotification(order) } catch (notifyErr) { console.error('New-order notification failed:', notifyErr) }
      return res.status(200).json({ success: true, order })
    }

    const auth = authenticate(body.username, body.password)
    if (!auth) return res.status(401).json({ error: 'Invalid username or password' })

    if (body.action === 'list') {
      const all = await listOrders()
      const orders = auth.role === 'admin' ? all : all.filter(o => normalizeCode(o.discountCode) === auth.code)
      return res.status(200).json({ authenticated: true, role: auth.role, orders })
    }

    if (body.action === 'mark-paid') {
      if (auth.role !== 'admin') return res.status(403).json({ error: 'Admin access required' })
      const order = await loadOrder(body.orderNumber)
      if (!order) return res.status(404).json({ error: 'Order not found' })
      if (order.paymentMethod === 'stripe') return res.status(400).json({ error: 'Stripe payment status must come from Stripe verification' })
      order.paymentStatus = 'paid'
      order.paymentNote = 'manually_verified'
      order.paymentConfirmedAt = new Date().toISOString()
      order.updatedAt = new Date().toISOString()
      await saveOrder(order)
      return res.status(200).json({ success: true, order })
    }

    if (body.action === 'update-fulfillment') {
      if (auth.role !== 'admin') return res.status(403).json({ error: 'Admin access required' })
      const allowed = ['processing', 'packed', 'delivered', 'cancelled']
      const next = String(body.fulfillmentStatus || '').trim().toLowerCase()
      if (!allowed.includes(next)) return res.status(400).json({ error: 'Invalid fulfillment status' })
      const order = await loadOrder(body.orderNumber)
      if (!order) return res.status(404).json({ error: 'Order not found' })
      order.fulfillmentStatus = next
      order.updatedAt = new Date().toISOString()
      await saveOrder(order)
      return res.status(200).json({ success: true, order })
    }

    if (body.action === 'update-tracking') {
      if (auth.role !== 'admin') return res.status(403).json({ error: 'Admin access required' })
      const order = await loadOrder(body.orderNumber)
      if (!order) return res.status(404).json({ error: 'Order not found' })
      if (!body.trackingNumber || !body.carrier) return res.status(400).json({ error: 'Carrier and tracking number are required' })

      order.carrier = String(body.carrier).trim()
      order.trackingNumber = String(body.trackingNumber).trim()
      order.fulfillmentStatus = 'shipped'
      order.updatedAt = new Date().toISOString()

      const result = await resend.emails.send({
        from: `Lion Elite Beauty <${ORDERS_EMAIL}>`,
        to: [order.email],
        subject: `Your Lion Elite Beauty order #${order.orderNumber} has shipped`,
        html: trackingEmailHtml(order),
      })
      if (result?.error) throw new Error(result.error.message || 'Tracking email failed')

      order.trackingSentAt = new Date().toISOString()
      await saveOrder(order)
      return res.status(200).json({ success: true, order })
    }

    if (body.action === 'mark-delivered') {
      if (auth.role !== 'admin') return res.status(403).json({ error: 'Admin access required' })
      const order = await loadOrder(body.orderNumber)
      if (!order) return res.status(404).json({ error: 'Order not found' })
      order.fulfillmentStatus = 'delivered'
      order.updatedAt = new Date().toISOString()
      await saveOrder(order)
      return res.status(200).json({ success: true, order })
    }

    return res.status(400).json({ error: 'Unknown action' })
  } catch (err) {
    console.error('Orders API error:', err)
    return res.status(500).json({ error: 'Order service unavailable' })
  }
}
