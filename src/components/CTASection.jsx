import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section id="cta-final" style={{ backgroundColor: '#050505', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 50% 60%, rgba(201,169,110,0.07) 0%, transparent 60%)',
      }}></div>

      {/* Top rule */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A96E44, transparent)' }}></div>

      <div className="max-w-4xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* Quote block */}
        <div className="text-center mb-20">
          <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '4rem', lineHeight: '1', marginBottom: '8px' }}>"</p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.5', maxWidth: '680px', margin: '0 auto 8px', fontStyle: 'italic' }}>
            The system behind high-performance individuals who take their skin and body seriously.
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.3em' }} className="uppercase">Lion Elite</p>
        </div>

        {/* CTA block */}
        <div style={{ border: '1px solid #1E1E1E', padding: '60px 48px', textAlign: 'center', backgroundColor: '#0A0A0A' }}>
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '20px' }} className="uppercase">Ready to Begin</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.4rem', lineHeight: '1.2', maxWidth: '560px', margin: '0 auto 20px' }} className="font-normal">
            Stop guessing.<br /><span style={{ color: '#C9A96E' }}>Start optimizing.</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '15px', lineHeight: '1.9', maxWidth: '440px', margin: '0 auto 40px' }}>
            Every Lion Elite program is built on precision testing, personalized strategy, and guided implementation. Your biology is the blueprint.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link to="/programs/optimization"
              style={{
                display: 'inline-block', backgroundColor: '#C9A96E', color: '#000',
                fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px',
                letterSpacing: '0.2em', padding: '18px 48px', textDecoration: 'none',
              }}
              className="uppercase hover:opacity-90 transition-opacity">
              Explore All Programs →
            </Link>
            <a href="mailto:info@lionelitewellness.com"
              style={{
                display: 'inline-block', border: '1px solid #2A2A2A', color: '#6A6A6A',
                fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px',
                letterSpacing: '0.2em', padding: '18px 36px', textDecoration: 'none',
              }}
              className="uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
              Contact Us
            </a>
          </div>

          {/* Ecosystem link */}
          <div style={{ borderTop: '1px solid #1A1A1A', paddingTop: '32px' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '10px' }} className="uppercase">
              Part of the Lion Elite Ecosystem
            </p>
            <a href="https://lionelitewellness.com" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '14px', textDecoration: 'none' }}
              className="hover:opacity-70 transition-opacity">
              lionelitewellness.com →
            </a>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2E2E2E', fontSize: '11px', marginTop: '6px' }}>
              Clinical wellness programs · Medical services · Advanced protocols
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
