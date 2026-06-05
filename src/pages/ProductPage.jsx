import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { skincareProducts } from '../data/skincareProducts'

function ProductBottle({ accent, label, large }) {
  const w = large ? '90px' : '64px'
  const h = large ? '140px' : '100px'
  return (
    <div style={{
      width: w, height: h, backgroundColor: accent,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', position: 'relative', margin: '0 auto',
    }}>
      <div style={{ position: 'absolute', top: '-8px', width: large ? '38px' : '26px', height: large ? '12px' : '8px', backgroundColor: accent, opacity: 0.6 }}></div>
      <p style={{ fontFamily: 'Georgia, serif', color: '#FFFFFF', fontSize: large ? '8px' : '6px', letterSpacing: '0.15em', textAlign: 'center', lineHeight: '2', opacity: 0.9 }}>LION<br />ELITE</p>
      <div style={{ width: large ? '30px' : '20px', height: '0.5px', backgroundColor: 'rgba(255,255,255,0.4)', margin: '4px 0' }}></div>
      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: large ? '7px' : '5px', letterSpacing: '0.1em', opacity: 0.7 }}>{label}</p>
    </div>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  const product = skincareProducts.find(p => p.slug === slug)
  if (!product) return <Navigate to="/skincare" replace />

  const p = product
  const isComingSoon = p.badge === 'Coming Soon'
  const isDark = p.bg === '#1A1A1A' || p.bg === '#2A2A2A'
  const relatedProducts = p.pairsWith
    .map(s => skincareProducts.find(x => x.slug === s))
    .filter(Boolean)

  const { addItem } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)

  // Coming Soon notify form
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifySent, setNotifySent] = useState(false)
  const [notifySending, setNotifySending] = useState(false)

  async function handleAddToCart() {
    addItem({
      slug: p.slug,
      name: p.name,
      size: p.size,
      priceNum: p.priceNum || 0,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  async function handleNotify(e) {
    e.preventDefault()
    if (!notifyEmail.trim()) return
    setNotifySending(true)
    try {
      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'order',
          name: notifyEmail,
          email: notifyEmail,
          products: [`${p.name} — Coming Soon Interest`],
        }),
      })
    } catch (err) {
      console.error('Notify error:', err)
    } finally {
      setNotifySending(false)
      setNotifySent(true)
    }
  }

  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />

      {/* Breadcrumb */}
      <div style={{ paddingTop: '100px', paddingBottom: '16px', borderBottom: '1px solid #141414' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2">
            <Link to="/" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.12em', textDecoration: 'none' }}
              className="uppercase hover:text-[#C9A96E] transition-colors">Home</Link>
            <span style={{ color: '#2A2A2A', fontSize: '11px' }}>·</span>
            <Link to="/skincare" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.12em', textDecoration: 'none' }}
              className="uppercase hover:text-[#C9A96E] transition-colors">Skincare</Link>
            <span style={{ color: '#2A2A2A', fontSize: '11px' }}>·</span>
            <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.12em' }} className="uppercase">{p.shortName}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Product visual */}
            <div style={{ backgroundColor: isDark ? '#111' : p.bg, padding: '80px 60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="text-center">
                <ProductBottle accent={p.accent} label={p.label} large />
                <p style={{ fontFamily: 'Georgia, serif', color: isDark ? '#FAFAF8' : '#1A1A1A', fontSize: '1.1rem', marginTop: '32px', marginBottom: '6px' }}>{p.name}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark ? '#6A6A6A' : '#9A9A9A', fontSize: '11px', letterSpacing: '0.2em' }} className="uppercase">{p.size}</p>
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div style={{ backgroundColor: p.badgeColor, padding: '5px 14px' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '9px', letterSpacing: '0.2em' }} className="uppercase">{p.badge}</span>
                </div>
              </div>

              <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.4rem', lineHeight: '1.15', marginBottom: '10px', letterSpacing: '-0.01em' }}
                className="font-normal">{p.name}</h1>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '11px', letterSpacing: '0.2em', marginBottom: '24px' }}
                className="uppercase">{p.tagline}</p>

              <div style={{ width: '32px', height: '1px', backgroundColor: p.accent, marginBottom: '24px' }}></div>

              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.9', marginBottom: '32px' }}>
                {p.description}
              </p>

              {/* Kit includes */}
              {p.kitIncludes && (
                <div style={{ backgroundColor: '#111', border: `1px solid ${p.accent}22`, padding: '20px 24px', marginBottom: '28px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '9px', letterSpacing: '0.25em', marginBottom: '12px' }} className="uppercase">Kit Includes</p>
                  <ul className="space-y-2">
                    {p.kitIncludes.map(item => (
                      <li key={item} className="flex items-center gap-3">
                        <span style={{ color: p.accent, fontSize: '11px' }}>✔</span>
                        <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price + CTA */}
              {isComingSoon ? (
                <div className="mb-8">
                  <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.2rem', marginBottom: '20px', letterSpacing: '0.05em' }}>
                    Coming Soon — Be the first to know.
                  </p>
                  {!notifySent ? (
                    <form onSubmit={handleNotify} className="flex gap-3 items-stretch">
                      <input type="email" value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}
                        placeholder="Enter your email"
                        style={{
                          flex: 1, padding: '14px 18px', backgroundColor: '#111',
                          border: '1px solid #2A2A2A', color: '#FAFAF8',
                          fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', outline: 'none',
                        }}
                        required />
                      <button type="submit" disabled={notifySending}
                        style={{
                          backgroundColor: '#C9A96E', color: '#000', border: 'none',
                          fontFamily: 'Helvetica Neue, Arial, sans-serif',
                          fontSize: '11px', letterSpacing: '0.15em',
                          padding: '14px 28px', cursor: notifySending ? 'not-allowed' : 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                        className="uppercase hover:opacity-90 transition-opacity">
                        {notifySending ? 'Sending…' : 'Notify Me →'}
                      </button>
                    </form>
                  ) : (
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '14px' }}>
                      You're on the list. We'll let you know when it launches.
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-5 mb-8">
                  <div>
                    {p.originalPrice && (
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', textDecoration: 'line-through' }}>{p.originalPrice}</p>
                    )}
                    <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.2rem' }}>{p.price}</p>
                  </div>
                  <button onClick={handleAddToCart}
                    style={{
                      backgroundColor: addedToCart ? '#5BA87A' : p.accent, color: '#000',
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      fontSize: '12px', letterSpacing: '0.18em',
                      padding: '18px 36px', border: 'none', cursor: 'pointer',
                    }}
                    className="uppercase hover:opacity-90 transition-opacity">
                    {addedToCart ? '✓ Added to Cart' : 'Add to Cart →'}
                  </button>
                  <Link to="/cart"
                    style={{
                      fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '11px',
                      letterSpacing: '0.12em', textDecoration: 'none', borderBottom: '1px solid #2A2A2A', paddingBottom: '2px',
                    }}
                    className="uppercase hover:text-[#C9A96E] transition-colors">
                    View Cart
                  </Link>
                </div>
              )}

              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px' }}>
                Questions? Email <a href="mailto:info@lionelitebeauty.com" style={{ color: '#C9A96E', textDecoration: 'none' }}>info@lionelitebeauty.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What you'll notice + Timeline */}
      <section style={{ backgroundColor: '#080808', padding: '80px 0', borderTop: '1px solid #141414' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: '#141414' }}>

            {/* What You'll Notice */}
            <div style={{ backgroundColor: '#080808', padding: '48px 40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }} className="uppercase">
                What You'll Actually Notice
              </p>
              <ul className="space-y-4">
                {(p.whatYouNotice || p.benefits.map(b => b.title)).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: p.accent, fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>✔</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.7' }}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Results Timeline */}
            {p.timeline && (
              <div style={{ backgroundColor: '#080808', padding: '48px 40px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }} className="uppercase">
                  What to Expect &amp; When
                </p>
                <ol className="space-y-6">
                  {p.timeline.map((t, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div style={{ flexShrink: 0 }}>
                        <div style={{ width: '1px', backgroundColor: `${p.accent}33`, height: i < p.timeline.length - 1 ? '100%' : '0', position: 'absolute', marginLeft: '14px', marginTop: '28px' }}></div>
                        <div style={{ width: '28px', height: '28px', border: `1px solid ${p.accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: 'Georgia, serif', color: p.accent, fontSize: '10px' }}>{i + 1}</span>
                        </div>
                      </div>
                      <div>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '10px', letterSpacing: '0.15em', marginBottom: '4px' }} className="uppercase">{t.period}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.7' }}>{t.result}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      {p.whoItsFor && (
        <section style={{ backgroundColor: '#0A0A0A', padding: '60px 0', borderTop: '1px solid #141414' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div style={{ backgroundColor: '#080808', border: `1px solid ${p.accent}18`, padding: '40px 48px' }}
              className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, letterSpacing: '0.25em', fontSize: '10px', marginBottom: '8px' }} className="uppercase">Who This Is For</p>
                <div style={{ width: '32px', height: '1px', backgroundColor: p.accent }}></div>
              </div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.8' }}>{p.whoItsFor}</p>
            </div>
          </div>
        </section>
      )}

      {/* Details */}
      <section style={{ backgroundColor: '#050505', padding: '80px 0', borderTop: '1px solid #141414' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: '#141414' }}>

            {/* Key Ingredients */}
            <div style={{ backgroundColor: '#080808', padding: '48px 40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }} className="uppercase">
                Key Ingredients
              </p>
              <ul className="space-y-5">
                {p.keyIngredients.map(ing => (
                  <li key={ing.name}>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '14px', marginBottom: '4px' }}>{ing.name}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', lineHeight: '1.6' }}>{ing.role}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div style={{ backgroundColor: '#080808', padding: '48px 40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }} className="uppercase">
                Benefits
              </p>
              <ul className="space-y-5">
                {p.benefits.map(b => (
                  <li key={b.title} className="flex items-start gap-3">
                    <div style={{ width: '5px', height: '5px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0, marginTop: '7px' }}></div>
                    <div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', fontWeight: '500', marginBottom: '3px' }}>{b.title}</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', lineHeight: '1.6' }}>{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Use */}
            <div style={{ backgroundColor: '#080808', padding: '48px 40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }} className="uppercase">
                How to Use
              </p>
              <ol className="space-y-5">
                {p.howToUse.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span style={{ fontFamily: 'Georgia, serif', color: p.accent, fontSize: '1.1rem', flexShrink: 0, lineHeight: '1.4' }}>0{i + 1}</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.7' }}>{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Pairs With */}
      {relatedProducts.length > 0 && (
        <section style={{ backgroundColor: '#0A0A0A', padding: '80px 0', borderTop: '1px solid #141414' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <div style={{ width: '32px', height: '1px', backgroundColor: p.accent }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase">
                Pairs Well With
              </p>
            </div>

            <div className={`grid gap-px grid-cols-${relatedProducts.length > 1 ? '2' : '1'} max-w-2xl`} style={{ backgroundColor: '#1A1A1A' }}>
              {relatedProducts.map(rp => {
                const rpDark = rp.bg === '#1A1A1A' || rp.bg === '#2A2A2A'
                return (
                  <Link key={rp.slug} to={`/skincare/${rp.slug}`}
                    style={{ backgroundColor: '#0A0A0A', padding: '36px', textDecoration: 'none', display: 'block' }}
                    className="group hover:bg-[#0F0F0F] transition-colors">
                    <ProductBottle accent={rp.accent} label={rp.label} />
                    <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '14px', marginTop: '20px', marginBottom: '6px', textAlign: 'center' }}>{rp.name}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: rp.accent, fontSize: '10px', letterSpacing: '0.15em', textAlign: 'center' }} className="uppercase">
                      {rp.price} · {rp.size}
                    </p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: rp.accent, fontSize: '10px', letterSpacing: '0.15em', textAlign: 'center', marginTop: '12px' }}
                      className="uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      View Product →
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back to shop */}
      <section style={{ backgroundColor: '#050505', padding: '48px 0', borderTop: '1px solid #141414' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <Link to="/skincare"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:text-[#C9A96E] transition-colors flex items-center gap-2">
            ← Back to All Products
          </Link>
          <a href="mailto:info@lionelitebeauty.com"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:opacity-70 transition-opacity">
            Questions? Contact Us →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}