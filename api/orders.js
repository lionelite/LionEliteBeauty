import { Redis } from '@upstash/redis'
import { Resend } from 'resend'
import Stripe from 'stripe'
import { authenticateDashboard } from './_auth.js'
import { priceOrder } from './_pricing.js'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null

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
  let ids
  if (r) ids = await r.zrange(INDEX_KEY, 0, 499, { rev: true })
  else ids = JSON.parse(memStore.get(INDEX_KEY) || '[]').slice(0, 500)

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
    if (!intent || intent.status !== 'succeeded') {
      return { ok: false, reason: `payment_status_${intent?.status || 'unknown'}` }
    }
    if (Number(intent.amount_received ?? intent.amount) !== Number(expectedCents)) {
      return { ok: false, reason: 'amount_mismatch' }
    }
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
  const items = (order.items || []).map(i => `<li style="margin-bottom:6px;">${i.name} × ${i.quantity}</li>`).join('')
  return `
  <div style="font-family:Arial,sans-serif;background:#F5F0E8;padding:36px 16px;color:#2A2A2A;">
    <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #E0D5C5;padding:36px;">
      <p style="color:#C9A96E;letter-spacing:.22em;text-transform:uppercase;font-size:11px;margin:0 0 10px;">Lion Elite Beauty</p>
      <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;margin:0 0 18px;">Your order has shipped.</h1>
      <p style="line-height:1.7;color:#555;">Hi ${order.name || 'there'}, your Lion Elite Beauty order <strong>#${order.orderNumber}</strong> is on the way.</p>
      <div style="background:#FAF7F2;border:1px solid #E0D5C5;padding:20px;margin:24px 0;">
        <p style="margin:0 0 8px;"><strong>Carrier:</strong> ${order.carrier}</p>
        <p style="margin:0;"><strong>Tracking:</strong> ${order.trackingNumber}</p>
      </div>
      ${url ? `<p style="margin:24px 0;"><a href="${url}" style="display:inline-block;background:#C9A96E;color:#000;text-decoration:none;padding:14px 22px;letter-spacing:.12em;text-transform:uppercase;font-size:11px;">Track Package →</a></p>` : ''}
      ${items ? `<p style="font-size:12px;color:#777;text-transform:uppercase;letter-spacing:.12em;margin-top:28px;">Items</p><ul style="padding-left:20px;color:#555;line-height:1.6;">${items}</ul>` : ''}
      <p style="margin-top:28px;color:#777;font-size:13px;line-height:1.7;">Questions? Reply to this email and our team will help.</p>
    </div>
  </div>`
}

