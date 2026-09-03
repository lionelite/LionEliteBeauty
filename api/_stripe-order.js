import { Redis } from '@upstash/redis'
import { Resend } from 'resend'
import Stripe from 'stripe'
import { randomUUID } from 'node:crypto'
import { priceOrder } from './_pricing.js'

const ORDERS_INDEX = 'orders:beauty:index'
const WEBHOOK_SECRET_KEY = 'config:beauty:stripe_webhook_secret'
const WEBHOOK_URL = `${process.env.SITE_URL || 'https://lionelitebeauty.com'}/api/stripe-webhook`
const NOTIFY_TO = ['orders@lionelitebeauty.com', 'info@lionelitebeauty.com']

let redis
let stripe
let resend

export function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  if (!stripe) throw new Error('Stripe is not configured')
  return stripe
}

export function getRedisStrict() {
  if (redis) return redis
  const url = process.env.KV_URL || process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) throw new Error('Persistent Redis is required for checkout')
  redis = new Redis({ url, token })
  return redis
}

function getResend() {
  if (!resend && process.env.RESEND_API_KEY) resend = new Resend(process.env.RESEND_API_KEY)
  return resend
}

export function orderKey(orderNumber) {
  return `orders:beauty:${orderNumber}`
}

export function newOrderNumber() {
  const stamp = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  return `LEB-${stamp}-${randomUUID().slice(0, 6).toUpperCase()}`
}

export async function saveOrder(order) {
  const r = getRedisStrict()
  const now = new Date().toISOString()
  const normalized = { ...order, updatedAt: now }
  await r.set(orderKey(normalized.orderNumber), JSON.stringify(normalized))
  await r.zadd(ORDERS_INDEX, { score: Date.parse(normalized.createdAt || now), member: normalized.orderNumber })
  return normalized
}

export async function loadOrder(orderNumber) {
  if (!orderNumber) return null
  const raw = await getRedisStrict().get(orderKey(orderNumber))
  if (!raw) return null
  return typeof raw === 'string' ? JSON.parse(raw) : raw
}

function parseCookie(cookieHeader, name) {
  const parts = String(cookieHeader || '').split(';')
  for (const part of parts) {
    const idx = part.indexOf('=')
    if (idx < 0) continue
    const key = part.slice(0, idx).trim()
    if (key === name) return decodeURIComponent(part.slice(idx + 1).trim())
  }
  return ''
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim())
}

export async function createPendingOrder({ paymentIntent, priced }) {
  const orderNumber = paymentIntent.metadata?.orderNumber
  if (!orderNumber) throw new Error('PaymentIntent is missing canonical order number')

  const now = new Date().toISOString()
  const order = {
    orderNumber,
    createdAt: now,
    updatedAt: now,
    name: '',
    email: '',
    phone: '',
    address: '',
    items: priced.lines.map(l => ({ name: l.name, slug: l.slug, quantity: l.quantity, price: l.price })),
    subtotal: Math.round(priced.subtotalCents) / 100,
    total: Math.round(priced.totalCents) / 100,
    paymentMethod: 'stripe',
    paymentStatus: 'pending',
    paymentNote: 'awaiting_payment',
    stripePaymentId: paymentIntent.id,
    discountCode: priced.code || null,
    rep: priced.rep || null,
    rewardsGranted: false,
    fulfillmentStatus: 'awaiting_payment',
    carrier: '',
    trackingNumber: '',
    trackingSentAt: null,
    checkoutLockedAt: null,
    paidAt: null,
    ownerNotifiedAt: null,
    reconciliationRequired: false,
  }
  return saveOrder(order)
}

