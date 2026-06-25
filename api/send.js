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

// ── Unified light email wrapper ────────────────────────────────────────────
const wrap = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0; padding:0; background-color:#F5F0E8; font-family:Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:48px 20px;">
    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF; border:1px solid #E0D5C5; border-radius:2px;">
      <!-- Gold accent bar -->
      <tr><td style="height:4px; background-color:#C9A96E; padding:0;"></td></tr>

      <!-- Header -->
      <tr><td style="padding:44px 44px 28px; text-align:center; border-bottom:1px solid #F0EAE0;">
        <div style="width:36px; height:1px; background-color:#C9A96E; margin:0 auto 20px;"></div>
        <p style="font-family:Georgia,serif; color:#C9A96E; font-size:20px; letter-spacing:0.35em; margin:0 0 4px; text-transform:uppercase;">Lion Elite</p>
        <p style="font-family:Georgia,serif; color:#BABABA; font-size:10px; letter-spacing:0.25em; margin:0; text-transform:uppercase;">Beauty &amp; Wellness</p>
        <div style="width:36px; height:1px; background-color:#F0EAE0; margin:20px auto 0;"></div>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:44px 44px; color:#2A2A2A; font-size:15px; line-height:1.8;">
        ${content}
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:32px 44px; background-color:#FAF8F6; border-top:1px solid #F0EAE0; text-align:center;">
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#8A8A8A; font-size:11px; margin:0 0 8px; letter-spacing:0.05em;">Lion Elite Beauty &amp; Wellness</p>
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#BABABA; font-size:10px; margin:0 0 2px;">orders@lionelitebeauty.com</p>
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#D0C8C0; font-size:9px; margin:8px 0 0;">${formatDate()}</p>
      </td></tr>
    </table>
  </td></tr></table>
</body>
</html>`

// ── Info card (section container) ───────────────────────────────────────────
function sectionCard(inner) {
  return `
  <div style="background-color:#F9F7F4; border:1px solid #E0D5C5; padding:20px 24px; border-radius:2px;">
    ${inner}
  </div>`
}

function sectionHeading(text) {
  return `<p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:9px; letter-spacing:0.2em; margin:0 0 14px; text-transform:uppercase;">${text}</p>`
}

// ── Styled info table ──────────────────────────────────────────────────────
function infoTable(rows) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    ${rows.map((r, i) => `
    <tr>
      <td style="padding:10px 0; border-bottom:${i < rows.length - 1 ? '1px solid #E8DDD0' : 'none'}; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; white-space:nowrap; vertical-align:top; width:1px; letter-spacing:0.05em;">${r.label}</td>
      <td style="padding:10px 0 10px 20px; border-bottom:${i < rows.length - 1 ? '1px solid #E8DDD0' : 'none'}; color:#2A2A2A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px;">${r.value}</td>
    </tr>`).join('')}
  </table>`
}

// ── Item table (for order line items) ──────────────────────────────────────
function itemTable(items) {
  if (!items || !items.length) return ''
  const itemRows = items.map(i => `
  <tr>
    <td style="padding:12px 0; border-bottom:1px solid #F0EAE0; color:#2A2A2A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px;">${i.name}</td>
    <td style="padding:12px 0; border-bottom:1px solid #F0EAE0; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; text-align:center;">${i.quantity}</td>
    <td style="padding:12px 0; border-bottom:1px solid #F0EAE0; color:#2A2A2A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; text-align:right;">$${i.price.toFixed(2)}</td>
  </tr>`).join('')

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr>
      <th style="padding:8px 0; border-bottom:1px solid #C9A96E; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; letter-spacing:0.15em; text-align:left; font-weight:400; text-transform:uppercase;">Item</th>
      <th style="padding:8px 0; border-bottom:1px solid #C9A96E; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; letter-spacing:0.15em; text-align:center; font-weight:400; text-transform:uppercase;">Qty</th>
      <th style="padding:8px 0; border-bottom:1px solid #C9A96E; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; letter-spacing:0.15em; text-align:right; font-weight:400; text-transform:uppercase;">Price</th>
    </tr>
    ${itemRows}
  </table>`
}

