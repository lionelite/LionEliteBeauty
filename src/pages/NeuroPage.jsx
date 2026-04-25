import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import NeuroProgram from '../components/NeuroProgram'
import Footer from '../components/Footer'

export default function NeuroPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#080808' }}>
      <Navbar />
      {/* Page Hero */}
      <section style={{ backgroundColor: '#080808', paddingTop: '140px', paddingBottom: '80px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-5">Neuro Optimization</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.5rem', lineHeight: '1.15', letterSpacing: '-0.01em' }} className="font-normal mb-6">
            Lion Elite<br /><span style={{ color: '#8A9E85' }}>Neuro Program</span>
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#8A9E85', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '18px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto 40px' }}>
            Designed for individuals who want to operate at the highest level — mentally, physically, and strategically. Precision over guesswork.
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#8A9E85', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '13px', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>
      </section>
      <NeuroProgram />
      {/* Pricing CTA */}
      <section style={{ backgroundColor: '#080808', padding: '80px 0' }}>
        <div className="max-w-lg mx-auto px-6">
          <div style={{ backgroundColor: '#111111', border: '1px solid #8A9E8528' }}>
            <div style={{ backgroundColor: '#161616', padding: '48px', textAlign: 'center', borderBottom: '1px solid #8A9E8518' }}>
              <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Premium Access</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#8A9E85', fontSize: '2rem', lineHeight: '1', letterSpacing: '-0.01em' }}>Apply for Availability</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', marginTop: '10px', letterSpacing: '0.15em' }}>High-touch, premium program</p>
            </div>
            <div style={{ padding: '36px 48px' }}>
              <ul className="space-y-4 mb-10">
                {['Baseline cognitive & biomarker assessment', 'Neuro optimization strategy framework', 'Guided implementation — step by step', 'Advanced neuro-support pathway access', 'Trusted resources & structured frameworks', 'Preferred client-level opportunities'].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: '#8A9E85', fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:info@lionelitewellness.com"
                style={{ display: 'block', backgroundColor: '#8A9E85', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.15em', padding: '18px', textAlign: 'center', textDecoration: 'none' }}
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