export async function lockCheckout({ cookieHeader, checkout }) {
  const orderNumber = parseCookie(cookieHeader, 'leb_pending_order')
  if (!orderNumber) throw new Error('Secure order reference is missing. Please restart checkout.')

  const order = await loadOrder(orderNumber)
  if (!order) throw new Error('Pending order record was not found. Please restart checkout.')
  if (order.paymentStatus === 'paid') return order

  const name = String(checkout?.name || '').trim()
  const email = String(checkout?.email || '').trim().toLowerCase()
  const phone = String(checkout?.phone || '').trim()
  const address = String(checkout?.address || '').trim()
  const city = String(checkout?.city || '').trim()
  const state = String(checkout?.state || '').trim()
  const zip = String(checkout?.zip || '').trim()
  const items = Array.isArray(checkout?.items) ? checkout.items : []
  const discountCode = checkout?.discountApplied ? String(checkout?.discountCode || '') : ''

  if (!name || !validEmail(email) || !address || !city || !state || !/^\d{5}(-\d{4})?$/.test(zip) || !items.length) {
    throw new Error('Complete contact, shipping, and cart details are required before payment.')
  }

  const priced = priceOrder({ items, discountCode, discountApplied: Boolean(discountCode) })
  if (!priced.ok) throw new Error(priced.error || 'Unable to verify order pricing')
  if (Math.round(Number(order.total) * 100) !== Number(priced.totalCents)) {
    throw new Error('Order total changed before payment. Please restart checkout.')
  }

  return saveOrder({
    ...order,
    name,
    email,
    phone,
    address: `${address}, ${city}, ${state} ${zip}`,
    items: priced.lines.map(l => ({ name: l.name, slug: l.slug, quantity: l.quantity, price: l.price })),
    subtotal: Math.round(priced.subtotalCents) / 100,
    total: Math.round(priced.totalCents) / 100,
    discountCode: priced.code || null,
    rep: priced.rep || null,
    checkoutLockedAt: new Date().toISOString(),
    paymentNote: 'checkout_locked',
  })
}

function orderEmailHtml(order, urgent = false) {
  const rows = (order.items || []).map(i => `<tr><td style="padding:10px 0;border-bottom:1px solid #e8ddd1">${i.name}</td><td style="padding:10px;border-bottom:1px solid #e8ddd1;text-align:center">${i.quantity}</td><td style="padding:10px 0;border-bottom:1px solid #e8ddd1;text-align:right">$${(Number(i.price || 0) * Number(i.quantity || 1)).toFixed(2)}</td></tr>`).join('')
  const adminUrl = `${process.env.SITE_URL || 'https://lionelitebeauty.com'}/admin/orders`
  return `<!doctype html><html><body style="margin:0;background:#fbf7f0;font-family:Arial,sans-serif;color:#34302e"><div style="padding:32px 14px"><div style="max-width:640px;margin:auto;background:#fff;border:1px solid #e8ddd1;padding:34px"><div style="font-family:Georgia,serif;letter-spacing:.18em;font-size:19px">LION ELITE BEAUTY</div><div style="margin-top:8px;color:${urgent ? '#b42318' : '#a9854d'};font-weight:700;letter-spacing:.14em;font-size:11px">${urgent ? 'PAID ORDER — RECONCILIATION REQUIRED' : 'PAID ORDER — FULFILLMENT REQUIRED'}</div><h1 style="font-family:Georgia,serif;font-weight:400;margin:28px 0 6px">Order #${order.orderNumber}</h1><div style="font-size:24px;color:#a9854d;margin-bottom:22px">$${Number(order.total || 0).toFixed(2)}</div><a href="${adminUrl}" style="display:block;background:#c8a56a;color:#fff;text-decoration:none;text-align:center;padding:15px;margin:22px 0">OPEN ORDERS DASHBOARD</a><p><strong>${order.name || 'Customer details incomplete'}</strong><br>${order.email || ''}<br>${order.phone || ''}<br>${order.address || ''}</p><table width="100%" cellspacing="0" cellpadding="0">${rows}</table><p style="margin-top:24px;font-size:12px;color:#736a64">Stripe PaymentIntent: ${order.stripePaymentId || ''}</p>${urgent ? '<p style="color:#b42318;font-weight:700">Do not ignore this payment. Stripe confirmed funds but the checkout record needs manual reconciliation.</p>' : ''}</div></div></body></html>`
}

async function sendOwnerNotification(order, urgent = false) {
  const mail = getResend()
  if (!mail) throw new Error('Resend is not configured')
  const result = await mail.emails.send({
    from: 'Lion Elite Beauty <orders@lionelitebeauty.com>',
    to: NOTIFY_TO,
    subject: `${urgent ? '🚨' : '🛒'} PAID ORDER #${order.orderNumber} — FULFILL ${urgent ? ' / RECONCILE' : 'NOW'} — $${Number(order.total || 0).toFixed(2)}`,
    html: orderEmailHtml(order, urgent),
  })
  if (result?.error) throw new Error(result.error.message || 'Order notification failed')
}

