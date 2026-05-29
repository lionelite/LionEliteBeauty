import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="hero" style={{ backgroundColor: '#080808', minHeight: '100vh', paddingTop: '80px', position: 'relative', overflow: 'hidden' }}
      className="flex items-center">

      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.07) 0%, transparent 65%), radial-gradient(ellipse at 80% 80%, rgba(184,164,212,0.04) 0%, transparent 50%)',
      }}></div>

      <div className="max-w-7xl mx-auto px-6 py-24 w-full" style={{ position: 'relative', zIndex: 1 }}>

        {/* Top label */}
        <div className="flex justify-center mb-10">
          <div style={{ border: '1px solid #2A2A2A', padding: '8px 24px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#C9A96E', borderRadius: '50%' }}></div>
            <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', letterSpacing: '0.3em', fontSize: '10px' }} className="uppercase">
              Lion Elite Beauty · Peptide Skincare &amp; Wellness
            </span>
            <div style={{ width: '6px', height: '6px', backgroundColor: '#C9A96E', borderRadius: '50%' }}></div>
          </div>
        </div>

        {/* Hero layout — text left, image right */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">

          {/* Left — Headline + CTAs */}
          <div>
            <h1 style={{
              fontFamily: 'Georgia, serif',
              color: '#FAFAF8',
              lineHeight: '1.08',
              letterSpacing: '-0.02em',
            }} className="text-5xl md:text-6xl font-normal mb-6">
              Feel Good<br />In Your<br />
              <span style={{
                background: 'linear-gradient(90deg, #C9A96E 0%, #E8D5A8 50%, #C9A96E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Own Skin.</span>
            </h1>

            <p style={{
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              color: '#6A6A6A',
              fontSize: '17px',
              lineHeight: '1.85',
              maxWidth: '460px',
              marginBottom: '36px',
            }}>
              Peptide-powered skincare and wellness programs designed to help you look and feel your best — confidently, consistently, every day.
            </p>

            {/* Trust micro-signals */}
            <div className="flex flex-wrap items-center gap-5 mb-10">
              {['Visible Results in 2–4 Weeks', 'Science-Backed Formulas', 'Personalized Programs'].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%' }}></div>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', letterSpacing: '0.15em' }} className="uppercase">{t}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link to="/skincare"
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
                Shop Skincare →
              </Link>
              <a href="#services"
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
                Explore Programs
              </a>
            </div>
          </div>

          {/* Right — Happy human photo collage */}
          <div style={{ position: 'relative' }}>
            {/* Main large image */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80"
                alt="Confident woman with radiant skin smiling"
                style={{ width: '100%', height: '480px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
              {/* Gold border accent */}
              <div style={{ position: 'absolute', inset: 0, border: '1px solid #C9A96E22', pointerEvents: 'none' }}></div>
            </div>

            {/* Floating result badge */}
            <div style={{
              position: 'absolute', bottom: '-20px', left: '-20px',
              backgroundColor: '#0D0D0D', border: '1px solid #C9A96E44',
              padding: '18px 24px', maxWidth: '200px',
            }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.4rem', marginBottom: '4px' }}>2–4 wks</p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '10px', letterSpacing: '0.2em' }} className="uppercase">Visible Results</p>
            </div>

            {/* Small floating happy photo */}
            <div style={{
              position: 'absolute', top: '-16px', right: '-16px',
              width: '120px', height: '120px', overflow: 'hidden',
              border: '2px solid #C9A96E44',
            }}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80"
                alt="Glowing, happy person"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
          </div>
        </div>

        {/* Social proof bar */}
        <div style={{ borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', padding: '28px 0' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '2–4 wks', label: 'Visible Results' },
              { stat: '4,000+', label: 'Genes Studied Alongside GHK-Cu' },
              { stat: '6', label: 'Premium Skincare Products' },
              { stat: '6', label: 'Targeted Wellness Programs' },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.4rem', marginBottom: '4px' }}>{item.stat}</p>
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
