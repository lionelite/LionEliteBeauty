import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { skincareProducts, bundles } from '../data/skincareProducts'

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
  const { addItem } = useCart()
  const [bundleAdded, setBundleAdded] = useState('')
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#080808', paddingTop: '140px', paddingBottom: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px' }}
              className="uppercase mb-5">Lion Elite Beauty</p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.12', letterSpacing: '-0.02em' }}
              className="font-normal mb-6">
              Advanced Peptide<br />Skincare Collection.
            </h1>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '16px', lineHeight: '1.8', maxWidth: '480px' }}>
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
                        {p.badge === 'Coming Soon' ? (
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
                          <ProductBottle accent={p.accent} label={p.label} isDark={isDark} />
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

      {/* Bundles */}
      <section style={{ backgroundColor: '#080808', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px' }}
              className="uppercase mb-4">Save More</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.2rem', lineHeight: '1.15' }}
              className="font-normal">Skincare Bundles</h2>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '20px auto 0' }}></div>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: '#1A1A1A' }}>
            {bundles.map(b => {
              const bundleProducts = b.includes.map(slug => skincareProducts.find(p => p.slug === slug))
              return (
                <div key={b.slug} style={{ backgroundColor: '#0A0A0A', padding: '40px 36px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ backgroundColor: b.accent, padding: '5px 14px', alignSelf: 'flex-start', marginBottom: '24px' }}>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#000', fontSize: '9px', letterSpacing: '0.2em' }} className="uppercase">{b.badge}</span>
                  </div>

                  <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.3rem', lineHeight: '1.3', marginBottom: '8px' }}
                    className="font-normal">{b.name}</h3>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7', marginBottom: '24px' }}>{b.tagline}</p>

                  <div style={{ borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', padding: '20px 0', marginBottom: '24px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.2em', marginBottom: '12px' }} className="uppercase">Includes</p>
                    <ul className="space-y-2">
                      {bundleProducts.map(p => (
                        <li key={p.slug} className="flex items-center gap-2">
                          <div style={{ width: '4px', height: '4px', backgroundColor: b.accent, borderRadius: '50%', flexShrink: 0 }}></div>
                          <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '12px' }}>{p.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-end gap-3 mb-6 mt-auto">
                    <p style={{ fontFamily: 'Georgia, serif', color: b.accent, fontSize: '1.8rem' }}>{b.price}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', textDecoration: 'line-through', marginBottom: '6px' }}>{b.originalPrice}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '6px' }} className="uppercase">Save {b.savings}</p>
                  </div>

                  <button onClick={() => {
                      bundleProducts.forEach(p => addItem({ slug: p.slug, name: p.name, size: p.size, priceNum: p.priceNum || 0 }))
                      setBundleAdded(b.slug)
                      setTimeout(() => setBundleAdded(''), 2500)
                    }}
                      style={{
                        display: 'block', width: '100%', backgroundColor: bundleAdded === b.slug ? '#5BA87A' : b.accent, color: '#000', border: 'none',
                        fontFamily: 'Helvetica Neue, Arial, sans-serif',
                        fontSize: '11px', letterSpacing: '0.18em',
                        padding: '14px', textAlign: 'center', cursor: 'pointer',
                      }}
                      className="uppercase hover:opacity-90 transition-opacity">
                      {bundleAdded === b.slug ? '✓ Added to Cart' : 'Add Bundle to Cart →'}
                    </button>
                    <Link to="/cart"
                      style={{
                        display: 'block', marginTop: '10px',
                        fontFamily: 'Helvetica Neue, Arial, sans-serif',
                        color: b.accent, fontSize: '10px', letterSpacing: '0.15em',
                        textAlign: 'center', textDecoration: 'none',
                      }}
                      className="uppercase hover:opacity-70 transition-opacity">
                      View Cart →
                    </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Protocol note */}
      <section style={{ backgroundColor: '#0A0A0A', padding: '60px 0', borderTop: '1px solid #1A1A1A' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px' }}
            className="uppercase mb-4">Integration</p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.4rem', lineHeight: '1.7' }}>
            Optimization Program clients receive personalised skincare protocol recommendations integrated with their wellness plan.
          </p>
          <Link to="/programs/optimization"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.2em', textDecoration: 'none', display: 'inline-block', marginTop: '20px', borderBottom: '1px solid #C9A96E44', paddingBottom: '4px' }}
            className="uppercase hover:opacity-70 transition-opacity">
            Explore Programs →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
