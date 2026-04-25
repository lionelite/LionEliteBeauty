import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="hero" style={{ backgroundColor: '#080808', minHeight: '100vh', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}
      className="flex items-center">

      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.06) 0%, transparent 65%), radial-gradient(ellipse at 80% 80%, rgba(122,159,191,0.04) 0%, transparent 50%)',
      }}></div>

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}></div>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full" style={{ position: 'relative', zIndex: 1 }}>

        {/* Top label */}
        <div className="flex justify-center mb-10">
          <div style={{ border: '1px solid #2A2A2A', padding: '8px 24px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#C9A96E', borderRadius: '50%' }}></div>
            <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', letterSpacing: '0.3em', fontSize: '10px' }} className="uppercase">
              Lion Elite · Precision Wellness
            </span>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#C9A96E', borderRadius: '50%' }}></div>
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 style={{
            fontFamily: 'Georgia, serif',
            color: '#FAFAF8',
            lineHeight: '1.08',
            letterSpacing: '-0.02em',
          }} className="text-5xl md:text-6xl lg:text-7xl font-normal mb-8">
            The System Behind<br />
            <span style={{
              background: 'linear-gradient(90deg, #C9A96E 0%, #E8D5A8 50%, #C9A96E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>High-Performance</span><br />
            Individuals.
          </h1>

          <p style={{
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            color: '#6A6A6A',
            fontSize: '18px',
            lineHeight: '1.8',
            maxWidth: '560px',
            margin: '0 auto',
          }}>
            Precision biomarker testing. Clinical-grade formulations. Data-driven optimization programs — built for people who take their body seriously.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link to="/programs/optimization"
            style={{
              backgroundColor: '#C9A96E',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              letterSpacing: '0.15em',
              fontSize: '12px',
              display: 'inline-block',
              padding: '18px 48px',
              color: '#000',
              textDecoration: 'none',
            }}
            className="uppercase hover:opacity-90 transition-opacity">
            Explore All Programs →
          </Link>
          <a href="#skincare"
            style={{
              border: '1px solid #2A2A2A',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              letterSpacing: '0.15em',
              fontSize: '12px',
              display: 'inline-block',
              padding: '18px 36px',
              color: '#6A6A6A',
              textDecoration: 'none',
            }}
            className="uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
            Shop Skincare
          </a>
        </div>

        {/* Credential bar */}
        <div style={{ borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', padding: '28px 0' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '6', label: 'Optimization Programs' },
              { stat: 'Clinical', label: 'Grade Formulations' },
              { stat: 'Data', label: 'Driven Protocols' },
              { stat: 'Peptide', label: 'Powered Science' },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.5rem', marginBottom: '4px' }}>{item.stat}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '10px', letterSpacing: '0.2em' }} className="uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12">
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, #C9A96E44, transparent)' }}></div>
        </div>
      </div>
    </section>
  )
}