// ── Payment helpers ──────────────────────────────────────────────────────────
function paymentMethodLabel(method) {
  const labels = { stripe: 'Credit Card / Pay Later', zelle: 'Zelle', cashapp: 'CashApp' }
  return labels[method] || method || 'Not specified'
}

function paymentStatusBadge(method, stripePaymentId) {
  if (method === 'stripe') {
    return `<span style="display:inline-block; background-color:#E8F5E9; color:#5BA87A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; padding:4px 14px; letter-spacing:0.1em; border:1px solid #5BA87A40;">PAID — STRIPE</span>`
  }
  return `<span style="display:inline-block; background-color:#FDF8EE; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:10px; padding:4px 14px; letter-spacing:0.1em; border:1px solid #C9A96E40;">PENDING — ${paymentMethodLabel(method).toUpperCase()}</span>`
}

function paymentInstructions(method, amount) {
  if (method === 'stripe') return ''
  if (method === 'zelle') {
    return `<div style="background-color:#FDF8EE; border:1px solid #C9A96E40; padding:20px 24px; border-radius:2px;">
      <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:9px; letter-spacing:0.2em; margin:0 0 12px; text-transform:uppercase;">Payment Instructions</p>
      <p style="margin:0 0 4px; color:#4A4A4A; font-size:14px; line-height:1.6;">Send ${amount ? `<strong>${amount}</strong> ` : ''}via <strong style="color:#C9A96E;">Zelle</strong> to:</p>
      <p style="margin:0 0 10px; color:#C9A96E; font-size:18px; font-family:'Helvetica Neue',Arial,sans-serif; letter-spacing:0.05em;">+1 (216) 326-0050</p>
      <p style="margin:0; color:#8A8A8A; font-size:12px; line-height:1.5;">Include your full name in the memo so we can match your payment. We'll confirm receipt via email within 24 hours.</p>
    </div>`
  }
  return `<div style="background-color:#FDF8EE; border:1px solid #C9A96E40; padding:20px 24px; border-radius:2px;">
    <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:9px; letter-spacing:0.2em; margin:0 0 12px; text-transform:uppercase;">Payment Instructions</p>
    <p style="margin:0 0 4px; color:#4A4A4A; font-size:14px; line-height:1.6;">Send ${amount ? `<strong>${amount}</strong> ` : ''}via <strong style="color:#C9A96E;">CashApp</strong> to:</p>
    <p style="margin:0 0 10px; color:#C9A96E; font-size:16px; font-family:'Helvetica Neue',Arial,sans-serif; letter-spacing:0.05em;">$LionElite</p>
    <p style="margin:0; color:#8A8A8A; font-size:12px; line-height:1.5;">Include your order name or VIP ID in the memo so we can match your payment.</p>
  </div>`
}

function totalLine(amount, label) {
  return `<div style="border-top:1px solid #E0D5C5; padding-top:14px; margin-top:14px; display:flex; justify-content:space-between; align-items:center;">
    <span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:12px; letter-spacing:0.15em; text-transform:uppercase;">${label || 'Total'}</span>
    <span style="font-family:Georgia,serif; color:#C9A96E; font-size:22px;">${amount}</span>
  </div>`
}

function divider() {
  return `<div style="width:36px; height:1px; background-color:#E0D5C5; margin:32px auto;"></div>`
}