function newOrderEmailHtml(order) {
  const rows = (order.items || []).map(i => `
        <tr>
          <td style="padding:10px 12px;border-top:1px solid #E0D5C5;color:#2A2A2A;font-size:14px;">${i.name}</td>
          <td align="center" style="padding:10px 12px;border-top:1px solid #E0D5C5;color:#2A2A2A;font-size:14px;">${i.quantity}</td>
          <td align="right" style="padding:10px 12px;border-top:1px solid #E0D5C5;color:#C9A96E;font-weight:bold;font-size:14px;">$${(Number(i.price || 0) * Number(i.quantity || 1)).toFixed(2)}</td>
        </tr>`).join('')
  const paid = order.paymentStatus === 'paid'
  const adminUrl = `${process.env.SITE_URL || 'https://lionelitebeauty.com'}/orders`
  return `
  <div style="font-family:Arial,sans-serif;background:#0c0c0c;padding:24px 12px;color:#2A2A2A;">
    <div style="max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;">
      <div style="background:#C9A96E;padding:16px 24px;color:#141007;font-size:16px;font-weight:bold;letter-spacing:1px;">&#128722;&nbsp; NEW ORDER — ACTION REQUIRED</div>
      <div style="background:#141007;padding:22px 24px;">
        <div style="color:#D9B85A;font-size:11px;letter-spacing:4px;text-transform:uppercase;">Lion Elite Beauty — Internal Notification</div>
        <div style="color:#D9B85A;font-family:Georgia,serif;font-size:28px;padding-top:6px;">Order #${order.orderNumber}</div>
        <div style="color:#C9C2AD;font-size:14px;padding-top:8px;">Payment via <strong style="color:#C9A96E;">${order.paymentMethod}</strong> — <strong style="color:${paid ? '#7bbf7b' : '#e0b84d'};">${paid ? 'paid' : 'pending confirmation'}</strong></div>
      </div>
      <div style="background:#F5F0E8;padding:22px 24px 6px;">
        <a href="${adminUrl}" style="display:block;background:#C9A96E;color:#141007;text-decoration:none;text-align:center;font-size:14px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;padding:16px;">Open Orders Dashboard →</a>
      </div>
      <div style="background:#F5F0E8;padding:14px 24px 0;">
        <p style="color:#C9A96E;font-size:12px;font-weight:bold;letter-spacing:1px;margin:0;text-transform:uppercase;">Customer</p>
        <p style="color:#2A2A2A;font-size:15px;margin:6px 0 0;">${order.name || ''}</p>
        <p style="color:#C9A96E;font-size:13px;margin:0;">${order.email}</p>
        ${order.phone ? `<p style="color:#555;font-size:13px;margin:0;">${order.phone}</p>` : ''}
        ${order.address ? `<p style="color:#555;font-size:13px;margin:4px 0 0;">${order.address}</p>` : ''}
      </div>
      <div style="background:#F5F0E8;padding:16px 24px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;border:1px solid #E0D5C5;">
          <tr>
            <td style="padding:9px 12px;color:#8a8672;font-size:11px;letter-spacing:1px;">PRODUCT</td>
            <td align="center" style="padding:9px 12px;color:#8a8672;font-size:11px;letter-spacing:1px;">QTY</td>
            <td align="right" style="padding:9px 12px;color:#8a8672;font-size:11px;letter-spacing:1px;">PRICE</td>
          </tr>
          ${rows}
          <tr>
            <td colspan="2" align="right" style="padding:12px;border-top:2px solid #E0D5C5;color:#2A2A2A;font-weight:bold;">Total</td>
            <td align="right" style="padding:12px;border-top:2px solid #E0D5C5;color:#C9A96E;font-weight:bold;">$${Number(order.total || 0).toFixed(2)}</td>
          </tr>
        </table>
        ${order.discountCode ? `<p style="color:#777;font-size:12px;margin:10px 0 0;">Discount code: <strong>${order.discountCode}</strong>${order.rep ? ` (rep: ${order.rep})` : ''}</p>` : ''}
      </div>
    </div>
  </div>`
}

async function sendNewOrderNotification(order) {
  if (!process.env.RESEND_API_KEY) return { skipped: 'no_resend_key' }
  const to = process.env.ORDER_NOTIFICATION_EMAIL || 'info@lionelitewellness.com'
  await resend.emails.send({
    from: 'Lion Elite Beauty <orders@lionelitebeauty.com>',
    to: [to],
    subject: `🛒 New Order #${order.orderNumber} — Lion Elite Beauty — $${Number(order.total || 0).toFixed(2)}`,
    html: newOrderEmailHtml(order),
  })
  return { sent: true, to }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const body = req.body || {}

  try {
    if (body.action === 'create') {
      if (!body.orderNumber || !body.email || !Array.isArray(body.items)) {
        return res.status(400).json({ error: 'Missing order data' })
      }

      const existing = await loadOrder(body.orderNumber)
      if (existing) return res.status(200).json({ success: true, order: existing, duplicate: true })

      const code = normalizeCode(body.discountCode)
      const priced = priceOrder({
        items: body.items,
        discountCode: code,
        discountApplied: Boolean(code),
      })
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

      try {
        await sendNewOrderNotification(order)
      } catch (notifyErr) {
        console.error('New-order notification failed:', notifyErr)
      }

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

      await resend.emails.send({
        from: 'Lion Elite Beauty <orders@lionelitebeauty.com>',
        to: [order.email],
        subject: `Your Lion Elite Beauty order #${order.orderNumber} has shipped`,
        html: trackingEmailHtml(order),
      })

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