import { Link } from 'react-router-dom'
import { skincareProducts } from '../data/skincareProducts'

export default function SkincareLine() {
  const isDark = (bg) => bg === '#1A1A1A' || bg === '#2A2A2A'

  return (
    <section id="skincare" style={{ backgroundColor: '#FAF7F2', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }}
            className="uppercase mb-4">Lion Elite Beauty</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">
            Advanced Peptide Skincare Collection
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto' }}>
            Peptide-powered formulations designed to support the appearance of healthier, more nourished skin. Premium ingredients. Visible results with consistent use.
          </p>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DDD0', padding: '20px 40px', maxWidth: '680px', margin: '0 auto 60px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7', letterSpacing: '0.05em' }}>
            Advanced peptide skincare from Lion Elite Beauty — designed for simple, consistent daily routines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skincareProducts.map((p) => (
            <div key={p.slug} style={{ backgroundColor: p.bg, display: 'flex', flexDirection: 'column' }}>
              {p.badge && (
                <div style={{ backgroundColor: p.badgeColor, padding: '8px 16px', alignSelf: 'flex-start' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '9px', letterSpacing: '0.2em' }}
                    className="uppercase">{p.badge}</span>
                </div>
              )}

              <div style={{ padding: '32px 28px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ minHeight: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ maxWidth: p.slug === 'ghk-cu-serum' ? '130px' : '110px', maxHeight: '170px', width: 'auto', height: 'auto', display: 'block', objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{
                      width: '70px', height: '110px', backgroundColor: p.accent,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                    }}>
                      <div style={{ position: 'absolute', top: '-8px', width: '30px', height: '10px', backgroundColor: p.accent, opacity: 0.6 }}></div>
                      <p style={{ fontFamily: 'Georgia, serif', color: '#FFFFFF', fontSize: '7px', letterSpacing: '0.15em', textAlign: 'center', lineHeight: '2', opacity: 0.9 }}>
                        LION<br />ELITE
                      </p>
                      <div style={{ width: '24px', height: '0.5px', backgroundColor: 'rgba(255,255,255,0.4)', margin: '4px 0' }}></div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '6px', letterSpacing: '0.1em', opacity: 0.7 }}>{p.label || 'GHK-Cu'}</p>
                    </div>
                  )}
                </div>

                <p style={{
                  fontFamily: 'Georgia, serif',
                  color: isDark(p.bg) ? '#FAFAF8' : '#1A1A1A',
                  fontSize: '1rem', lineHeight: '1.4', marginBottom: '8px',
                }} className="font-normal">{p.name}</p>

                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '11px', letterSpacing: '0.12em', marginBottom: '16px' }}
                  className="uppercase">{p.tagline}</p>

                <div style={{ width: '28px', height: '1px', backgroundColor: p.accent, marginBottom: '16px' }}></div>

                <ul className="space-y-2 mb-6 flex-1">
                  {p.benefits.slice(0, 3).map(b => (
                    <li key={b.title} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0 }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark(p.bg) ? '#7A7A7A' : '#6A6A6A', fontSize: '12px' }}>{b.title}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ borderTop: `1px solid ${isDark(p.bg) ? '#2E2E2E' : '#E8DDD0'}`, paddingTop: '20px', marginTop: 'auto', paddingBottom: '28px' }}>
                  <div className="flex items-center justify-between mb-4">
                    <p style={{ fontFamily: 'Georgia, serif', color: isDark(p.bg) ? '#FAFAF8' : '#1A1A1A', fontSize: '1.4rem' }}>{p.price}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark(p.bg) ? '#4A4A4A' : '#9A9A9A', fontSize: '11px' }}>{p.size}</p>
                  </div>
                  <Link to={`/skincare/${p.slug}`}
                    style={{
                      display: 'block', textAlign: 'center', backgroundColor: 'transparent',
                      border: `1px solid ${p.accent}`, color: isDark(p.bg) ? '#FAFAF8' : '#1A1A1A',
                      fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', letterSpacing: '0.15em',
                      padding: '12px', textDecoration: 'none',
                    }}
                    className="uppercase hover:opacity-70 transition-opacity">
                    View Product →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