// ── Admin notification ──────────────────────────────────────────────────────
function adminBody({ name, email, phone, program, experience, struggle, timeline, investment, commitment, health, items, address, discountCode, orderNumber, paymentMethod, stripePaymentId, total, subtotal, discountAmount }) {
  const isOrder = !!items

  let emailHtml = ''

  if (isOrder) {
    // ── Order notification ──
    emailHtml = `
    <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:28px;">
      <h2 style="color:#2A2A2A; font-family:Georgia,serif; font-size:20px; margin:0;">New Order Received</h2>
      ${paymentStatusBadge(paymentMethod, stripePaymentId)}
    </div>

    ${sectionCard(`
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:11px; letter-spacing:0.2em; margin:0; text-transform:uppercase;">Order #${orderNumber}</p>
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#8A8A8A; font-size:11px; margin:0;">${formatDate()}</p>
      </div>
      <div style="display:flex; gap:24px; flex-wrap:wrap;">
        <p style="margin:0; font-family:'Helvetica Neue',Arial,sans-serif; color:#6A6A6A; font-size:12px;">Placed at ${formatTime()}</p>
        <p style="margin:0; font-family:'Helvetica Neue',Arial,sans-serif; color:#6A6A6A; font-size:12px;">Payment: ${paymentMethodLabel(paymentMethod)}</p>
      </div>
    `)}

    <div style="margin-top:28px;">
      ${sectionHeading('Customer Details')}
      ${sectionCard(infoTable([
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        ...(phone && phone !== 'Not provided' ? [{ label: 'Phone', value: phone }] : []),
        { label: 'Shipping', value: address || 'Not provided' },
      ]))}
    </div>

    <div style="margin-top:28px;">
      ${sectionHeading('Order Details')}
      ${sectionCard(`
        ${itemTable(items)}
        <div style="margin-top:16px;">
          ${subtotal !== undefined ? `<div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#6A6A6A; font-size:13px;">Subtotal</span><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#2A2A2A; font-size:13px;">$${subtotal.toFixed(2)}</span></div>` : ''}
          ${discountAmount > 0 ? `<div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#5BA87A; font-size:13px;">Discount</span><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#5BA87A; font-size:13px;">\u2212$${discountAmount.toFixed(2)}</span></div>` : ''}
          ${totalLine(`$${(total || subtotal || 0).toFixed(2)}`)}
        </div>
      `)}
    </div>`
  } else {
    // ── Application notification ──
    emailHtml = `
    <h2 style="color:#2A2A2A; font-family:Georgia,serif; font-size:20px; margin:0 0 6px;">New Application Received</h2>
    <p style="margin:0 0 28px; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px;">${formatDate()} at ${formatTime()}</p>

    ${sectionCard(infoTable([
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      ...(phone && phone !== 'Not provided' ? [{ label: 'Phone', value: phone }] : []),
      { label: 'Program', value: program || 'Not specified' },
    ]))}

    <div style="margin-top:24px;">
      ${sectionHeading('Assessment Details')}
      ${sectionCard(infoTable([
        ...(experience ? [{ label: 'Experience', value: experience }] : []),
        ...(struggle && struggle !== 'Not provided' ? [{ label: 'Primary Concerns', value: struggle }] : []),
        ...(timeline ? [{ label: 'Timeline', value: timeline }] : []),
        ...(investment ? [{ label: 'Investment', value: investment }] : []),
        ...(commitment ? [{ label: 'Commitment', value: commitment }] : []),
        ...(health && health !== 'Not provided' ? [{ label: 'Health Notes', value: health }] : []),
      ]))}
    </div>

    ${divider()}

    <div style="background-color:#FDF8EE; border:1px solid #C9A96E40; padding:20px 24px; border-radius:2px;">
      <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:9px; letter-spacing:0.2em; margin:0 0 10px; text-transform:uppercase;">Next Step — Send Payment Link</p>
      <p style="margin:0 0 14px; color:#4A4A4A; font-size:13px; line-height:1.7;">Forward this link to the customer to create their VIP account and complete payment:</p>
      <table cellpadding="0" cellspacing="0"><tr><td style="background-color:#C9A96E; padding:13px 26px; border-radius:2px;">
        <a href="${process.env.SITE_URL || 'https://lionelitebeauty.com'}/apply?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&program=${encodeURIComponent(program || 'Wellness Program')}" style="color:#000; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; letter-spacing:0.1em; text-decoration:none; text-transform:uppercase; white-space:nowrap;">Send Payment Form \u2192</a>
      </td></tr></table>
    </div>`
  }

  return emailHtml
}

