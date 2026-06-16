import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateOrderNumber() {
  const date = new Date()
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `LE-${y}${m}${d}-${rand}`
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

function formatTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
  })
}

// ── Premium email wrapper ────────────────────────────────────────────────────
const wrap = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0; padding:0; background-color:#050505; font-family:Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px;">
    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#080808; border:1px solid #1A1A1A;">
      <tr><td style="height:4px; background-color:#C9A96E; padding:0;"></td></tr>
      <tr><td style="padding:40px 40px 24px; text-align:center; border-bottom:1px solid #1A1A1A;">
        <p style="font-family:Georgia,serif; color:#C9A96E; font-size:22px; letter-spacing:0.3em; margin:0 0 4px; text-transform:uppercase;">Lion Elite</p>
        <p style="font-family:Georgia,serif; color:#7A7A7A; font-size:11px; letter-spacing:0.2em; margin:0; text-transform:uppercase;">Beauty &amp; Wellness</p>
      </td></tr>
      <tr><td style="padding:40px 40px; color:#FAFAF8; font-size:15px; line-height:1.8;">
        ${content}
      </td></tr>
      <tr><td style="padding:32px 40px; border-top:1px solid #1A1A1A; text-align:center;">
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#8A8A8A; font-size:11px; margin:0 0 6px;">Lion Elite Beauty &amp; Wellness</p>
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#6A6A6A; font-size:10px; margin:0 0 4px;">orders@lionelitebeauty.com</p>
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#4A4A4A; font-size:9px; margin:8px 0 0;">${formatDate()}</p>
      </td></tr>
    </table>
  </td></tr></table>
</body>
</html>`

function styledTable(rows) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    ${rows.map((r, i) => `
    <tr>
      <td style="padding:10px 14px; border-bottom:${i < rows.length - 1 ? '1px solid #1A1A1A' : 'none'}; color:#CACACA; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; white-space:nowrap; vertical-align:top;"><strong style="color:#C9A96E;">${r.label}</strong></td>
      <td style="padding:10px 14px; border-bottom:${i < rows.length - 1 ? '1px solid #1A1A1A' : 'none'}; color:#FAFAF8; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px;">${r.value}</td>
    </tr>`).join('')}
  </table>`
}

function paymentMethodLabel(method) {
  const labels = { stripe: 'Credit Card / Pay Later', zelle: 'Zelle', cashapp: 'CashApp' }
  return labels[method] || method || 'Not specified'
}

function paymentStatusBadge(method, stripePaymentId) {
  if (method === 'stripe') {
    return `<span style="display:inline-block; background-color:#1A3A1A; color:#5BA87A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; padding:4px 12px; letter-spacing:0.1em;">PAID — STRIPE</span>`
  }
  return `<span style="display:inline-block; background-color:#3A2A0A; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; padding:4px 12px; letter-spacing:0.1em;">PENDING — ${paymentMethodLabel(method).toUpperCase()}</span>`
}

