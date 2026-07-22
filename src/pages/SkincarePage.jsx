import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { skincareProducts } from '../data/skincareProducts'
import SEO from '../components/SEO'

function ProductBottle({ accent, label, isDark }) {
  return (
    <div style={{
      width: '56px', height: '88px', backgroundColor: accent,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', position: 'relative', margin: '0 auto',
    }}>
      <div style={{ position: 'absolute', top: '-6px', width: '24px', height: '8px', backgroundColor: accent, opacity: 0.6 }}></div>
      <p style={{ fontFamily: 'Georgia, serif', color: '#FFFFFF', fontSize: '6px', letterSpacing: '0.15em', textAlign: 'center', lineHeight: '2', opacity: 0.9 }}>LION<br />ELITE</p>
      <div style={{ width: '18px', height: '0.5px', backgroundColor: 'rgba(255,255,255,0.4)', margin: '3px 0' }}></div>
      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '5px', letterSpacing: '0.1em', opacity: 0.7 }}>{label}</p>
    </div>
  )
}

export default function SkincarePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="Advanced Peptide Skincare" description="Clinical-grade peptide-powered skincare for healthier, more radiant skin. GHK-Cu and KPV peptide formulations." />
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#FAF7F2', paddingTop: '140px', paddingBottom: '100px', borderBottom: '1px solid #E8DDD0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.3em', fontSize: '10px' }}
              className="uppercase mb-5">Lion Elite Beauty</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '3.2rem', lineHeight: '1.12', letterSpacing: '-0.02em' }}
              className="font-normal mb-6">
              Advanced Peptide<br />Skincare Collection.
            </h1>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '16px', lineHeight: '1.8', maxWidth: '480px' }}>
              Peptide-powered formulations designed to support the appearance of healthier, more radiant skin. Premium ingredients, purposefully formulated — to help you feel confident in your own skin.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={{ backgroundColor: '#FAFAF8', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-12">
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase">
              All Products
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px" style={{ backgroundColor: '#E8DDD0' }}>
            {skincareProducts.map((p, i) => {
              const isDark = p.bg === '#1A1A1A' || p.bg === '#2A2A2A'
              return (
                <div key={p.slug} style={{ backgroundColor: p.bg }}>
                  <div className={`grid md:grid-cols-2 ${i % 2 === 1 ? '' : ''}`} >
                    {/* Left: info */}
                    <div style={{ padding: '60px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div style={{ backgroundColor: p.badgeColor, padding: '5px 14px' }}>
                          <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '9px', letterSpacing: '0.2em' }} className="uppercase">{p.badge}</span>
                        </div>
                        <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark ? '#3A3A3A' : '#BABABA', fontSize: '11px' }}>{p.size}</span>
                      </div>

                      <h2 style={{ fontFamily: 'Georgia, serif', color: isDark ? '#FAFAF8' : '#1A1A1A', fontSize: '1.9rem', lineHeight: '1.2', marginBottom: '8px' }}
                        className="font-normal">{p.name}</h2>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '11px', letterSpacing: '0.18em', marginBottom: '20px' }}
                        className="uppercase">{p.tagline}</p>

                      <div style={{ width: '32px', height: '1px', backgroundColor: p.accent, marginBottom: '20px' }}></div>

                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark ? '#CACACA' : '#6A6A6A', fontSize: '14px', lineHeight: '1.9', marginBottom: '28px', maxWidth: '400px' }}>
                        {p.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {p.benefits.map(b => (
                          <li key={b.title} className="flex items-start gap-3">
                            <div style={{ width: '5px', height: '5px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0, marginTop: '7px' }}></div>
                            <div>
                              <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark ? '#FAFAF8' : '#1A1A1A', fontSize: '13px', fontWeight: '500' }}>{b.title}</span>
                              <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark ? '#5A5A5A' : '#7A7A7A', fontSize: '13px' }}> — {b.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-6">
                        {p.badge === 'Pre-Order' ? (
                          <>
                            <p style={{ fontFamily: 'Georgia, serif', color: p.accent, fontSize: '1.8rem' }}>{p.price}</p>
                            <Link to={`/skincare/${p.slug}`}
                              style={{
                                backgroundColor: p.accent, color: '#000',
                                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                                fontSize: '11px', letterSpacing: '0.18em',
                                padding: '14px 28px', textDecoration: 'none',
                              }}
                              className="uppercase hover:opacity-90 transition-opacity">
                              Pre-Order Now →
                            </Link>
                          </>
                        ) : p.badge === 'Coming Soon' ? (
                          <>
                            <p style={{ fontFamily: 'Georgia, serif', color: p.accent, fontSize: '1.3rem', letterSpacing: '0.1em' }}>Coming Soon</p>
                            <Link to={`/skincare/${p.slug}`}
                              style={{
                                border: `1px solid ${p.accent}`,
                                color: p.accent,
                                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                                fontSize: '11px', letterSpacing: '0.18em',
                                padding: '14px 28px', textDecoration: 'none',
                              }}
                              className="uppercase hover:opacity-90 transition-opacity">
                              Learn More →
                            </Link>
                          </>
                        ) : (
                          <>
                            <p style={{ fontFamily: 'Georgia, serif', color: isDark ? '#FAFAF8' : '#1A1A1A', fontSize: '1.8rem' }}>{p.price}</p>
                            <Link to={`/skincare/${p.slug}`}
                              style={{
                                backgroundColor: p.accent,
                                color: '#FFFFFF',
                                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                                fontSize: '11px', letterSpacing: '0.18em',
                                padding: '14px 28px', textDecoration: 'none',
                              }}
                              className="uppercase hover:opacity-90 transition-opacity">
                              View Details →
                            </Link>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right: visual */}
                    <div style={{ backgroundColor: isDark ? '#111' : '#EDE7DC', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '340px', padding: '60px' }}>
                      <div className="text-center">
                        <div style={{ marginBottom: '32px' }}>
                          {p.image ? (
                            <img src={p.image} alt={p.name}
                              style={{ maxWidth: '160px', height: 'auto', display: 'block', margin: '0 auto' }} />
                          ) : (
                            <ProductBottle accent={p.accent} label={p.label} isDark={isDark} />
                          )}
                        </div>
                        <p style={{ fontFamily: 'Georgia, serif', color: isDark ? '#FAFAF8' : '#1A1A1A', fontSize: '1rem', marginBottom: '6px' }}>{p.shortName}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark ? '#3A3A3A' : '#9A9A9A', fontSize: '11px', letterSpacing: '0.15em' }} className="uppercase">{p.size}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