// ── Customer confirmation ──────────────────────────────────────────────────
function clientConfirmation({ name, email, program, items, orderNumber, address, paymentMethod, stripePaymentId, total, subtotal, discountAmount, experience, struggle, timeline, investment, commitment, health, tier, vipId }) {
  const isOrder = !!items
  const title = isOrder ? 'Your order is confirmed.' : 'We\u2019ve received your application.'
  const greeting = `Hi ${name},`

  let bodyHtml = ''

  if (isOrder) {
    // ── Order confirmation ──
    const itemsList = items.map(i =>
      `<tr><td style="padding:10px 0; border-bottom:1px solid #F0EAE0; color:#2A2A2A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px;">${i.name}</td><td style="padding:10px 0; border-bottom:1px solid #F0EAE0; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; text-align:center;">${i.quantity}</td><td style="padding:10px 0; border-bottom:1px solid #F0EAE0; color:#2A2A2A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; text-align:right;">$${i.price.toFixed(2)}</td></tr>`
    ).join('')

    const paymentHtml = paymentMethod === 'stripe'
      ? `<p style="margin:0; color:#5BA87A; font-size:14px;">\u2713 Payment received via credit card / pay later</p>`
      : paymentInstructions(paymentMethod)

    bodyHtml = `
    <p style="margin:0 0 6px; color:#4A4A4A; font-size:17px;">${greeting}</p>
    <p style="margin:0 0 28px; color:#6A6A6A; font-size:15px; line-height:1.7;">Thank you for your order. Here\u2019s a full summary for your records:</p>

    ${sectionCard(`
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:11px; letter-spacing:0.2em; margin:0; text-transform:uppercase;">Order #${orderNumber}</p>
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#8A8A8A; font-size:11px; margin:0;">${formatDate()}</p>
      </div>
    `)}

    <div style="margin-top:28px;">
      ${sectionHeading('Items Ordered')}
      ${sectionCard(`
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <th style="padding:8px 0; border-bottom:1px solid #C9A96E; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; letter-spacing:0.15em; text-align:left; font-weight:400; text-transform:uppercase;">Item</th>
            <th style="padding:8px 0; border-bottom:1px solid #C9A96E; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; letter-spacing:0.15em; text-align:center; font-weight:400; text-transform:uppercase;">Qty</th>
            <th style="padding:8px 0; border-bottom:1px solid #C9A96E; color:#C9A96E; font-family:'Helvetica Neue',Arial,sans-serif; font-size:9px; letter-spacing:0.15em; text-align:right; font-weight:400; text-transform:uppercase;">Price</th>
          </tr>
          ${itemsList}
        </table>
        <div style="margin-top:12px;">
          ${subtotal !== undefined ? `<div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#6A6A6A; font-size:13px;">Subtotal</span><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#2A2A2A; font-size:13px;">$${subtotal.toFixed(2)}</span></div>` : ''}
          ${discountAmount > 0 ? `<div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#5BA87A; font-size:13px;">Discount</span><span style="font-family:'Helvetica Neue',Arial,sans-serif; color:#5BA87A; font-size:13px;">\u2212$${discountAmount.toFixed(2)}</span></div>` : ''}
          ${totalLine(`$${(total || subtotal || 0).toFixed(2)}`)}
        </div>
      `)}
    </div>

    ${address ? `
    <div style="margin-top:28px;">
      ${sectionHeading('Shipping To')}
      ${sectionCard(`<p style="margin:0; color:#2A2A2A; font-size:14px; line-height:1.7;">${address}</p>`)}
    </div>` : ''}

    <div style="margin-top:28px;">
      ${sectionHeading('Payment')}
      ${sectionCard(paymentHtml)}
    </div>

    ${divider()}

    <p style="margin:0 0 4px; color:#4A4A4A; font-size:15px; line-height:1.7;">We\u2019ll confirm shipping details within 24 hours. If you have any questions, simply reply to this email \u2014 we\u2019re here to help.</p>`
  } else {
    // ── Application confirmation ──
    const labelMap = {
      experience: { beginner: 'New to peptides', some: 'Some experience', advanced: 'Advanced user' },
      timeline: { asap: 'As soon as possible', '2-4weeks': 'Within 2\u20134 weeks', exploring: 'Just exploring' },
      investment: { '100-300': '$100\u2013300/month', '300-700': '$300\u2013700/month', '700+': '$700+/month' },
      commitment: { very: 'Very committed', somewhat: 'Somewhat committed', exploring: 'Still deciding' },
    }
    function fmt(field, val) { return labelMap[field]?.[val] || val }

    bodyHtml = `
    <p style="margin:0 0 6px; color:#4A4A4A; font-size:17px;">${greeting}</p>
    <p style="margin:0 0 28px; color:#6A6A6A; font-size:15px; line-height:1.7;">Your application for the <strong style="color:#C9A96E;">${program}</strong> program has been received. We personally review every application and will reach out within 24\u201348 hours with your tailored next steps.</p>

    ${sectionHeading('Application Summary')}
    ${sectionCard(infoTable([
      { label: 'Program', value: program || 'Not specified' },
      ...(experience ? [{ label: 'Experience', value: fmt('experience', experience) }] : []),
      ...(struggle && struggle !== 'Not provided' ? [{ label: 'Primary Concerns', value: struggle }] : []),
      ...(timeline ? [{ label: 'Timeline', value: fmt('timeline', timeline) }] : []),
      ...(investment ? [{ label: 'Investment', value: fmt('investment', investment) }] : []),
      ...(commitment ? [{ label: 'Commitment', value: fmt('commitment', commitment) }] : []),
      ...(health && health !== 'Not provided' ? [{ label: 'Health Notes', value: health }] : []),
    ]))}

    ${divider()}

    <p style="margin:0 0 16px; color:#4A4A4A; font-size:15px; line-height:1.7;">Ready to move forward? You can create your VIP account and complete payment right away:</p>
    <table cellpadding="0" cellspacing="0" style="margin:0 0 20px;"><tr><td style="background-color:#C9A96E; padding:14px 30px; border-radius:2px;">
      <a href="${process.env.SITE_URL || 'https://lionelitebeauty.com'}/apply?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&program=${encodeURIComponent(program)}" style="color:#000; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; letter-spacing:0.1em; text-decoration:none; text-transform:uppercase; white-space:nowrap;">Create VIP Account &amp; Pay \u2192</a>
    </td></tr></table>
    <p style="margin:0 0 24px; color:#8A8A8A; font-size:13px; line-height:1.7;">Pay with credit/debit card (Visa, MC, Amex), Klarna, Afterpay, Affirm, or Zelle. Your VIP account keeps everything organized in one place.</p>

    <p style="margin:0 0 16px; color:#4A4A4A; font-size:15px; line-height:1.7;">Prefer to speak first? Book a consultation call:</p>
    <table cellpadding="0" cellspacing="0"><tr><td style="background-color:#C9A96E; padding:14px 30px; border-radius:2px;">
      <a href="https://calendly.com/a-ringfield-trustetc" style="color:#000; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; letter-spacing:0.1em; text-decoration:none; text-transform:uppercase; white-space:nowrap;">Book Your Call \u2192</a>
    </td></tr></table>`
  }

  return `
    <h2 style="color:#2A2A2A; font-family:Georgia,serif; font-size:22px; margin:0 0 24px;">${title}</h2>
    ${bodyHtml}
  `
}

