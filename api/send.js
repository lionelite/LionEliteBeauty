import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// ── Shared B&G email wrapper ────────────────────────────────────────────────
const wrap = (content) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0; padding:0; background-color:#0A0A0A; font-family:Georgia, 'Times New Roman', serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px;">
    <table width="560" cellpadding="0" cellspacing="0" style="background-color:#080808; border:1px solid #1A1A1A;">
      <!-- Gold header bar -->
      <tr><td style="height:4px; background-color:#C9A96E; padding:0;"></td></tr>
      <!-- Logo area -->
      <tr><td style="padding:40px 40px 20px; text-align:center; border-bottom:1px solid #1A1A1A;">
        <p style="font-family:Georgia, serif; color:#C9A96E; font-size:18px; letter-spacing:0.25em; margin:0; text-transform:uppercase;">Lion Elite</p>
        <p style="font-family:Georgia, serif; color:#3A3A3A; font-size:11px; letter-spacing:0.15em; margin:4px 0 0; text-transform:uppercase;">Beauty &amp; Wellness</p>
      </td></tr>
      <!-- Body -->
      <tr><td style="padding:40px 40px; color:#FAFAF8; font-size:15px; line-height:1.8;">
        ${content}
      </td></tr>
      <!-- Footer -->
      <tr><td style="padding:24px 40px; border-top:1px solid #1A1A1A; text-align:center;">
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#3A3A3A; font-size:11px; margin:0;">Lion Elite Beauty &amp; Wellness</p>
        <p style="font-family:'Helvetica Neue',Arial,sans-serif; color:#2A2A2A; font-size:10px; margin:8px 0 0;">orders@lionelitebeauty.com</p>
      </td></tr>
    </table>
  </td></tr></table>
</body>
</html>`

// ── Admin notification content ──────────────────────────────────────────────
function adminBody({ name, email, phone, program, experience, struggle, timeline, investment, commitment, health, products }) {
  const rows = []
  if (name) rows.push(['Name', name])
  if (email) rows.push(['Email', email])
  if (phone) rows.push(['Phone', phone])
  if (program) rows.push(['Program', program])
  if (experience) rows.push(['Experience', experience])
  if (struggle) rows.push(['Struggle', struggle])
  if (timeline) rows.push(['Timeline', timeline])
  if (investment) rows.push(['Investment', investment])
  if (commitment) rows.push(['Commitment', commitment])
  if (health) rows.push(['Health Notes', health])
  if (products) rows.push(['Products Ordered', products.join(', ')])

  const rowsHtml = rows.map(([label, val]) =>
    `<tr><td style="padding:10px 16px; border-bottom:1px solid #1A1A1A; color:#6A6A6A; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px; white-space:nowrap; vertical-align:top;"><strong style="color:#C9A96E;">${label}</strong></td><td style="padding:10px 16px; border-bottom:1px solid #1A1A1A; color:#FAFAF8; font-family:'Helvetica Neue',Arial,sans-serif; font-size:13px;">${val}</td></tr>`
  ).join('\n')

  return `
    <h2 style="color:#C9A96E; font-family:Georgia,serif; font-size:20px; margin:0 0 24px;">New ${products ? 'Order' : 'Application'} Received</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${rowsHtml}
    </table>
  `
}

// ── Client confirmation ─────────────────────────────────────────────────────
function clientConfirmation({ name, program, products }) {
  const isOrder = !!products
  const title = isOrder ? 'Thank you for your order.' : 'We&rsquo;ve received your application.'
  const detail = isOrder
    ? `Your order for <strong style="color:#C9A96E;">${products.join(', ')}</strong> is confirmed. We&rsquo;ll be in touch within 24 hours to confirm shipping and next steps.`
    : `Your application for the <strong style="color:#C9A96E;">${program}</strong> program has been received. We personally review every application and will reach out within 24&ndash;48 hours with your tailored next steps.`

  return `
    <h2 style="color:#C9A96E; font-family:Georgia,serif; font-size:22px; margin:0 0 16px;">${title}</h2>
    <p style="margin:0 0 20px; color:#FAFAF8; font-size:15px; line-height:1.8;">Hi ${name},</p>
    <p style="margin:0 0 20px; color:#CACACA; font-size:15px; line-height:1.8;">${detail}</p>
    ${!isOrder ? `
    <p style="margin:0 0 24px; color:#CACACA; font-size:15px; line-height:1.8;">Want to move faster? Book a consultation call directly:</p>
    <table cellpadding="0" cellspacing="0"><tr><td style="background-color:#C9A96E; padding:14px 32px;">
      <a href="https://calendly.com/a-ringfield-trustetc" style="color:#000; font-family:'Helvetica Neue',Arial,sans-serif; font-size:12px; letter-spacing:0.1em; text-decoration:none; text-transform:uppercase;">Book Your Call →</a>
    </td></tr></table>
    ` : ''}
  `
}

// ── Main handler ────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body
  const isOrder = body.type === 'order'

  try {
    if (isOrder) {
      // ── Product order ──
      const [adminRes, clientRes] = await Promise.all([
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: ['orders@lionelitebeauty.com'],
          subject: `New Order: ${body.products?.join(', ')} — ${body.name}`,
          html: wrap(adminBody({
            name: body.name, email: body.email,
            phone: body.phone || 'Not provided',
            products: body.products,
          })),
          replyTo: body.email,
        }),
        resend.emails.send({
          from: 'Lion Elite <orders@lionelitebeauty.com>',
          to: [body.email],
          subject: 'Your Lion Elite order is confirmed',
          html: wrap(clientConfirmation({
            name: body.name,
            products: body.products,
          })),
        }),
      ])
      console.log('Order emails:', adminRes.id, clientRes.id)
    } else {
      // ── Program application ──
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
          })),
        }),
      ])
      console.log('Application emails:', adminRes.id, clientRes.id)
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Failed to send emails' })
  }
}