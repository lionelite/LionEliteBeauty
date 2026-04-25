import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import Products from '../components/Products'
import BeforeAfter from '../components/BeforeAfter'
import WhyLionElite from '../components/WhyLionElite'
import Footer from '../components/Footer'

export default function OptimizationPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh' }}>
      <Navbar />

      {/* Back link */}
      <div style={{ paddingTop: '100px', paddingBottom: '0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:text-[#C9A96E] transition-colors flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-5">Body Optimization</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.15' }} className="font-normal mb-6">
            Lion Elite<br /><span style={{ color: '#C9A96E' }}>Optimization Program</span>
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto 40px' }}>
            A data-driven system using advanced biomarker testing and personalized performance strategies to help you unlock your highest level.
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '12px', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Start Your Optimization Program
          </a>
        </div>
      </section>

      <Services />
      <Products />
      <BeforeAfter />
      <WhyLionElite />

      {/* Pricing card */}
      <section style={{ backgroundColor: '#0D0D0D', padding: '80px 0' }}>
        <div className="max-w-lg mx-auto px-6">
          <div style={{ backgroundColor: '#161616', border: '1px solid #C9A96E28' }}>
            <div style={{ backgroundColor: '#1A1A1A', padding: '48px', textAlign: 'center', borderBottom: '1px solid #C9A96E18' }}>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">One-Time Investment</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '5rem', lineHeight: '1', letterSpacing: '-0.02em' }}>$1,000</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', marginTop: '10px', letterSpacing: '0.15em' }}>Complete Optimization Program</p>
            </div>
            <div style={{ padding: '36px 48px' }}>
              <ul className="space-y-4 mb-10">
                {['Full biomarker testing kit (shipped to you)', 'Complete data analysis & breakdown', 'Personalized optimization strategy', '1-on-1 coaching + implementation guidance', 'Performance & recovery insights', 'Ongoing recommendations'].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: '#C9A96E', fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:info@lionelitewellness.com"
                style={{ display: 'block', backgroundColor: '#C9A96E', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.15em', padding: '18px', textAlign: 'center', textDecoration: 'none' }}
                className="uppercase hover:opacity-90 transition-opacity">
                👉 Start Your Optimization Program
              </a>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', textAlign: 'center', marginTop: '16px' }}>
                Or email us directly: <a href="mailto:info@lionelitewellness.com" style={{ color: '#C9A96E', textDecoration: 'none' }}>info@lionelitewellness.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