function itemTable(items) {
  if (!items || !items.length) return ''
  const itemRows = items.map(i => `
  <tr>
    <td style="padding:10px 14px; border-bottom:1px solid #1A1A1A; color:#FAFAF8; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px;">${i.name}</td>
    <td style="padding:10px 14px; border-bottom:1px solid #1A1A1A; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; text-align:center;">${i.quantity}</td>
    <td style="padding:10px 14px; border-bottom:1px solid #1A1A1A; color:#FAFAF8; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; text-align:right;">$${i.price.toFixed(2)}</td>
  </tr>`).join('')

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr>
      <th style="padding:10px 14px; border-bottom:1px solid #2A2A2A; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.15em; text-align:left; font-weight:400; text-transform:uppercase;">Item</th>
      <th style="padding:10px 14px; border-bottom:1px solid #2A2A2A; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.15em; text-align:center; font-weight:400; text-transform:uppercase;">Qty</th>
      <th style="padding:10px 14px; border-bottom:1px solid #2A2A2A; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.15em; text-align:right; font-weight:400; text-transform:uppercase;">Price</th>
    </tr>
    ${itemRows}
  </table>`
}

function formatItems(products) {
  if (!products || !products.length) return ''
  return products.map(i => `${i.name} × ${i.quantity} — $${i.price.toFixed(2)}`).join('<br>')
}

// ── Admin notification ──────────────────────────────────────────────────────
function adminBody({ name, email, phone, program, experience, struggle, timeline, investment, commitment, health, items, address, discountCode, orderNumber, paymentMethod, stripePaymentId, total, subtotal, discountAmount }) {
  const isOrder = !!items

  let emailHtml = ''

  if (isOrder) {
    emailHtml = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;">
      <h2 style="color:#C9A96E; font-family:Georgia,serif; font-size:20px; margin:0;">New Order Received</h2>
      ${paymentStatusBadge(paymentMethod, stripePaymentId)}
    </div>

    <div style="background-color:#0A0A0A; border:1px solid #1A1A1A; padding:20px 24px; margin-bottom:20px;">
      <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:10px; letter-spacing:0.2em; margin:0 0 12px; text-transform:uppercase;">Order #${orderNumber}</p>
      <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#8A8A8A; font-size:12px; margin:0;">Placed ${formatDate()} at ${formatTime()}</p>
      <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#8A8A8A; font-size:12px; margin:4px 0 0;">Payment: ${paymentMethodLabel(paymentMethod)}</p>
    </div>

    <h3 style="color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; letter-spacing:0.15em; margin:0 0 12px; text-transform:uppercase;">Customer Details</h3>
    ${styledTable([
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      ...(phone && phone !== 'Not provided' ? [{ label: 'Phone', value: phone }] : []),
      { label: 'Shipping', value: address || 'Not provided' },
    ])}

    <h3 style="color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; letter-spacing:0.15em; margin:24px 0 12px; text-transform:uppercase;">Order Details</h3>
    ${itemTable(items)}

    <div style="background-color:#0A0A0A; border:1px solid #1A1A1A; padding:16px 20px; margin-top:12px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        ${subtotal !== undefined ? `<tr><td style="padding:4px 0; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px;">Subtotal</td><td style="padding:4px 0; color:#FAFAF8; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; text-align:right;">$${subtotal.toFixed(2)}</td></tr>` : ''}
        ${discountAmount > 0 ? `<tr><td style="padding:4px 0; color:#5BA87A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px;">Discount (WELCOME10)</td><td style="padding:4px 0; color:#5BA87A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; text-align:right;">−$${discountAmount.toFixed(2)}</td></tr>` : ''}
        <tr><td style="padding:8px 0 0; border-top:1px solid #2A2A2A; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:14px; letter-spacing:0.1em; text-transform:uppercase;">Total</td><td style="padding:8px 0 0; border-top:1px solid #2A2A2A; color:#C9A96E; font-family:Georgia,serif; font-size:20px; text-align:right;">$${total.toFixed(2)}</td></tr>
      </table>
    </div>`
  } else {
    // Application
    emailHtml = `
    <h2 style="color:#C9A96E; font-family:Georgia,serif; font-size:20px; margin:0 0 24px;">New Application Received</h2>
    ${styledTable([
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      ...(phone && phone !== 'Not provided' ? [{ label: 'Phone', value: phone }] : []),
      { label: 'Program', value: program || 'Not specified' },
      ...(experience ? [{ label: 'Experience', value: experience }] : []),
      ...(struggle && struggle !== 'Not provided' ? [{ label: 'Struggle', value: struggle }] : []),
      ...(timeline ? [{ label: 'Timeline', value: timeline }] : []),
      ...(investment ? [{ label: 'Investment', value: investment }] : []),
      ...(commitment ? [{ label: 'Commitment', value: commitment }] : []),
      ...(health && health !== 'Not provided' ? [{ label: 'Health Notes', value: health }] : []),
    ])}`
  }

  return emailHtml
}

