import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WeightProgram from '../components/WeightProgram'
import Footer from '../components/Footer'

export default function WeightPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#080C08', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:text-[#5BA87A] transition-colors flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </div>
      <section style={{ padding: '60px 0 80px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-5">Weight Optimization</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.15' }} className="font-normal mb-6">
            Lion Elite<br /><span style={{ color: '#5BA87A' }}>Weight Optimization Program</span>
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#5BA87A', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto 40px' }}>
            A structured, data-driven system to reduce body fat, control appetite, and improve metabolic efficiency. Not dieting. Precision-based optimization.
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#5BA87A', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '12px', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>
      </section>
      <WeightProgram />
      <section style={{ backgroundColor: '#080C08', padding: '80px 0' }}>
        <div className="max-w-lg mx-auto px-6">
          <div style={{ backgroundColor: '#0D120D', border: '1px solid #5BA87A28' }}>
            <div style={{ backgroundColor: '#111A11', padding: '48px', textAlign: 'center', borderBottom: '1px solid #5BA87A18' }}>
              <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Premium Access</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#5BA87A', fontSize: '2rem', lineHeight: '1.2' }}>Apply for Availability</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A4A3A', fontSize: '11px', marginTop: '10px', letterSpacing: '0.15em' }}>High-touch, premium program</p>
            </div>
            <div style={{ padding: '36px 48px' }}>
              <ul className="space-y-4 mb-10">
                {['Metabolic & biomarker assessment', 'Personalized weight optimization strategy', 'Appetite & fat metabolism framework', 'Guided implementation step by step', 'Advanced metabolic pathway access', 'Preferred client-level opportunities'].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: '#5BA87A', fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:info@lionelitewellness.com"
                style={{ display: 'block', backgroundColor: '#5BA87A', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.15em', padding: '18px', textAlign: 'center', textDecoration: 'none' }}
                className="uppercase hover:opacity-90 transition-opacity">
                👉 Apply / Get Started Now
              </a>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A4A3A', fontSize: '11px', textAlign: 'center', marginTop: '16px' }}>
                Or email us: <a href="mailto:info@lionelitewellness.com" style={{ color: '#5BA87A', textDecoration: 'none' }}>info@lionelitewellness.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
