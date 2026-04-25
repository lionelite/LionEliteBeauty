import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LongevityProgram from '../components/LongevityProgram'
import Footer from '../components/Footer'

export default function LongevityPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh' }}>
      <Navbar />

      {/* Back link */}
      <div style={{ paddingTop: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/programs/optimization" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:text-[#7A9FBF] transition-colors flex items-center gap-2">
            ← All Programs
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-5">Longevity & Anti-Aging</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.15' }} className="font-normal mb-6">
            Lion Elite<br /><span style={{ color: '#7A9FBF' }}>Longevity Program</span>
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#7A9FBF', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto 40px' }}>
            A premium, data-driven system designed to support cellular health, accelerate recovery, and help you stay strong and resilient for the long term.
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#7A9FBF', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '12px', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>
      </section>

      <LongevityProgram />

      {/* Pricing card */}
      <section style={{ backgroundColor: '#0D0D0D', padding: '80px 0' }}>
        <div className="max-w-lg mx-auto px-6">
          <div style={{ backgroundColor: '#0D1018', border: '1px solid #7A9FBF28' }}>
            <div style={{ backgroundColor: '#111520', padding: '48px', textAlign: 'center', borderBottom: '1px solid #7A9FBF18' }}>
              <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">One-Time Investment</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#7A9FBF', fontSize: '5rem', lineHeight: '1', letterSpacing: '-0.02em' }}>$1,000</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', marginTop: '10px', letterSpacing: '0.15em' }}>Longevity & Anti-Aging Optimization Program</p>
            </div>
            <div style={{ padding: '36px 48px' }}>
              <ul className="space-y-4 mb-10">
                {[
                  'Full longevity & recovery biomarker testing kit (shipped to you)',
                  'Complete cellular health & inflammation analysis',
                  'Personalized longevity optimization strategy',
                  '1-on-1 coaching + implementation guidance',
                  'Recovery, energy & aging performance insights',
                  'Ongoing recommendations',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: '#7A9FBF', fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:info@lionelitewellness.com"
                style={{ display: 'block', backgroundColor: '#7A9FBF', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.15em', padding: '18px', textAlign: 'center', textDecoration: 'none' }}
                className="uppercase hover:opacity-90 transition-opacity">
                👉 Apply / Get Started Now
              </a>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', textAlign: 'center', marginTop: '16px' }}>
                Or email us directly: <a href="mailto:info@lionelitewellness.com" style={{ color: '#7A9FBF', textDecoration: 'none' }}>info@lionelitewellness.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
