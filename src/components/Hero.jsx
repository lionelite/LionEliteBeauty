import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="hero" style={{ backgroundColor: '#FAF8F4', minHeight: '92vh', paddingTop: '84px', position: 'relative', overflow: 'hidden' }} className="flex items-center">
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 18% 20%, rgba(216,194,188,.22), transparent 34%), radial-gradient(circle at 82% 76%, rgba(169,178,158,.18), transparent 34%)' }} />
      <div className="max-w-7xl mx-auto px-6 py-24 w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-4xl mx-auto text-center">
          <p style={eyebrow}>Lion Elite Beauty</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#302E2B', lineHeight: 1.03, letterSpacing: '-.035em' }} className="text-5xl md:text-7xl font-normal mb-8">
            Look better. Feel better.<br />Perform better.
          </h1>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#716D67', fontSize: '18px', lineHeight: 1.85, maxWidth: '650px', margin: '0 auto 42px' }}>
            Private optimization coaching and peptide-powered skincare for people who want a more intentional approach to how they look, feel, and perform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/programs/optimization" style={primary}>Explore Private Coaching →</Link>
            <Link to="/skincare" style={secondary}>Shop Skincare</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-20 max-w-5xl mx-auto">
          <Link to="/programs/optimization" style={{ ...pathCard, background: '#F3EDE4' }}>
            <span style={eyebrow}>Private Optimization</span>
            <strong style={pathTitle}>High-touch coaching, built around you.</strong>
            <span style={pathCopy}>Personalized programs for physique, performance, metabolic health, cognition, fertility, hair and longevity.</span>
            <span style={pathLink}>Explore programs →</span>
          </Link>
          <Link to="/skincare" style={{ ...pathCard, background: '#F8F4EE' }}>
            <span style={eyebrow}>Peptide Skincare</span>
            <strong style={pathTitle}>Simple routines. Purposeful formulas.</strong>
            <span style={pathCopy}>A focused collection built around GHK-Cu, KPV and supportive skin-barrier ingredients.</span>
            <span style={pathLink}>Explore skincare →</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

const eyebrow = { color: '#A7895B', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '.3em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '18px' }
const primary = { background: '#C9AA73', color: '#302E2B', textDecoration: 'none', padding: '17px 34px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase' }
const secondary = { border: '1px solid #D7CCBD', color: '#5F5A54', textDecoration: 'none', padding: '17px 34px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase' }
const pathCard = { display: 'flex', flexDirection: 'column', padding: '42px', textDecoration: 'none', border: '1px solid #E4D9CC', minHeight: '260px' }
const pathTitle = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '1.55rem', lineHeight: 1.25, marginBottom: '14px' }
const pathCopy = { fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#716D67', fontSize: '13px', lineHeight: 1.75, maxWidth: '420px' }
const pathLink = { marginTop: 'auto', paddingTop: '28px', color: '#A7895B', fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase' }
