import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.ORDER_FROM_EMAIL || 'Lion Elite Beauty <orders@lionelitebeauty.com>'
const ADMIN = process.env.ORDER_NOTIFICATION_EMAIL || 'orders@lionelitebeauty.com'

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function money(value) {
  return `$${Number(value || 0).toFixed(2)}`
}

function orderNumber() {
  const now = new Date()
  const stamp = now.toISOString().slice(0, 10).replaceAll('-', '')
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `LEB-${stamp}-${suffix}`
}

function page(title, content) {
  return `<!doctype html><html><body style="margin:0;background:#f5f0e8;font-family:Arial,sans-serif;color:#222"><div style="max-width:640px;margin:0 auto;padding:32px 16px"><div style="background:#fff;border-top:4px solid #c9a96e;padding:34px"><div style="font-family:Georgia,serif;color:#c9a96e;letter-spacing:.22em;font-size:19px;text-transform:uppercase">Lion Elite Beauty</div><div style="margin:6px 0 28px;color:#999;font-size:11px;letter-spacing:.14em;text-transform:uppercase">Order & Enrollment Notification</div><h2 style="font-family:Georgia,serif;font-weight:400;margin:0 0 24px">${esc(title)}</h2>${content}</div></div></body></html>`
}

function rows(items) {
  return `<table style="width:100%;border-collapse:collapse">${items.map(([label, value]) => `<tr><td style="padding:9px 0;border-bottom:1px solid #eee;color:#777;font-size:12px;width:150px;vertical-align:top">${esc(label)}</td><td style="padding:9px 0;border-bottom:1px solid #eee;font-size:13px">${esc(value || 'Not provided')}</td></tr>`).join('')}</table>`
}

function itemRows(items = []) {
  return `<table style="width:100%;border-collapse:collapse"><tr><th style="text-align:left;padding:8px 0;border-bottom:1px solid #c9a96e;font-size:11px">ITEM</th><th style="text-align:center;padding:8px 0;border-bottom:1px solid #c9a96e;font-size:11px">QTY</th><th style="text-align:right;padding:8px 0;border-bottom:1px solid #c9a96e;font-size:11px">PRICE</th></tr>${items.map(i => `<tr><td style="padding:10px 0;border-bottom:1px solid #eee">${esc(i.name)}</td><td style="padding:10px 0;border-bottom:1px solid #eee;text-align:center">${Number(i.quantity || 1)}</td><td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right">${money(i.price)}</td></tr>`).join('')}</table>`
}

