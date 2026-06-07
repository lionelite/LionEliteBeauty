import { Link } from 'react-router-dom'

const steps = [
  {
    step: '01',
    label: 'Cleanse',
    product: 'GHK-Cu Peptide Face Wash',
    slug: 'ghk-cu-face-wash',
    accent: '#C9A96E',
    when: 'Morning & Evening',
    micro: 'Helps nourish and support skin. Primes for better serum absorption.',
  },
  {
    step: '02',
    label: 'Treat',
    product: 'Rejuvenate Serum',
    slug: 'rejuvenate-serum',
    accent: '#8A9E85',
    when: 'Morning & Evening',
    micro: 'Supports the appearance of smoother, firmer skin. Helps nourish at depth.',
  },
  {
    step: '03',
    label: 'Protect',
    product: 'KPV Recovery Moisturizer',
    slug: 'kpv-moisturizer',
    accent: '#8A7AB0',
    when: 'Morning (+ SPF) & Evening',
    micro: 'Helps nourish and seal. Supports the appearance of a calm, comfortable complexion.',
  },
]

export default function RoutineSection() {
  return (
    <section style={{ backgroundColor: '#050505', padding: '100px 0', borderTop: '1px solid #0F0F0F' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 items-end mb-16">
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }}
              className="uppercase">Your Daily Routine</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.4rem', lineHeight: '1.15', letterSpacing: '-0.01em' }}
              className="font-normal">
              Three steps.<br />Every day.<br />Real results.
            </h2>
          </div>
          <div>
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '20px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '15px', lineHeight: '1.9' }}>
              You don't need ten products. You need the right three — in the right order. This is the Lion Elite Beauty core routine: cleanse, treat, protect. Simple enough to do every day. Powerful enough to change your skin.
            </p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '12px', letterSpacing: '0.15em', marginTop: '20px' }}
              className="uppercase">
              Visible difference in 2–4 weeks with consistent use.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: '#141414' }}>
          {steps.map((s) => (
            <div key={s.step} style={{ backgroundColor: '#080808', padding: '48px 40px' }}>

              {/* Step number */}
              <div className="flex items-center gap-4 mb-8">
                <div style={{ width: '40px', height: '40px', border: `1px solid ${s.accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Georgia, serif', color: s.accent, fontSize: '13px' }}>{s.step}</span>
                </div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: s.accent, letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase">{s.label}</p>
              </div>

              {/* Bottle icon */}
              <div style={{
                width: '48px', height: '76px', backgroundColor: s.accent,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', position: 'relative', marginBottom: '28px',
              }}>
                <div style={{ position: 'absolute', top: '-5px', width: '20px', height: '7px', backgroundColor: s.accent, opacity: 0.6 }}></div>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FFF', fontSize: '5px', letterSpacing: '0.1em', textAlign: 'center', lineHeight: '2', opacity: 0.9 }}>LION<br />ELITE</p>
              </div>

              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.3', marginBottom: '8px' }}>
                {s.product}
              </p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '20px' }} className="uppercase">
                {s.when}
              </p>

              <div style={{ width: '24px', height: '1px', backgroundColor: s.accent, marginBottom: '16px' }}></div>

              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.7', marginBottom: '28px' }}>
                {s.micro}
              </p>

              <Link to={`/skincare/${s.slug}`}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: s.accent, fontSize: '10px', letterSpacing: '0.18em', textDecoration: 'none' }}
                className="uppercase hover:opacity-70 transition-opacity">
                View Product →
              </Link>
            </div>
          ))}
        </div>

        {/* Advanced night step */}
        <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #141414', marginTop: '1px', padding: '32px 40px' }}
          className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.25em', marginBottom: '6px' }} className="uppercase">Evening Add-On</p>
            <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', marginBottom: '4px' }}>Collagen Boost Face Cream</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px' }}>
              Apply after serum, before moisturizer — supports the appearance of firmer, more nourished skin while you sleep.
            </p>
          </div>
          <Link to="/skincare/collagen-boost-cream"
            style={{
              border: '1px solid #C9A96E44', color: '#C9A96E',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: '10px', letterSpacing: '0.18em',
              padding: '12px 24px', textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            className="uppercase hover:bg-[#C9A96E11] transition-colors">
            Add to Routine →
          </Link>
        </div>

        {/* Shop CTA */}
        <div className="text-center mt-16">
          <Link to="/skincare"
            style={{
              backgroundColor: '#C9A96E', color: '#000',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: '12px', letterSpacing: '0.18em',
              padding: '18px 48px', textDecoration: 'none',
              display: 'inline-block',
            }}
            className="uppercase hover:opacity-90 transition-opacity">
            Shop the Full Routine →
          </Link>
        </div>
      </div>
    </section>
  )
}
