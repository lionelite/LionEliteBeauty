import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const sections = [
  {
    id: 'terms',
    title: 'Terms of Service',
    content: `These Terms of Service govern enrollment in Lion Elite Beauty optimization programs. By enrolling, you agree to these terms.

Program enrollment is for a fixed 6-month commitment at $2,400 unless otherwise agreed in writing. Payment is due in full at the time of enrollment unless an installment plan has been explicitly approved.

Program content, materials, and coaching are for personal use only and may not be shared, reproduced, or distributed. Lion Elite Beauty reserves the right to modify program components, protocols, or pricing with advance notice to active participants.`,
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: `Your health and personal data are treated with the highest level of confidentiality. Information collected during enrollment (name, contact details, health questionnaire responses, assessment data) is used solely to deliver your personalized program.

We use industry-standard encryption for data storage and transmission. Your health data is never shared with third parties without your explicit written consent, except as required by law.

Data is retained for the duration of your program plus 12 months, after which it is anonymized. You may request deletion of your data at any time by contacting us.`,
  },
  {
    id: 'payment',
    title: 'Payment Terms',
    content: `Program fee: $2,400 for a 6-month program. Full payment is required to begin your program.

Accepted payment methods: Credit / Debit Card (processed via Stripe), Zelle.

Invoiced installment plans may be available on a case-by-case basis. Contact us to discuss. Late payments on approved installment plans may result in program suspension until payment is made current.

All prices are in USD. No hidden fees.`,
  },
  {
    id: 'health',
    title: 'Health Disclaimer',
    content: `Lion Elite Beauty optimization programs are designed for educational and informational purposes. They are not a substitute for professional medical advice, diagnosis, or treatment.

Always consult your physician or qualified healthcare provider before starting any new health, fitness, or supplementation protocol. Results vary based on individual biology, adherence, and lifestyle factors.

Our programs do not diagnose, treat, cure, or prevent any disease. If you have a medical condition, consult your doctor before enrolling. By enrolling, you acknowledge that you are participating voluntarily and assume all associated risks.`,
  },
  {
    id: 'cancellation',
    title: 'Cancellation & Refund Policy',
    content: `You may cancel your program enrollment within 7 days of the start date for a full refund, minus any administrative fees.

After 7 days, refunds are prorated based on the portion of the program completed, less a $250 administrative fee. Requests must be submitted in writing to orders@lionelitebeauty.com.

No refunds are issued after 50% or more of the program duration has elapsed. Lion Elite Beauty reserves the right to cancel or reschedule programs due to insufficient enrollment or unforeseen circumstances — in such cases, a full refund will be issued.`,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: `For questions about programs, enrollment, or billing:

Email: orders@lionelitebeauty.com
Response time: within 24 hours on business days.`,
  },
]

export default function ProgramsPolicies() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="Policies — Programs" description="Lion Elite Beauty programs policies: terms of service, privacy, payment terms, health disclaimer, and cancellation policy." />
      <Navbar />

      <section style={{ paddingTop: '140px', paddingBottom: '64px', borderBottom: '1px solid #E8DDD0' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }}
            className="uppercase">Policies</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2.6rem', lineHeight: '1.1', letterSpacing: '-0.02em', marginBottom: '12px' }}
            className="font-normal">
            Programs Policies
          </h1>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.7' }}>
            Terms, privacy, payment, health disclaimer, and cancellation for Lion Elite Beauty programs.
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
            <Link to="/programs/optimization"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '12px', letterSpacing: '0.12em', textDecoration: 'none', display: 'inline-block', marginTop: '12px' }}
              className="uppercase hover:opacity-80 transition-opacity">
              ← Back to Programs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}