import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MuscleProgram from '../components/MuscleProgram'
import Footer from '../components/Footer'

const allPrograms = [
  {
    label: 'Muscle & Recovery Program',
    tagline: 'Strength & Performance',
    desc: 'Maximize muscle development, accelerate recovery, and operate at peak physical performance with a data-driven system.',
    accent: '#C9A96E',
    bg: '#0C0A08',
    border: '#C9A96E30',
    href: '/programs/optimization',
    price: '$1,000',
    icon: '💪',
    active: true,
  },
  {
    label: 'Neuro Program',
    tagline: 'Cognitive Performance',
    desc: 'Sharpen focus, memory, and mental clarity through precision testing and targeted cognitive optimization.',
    accent: '#8A9E85',
    bg: '#081008',
    border: '#8A9E8530',
    href: '/programs/neuro',
    price: '$1,000',
    icon: '🧠',
  },
  {
    label: 'Fertility Program',
    tagline: 'Reproductive Health',
    desc: 'Comprehensive hormonal and reproductive optimization for men and women ready to take their fertility seriously.',
    accent: '#B8A4D4',
    bg: '#0A0810',
    border: '#B8A4D430',
    href: '/programs/fertility',
    price: '$1,000',
    icon: '🌿',
  },
  {
    label: 'Hair Program',
    tagline: 'Hair Restoration & Density',
    desc: 'Address the root causes of hair thinning and loss with a biomarker-driven approach to restoration and regrowth.',
    accent: '#C4A265',
    bg: '#100E08',
    border: '#C4A26530',
    href: '/programs/hair',
    price: '$1,000',
    icon: '✦',
  },
  {
    label: 'Weight Program',
    tagline: 'Fat Loss & Metabolic Health',
    desc: 'Burn fat, control hunger, and take back your body with a precision metabolic system built around your biology.',
    accent: '#5BA87A',
    bg: '#081008',
    border: '#5BA87A30',
    href: '/programs/weight',
    price: '$1,000',
    icon: '🔥',
  },
  {
    label: 'Longevity Program',
    tagline: 'Anti-Aging & Cellular Repair',
    desc: 'Support cellular health, accelerate recovery, and stay strong and resilient for the long term with a premium data-driven system.',
    accent: '#7A9FBF',
    bg: '#08090C',
    border: '#7A9FBF30',
    href: '/programs/longevity',
    price: '$1,000',
    icon: '🔬',
  },
]

export default function OptimizationPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh' }}>
      <Navbar />

      {/* Back link */}
      <div style={{ paddingTop: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:text-[#C9A96E] transition-colors flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Programs Hub Header */}
      <section style={{ padding: '60px 0 40px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-5">Lion Elite</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.15' }} className="font-normal mb-6">
            All Programs
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto' }}>
            Every Lion Elite program is built on the same foundation — precision testing, personalized strategy, and guided implementation. Choose the program that matches your goal.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPrograms.map((p) => (
              <div key={p.href} style={{ backgroundColor: p.bg, border: `1px solid ${p.border}`, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                {p.active && (
                  <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: p.accent, padding: '6px 16px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#000', fontSize: '9px', letterSpacing: '0.2em' }} className="uppercase">Current Page</p>
                  </div>
                )}
                <div style={{ padding: '40px 36px 32px', flex: 1 }}>
                  <p style={{ fontSize: '2rem', marginBottom: '16px' }}>{p.icon}</p>
                  <p style={{ color: p.accent, fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '10px' }} className="uppercase">{p.tagline}</p>
                  <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.35rem', lineHeight: '1.3', marginBottom: '16px' }} className="font-normal">{p.label}</h2>
                  <div style={{ width: '28px', height: '1px', backgroundColor: p.accent, marginBottom: '16px' }}></div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '14px', lineHeight: '1.8', marginBottom: '24px' }}>{p.desc}</p>
                  <p style={{ fontFamily: 'Georgia, serif', color: p.accent, fontSize: '1.6rem', marginBottom: '4px' }}>{p.price}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '28px' }} className="uppercase">One-Time Investment</p>
                </div>
                <div style={{ padding: '0 36px 36px' }}>
                  <Link to={p.href}
                    style={{ display: 'block', backgroundColor: p.active ? p.accent : 'transparent', border: `1px solid ${p.accent}`, color: p.active ? '#000' : p.accent, fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.2em', padding: '16px', textAlign: 'center', textDecoration: 'none' }}
                    className="uppercase hover:opacity-80 transition-opacity">
                    {p.active ? 'View Program Details' : 'Learn More →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #1E1E1E' }} />

      {/* Program Hero */}
      <section style={{ padding: '80px 0 20px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-5">Muscle & Recovery</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.15' }} className="font-normal mb-6">
            Lion Elite<br /><span style={{ color: '#C9A96E' }}>Muscle & Recovery Program</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto 40px' }}>
            A data-driven system using advanced biomarker testing and personalized performance strategies to help you build, recover, and perform at your highest level.
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', fontSize: '12px', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>
      </section>

      <MuscleProgram />

      {/* Pricing card */}
      <section style={{ backgroundColor: '#0D0D0D', padding: '80px 0' }}>
        <div className="max-w-lg mx-auto px-6">
          <div style={{ backgroundColor: '#161616', border: '1px solid #C9A96E28' }}>
            <div style={{ backgroundColor: '#1A1A1A', padding: '48px', textAlign: 'center', borderBottom: '1px solid #C9A96E18' }}>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">One-Time Investment</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '5rem', lineHeight: '1', letterSpacing: '-0.02em' }}>$1,000</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', marginTop: '10px', letterSpacing: '0.15em' }}>Muscle & Recovery Optimization Program</p>
            </div>
            <div style={{ padding: '36px 48px' }}>
              <ul className="space-y-4 mb-10">
                {[
                  'Full performance & recovery biomarker testing kit (shipped to you)',
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
              <a href="mailto:info@lionelitewellness.com"
                style={{ display: 'block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.15em', padding: '18px', textAlign: 'center', textDecoration: 'none' }}
                className="uppercase hover:opacity-90 transition-opacity">
                👉 Apply / Get Started Now
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
