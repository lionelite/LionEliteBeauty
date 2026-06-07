import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const steps = [
  {
    number: '01',
    action: 'Cleanse',
    directive: 'Use every morning and evening. Non-negotiable.',
    product: 'GHK-Cu Peptide Face Wash',
    slug: 'ghk-cu-face-wash',
    price: '$69.99',
    size: '150ml',
    accent: '#C9A96E',
    key: 'GHK-Cu Peptide Complex',
    instruction: 'Wet face. Massage in for 30–60 seconds. Rinse. Done.',
    why: 'This is where the system starts. The GHK-Cu in the wash primes your skin to absorb what comes next. Skip it and you\'re wasting your serum.',
  },
  {
    number: '02',
    action: 'Treat',
    directive: 'Apply morning and evening to clean, dry skin.',
    product: 'Rejuvenate Serum',
    slug: 'rejuvenate-serum',
    price: '$119.99',
    size: '30ml',
    accent: '#8A9E85',
    key: 'GHK-Cu · Niacinamide · Hyaluronic Acid (3 weights)',
    instruction: '2–3 drops. Press in with fingertips. Don\'t rub. Wait 60 seconds.',
    why: 'This is the core of the system. GHK-Cu + Niacinamide + three-weight Hyaluronic Acid — working together to visibly support skin firmness, tone, and hydration in one step.',
  },
  {
    number: '03',
    action: 'Protect',
    directive: 'Apply morning and evening as the final step.',
    product: 'KPV Recovery Moisturizer',
    slug: 'kpv-moisturizer',
    price: '$79.99',
    size: '50ml',
    accent: '#8A7AB0',
    key: 'KPV Peptide · Centella Asiatica · Beta-Glucan',
    instruction: 'Small amount. Press gently into face and neck. Follow with SPF in the morning.',
    why: 'Locks everything in. KPV calms while Centella Asiatica and Beta-Glucan nourish — so your skin barrier is supported all day and overnight.',
  },
]

