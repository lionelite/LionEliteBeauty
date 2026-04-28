import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Step({ number, title, desc, accent = '#C9A96E' }) {
  return (
    <div className="flex items-start gap-5">
      <div style={{ width: '40px', height: '40px', border: `1px solid ${accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: 'Georgia, serif', color: accent, fontSize: '13px' }}>{number}</span>
      </div>
      <div>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>{title}</p>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.8' }}>{desc}</p>
      </div>
    </div>
  )
}

export default function StartHerePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#080808', paddingTop: '140px', paddingBottom: '80px', borderBottom: '1px solid #141414' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px' }}
            className="uppercase mb-5">New to Peptide Skincare?</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3rem', lineHeight: '1.12', letterSpacing: '-0.02em' }}
            className="font-normal mb-6">
            Start here. Everything<br />you need to know.
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '16px', lineHeight: '1.9', maxWidth: '520px', margin: '0 auto' }}>
            You don't need to understand every ingredient. You just need to know what it does, whether it works, and where to begin. This page answers all three.
          </p>
        </div>
      </section>

      {/* Section 1 — What is GHK-Cu */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                className="uppercase">Section 01</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.2', marginBottom: '20px' }}
                className="font-normal">
                What is GHK-Cu?
              </h2>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '15px', lineHeight: '1.9', marginBottom: '20px' }}>
                GHK-Cu (Glycyl-L-Histidyl-L-Lysine copper) is a naturally occurring peptide found in human blood, saliva, and urine — your body already produces it. Its job is to signal your skin to repair itself.
              </p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '15px', lineHeight: '1.9', marginBottom: '20px' }}>
                The problem? As you age, GHK-Cu levels in your body drop — and so does your skin's ability to regenerate naturally. That's where Lion Elite Beauty comes in.
              </p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '15px', lineHeight: '1.9' }}>
                By applying GHK-Cu topically at clinical concentrations, you give your skin back the signal it's been missing.
              </p>
            </div>

            <div style={{ backgroundColor: '#080808', border: '1px solid #141414', padding: '40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '9px', letterSpacing: '0.25em', marginBottom: '24px' }} className="uppercase">
                The Short Version
              </p>
              <div className="space-y-5">
                {[
                  { q: 'Is it natural?', a: 'Yes — your body already makes it. We\'re just supplementing what age takes away.' },
                  { q: 'Is it safe?', a: 'Extensively studied. No known side effects at cosmetic concentrations. Suitable for all skin types.' },
                  { q: 'Is it just another peptide trend?', a: 'No. GHK-Cu has been studied since the 1970s. It\'s one of the most researched peptides in dermatology.' },
                  { q: 'Why isn\'t every brand using it?', a: 'Cost and concentration. Most brands add trace amounts for marketing. We formulate at levels that actually work.' },
                ].map(item => (
                  <div key={item.q} style={{ borderBottom: '1px solid #141414', paddingBottom: '20px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '6px' }}>{item.q}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.7' }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — What it does */}
      <section style={{ backgroundColor: '#050505', padding: '80px 0', borderBottom: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
              className="uppercase">Section 02</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.2' }}
              className="font-normal mb-4">
              What does it actually do to your skin?
            </h2>
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 20px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '15px', lineHeight: '1.8', maxWidth: '520px', margin: '0 auto' }}>
              Not marketing language. Just what the science shows — in plain terms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: '#141414' }}>
            {[
              { result: 'Reduces fine lines', how: 'GHK-Cu activates genes responsible for collagen and elastin — the proteins that keep skin firm and smooth.' },
              { result: 'Improves skin texture', how: 'Accelerates skin cell turnover so newer, healthier cells reach the surface faster.' },
              { result: 'Firms and tightens', how: 'Stimulates structural proteins that give skin density and resistance to sagging.' },
              { result: 'Repairs damage', how: 'Shown to support recovery from UV exposure, environmental stress, and aging-related breakdown.' },
              { result: 'Calms inflammation', how: 'Anti-inflammatory properties reduce redness and irritation at a cellular level.' },
              { result: 'Brightens skin tone', how: 'Improved cell renewal and reduced inflammation combine to produce more even, radiant skin.' },
            ].map(item => (
              <div key={item.result} style={{ backgroundColor: '#080808', padding: '36px 32px' }}>
                <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%', marginBottom: '16px' }}></div>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1rem', marginBottom: '10px' }}>{item.result}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.7' }}>{item.how}</p>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#080808', border: '1px solid #C9A96E22', padding: '32px 40px', marginTop: '1px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.7' }}>
              "GHK-Cu activates over <span style={{ color: '#C9A96E' }}>4,000 genes</span> involved in skin repair — including collagen synthesis, anti-inflammatory pathways, and cellular regeneration."
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Your first routine */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                className="uppercase">Section 03</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.2', marginBottom: '20px' }}
                className="font-normal">
                Your first routine.<br />Keep it simple.
              </h2>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '15px', lineHeight: '1.9', marginBottom: '32px' }}>
                You don't need to start with everything. The most effective approach is to build the habit first, then layer in more. Here's the exact routine to start with:
              </p>
              <div className="space-y-6">
                <Step number="01" title="Cleanse — GHK-Cu Peptide Face Wash"
                  desc="Morning and evening. Removes congestion, activates your skin's repair signal from the first step, and primes your skin to absorb what follows." />
                <Step number="02" title="Treat — Regenerating Peptide Serum"
                  desc="2–3 drops, pressed gently into clean skin. This is the core product. The one that does the most work — reducing fine lines, firming, repairing." />
                <Step number="03" title="Protect — KPV Recovery Moisturizer"
                  desc="Seal everything in. Calm any redness. Strengthen your barrier. In the morning, follow with an SPF of your choice." />
              </div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '12px', letterSpacing: '0.15em', marginTop: '28px' }} className="uppercase">
                Expect to notice a difference in 2–4 weeks of consistent use.
              </p>
            </div>

            {/* Product cards */}
            <div className="space-y-px" style={{ backgroundColor: '#141414' }}>
              {[
                { name: 'GHK-Cu Peptide Face Wash', price: '$69.99', size: '150ml', slug: 'ghk-cu-face-wash', accent: '#C9A96E', tag: 'Start Here' },
                { name: 'Regenerating Peptide Serum', price: '$119.99', size: '30ml', slug: 'peptide-serum', accent: '#8A9E85', tag: 'Core Product' },
                { name: 'KPV Recovery Moisturizer', price: '$79.99', size: '50ml', slug: 'kpv-moisturizer', accent: '#8A7AB0', tag: 'Protect & Seal' },
              ].map(prod => (
                <div key={prod.slug} style={{ backgroundColor: '#080808', padding: '28px 32px' }}
                  className="flex items-center justify-between gap-4">
                  <div>
                    <div style={{ backgroundColor: prod.accent, padding: '3px 10px', display: 'inline-block', marginBottom: '10px' }}>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#000', fontSize: '8px', letterSpacing: '0.2em' }} className="uppercase">{prod.tag}</span>
                    </div>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '15px', marginBottom: '4px' }}>{prod.name}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '11px' }}>{prod.price} · {prod.size}</p>
                  </div>
                  <Link to={`/skincare/${prod.slug}`}
                    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: prod.accent, fontSize: '10px', letterSpacing: '0.15em', textDecoration: 'none', flexShrink: 0 }}
                    className="uppercase hover:opacity-70 transition-opacity">
                    View →
                  </Link>
                </div>
              ))}

              {/* Bundle offer */}
              <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #C9A96E22', padding: '28px 32px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '9px', letterSpacing: '0.25em', marginBottom: '8px' }} className="uppercase">Best Value</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '15px', marginBottom: '4px' }}>Daily Essentials Duo</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '12px', marginBottom: '16px' }}>
                  Face Wash + Peptide Serum · <span style={{ textDecoration: 'line-through' }}>$189.99</span> →{' '}
                  <span style={{ color: '#C9A96E' }}>$159.99</span>
                </p>
                <Link to="/skincare"
                  style={{
                    display: 'inline-block', backgroundColor: '#C9A96E', color: '#000',
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: '10px', letterSpacing: '0.18em',
                    padding: '12px 24px', textDecoration: 'none',
                  }}
                  className="uppercase hover:opacity-90 transition-opacity">
                  Shop the Bundle →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: '#050505', padding: '80px 0' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
            className="uppercase">Ready to Start?</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.2rem', lineHeight: '1.15', marginBottom: '20px' }}
            className="font-normal">
            The best skincare decision<br />you'll make is simply starting.
          </h2>
          <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '15px', lineHeight: '1.9', maxWidth: '440px', margin: '0 auto 36px' }}>
            Pick the starter routine. Use it consistently. You'll see the difference in your skin within weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/skincare"
              style={{
                backgroundColor: '#C9A96E', color: '#000',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '12px', letterSpacing: '0.18em',
                padding: '18px 48px', textDecoration: 'none',
              }}
              className="uppercase hover:opacity-90 transition-opacity">
              Shop Skincare →
            </Link>
            <Link to="/skincare/peptide-serum"
              style={{
                border: '1px solid #2A2A2A', color: '#5A5A5A',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '12px', letterSpacing: '0.18em',
                padding: '18px 36px', textDecoration: 'none',
              }}
              className="uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
              View Flagship Serum
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