// ── Customer confirmation ──────────────────────────────────────────────────
function clientConfirmation({ name, program, items, orderNumber, address, paymentMethod, stripePaymentId, total, subtotal, discountAmount, experience, struggle, timeline, investment, commitment, health }) {
  const isOrder = !!items
  const title = isOrder ? 'Your order is confirmed.' : 'We&rsquo;ve received your application.'

  let bodyHtml = ''
  if (isOrder) {
    const itemsList = items.map(i =>
      `<tr><td style="padding:8px 12px; border-bottom:1px solid #1A1A1A; color:#FAFAF8; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px;">${i.name}</td><td style="padding:8px 12px; border-bottom:1px solid #1A1A1A; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; text-align:center;">${i.quantity}</td><td style="padding:8px 12px; border-bottom:1px solid #1A1A1A; color:#FAFAF8; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; text-align:right;">$${i.price.toFixed(2)}</td></tr>`
    ).join('')

    const paymentHtml = paymentMethod === 'stripe'
      ? `<p style="margin:0; color:#5BA87A; font-size:14px;">✓ Payment received via credit card / pay later</p>`
      : `
      <div style="background-color:#0C0A08; border:1px solid #C9A96E33; padding:20px; margin-top:16px;">
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:11px; letter-spacing:0.15em; margin:0 0 12px; text-transform:uppercase;">Payment Instructions</p>
        ${paymentMethod === 'zelle'
          ? `<p style="margin:0 0 4px; color:#CACACA; font-size:13px;">Send via <strong style="color:#C9A96E;">Zelle</strong> to:</p>
             <p style="margin:0 0 12px; color:#C9A96E; font-size:15px; font-family:'Helvetica Neue',Arial,sans-serif;">orders@lionelitebeauty.com</p>`
          : `<p style="margin:0 0 4px; color:#CACACA; font-size:13px;">Send via <strong style="color:#C9A96E;">CashApp</strong> to:</p>
             <p style="margin:0 0 12px; color:#C9A96E; font-size:15px; font-family:'Helvetica Neue',Arial,sans-serif;">$LionElite</p>`
        }
        <p style="margin:0; color:#6A6A6A; font-size:12px;">Include your order name in the memo so we can match your payment.</p>
      </div>`

    bodyHtml = `
    <p style="margin:0 0 8px; color:#FAFAF8; font-size:17px;">Hi ${name},</p>
    <p style="margin:0 0 24px; color:#CACACA; font-size:15px; line-height:1.8;">Thank you for your order. Here&rsquo;s your full confirmation:</p>

    <div style="background-color:#0A0A0A; border:1px solid #1A1A1A; padding:20px 24px; margin-bottom:24px;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:10px; letter-spacing:0.2em; margin:0; text-transform:uppercase;">Order #${orderNumber}</p>
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#6A6A6A; font-size:11px; margin:0;">${formatDate()}</p>
      </div>
    </div>

    <h3 style="color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.15em; margin:0 0 12px; text-transform:uppercase;">Items Ordered</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-bottom:16px;">
      <tr>
        <th style="padding:8px 12px; border-bottom:1px solid #2A2A2A; color:#6A6A6A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; letter-spacing:0.15em; text-align:left; font-weight:400; text-transform:uppercase;">Item</th>
        <th style="padding:8px 12px; border-bottom:1px solid #2A2A2A; color:#6A6A6A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; letter-spacing:0.15em; text-align:center; font-weight:400; text-transform:uppercase;">Qty</th>
        <th style="padding:8px 12px; border-bottom:1px solid #2A2A2A; color:#6A6A6A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; letter-spacing:0.15em; text-align:right; font-weight:400; text-transform:uppercase;">Price</th>
      </tr>
      ${itemsList}
    </table>

    <div style="border-top:1px solid #1A1A1A; padding-top:12px; margin-bottom:16px;">
      ${subtotal !== undefined ? `<div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#8A8A8A; font-size:13px;">Subtotal</span><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#FAFAF8; font-size:13px;">$${subtotal.toFixed(2)}</span></div>` : ''}
      ${discountAmount > 0 ? `<div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#5BA87A; font-size:13px;">Discount (WELCOME10)</span><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#5BA87A; font-size:13px;">−$${discountAmount.toFixed(2)}</span></div>` : ''}
      <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px solid #2A2A2A;">
        <span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:14px; letter-spacing:0.1em; text-transform:uppercase;">Total</span>
        <span style="font-family:Georgia,serif; color:#C9A96E; font-size:22px;">$${total.toFixed(2)}</span>
      </div>
    </div>

    ${address ? `
    <h3 style="color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.15em; margin:0 0 8px; text-transform:uppercase;">Shipping To</h3>
    <p style="margin:0 0 20px; color:#FAFAF8; font-size:14px; line-height:1.6;">${address}</p>
    ` : ''}

    <div style="background-color:#0C0A08; border:1px solid #1A1A1A; padding:20px; margin-bottom:24px;">
      <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#8A8A8A; font-size:10px; letter-spacing:0.15em; margin:0 0 10px; text-transform:uppercase;">Payment</p>
      ${paymentHtml}
    </div>

    <p style="margin:0 0 8px; color:#CACACA; font-size:15px; line-height:1.8;">We&rsquo;ll confirm shipping details within 24 hours. If you have any questions, reply to this email — we&rsquo;re here to help.</p>
    `
  } else {
    // Application confirmation with full details
    const labelMap = {
      experience: { beginner: 'New to peptides', some: 'Some experience', advanced: 'Advanced user' },
      timeline: { asap: 'As soon as possible', '2-4weeks': 'Within 2–4 weeks', exploring: 'Just exploring' },
      investment: { '100-300': '$100–300/month', '300-700': '$300–700/month', '700+': '$700+/month' },
      commitment: { very: 'Very committed', somewhat: 'Somewhat committed', exploring: 'Still deciding' },
    }
    function fmt(field, val) { return labelMap[field]?.[val] || val }

    bodyHtml = `
    <p style="margin:0 0 20px; color:#FAFAF8; font-size:17px;">Hi ${name},</p>
    <p style="margin:0 0 20px; color:#CACACA; font-size:15px; line-height:1.8;">Your application for the <strong style="color:#C9A96E;">${program}</strong> program has been received. We personally review every application and will reach out within 24&ndash;48 hours with your tailored next steps.</p>

    <h3 style="color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; letter-spacing:0.15em; margin:0 0 12px; text-transform:uppercase;">Application Summary</h3>
    <div style="background-color:#0A0A0A; border:1px solid #1A1A1A; padding:16px 20px; margin-bottom:20px;">
      ${styledTable([
        { label: 'Program', value: program || 'Not specified' },
        ...(experience ? [{ label: 'Experience', value: fmt('experience', experience) }] : []),
        ...(struggle && struggle !== 'Not provided' ? [{ label: 'Primary Concerns', value: struggle }] : []),
        ...(timeline ? [{ label: 'Timeline', value: fmt('timeline', timeline) }] : []),
        ...(investment ? [{ label: 'Investment', value: fmt('investment', investment) }] : []),
        ...(commitment ? [{ label: 'Commitment', value: fmt('commitment', commitment) }] : []),
        ...(health && health !== 'Not provided' ? [{ label: 'Health Notes', value: health }] : []),
      ])}
    </div>

    <p style="margin:0 0 24px; color:#CACACA; font-size:15px; line-height:1.8;">Want to move faster? Book a consultation call directly:</p>
    <table cellpadding="0" cellspacing="0"><tr><td style="background-color:#C9A96E; padding:14px 32px;">
      <a href="https://calendly.com/a-ringfield-trustetc" style="color:#000; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; letter-spacing:0.1em; text-decoration:none; text-transform:uppercase;">Book Your Call →</a>
    </td></tr></table>`
  }

  return `
    <h2 style="color:#C9A96E; font-family:Georgia,serif; font-size:22px; margin:0 0 20px;">${title}</h2>
    ${bodyHtml}
  `
}

// ── Main handler ────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body
  const isOrder = body.type === 'order'
  const orderNumber = generateOrderNumber()

  try {
    if (isOrder) {
      // Calculate pricing from itemized data
      const items = body.items || []
      const subtotal = items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0)
      const discountApplied = body.discountCode && body.discountCode !== 'None'
      const discountAmount = discountApplied ? subtotal * 0.1 : 0
      const total = subtotal - discountAmount

      const [adminRes, clientRes] = await Promise.all([
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: ['orders@lionelitebeauty.com'],
          subject: `New Order #${orderNumber}: ${items.map(i => i.name).join(', ')} — ${body.name}`,
          html: wrap(adminBody({
            name: body.name, email: body.email,
            phone: body.phone, items,
            address: body.address,
            discountCode: body.discountCode,
            orderNumber,
            paymentMethod: body.paymentMethod,
            stripePaymentId: body.stripePaymentId,
            subtotal, total, discountAmount,
          })),
          replyTo: body.email,
        }),
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: [body.email],
          subject: `Order Confirmed — #${orderNumber}`,
          html: wrap(clientConfirmation({
            name: body.name,
            items,
            orderNumber,
            address: body.address,
            paymentMethod: body.paymentMethod,
            stripePaymentId: body.stripePaymentId,
            subtotal, total, discountAmount,
          })),
        }),
      ])
      console.log('Order emails sent:', orderNumber, adminRes.id, clientRes.id)
    } else if (body.type === 'program_order') {
      const progName = body.program || 'Wellness Program'
      const [adminRes, clientRes] = await Promise.all([
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: ['orders@lionelitebeauty.com'],
          subject: `Program Enrollment: ${progName} — ${body.name} ${body.vipId ? `(${body.vipId})` : ''}`,
          html: wrap(`
            <h2 style="color:#C9A96E; font-family:Georgia,serif; font-size:20px; margin:0 0 24px;">New Program Enrollment</h2>
            ${paymentStatusBadge(body.paymentMethod, body.stripePaymentId)}
            <div style="background-color:#0A0A0A; border:1px solid #1A1A1A; padding:20px 24px; margin-top:16px;">
              ${styledTable([
                { label: 'Name', value: body.name },
                { label: 'Email', value: body.email },
                { label: 'Program', value: progName },
                ...(body.vipId ? [{ label: 'VIP ID', value: body.vipId }] : []),
                { label: 'Payment', value: paymentMethodLabel(body.paymentMethod) },
              ])}
            </div>
            <div style="background-color:#0A0A0A; border:1px solid #1A1A1A; padding:16px 20px; margin-top:12px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding:4px 0; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:14px; letter-spacing:0.1em; text-transform:uppercase;">Total</td>
                <td style="padding:4px 0; color:#C9A96E; font-family:Georgia,serif; font-size:20px; text-align:right;">$2,400.00</td></tr>
              </table>
            </div>`),
          replyTo: body.email,
        }),
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: [body.email],
          subject: `Welcome to Lion Elite — ${progName} Enrollment`,
          html: wrap(`
            <h2 style="color:#C9A96E; font-family:Georgia,serif; font-size:22px; margin:0 0 20px;">Welcome to the Lion Elite Family.</h2>
            <p style="margin:0 0 20px; color:#FAFAF8; font-size:17px;">Hi ${body.name},</p>
            ${body.paymentMethod === 'stripe' && body.stripePaymentId
              ? `<p style="margin:0 0 20px; color:#5BA87A; font-size:15px; line-height:1.8;">✓ Payment received. Your enrollment in the <strong style="color:#C9A96E;">${progName}</strong> program is confirmed.</p>`
              : `<p style="margin:0 0 20px; color:#CACACA; font-size:15px; line-height:1.8;">Your enrollment in the <strong style="color:#C9A96E;">${progName}</strong> program has been received. We'll confirm your spot once payment is processed.</p>
                 <div style="background-color:#0C0A08; border:1px solid #C9A96E33; padding:20px; margin-bottom:20px;">
                   <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:11px; letter-spacing:0.15em; margin:0 0 12px; text-transform:uppercase;">Payment Instructions</p>
                   <p style="margin:0 0 4px; color:#CACACA; font-size:13px;">Send <strong style="color:#C9A96E;">$2,400.00</strong> via Zelle to:</p>
                   <p style="margin:0 0 12px; color:#C9A96E; font-size:15px; font-family:'Helvetica Neue',Arial,sans-serif;">orders@lionelitebeauty.com</p>
                   <p style="margin:0; color:#6A6A6A; font-size:12px;">Include your name and VIP ID in the memo.</p>
                 </div>`
            }
            ${body.vipId ? `<p style="margin:0 0 8px; color:#8A8A8A; font-size:12px;">VIP ID: <strong style="color:#C9A96E; letter-spacing:0.15em;">${body.vipId}</strong></p>` : ''}
            <p style="margin:0 0 8px; color:#CACACA; font-size:15px; line-height:1.8;">We'll reach out within 24 hours to schedule your onboarding and walk you through your personalized protocol.</p>
            <p style="margin:0 0 8px; color:#CACACA; font-size:15px; line-height:1.8;">If you have any questions, reply to this email — we're here to help.</p>`),
        }),
      ])
      console.log('Program enrollment emails:', adminRes.id, clientRes.id)
    } else {
      const [adminRes, clientRes] = await Promise.all([
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: ['orders@lionelitebeauty.com'],
          subject: `New Application: ${body.program} — ${body.name}`,
          html: wrap(adminBody({
            name: body.name, email: body.email,
            phone: body.phone || 'Not provided',
            program: body.program,
            experience: body.experience,
            struggle: body.struggle || 'Not provided',
            timeline: body.timeline,
            investment: body.investment,
            commitment: body.commitment,
            health: body.health || 'Not provided',
          })),
          replyTo: body.email,
        }),
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: [body.email],
          subject: 'We received your application — Lion Elite',
          html: wrap(clientConfirmation({
            name: body.name,
            program: body.program,
            experience: body.experience,
            struggle: body.struggle,
            timeline: body.timeline,
            investment: body.investment,
            commitment: body.commitment,
            health: body.health,
          })),
        }),
      ])
      console.log('Application emails:', adminRes.id, clientRes.id)
    }

    return res.status(200).json({ success: true, orderNumber })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send emails' })
  }
}