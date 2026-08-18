import { Resend } from 'resend'

const FROM = 'Lion Elite Beauty <orders@lionelitebeauty.com>'
const BUSINESS = 'orders@lionelitebeauty.com'
const CUSTOMER = 'gagoagos@gmail.com'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const key = String(process.env.RESEND_API_KEY || '').trim()
  if (!key) return res.status(503).json({ success: false, error: 'RESEND_API_KEY missing' })

  const resend = new Resend(key)
  const order = `LEB-LIVE-${Date.now()}`
  const customerHtml = `<div style="font-family:Arial;background:#f5f0e8;padding:32px"><div style="max-width:620px;margin:auto;background:#fff;border-top:4px solid #c9a96e;padding:32px"><div style="font-family:Georgia,serif;color:#c9a96e;letter-spacing:.22em;text-transform:uppercase">Lion Elite Beauty</div><h2 style="font-family:Georgia,serif;font-weight:400">Your order is confirmed</h2><p>QA TEST — DO NOT SHIP</p><p>Order <strong>${order}</strong></p><table style="width:100%;border-collapse:collapse"><tr><td>GHK-Cu Intensive Serum</td><td>1</td><td style="text-align:right">$69.99</td></tr><tr><td>KPV Recovery Moisturizer</td><td>1</td><td style="text-align:right">$79.99</td></tr></table><p style="text-align:right;color:#c9a96e;font-family:Georgia,serif;font-size:20px">Total: $149.98</p><p>Payment: Zelle — pending confirmation</p></div></div>`
  const businessHtml = `<div style="font-family:Arial;background:#0c0c0c;padding:32px"><div style="max-width:620px;margin:auto;background:#f5f0e8;padding:32px"><h2 style="font-family:Georgia,serif;color:#c9a96e">NEW ORDER — ACTION REQUIRED</h2><p><strong>${order}</strong></p><p>Customer: Lion Elite Beauty QA</p><p>Email: ${CUSTOMER}</p><p>Payment: Zelle — pending</p><p>Items: GHK-Cu Intensive Serum ×1; KPV Recovery Moisturizer ×1</p><p>Total: <strong>$149.98</strong></p><p>QA TEST — DO NOT SHIP</p></div></div>`

  try {
    const customer = await resend.emails.send({ from: FROM, to: [CUSTOMER], subject: `Lion Elite Beauty Order Confirmed — ${order}`, html: customerHtml })
    if (customer?.error) return res.status(502).json({ success: false, stage: 'customer', error: customer.error.message || customer.error })

    const business = await resend.emails.send({ from: FROM, to: [BUSINESS], subject: `New Lion Elite Beauty Order — ${order} — $149.98`, html: businessHtml })
    if (business?.error) return res.status(502).json({ success: false, stage: 'business', customerAccepted: true, error: business.error.message || business.error })

    return res.status(200).json({ success: true, orderNumber: order, customerAccepted: Boolean(customer?.data?.id), businessAccepted: Boolean(business?.data?.id) })
  } catch (error) {
    return res.status(500).json({ success: false, error: String(error?.message || error).slice(0, 300) })
  }
}
