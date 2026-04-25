import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import FertilityProgram from '../components/FertilityProgram'
import Footer from '../components/Footer'

export default function FertilityPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#0A0A0F' }}>
      <Navbar />
      {/* Page Hero */}
      <section style={{ backgroundColor: '#0A0A0F', paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-5">Fertility Optimization</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.5rem', lineHeight: '1.15', letterSpacing: '-0.01em' }} className="font-normal mb-6">
            Lion Elite<br /><span style={{ color: '#B8A4D4' }}>Fertility Program</span>
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#B8A4D4', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '18px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto 40px' }}>
            A structured, data-driven approach to understanding and supporting your reproductive health. Not guesswork. Precision.
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#B8A4D4', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '13px', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>
      </section>
      <FertilityProgram />
      {/* Pricing CTA */}
      <section style={{ backgroundColor: '#0A0A0F', padding: '80px 0' }}>
        <div className="max-w-lg mx-auto px-6">
          <div style={{ backgroundColor: '#111116', border: '1px solid #B8A4D428' }}>
            <div style={{ backgroundColor: '#161620', padding: '48px', textAlign: 'center', borderBottom: '1px solid #B8A4D418' }}>
              <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Premium Access</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#B8A4D4', fontSize: '2rem', lineHeight: '1', letterSpacing: '-0.01em' }}>Apply for Availability</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A5A', fontSize: '11px', marginTop: '10px', letterSpacing: '0.15em' }}>High-touch, premium program</p>
            </div>
            <div style={{ padding: '36px 48px' }}>
              <ul className="space-y-4 mb-10">
                {['Fertility biomarker testing & assessment', 'Hormonal balance analysis', 'Personalized fertility optimization strategy', 'Guided implementation support', 'Advanced fertility support pathways', 'Preferred client-level opportunities'].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: '#B8A4D4', fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:info@lionelitewellness.com"
                style={{ display: 'block', backgroundColor: '#B8A4D4', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.15em', padding: '18px', textAlign: 'center', textDecoration: 'none' }}
                className="uppercase hover:opacity-90 transition-opacity">
                👉 Apply / Get Started Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
