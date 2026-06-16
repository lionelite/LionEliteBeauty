import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const sections = [
  {
    id: 'terms',
    title: 'Terms of Service',
    content: `These Terms of Service govern your use of the Lion Elite Beauty website and purchase of skincare products. By purchasing or using our products, you agree to these terms.

All products are intended for external use only. Individual results may vary. Product formulations are subject to change without notice. We reserve the right to limit quantities and refuse service at our discretion.

Prices are listed in USD and are subject to change. Promotional codes cannot be combined unless explicitly stated.`,
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: `We respect your privacy. Information collected during checkout (name, email, shipping address, payment details) is used solely to process and fulfill your order.

We use Stripe for payment processing — your card details are securely handled by Stripe and never stored on our servers. We do not sell, rent, or share your personal information with third parties for marketing purposes.

We may send order-related emails (confirmation, shipping updates). You can opt out of marketing communications at any time.`,
  },
  {
    id: 'shipping',
    title: 'Shipping Policy',
    content: `Orders are processed within 1–3 business days after payment confirmation. Shipping times vary by location.

Standard shipping: 5–10 business days within the US.
Express shipping options available at checkout for an additional fee.

We ship to all 50 US states via USPS, UPS, and FedEx. Once shipped, you will receive a tracking number via email. Lion Elite Beauty is not responsible for delays caused by the carrier or customs.

Free standard shipping on orders over $100.`,
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    content: `Due to the nature of skincare products, all sales are final. We do not accept returns or exchanges on opened or used products.

If your product arrives damaged or defective, please contact us within 7 days of delivery at orders@lionelitebeauty.com with your order number and photos. We will review and issue a replacement or refund at our discretion.

Refunds, if issued, will be processed to the original payment method within 5–10 business days after approval.`,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: `For questions about orders, products, or policies, reach out to us:

Email: orders@lionelitebeauty.com
Response time: within 24 hours on business days.`,
  },
]

export default function SkincarePolicies() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="Policies — Skincare" description="Lion Elite Beauty skincare policies: terms of service, privacy, shipping, returns, and contact information." />
      <Navbar />

      <section style={{ paddingTop: '140px', paddingBottom: '64px', borderBottom: '1px solid #E8DDD0' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }}
            className="uppercase">Policies</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2.6rem', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '12px' }}
            className="font-normal">
            Skincare Policies
          </h1>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.7' }}>
            Terms, privacy, shipping, and returns for Lion Elite Beauty skincare products.
          </p>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginTop: '24px' }}></div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="max-w-3xl mx-auto px-6">
          {/* Quick nav */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`}
                style={{
                  fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.12em',
                  color: '#6A6A6A', textDecoration: 'none', padding: '10px 18px',
                  border: '1px solid #E0D5C5', backgroundColor: '#FFFFFF',
                }}
                className="uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
                {s.title}
              </a>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map(s => (
              <div key={s.id} id={s.id}>
                <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1.5rem', lineHeight: '1.2', marginBottom: '16px' }}>
                  {s.title}
                </h2>
                <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '20px' }}></div>
                {s.content.split('\n\n').map((p, i) => (
                  <p key={i} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.9', marginBottom: '14px' }}>
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Last updated */}
          <div style={{ borderTop: '1px solid #E8DDD0', marginTop: '60px', paddingTop: '24px' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px' }}>
              Last updated: June 2026
            </p>
            <Link to="/skincare"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '12px', letterSpacing: '0.12em', textDecoration: 'none', display: 'inline-block', marginTop: '12px' }}
              className="uppercase hover:opacity-80 transition-opacity">
              ← Back to Skincare
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}