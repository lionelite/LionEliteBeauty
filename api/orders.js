import { Redis } from '@upstash/redis'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN = {
  username: 'admin',
  passwordHash: 'c0917845c70b20b3c9146ba17a32d1a617bf2a80158ea94750144e0f854a3469',
}

const REPS = {
  colin: {
    username: 'Colin',
    code: 'COLIN10',
    passwordHash: 'a3c50093106c7a7023d19ab2707b9113df1ff0cb1897eb257f7c9b3c1ca34677',
  },
}

let redis
const memStore = new Map()

function getRedis() {
  if (redis) return redis
  const url = process.env.KV_URL || process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (url && token) redis = new Redis({ url, token })
  return redis
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(String(password || '')).digest('hex')
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

function authenticate(username, password) {
  const normalized = String(username || '').trim().toLowerCase()
  const suppliedHash = hashPassword(password)
  if (normalized === ADMIN.username && suppliedHash === ADMIN.passwordHash) {
    return { role: 'admin', code: null, name: 'Administrator' }
  }
  const rep = REPS[normalized]
  if (rep && suppliedHash === rep.passwordHash) {
    return { role: 'rep', code: rep.code, name: rep.username }
  }
  return null
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

      const subtotal = body.items.reduce((sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 1), 0)
      const discounted = body.discountCode && body.discountCode !== 'None'
      const total = discounted ? subtotal * 0.9 : subtotal
      const code = normalizeCode(body.discountCode)
      const rep = Object.values(REPS).find(r => r.code === code)

      const order = {
        orderNumber: body.orderNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: body.name || '',
        email: String(body.email || '').trim().toLowerCase(),
        phone: body.phone || '',
        address: body.address || '',
        items: body.items,
        subtotal: Math.round(subtotal * 100) / 100,
        total: Math.round(total * 100) / 100,
        paymentMethod: body.paymentMethod || 'unknown',
        paymentStatus: body.paymentMethod === 'stripe' ? 'paid' : 'pending',
        stripePaymentId: body.stripePaymentId || null,
        discountCode: code || null,
        rep: rep?.username || null,
        fulfillmentStatus: 'processing',
        carrier: '',
        trackingNumber: '',
        trackingSentAt: null,
      }

      await saveOrder(order)
      return res.status(200).json({ success: true, order })
    }

    const auth = authenticate(body.username, body.password)
    if (!auth) return res.status(401).json({ error: 'Invalid username or password' })

    if (body.action === 'list') {
      const all = await listOrders()
      const orders = auth.role === 'admin' ? all : all.filter(o => normalizeCode(o.discountCode) === auth.code)
      return res.status(200).json({ authenticated: true, role: auth.role, orders })
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
        from: 'Lion Elite <orders@lionelitebeauty.com>',
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