async function notifyOnce(order, urgent = false) {
  const r = getRedisStrict()
  const lockKey = `orders:beauty:notified:${order.orderNumber}`
  const acquired = await r.set(lockKey, new Date().toISOString(), { nx: true, ex: 60 * 60 * 24 * 30 })
  if (!acquired) return order
  try {
    await sendOwnerNotification(order, urgent)
    const updated = await saveOrder({ ...order, ownerNotifiedAt: new Date().toISOString() })
    return updated
  } catch (err) {
    await r.del(lockKey)
    throw err
  }
}

function paymentEmail(intent) {
  return String(intent.receipt_email || intent.charges?.data?.[0]?.billing_details?.email || '').trim().toLowerCase()
}

export async function finalizeStripeOrder(intent) {
  if (!intent || intent.status !== 'succeeded') throw new Error('Stripe payment is not succeeded')
  const orderNumber = intent.metadata?.orderNumber
  const receivedCents = Number(intent.amount_received ?? intent.amount)

  let order = orderNumber ? await loadOrder(orderNumber) : null
  if (!order) {
    const fallbackNumber = orderNumber || `LEB-RECON-${String(intent.id || randomUUID()).slice(-10).toUpperCase()}`
    const now = new Date().toISOString()
    order = await saveOrder({
      orderNumber: fallbackNumber,
      createdAt: now,
      updatedAt: now,
      name: '',
      email: paymentEmail(intent),
      phone: '',
      address: '',
      items: [],
      subtotal: receivedCents / 100,
      total: receivedCents / 100,
      paymentMethod: 'stripe',
      paymentStatus: 'paid',
      paymentNote: 'stripe_paid_missing_checkout_record',
      stripePaymentId: intent.id,
      discountCode: intent.metadata?.discountCode === 'none' ? null : intent.metadata?.discountCode || null,
      rep: intent.metadata?.rep === 'none' ? null : intent.metadata?.rep || null,
      rewardsGranted: false,
      fulfillmentStatus: 'reconciliation_required',
      carrier: '',
      trackingNumber: '',
      trackingSentAt: null,
      checkoutLockedAt: null,
      paidAt: now,
      ownerNotifiedAt: null,
      reconciliationRequired: true,
    })
    return notifyOnce(order, true)
  }

  const expectedCents = Math.round(Number(order.total || 0) * 100)
  const amountMismatch = expectedCents !== receivedCents
  const missingLock = !order.checkoutLockedAt || !order.email || !order.address || !(order.items || []).length
  const urgent = amountMismatch || missingLock

  order = await saveOrder({
    ...order,
    paymentStatus: amountMismatch ? 'unverified' : 'paid',
    paymentNote: amountMismatch ? 'amount_mismatch' : (missingLock ? 'paid_missing_checkout_lock' : null),
    stripePaymentId: intent.id,
    paidAt: order.paidAt || new Date().toISOString(),
    fulfillmentStatus: urgent ? 'reconciliation_required' : 'processing',
    reconciliationRequired: urgent,
  })

  return notifyOnce(order, urgent)
}

export async function ensureStripeWebhook() {
  const r = getRedisStrict()
  const existingSecret = await r.get(WEBHOOK_SECRET_KEY)
  if (existingSecret) return { configured: true, url: WEBHOOK_URL, source: 'redis' }

  const s = getStripe()
  const list = await s.webhookEndpoints.list({ limit: 100 })
  const matches = (list.data || []).filter(ep => ep.url === WEBHOOK_URL)
  for (const ep of matches) {
    try { await s.webhookEndpoints.del(ep.id) } catch (err) { console.error('Could not remove stale LEB webhook:', err?.message) }
  }

  const endpoint = await s.webhookEndpoints.create({
    url: WEBHOOK_URL,
    enabled_events: ['payment_intent.succeeded', 'payment_intent.payment_failed', 'payment_intent.canceled'],
    description: 'Lion Elite Beauty authoritative paid-order fulfillment webhook',
  })
  if (!endpoint.secret) throw new Error('Stripe did not return a webhook signing secret')
  await r.set(WEBHOOK_SECRET_KEY, endpoint.secret)
  return { configured: true, url: WEBHOOK_URL, endpointId: endpoint.id, source: 'created' }
}

export async function getWebhookSecret() {
  const fromEnv = process.env.STRIPE_WEBHOOK_SECRET
  if (fromEnv) return fromEnv
  const value = await getRedisStrict().get(WEBHOOK_SECRET_KEY)
  if (!value) throw new Error('Stripe webhook signing secret is not configured')
  return String(value)
}
