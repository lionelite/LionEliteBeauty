import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import HairProgram from '../components/HairProgram'
import Footer from '../components/Footer'

export default function HairPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#0C0A06', minHeight: '100vh' }}>
      <Navbar />

      {/* Back */}
      <div style={{ paddingTop: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/programs/optimization" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:text-[#C4A265] transition-colors flex items-center gap-2">
            ← All Programs
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '56px 0 72px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '20px' }} className="uppercase">
            Hair Restoration & Density
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.12', marginBottom: '24px' }} className="font-normal">
            Lion Elite<br /><span style={{ color: '#C4A265' }}>Hair Optimization Program</span>
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C4A265', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '16px', lineHeight: '1.9', maxWidth: '540px', margin: '0 auto 36px' }}>
            A structured, data-driven approach to hair restoration — addressing the root biological causes of thinning and loss rather than masking them with surface treatments.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            {['Biomarker-Tested', 'Personalized Protocol', 'Guided Implementation', 'Ongoing Support'].map(tag => (
              <span key={tag} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C4A265', fontSize: '10px', letterSpacing: '0.2em', border: '1px solid #C4A26533', padding: '6px 14px' }} className="uppercase">
                {tag}
              </span>
            ))}
          </div>
          <Link to="/apply?program=hair"
            style={{ display: 'inline-block', backgroundColor: '#C4A265', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '12px', padding: '18px 52px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply for This Program →
          </Link>
        </div>
      </section>

      <HairProgram />

      <Footer />
    </div>
  )
}
