import Stripe from 'stripe'
import { Redis } from '@upstash/redis'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import { authenticateDashboard, verifyAdminToken } from './_auth.js'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null
let redis
const memStore = new Map()
const REGISTRY_KEY = 'affiliates:beauty:registry'
const INVITE_PREFIX = 'affiliates:beauty:invite:'

function getRedis() {
  if (redis) return redis
  const url = process.env.KV_URL || process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  if (url && token) redis = new Redis({ url, token })
  return redis
}

function normalizeCode(code) { return String(code || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '') }
function normalizeUsername(username) { return String(username || '').trim().toLowerCase().replace(/[^a-z0-9._-]/g, '') }
function slugFromName(name) { return normalizeUsername(String(name || '').replace(/\s+/g, '.')) }
function generateCode(name) {
  const base = String(name || 'ELITE').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10) || 'ELITE'
  return `${base}10`
}
function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  return `${salt}:${scryptSync(String(password), salt, 64).toString('hex')}`
}
function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false
  const [salt, hex] = stored.split(':')
  const actual = scryptSync(String(password), salt, 64)
  const expected = Buffer.from(hex, 'hex')
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}
function publicRep(rep) {
  const { passwordHash, inviteToken, ...safe } = rep
  return safe
}

function envReps() {
  const raw = process.env.REP_CREDENTIALS
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    return Object.fromEntries(Object.entries(parsed).map(([key, value]) => {
      if (!value || typeof value !== 'object') return null
      const username = normalizeUsername(key)
      const code = normalizeCode(value.code)
      if (!username || !code) return null
      return [username, {
        id: `env:${username}`, name: String(value.name || key).trim(), username,
        email: String(value.email || '').trim().toLowerCase(), code,
        discountPercent: Number(value.discountPercent ?? 10), commissionPercent: Number(value.commissionPercent ?? 20),
        status: 'active', source: 'environment', legacyPassword: value.password || null,
      }]
    }).filter(Boolean))
  } catch { return {} }
}

async function readRegistry() {
  const r = getRedis()
  let raw = r ? await r.get(REGISTRY_KEY) : memStore.get(REGISTRY_KEY)
  if (raw && typeof raw === 'string') { try { raw = JSON.parse(raw) } catch { raw = {} } }
  const stored = raw && typeof raw === 'object' ? raw : {}
  return { ...envReps(), ...stored }
}
async function writeRegistry(registry) {
  const persistent = Object.fromEntries(Object.entries(registry).filter(([, rep]) => rep.source !== 'environment'))
  const r = getRedis()
  if (r) await r.set(REGISTRY_KEY, JSON.stringify(persistent))
  else memStore.set(REGISTRY_KEY, JSON.stringify(persistent))
}
async function writeInvite(token, username) {
  const payload = { username, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 }
  const r = getRedis()
  if (r) await r.set(`${INVITE_PREFIX}${token}`, JSON.stringify(payload), { ex: 7 * 24 * 60 * 60 })
  else memStore.set(`${INVITE_PREFIX}${token}`, JSON.stringify(payload))
}
async function readInvite(token) {
  const r = getRedis()
  let raw = r ? await r.get(`${INVITE_PREFIX}${token}`) : memStore.get(`${INVITE_PREFIX}${token}`)
  if (!raw) return null
  if (typeof raw === 'string') { try { raw = JSON.parse(raw) } catch { return null } }
  return raw.expiresAt > Date.now() ? raw : null
}
async function deleteInvite(token) {
  const r = getRedis()
  if (r) await r.del(`${INVITE_PREFIX}${token}`)
  else memStore.delete(`${INVITE_PREFIX}${token}`)
}