async function sendEmail(payload) {
  const result = await resend.emails.send(payload)
  if (result?.error) throw new Error(result.error.message || 'Resend failed')
  return result
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'Email service not configured' })

  const b = req.body || {}
  if (!b.email || !b.name) return res.status(400).json({ error: 'Name and email are required' })

  const id = orderNumber()
  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })

  try {
    if (b.type === 'order') {
      const items = Array.isArray(b.items) ? b.items : []
      const subtotal = items.reduce((sum, i) => sum + Number(i.price || 0) * Number(i.quantity || 1), 0)
      const discount = b.discountCode && b.discountCode !== 'None' ? subtotal * 0.10 : 0
      const total = subtotal - discount
      const paid = b.paymentMethod === 'stripe'
      const paymentLabel = paid ? 'PAID — Stripe / Pay Later' : `PENDING — ${b.paymentMethod || 'manual payment'}`

      const adminHtml = page(`New Order — ${money(total)}`, `
        <div style="background:#faf7f2;border:1px solid #eadfce;padding:16px;margin-bottom:20px"><strong>Order ${esc(id)}</strong><br><span style="color:#777;font-size:12px">${esc(timestamp)} · ${esc(paymentLabel)}</span></div>
        <h3 style="font-size:12px;letter-spacing:.12em;color:#c9a96e">CUSTOMER</h3>
        ${rows([['Name', b.name], ['Email', b.email], ['Phone', b.phone], ['Shipping address', b.address]])}
        <h3 style="font-size:12px;letter-spacing:.12em;color:#c9a96e;margin-top:24px">PURCHASE</h3>
        ${itemRows(items)}
        <div style="margin-top:16px;text-align:right;line-height:1.8"><div>Subtotal: ${money(subtotal)}</div>${discount ? `<div style="color:#5b8b68">Discount: −${money(discount)}</div>` : ''}<div style="font-family:Georgia,serif;font-size:22px;color:#c9a96e">Total Paid: ${money(total)}</div></div>
        ${rows([['Payment method', b.paymentMethod], ['Payment status', paymentLabel], ['Stripe payment ID', b.stripePaymentId], ['Discount code', b.discountCode], ['Order number', id]])}
      `)

      const clientHtml = page('Your order is confirmed', `
        <p>Hi ${esc(b.name)},</p><p>Thank you for your Lion Elite Beauty order. Your order number is <strong>${esc(id)}</strong>.</p>
        ${itemRows(items)}
        <div style="margin-top:16px;text-align:right;font-family:Georgia,serif;font-size:20px;color:#c9a96e">Total: ${money(total)}</div>
        ${b.address ? `<p style="margin-top:24px"><strong>Shipping to:</strong><br>${esc(b.address)}</p>` : ''}
      `)

      await Promise.all([
        sendEmail({ from: FROM, to: [ADMIN], replyTo: b.email, subject: `💰 NEW LION ELITE BEAUTY ORDER — ${money(total)} — ${b.name}`, html: adminHtml }),
        sendEmail({ from: FROM, to: [b.email], subject: `Lion Elite Beauty Order Confirmed — ${id}`, html: clientHtml }),
      ])
      return res.status(200).json({ success: true, orderNumber: id, total })
    }

    if (b.type === 'program_order') {
      const foundation = b.tier === 'foundation'
      const amount = foundation ? 299.99 : 2400
      const tier = foundation ? 'Foundation Coaching' : 'VIP Transformation Program'
      const paid = b.paymentMethod === 'stripe'
      const paymentLabel = paid ? 'PAID — Stripe / Pay Later' : `PENDING — ${b.paymentMethod || 'manual payment'}`

      const adminHtml = page(`New Program Enrollment — ${money(amount)}`, `
        <div style="background:#faf7f2;border:1px solid #eadfce;padding:16px;margin-bottom:20px"><strong>${esc(tier)}</strong><br><span style="color:#777;font-size:12px">${esc(timestamp)} · ${esc(paymentLabel)}</span></div>
        ${rows([['Name', b.name], ['Email', b.email], ['Phone', b.phone], ['Address', b.address], ['Program', b.program || 'Wellness Program'], ['Tier purchased', tier], ['Amount', money(amount)], ['VIP ID', b.vipId], ['Payment method', b.paymentMethod], ['Payment status', paymentLabel], ['Stripe payment ID', b.stripePaymentId], ['Enrollment number', id]])}
      `)

      const clientHtml = page('Enrollment confirmed', `<p>Hi ${esc(b.name)},</p><p>Your <strong>${esc(tier)}</strong> enrollment for ${esc(b.program || 'Wellness Program')} has been received.</p><p style="font-family:Georgia,serif;font-size:22px;color:#c9a96e">${money(amount)}</p><p>Enrollment reference: <strong>${esc(id)}</strong></p>`)

      await Promise.all([
        sendEmail({ from: FROM, to: [ADMIN], replyTo: b.email, subject: `💰 NEW LION ELITE BEAUTY ENROLLMENT — ${money(amount)} — ${b.name}`, html: adminHtml }),
        sendEmail({ from: FROM, to: [b.email], subject: `Lion Elite Beauty Enrollment Confirmed — ${tier}`, html: clientHtml }),
      ])
      return res.status(200).json({ success: true, orderNumber: id, total: amount })
    }

    const adminHtml = page('New Application Received', rows([
      ['Name', b.name], ['Email', b.email], ['Phone', b.phone], ['Program', b.program], ['Experience', b.experience], ['Primary concerns', b.struggle], ['Timeline', b.timeline], ['Investment', b.investment], ['Commitment', b.commitment], ['Health notes', b.health], ['Received', timestamp],
    ]))
    const clientHtml = page('Application received', `<p>Hi ${esc(b.name)},</p><p>We received your Lion Elite Beauty application for <strong>${esc(b.program || 'our wellness program')}</strong>. Our team will review it and contact you with next steps.</p>`)

    await Promise.all([
      sendEmail({ from: FROM, to: [ADMIN], replyTo: b.email, subject: `New Lion Elite Beauty Application — ${b.program || 'Wellness'} — ${b.name}`, html: adminHtml }),
      sendEmail({ from: FROM, to: [b.email], subject: 'Application Received — Lion Elite Beauty', html: clientHtml }),
    ])

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Order notification error:', error)
    return res.status(500).json({ error: 'Failed to send notification emails' })
  }
}