export default function SkinSystemPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#080808', paddingTop: '140px', paddingBottom: '80px', borderBottom: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-end">
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '20px' }}
                className="uppercase">The Complete System</p>
              <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.4rem', lineHeight: '1.1', letterSpacing: '-0.02em' }}
                className="font-normal mb-8">
                The Lion Elite<br />Skin System.
              </h1>
              <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '28px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '17px', lineHeight: '1.85' }}>
                A simple, peptide-powered daily routine designed to visibly improve skin appearance — not just hydrate it. Three products. Every day. Real results.
              </p>
            </div>
            <div>
              {/* Stats strip */}
              <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: '#141414' }}>
                {[
                  { stat: '3', label: 'Products in the system' },
                  { stat: '2×', label: 'Daily — morning & evening' },
                  { stat: '2–4', label: 'Weeks to visible difference' },
                  { stat: '5', label: 'Core active ingredients' },
                ].map(s => (
                  <div key={s.label} style={{ backgroundColor: '#0A0A0A', padding: '28px 24px' }}>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '2rem', marginBottom: '6px' }}>{s.stat}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.1em', lineHeight: '1.5' }} className="uppercase">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* This is for you if */}
      <section style={{ backgroundColor: '#050505', padding: '80px 0', borderBottom: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '20px' }}
                className="uppercase">Is This For You?</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.2rem', lineHeight: '1.15' }}
                className="font-normal">
                This system was built<br />for people who are done<br />guessing at their skincare.
              </h2>
            </div>
            <div>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '28px' }}></div>
              <div className="space-y-5">
                {[
                  'You\'ve tried products that felt good but never actually changed your skin.',
                  'You want a routine that\'s simple enough to do twice a day — without the 7-step complexity.',
                  'Your skin is showing early signs of aging, loss of firmness, or uneven tone.',
                  'You\'re post-procedure and want to protect what you invested in.',
                  'You want to understand what\'s in your skincare — and why it\'s there.',
                  'You\'re done with filler ingredients and want something that actually performs.',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span style={{ color: '#C9A96E', fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>→</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.75' }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3-Step System */}
      <section style={{ backgroundColor: '#080808', padding: '80px 0', borderBottom: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-16">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }}
              className="uppercase">The Daily Routine</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.4rem', lineHeight: '1.1' }}
              className="font-normal">
              Three steps. Use daily.<br />Don't skip either session.
            </h2>
          </div>

          <div className="space-y-px" style={{ backgroundColor: '#141414' }}>
            {steps.map((s) => (
              <div key={s.number} style={{ backgroundColor: '#080808' }}>
                <div className="grid md:grid-cols-5 gap-0">

                  {/* Step marker */}
                  <div style={{ padding: '48px 40px', borderRight: '1px solid #111', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <div style={{ width: '52px', height: '52px', border: `1px solid ${s.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                      <span style={{ fontFamily: 'Georgia, serif', color: s.accent, fontSize: '16px' }}>{s.number}</span>
                    </div>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: s.accent, letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase">{s.action}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '11px', marginTop: '8px', lineHeight: '1.6' }}>{s.directive}</p>
                  </div>

                  {/* Product info */}
                  <div className="md:col-span-2" style={{ padding: '48px 40px', borderRight: '1px solid #111' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '10px', letterSpacing: '0.18em', marginBottom: '12px' }} className="uppercase">Product</p>
                    <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.3rem', lineHeight: '1.3', marginBottom: '10px' }}>
                      {s.product}
                    </h3>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: s.accent, fontSize: '10px', letterSpacing: '0.12em', marginBottom: '16px' }} className="uppercase">{s.key}</p>
                    <div style={{ width: '24px', height: '1px', backgroundColor: s.accent, marginBottom: '16px' }}></div>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', marginBottom: '20px' }}>{s.price} · {s.size}</p>
                    <Link to={`/skincare/${s.slug}`}
                      style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: s.accent, fontSize: '10px', letterSpacing: '0.15em', textDecoration: 'none' }}
                      className="uppercase hover:opacity-70 transition-opacity">
                      View Product →
                    </Link>
                  </div>

                  {/* How to use */}
                  <div style={{ padding: '48px 40px', borderRight: '1px solid #111' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '10px', letterSpacing: '0.18em', marginBottom: '12px' }} className="uppercase">How to Use It</p>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '14px', lineHeight: '1.7', fontStyle: 'italic' }}>
                      "{s.instruction}"
                    </p>
                  </div>

                  {/* Why it's there */}
                  <div style={{ padding: '48px 40px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '10px', letterSpacing: '0.18em', marginBottom: '12px' }} className="uppercase">Why It's Here</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.85' }}>{s.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Evening add-on */}
          <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #141414', marginTop: '1px', padding: '36px 40px' }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ backgroundColor: '#C9A96E', padding: '4px 12px' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#000', fontSize: '8px', letterSpacing: '0.2em' }} className="uppercase">Evening Upgrade</span>
                </div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '10px', letterSpacing: '0.15em' }} className="uppercase">Optional · Highly Recommended</p>
              </div>
              <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.2rem', marginBottom: '10px' }}>Add the Collagen Boost Face Cream on evenings.</h3>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '14px', lineHeight: '1.8', maxWidth: '560px' }}>
                Apply after your serum, before moisturizer. Matrixyl 3000 + GHK-Cu + Ceramides work overnight while you sleep — supporting the appearance of firmer, more nourished skin by morning. This is the full system.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 flex-shrink-0">
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.3rem' }}>$99.99 <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px' }}>· 50ml</span></p>
              <Link to="/skincare/collagen-boost-cream"
                style={{ border: '1px solid #C9A96E44', color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.18em', padding: '12px 24px', textDecoration: 'none' }}
                className="uppercase hover:bg-[#C9A96E11] transition-colors">
                Add to Your System →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section style={{ backgroundColor: '#050505', padding: '80px 0', borderBottom: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-16">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }}
              className="uppercase">Set Your Expectations</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.4rem', lineHeight: '1.1' }}
              className="font-normal">
              Here's what you'll notice<br />— and when.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: '#141414' }}>
            {[
              {
                period: 'Days 1–7',
                headline: 'Your skin starts responding.',
                points: [
                  'Skin feels cleaner and more comfortable after the wash',
                  'Serum absorbs quickly — no greasiness or residue',
                  'Skin feels noticeably more hydrated within days',
                  'No adjustment period — the system is designed to be tolerated from day one',
                ],
                accent: '#C9A96E',
              },
              {
                period: 'Weeks 2–4',
                headline: 'The visible difference begins.',
                points: [
                  'Skin texture may appear smoother and more refined',
                  'Tone may appear more even — less dull, more radiant',
                  'Fine lines may appear less pronounced with consistent use',
                  'Skin feels more resilient — less reactive to environment',
                ],
                accent: '#8A9E85',
              },
              {
                period: 'Month 2 and beyond',
                headline: 'This is where it compounds.',
                points: [
                  'Skin may appear firmer and more supported with sustained daily use',
                  'The results of consistent peptide use build over time — not overnight',
                  'The system becomes a habit — most users report not wanting to stop',
                  'This is what real, long-term skin support looks like',
                ],
                accent: '#8A7AB0',
              },
            ].map(t => (
              <div key={t.period} style={{ backgroundColor: '#080808', padding: '48px 40px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: t.accent, fontSize: '10px', letterSpacing: '0.25em', marginBottom: '12px' }} className="uppercase">{t.period}</p>
                <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.4', marginBottom: '24px' }}>{t.headline}</h3>
                <div style={{ width: '24px', height: '1px', backgroundColor: t.accent, marginBottom: '20px' }}></div>
                <ul className="space-y-4">
                  {t.points.map(p => (
                    <li key={p} className="flex items-start gap-3">
                      <span style={{ color: t.accent, fontSize: '11px', flexShrink: 0, marginTop: '3px' }}>✔</span>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7' }}>{p}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #141414', marginTop: '1px', padding: '28px 40px' }}
            className="flex items-center gap-4">
            <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%', flexShrink: 0 }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7' }}>
              Results vary by individual. Consistent daily use — morning and evening — is required to see the full effect of the system. Most users begin noticing a difference within 2–4 weeks.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#080808', padding: '100px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">

            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '20px' }}
                className="uppercase">Start Today</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.6rem', lineHeight: '1.1', marginBottom: '24px' }}
                className="font-normal">
                Start your skin system.<br />Use it daily.<br />Watch it work.
              </h2>
              <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '28px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '15px', lineHeight: '1.9', marginBottom: '36px', maxWidth: '440px' }}>
                Most people try this system for two weeks and never go back. Pick up the three core products and start tonight.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/skincare"
                  style={{ backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '18px 40px', textDecoration: 'none', textAlign: 'center' }}
                  className="uppercase hover:opacity-90 transition-opacity">
                  Shop the System →
                </Link>
                <Link to="/ingredients"
                  style={{ border: '1px solid #2A2A2A', color: '#CACACA', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em', padding: '18px 32px', textDecoration: 'none', textAlign: 'center' }}
                  className="uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
                  See What's Inside
                </Link>
              </div>
            </div>

            {/* Included products */}
            <div className="space-y-px" style={{ backgroundColor: '#141414' }}>
              {[
                { step: '01 · Cleanse', name: 'GHK-Cu Peptide Face Wash', price: '$69.99', size: '150ml', slug: 'ghk-cu-face-wash', accent: '#C9A96E' },
                { step: '02 · Treat', name: 'Rejuvenate Serum', price: '$119.99', size: '30ml', slug: 'rejuvenate-serum', accent: '#8A9E85' },
                { step: '03 · Protect', name: 'KPV Recovery Moisturizer', price: '$79.99', size: '50ml', slug: 'kpv-moisturizer', accent: '#8A7AB0' },
                { step: 'Evening Upgrade', name: 'Collagen Boost Face Cream', price: '$99.99', size: '50ml', slug: 'collagen-boost-cream', accent: '#C9A96E' },
              ].map(p => (
                <div key={p.slug} style={{ backgroundColor: '#080808', padding: '24px 32px' }}
                  className="flex items-center justify-between gap-4">
                  <div>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '6px' }} className="uppercase">{p.step}</p>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '14px' }}>{p.name}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '11px', marginTop: '4px' }}>{p.price} · {p.size}</p>
                  </div>
                  <Link to={`/skincare/${p.slug}`}
                    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '10px', letterSpacing: '0.15em', textDecoration: 'none', flexShrink: 0 }}
                    className="uppercase hover:opacity-70 transition-opacity">
                    View →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