async function getAllPaymentIntents() {
  const all = []; let startingAfter
  for (let page = 0; page < 20; page += 1) {
    const batch = await stripe.paymentIntents.list({ limit: 100, ...(startingAfter ? { starting_after: startingAfter } : {}) })
    all.push(...batch.data)
    if (!batch.has_more || batch.data.length === 0) break
    startingAfter = batch.data[batch.data.length - 1].id
  }
  return all
}
function saleFromIntent(pi, commissionPercent = 0) {
  const revenueCents = pi.amount_received || pi.amount || 0
  return { id: pi.id, date: new Date((pi.created || 0) * 1000).toISOString(), items: pi.metadata?.items || 'Order', revenue: revenueCents / 100, commission: Math.round(revenueCents * commissionPercent / 100) / 100, status: 'Paid', code: normalizeCode(pi.metadata?.discountCode), rep: pi.metadata?.rep && pi.metadata.rep !== 'none' ? pi.metadata.rep : null }
}
function parseItems(itemsText) {
  return String(itemsText || '').split(',').map(p => p.trim()).filter(Boolean).map(part => {
    const match = part.match(/^(.*?)(?:\s*[×x]\s*(\d+))?$/)
    return { name: (match?.[1] || part).trim(), quantity: Number(match?.[2] || 1) }
  })
}
function buildAdminDashboard(intents, reps) {
  const succeeded = intents.filter(pi => pi.status === 'succeeded').sort((a,b)=>(b.created||0)-(a.created||0))
  const activeReps = Object.values(reps).filter(r => r.status !== 'disabled')
  const repRows = activeReps.map(rep => {
    const matched = succeeded.filter(pi => normalizeCode(pi.metadata?.discountCode) === rep.code)
    const revenueCents = matched.reduce((sum,pi)=>sum+(pi.amount_received||pi.amount||0),0)
    return { ...publicRep(rep), completedOrders: matched.length, revenue: revenueCents/100, commission: Math.round(revenueCents*rep.commissionPercent/100)/100, latestSale: matched.length ? new Date((matched[0].created||0)*1000).toISOString() : null }
  })
  const repCodeMap = new Map(activeReps.map(rep => [rep.code, rep]))
  const sales = succeeded.map(pi => { const rep = repCodeMap.get(normalizeCode(pi.metadata?.discountCode)); return saleFromIntent(pi, rep?.commissionPercent || 0) })
  const productMap = new Map()
  succeeded.forEach(pi => { const seen = new Set(); parseItems(pi.metadata?.items).forEach(item => { const key=item.name.toLowerCase(); const cur=productMap.get(key)||{name:item.name,units:0,orders:0}; cur.units+=item.quantity; if(!seen.has(key)){cur.orders+=1;seen.add(key)} productMap.set(key,cur) }) })
  const products=[...productMap.values()].sort((a,b)=>b.units-a.units||b.orders-a.orders)
  const totalRevenueCents=succeeded.reduce((sum,pi)=>sum+(pi.amount_received||pi.amount||0),0)
  return { authenticated:true, role:'admin', admin:{username:'admin'}, stats:{completedOrders:succeeded.length,totalRevenue:totalRevenueCents/100,repOrders:repRows.reduce((s,r)=>s+r.completedOrders,0),repRevenue:repRows.reduce((s,r)=>s+r.revenue,0),totalCommission:repRows.reduce((s,r)=>s+r.commission,0),latestSale:sales[0]?.date||null}, reps:repRows, products, sales, note:'Affiliates, rep codes, attributed sales and commissions are managed automatically from the persistent Beauty affiliate registry.' }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const body = req.body || {}
  const registry = await readRegistry()

  if (body.action === 'validate-code') {
    const rep = Object.values(registry).find(r => r.status !== 'disabled' && r.code === normalizeCode(body.code))
    if (!rep) return res.status(404).json({ valid:false })
    return res.status(200).json({ valid:true, code:rep.code, rep:rep.name, discountPercent:rep.discountPercent })
  }

  if (body.action === 'provision') {
    const auth = verifyAdminToken(body.token)
    if (!auth.ok) return res.status(auth.status).json({ error: auth.error })
    const name = String(body.name || '').trim()
    if (!name) return res.status(400).json({ error:'Affiliate name is required' })
    let username = normalizeUsername(body.username || slugFromName(name))
    if (!username) return res.status(400).json({ error:'Unable to generate username' })
    if (registry[username]) return res.status(409).json({ error:'That username already exists' })
    let code = normalizeCode(body.code || generateCode(name))
    if (Object.values(registry).some(r => r.code === code)) code = `${code.slice(0,8)}${Math.floor(100+Math.random()*900)}`
    const inviteToken = randomBytes(32).toString('base64url')
    const rep = { id:`beauty:${Date.now()}:${username}`, name, username, email:String(body.email||'').trim().toLowerCase(), code, discountPercent:Number(body.discountPercent ?? 10), commissionPercent:Number(body.commissionPercent ?? 20), status:'invited', source:'registry', createdAt:new Date().toISOString(), passwordHash:null }
    registry[username]=rep
    await writeRegistry(registry)
    await writeInvite(inviteToken, username)
    const base = process.env.SITE_URL || 'https://lionelitebeauty.com'
    return res.status(201).json({ success:true, affiliate:publicRep(rep), inviteLink:`${base}/rep?invite=${encodeURIComponent(inviteToken)}`, portalLink:`${base}/rep`, shareLink:`${base}/checkout?discount=${code}` })
  }

  if (body.action === 'list-affiliates') {
    const auth = verifyAdminToken(body.token)
    if (!auth.ok) return res.status(auth.status).json({ error:auth.error })
    return res.status(200).json({ affiliates:Object.values(registry).map(publicRep).sort((a,b)=>String(a.name).localeCompare(String(b.name))) })
  }

  if (body.action === 'accept-invite') {
    const invite = await readInvite(String(body.inviteToken || ''))
    if (!invite) return res.status(400).json({ error:'Invite is invalid or expired' })
    if (!body.password || String(body.password).length < 8) return res.status(400).json({ error:'Password must be at least 8 characters' })
    const rep = registry[invite.username]
    if (!rep) return res.status(404).json({ error:'Affiliate account not found' })
    rep.passwordHash = hashPassword(body.password)
    rep.status = 'active'
    rep.activatedAt = new Date().toISOString()
    registry[invite.username] = rep
    await writeRegistry(registry)
    await deleteInvite(String(body.inviteToken))
    return res.status(200).json({ success:true, username:rep.username, code:rep.code })
  }

  if (body.action !== 'login') return res.status(400).json({ error:'Unknown action' })
  if (!stripe) return res.status(503).json({ error:'Stripe is not configured' })

  const normalizedUsername = normalizeUsername(body.username)
  const adminAuth = authenticateDashboard(body.username, body.password)
  let role = adminAuth?.role === 'admin' ? 'admin' : null
  let rep = registry[normalizedUsername]
  if (!role && rep) {
    const valid = rep.passwordHash ? verifyPassword(body.password, rep.passwordHash) : (rep.legacyPassword && rep.legacyPassword === body.password)
    if (valid && rep.status !== 'disabled') role = 'rep'
  }
  if (!role) return res.status(401).json({ error:'Invalid username or password' })

  try {
    const intents = await getAllPaymentIntents()
    if (role === 'admin') return res.status(200).json(buildAdminDashboard(intents, registry))
    const matched = intents.filter(pi => pi.status === 'succeeded' && normalizeCode(pi.metadata?.discountCode) === rep.code).sort((a,b)=>(b.created||0)-(a.created||0))
    const sales=matched.map(pi=>saleFromIntent(pi,rep.commissionPercent))
    const revenueCents=matched.reduce((sum,pi)=>sum+(pi.amount_received||pi.amount||0),0)
    return res.status(200).json({ authenticated:true, role:'rep', rep:{...publicRep(rep), shareLink:`${process.env.SITE_URL || 'https://lionelitebeauty.com'}/checkout?discount=${rep.code}`}, stats:{completedOrders:sales.length,referredRevenue:revenueCents/100,totalCommission:Math.round(revenueCents*rep.commissionPercent/100)/100,latestSale:sales[0]?.date||null}, sales, commissionBasis:`Commission is calculated automatically at ${rep.commissionPercent}% of the amount actually collected after the customer discount.` })
  } catch (err) {
    console.error('Rep portal error:', err)
    return res.status(500).json({ error:'Unable to load portal dashboard' })
  }
}