// ── Program enrollment (admin notification) ─────────────────────────────────
function programAdminBody({ name, email, program, tier, vipId, paymentMethod, stripePaymentId, amount }) {
  const tierLabel = tier === 'foundation' ? 'Foundation Coaching' : 'VIP Transformation Program'
  const needsVerification = paymentMethod !== 'stripe'
  return `
    <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:28px;">
      <h2 style="color:#2A2A2A; font-family:Georgia,serif; font-size:20px; margin:0;">New Program Enrollment</h2>
      ${paymentStatusBadge(paymentMethod, stripePaymentId)}
    </div>
    <p style="margin:0 0 24px; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px;">${formatDate()} at ${formatTime()}</p>

    ${sectionHeading('Client & Enrollment Details')}
    ${sectionCard(infoTable([
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Program', value: program || 'Wellness Program' },
      { label: 'Tier', value: tierLabel },
      ...(vipId ? [{ label: 'VIP ID', value: vipId }] : []),
      { label: 'Payment Method', value: paymentMethodLabel(paymentMethod) },
    ]))}

    <div style="margin-top:20px;">
      ${totalLine(amount || '$299.99', 'Enrollment Total')}
    </div>

    ${needsVerification ? `
    ${divider()}
    <div style="background-color:#FDF8EE; border:1px solid #C9A96E40; padding:20px 24px;">
      <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:9px; letter-spacing:0.2em; margin:0 0 10px; text-transform:uppercase;">Action Required — Verify Payment</p>
      <p style="margin:0 0 10px; color:#4A4A4A; font-size:13px; line-height:1.7;">This payment is marked as <strong>PENDING</strong>. Check your ${paymentMethodLabel(paymentMethod)} account for a payment from <strong style="color:#C9A96E;">${email}</strong>.</p>
      <p style="margin:0 0 4px; color:#4A4A4A; font-size:13px; line-height:1.7;">Once confirmed, visit the admin dashboard to mark this account as paid:</p>
      <table cellpadding="0" cellspacing="0"><tr><td style="background-color:#C9A96E; padding:13px 26px;">
        <a href="${process.env.SITE_URL || 'https://lionelitebeauty.com'}/admin" style="color:#000; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; letter-spacing:0.1em; text-decoration:none; text-transform:uppercase; white-space:nowrap;">Open Admin Dashboard \u2192</a>
      </td></tr></table>
    </div>` : ''}`
}

