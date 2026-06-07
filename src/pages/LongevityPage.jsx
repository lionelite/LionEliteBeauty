import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LongevityProgram from '../components/LongevityProgram'
import Footer from '../components/Footer'

export default function LongevityPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#060709', minHeight: '100vh' }}>
      <Navbar />

      {/* Back */}
      <div style={{ paddingTop: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/programs/optimization" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:text-[#7A9FBF] transition-colors flex items-center gap-2">
            ← All Programs
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '56px 0 72px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '20px' }} className="uppercase">
            Longevity & Anti-Aging
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.12', marginBottom: '24px' }} className="font-normal">
            Lion Elite<br /><span style={{ color: '#7A9FBF' }}>Longevity Program</span>
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#7A9FBF', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '16px', lineHeight: '1.9', maxWidth: '540px', margin: '0 auto 36px' }}>
            A premium, data-driven system designed to support cellular health, reduce inflammation, and help you sustain strength, sharpness, and vitality long-term.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            {['Biomarker-Tested', 'Personalized Protocol', 'Guided Implementation', 'Ongoing Support'].map(tag => (
              <span key={tag} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A9FBF', fontSize: '10px', letterSpacing: '0.2em', border: '1px solid #7A9FBF33', padding: '6px 14px' }} className="uppercase">
                {tag}
              </span>
            ))}
          </div>
          <Link to="/apply?program=longevity"
            style={{ display: 'inline-block', backgroundColor: '#7A9FBF', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '12px', padding: '18px 52px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply for This Program →
          </Link>
        </div>
      </section>

      <LongevityProgram />

      <Footer />
    </div>
  )
}
