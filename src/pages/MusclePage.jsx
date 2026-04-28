import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MuscleProgram from '../components/MuscleProgram'
import Footer from '../components/Footer'

export default function MusclePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#0C0A08', minHeight: '100vh' }}>
      <Navbar />

      {/* Back link */}
      <div style={{ paddingTop: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/programs/optimization" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:text-[#C9A96E] transition-colors flex items-center gap-2">
            ← All Programs
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-5">Muscle & Recovery</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.15' }} className="font-normal mb-6">
            Lion Elite<br /><span style={{ color: '#C9A96E' }}>Muscle & Recovery Program</span>
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto 40px' }}>
            A data-driven system using advanced biomarker testing and personalized performance strategies to help you build, recover, and perform at your highest level.
          </p>
          <Link to="/apply?program=muscle"
            style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '12px', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply / Get Started Now →
          </Link>
        </div>
      </section>

      <MuscleProgram />

      {/* Pricing card */}
      <section style={{ backgroundColor: '#0C0A08', padding: '80px 0' }}>
        <div className="max-w-lg mx-auto px-6">
          <div style={{ backgroundColor: '#100E0A', border: '1px solid #C9A96E28' }}>
            <div style={{ backgroundColor: '#161208', padding: '48px', textAlign: 'center', borderBottom: '1px solid #C9A96E18' }}>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">One-Time Investment</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '5rem', lineHeight: '1', letterSpacing: '-0.02em' }}>$1,000</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', marginTop: '10px', letterSpacing: '0.15em' }}>Muscle & Recovery Optimization Program</p>
            </div>
            <div style={{ padding: '36px 48px' }}>
              <ul className="space-y-4 mb-10">
                {[
                  'Full performance & recovery biomarker kit (shipped to you)',
                  'Complete data analysis & breakdown',
                  'Personalized muscle & recovery strategy',
                  '1-on-1 coaching + implementation guidance',
                  'Strength, performance & recovery insights',
                  'Ongoing recommendations',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <span style={{ color: '#C9A96E', fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/apply?program=muscle"
                style={{ display: 'block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.15em', padding: '18px', textAlign: 'center', textDecoration: 'none' }}
                className="uppercase hover:opacity-90 transition-opacity">
                Apply / Get Started Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