// ── Program enrollment (client welcome) ─────────────────────────────────────
function programClientBody({ name, program, tier, vipId, paymentMethod, stripePaymentId, amount, period, duration }) {
  const tierLabel = tier === 'foundation' ? 'Foundation Coaching' : 'VIP Transformation Program'
  const isPaid = paymentMethod === 'stripe' && stripePaymentId

  return `
    <p style="margin:0 0 6px; color:#4A4A4A; font-size:17px;">Hi ${name},</p>

    <div style="background-color:#FDF8EE; border:1px solid #C9A96E40; padding:24px; border-radius:2px; margin:0 0 28px;">
      <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:9px; letter-spacing:0.2em; margin:0 0 8px; text-transform:uppercase;">Enrollment Confirmed</p>
      <p style="margin:0 0 2px; color:#2A2A2A; font-size:18px; font-family:Georgia,serif;">${tierLabel}</p>
      <p style="margin:0; color:#8A8A8A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px;">${amount}${period || ''} ${duration ? `\u00B7 ${duration}` : ''}</p>
    </div>

    ${isPaid
      ? `<p style="margin:0 0 20px; color:#5BA87A; font-size:15px; line-height:1.7;">\u2713 Payment received. Your enrollment in the <strong style="color:#C9A96E;">${program}</strong> program is confirmed and your spot is secured.</p>`
      : `<p style="margin:0 0 20px; color:#6A6A6A; font-size:15px; line-height:1.7;">Your enrollment in the <strong style="color:#C9A96E;">${program} (${tierLabel})</strong> program has been submitted. We\u2019ll confirm your spot once payment is processed.</p>
         ${paymentInstructions(paymentMethod, amount)}`
    }

    ${vipId ? `
    <div style="background-color:#FDF8EE; border:2px solid #C9A96E; padding:24px; margin-top:20px;">
      <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#C9A96E; font-size:9px; letter-spacing:0.2em; margin:0 0 12px; text-transform:uppercase;">Your VIP Account</p>
      <p style="margin:0 0 4px; color:#4A4A4A; font-size:14px; line-height:1.6;">VIP ID: <strong style="color:#C9A96E; font-size:20px; font-family:Georgia,serif; letter-spacing:0.15em;">${vipId}</strong></p>
      <p style="margin:0 0 12px; color:#6A6A6A; font-size:12px; font-family:'Helvetica Neue',Arial,sans-serif;">Use this ID to access your VIP account anytime.</p>
      <table cellpadding="0" cellspacing="0"><tr><td style="background-color:#C9A96E; padding:13px 26px;">
        <a href="${process.env.SITE_URL || 'https://lionelitebeauty.com'}/vip" style="color:#000; font-family:'Helvetica Neue',Arial,sans-serif; font-size:11px; letter-spacing:0.1em; text-decoration:none; text-transform:uppercase; white-space:nowrap;">Access Your VIP Account \u2192</a>
      </td></tr></table>
    </div>` : ''}

    ${divider()}

    <p style="margin:0 0 4px; color:#4A4A4A; font-size:15px; line-height:1.7;">
      ${tier === 'foundation'
        ? 'We\u2019ll reach out within 24 hours to schedule your first coaching call and get you started on your wellness roadmap.'
        : 'We\u2019ll reach out within 24 hours to schedule your onboarding and walk you through your personalized protocol.'
      }
    </p>
    <p style="margin:0; color:#4A4A4A; font-size:15px; line-height:1.7;">If you have any questions, reply to this email \u2014 we\u2019re here to help.</p>`
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
            name: body.name, items, orderNumber,
            address: body.address,
            paymentMethod: body.paymentMethod,
            stripePaymentId: body.stripePaymentId,
            subtotal, total, discountAmount, email: body.email,
          })),
        }),
      ])
      console.log('Order emails sent:', orderNumber, adminRes.id, clientRes.id)
    } else if (body.type === 'program_order') {
      const progName = body.program || 'Wellness Program'
      const tierInfo = body.tier === 'foundation'
        ? { label: 'Foundation Coaching', price: '$299.99', period: '/ month', emailSub: '(Foundation)', duration: 'monthly coaching program' }
        : { label: 'VIP Transformation Program', price: '$2,400.00', period: '/ 6 months', emailSub: '(VIP)', duration: '6-month personalized protocol' }

      const [adminRes, clientRes] = await Promise.all([
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: ['orders@lionelitebeauty.com'],
          subject: `Program Enrollment: ${tierInfo.label} — ${progName} — ${body.name} ${body.vipId ? `(${body.vipId})` : ''}`,
          html: wrap(programAdminBody({
            name: body.name, email: body.email,
            program: progName, tier: body.tier,
            vipId: body.vipId,
            paymentMethod: body.paymentMethod,
            stripePaymentId: body.stripePaymentId,
            amount: tierInfo.price,
          })),
          replyTo: body.email,
        }),
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: [body.email],
          subject: `Welcome to Lion Elite — ${tierInfo.label} Enrollment`,
          html: wrap(programClientBody({
            name: body.name, program: progName,
            tier: body.tier, vipId: body.vipId,
            paymentMethod: body.paymentMethod,
            stripePaymentId: body.stripePaymentId,
            amount: tierInfo.price,
            period: tierInfo.period,
            duration: tierInfo.duration,
          })),
        }),
      ])
      console.log('Program enrollment emails:', tierInfo.label, adminRes.id, clientRes.id)
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
          subject: 'Application Received — Lion Elite',
          html: wrap(clientConfirmation({
            name: body.name, email: body.email, program: body.program,
            experience: body.experience, struggle: body.struggle,
            timeline: body.timeline, investment: body.investment,
            commitment: body.commitment, health: body.health,
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