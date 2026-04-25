import { Link } from 'react-router-dom'

// Pricing section — all four programs
export default function Testimonials() {
  const programs = [
    {
      id: 'body',
      eyebrow: 'Muscle & Recovery',
      name: 'Lion Elite Muscle & Recovery Program',
      price: '$1,000',
      priceNote: 'One-Time Investment',
      accent: '#C9A96E',
      href: '/programs/optimization',
      includes: [
        'Full performance & recovery biomarker kit (shipped to you)',
        'Complete data analysis & breakdown',
        'Personalized muscle & recovery strategy',
        '1-on-1 coaching + implementation guidance',
        'Strength, performance & recovery insights',
        'Ongoing recommendations',
      ],
      cta: '👉 Apply / Get Started Now',
    },
    {
      id: 'neuro',
      eyebrow: 'Neuro Optimization',
      name: 'Lion Elite Neuro Program',
      price: 'Premium Access',
      priceNote: 'Apply for Availability',
      accent: '#8A9E85',
      href: '/programs/neuro',
      includes: [
        'Baseline cognitive & biomarker assessment',
        'Neuro optimization strategy framework',
        'Guided implementation — step by step',
        'Advanced neuro-support pathway access',
        'Trusted resources & structured frameworks',
        'Preferred client-level opportunities',
      ],
      cta: '👉 Apply / Get Started Now',
    },
    {
      id: 'fertility',
      eyebrow: 'Fertility Optimization',
      name: 'Lion Elite Fertility Program',
      price: 'Premium Access',
      priceNote: 'Apply for Availability',
      accent: '#B8A4D4',
      href: '/programs/fertility',
      includes: [
        'Fertility biomarker testing & assessment',
        'Hormonal balance analysis',
        'Personalized fertility optimization strategy',
        'Guided implementation support',
        'Advanced fertility support pathways',
        'Preferred client-level opportunities',
      ],
      cta: '👉 Apply / Get Started Now',
    },
    {
      id: 'hair',
      eyebrow: 'Hair Optimization',
      name: 'Lion Elite Hair Program',
      price: 'Premium Access',
      priceNote: 'Apply for Availability',
      accent: '#C4A265',
      href: '/programs/hair',
      includes: [
        'Hair & health assessment',
        'Personalized hair optimization strategy',
        'Scalp & follicle support framework',
        'Guided implementation step by step',
        'Advanced hair-support pathway access',
        'Preferred client-level opportunities',
      ],
      cta: '👉 Apply / Get Started Now',
    },
    {
      id: 'weight',
      eyebrow: 'Weight Optimization',
      name: 'Lion Elite Weight Program',
      price: 'Premium Access',
      priceNote: 'Apply for Availability',
      accent: '#5BA87A',
      href: '/programs/weight',
      includes: [
        'Metabolic & biomarker assessment',
        'Personalized weight optimization strategy',
        'Appetite & fat metabolism framework',
        'Guided implementation step by step',
        'Advanced metabolic pathway access',
        'Preferred client-level opportunities',
      ],
      cta: '👉 Apply / Get Started Now',
    },
    {
      id: 'longevity',
      eyebrow: 'Longevity & Anti-Aging',
      name: 'Lion Elite Longevity Program',
      price: 'Premium Access',
      priceNote: 'Apply for Availability',
      accent: '#7A9FBF',
      href: '/programs/longevity',
      includes: [
        'Longevity & recovery biomarker assessment',
        'Cellular health & inflammation analysis',
        'Personalized longevity optimization strategy',
        'Guided implementation step by step',
        'Advanced cellular repair pathway access',
        'Preferred client-level opportunities',
      ],
      cta: '👉 Apply / Get Started Now',
    },
  ]

  return (
    <section id="pricing" style={{ backgroundColor: '#0D0D0D', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }}
            className="uppercase mb-4">Investment</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">
            Choose Your<br />
            <span style={{ color: '#C9A96E' }}>Optimization Path</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
        </div>

        {/* 4 program cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-20">
          {programs.map(p => (
            <div key={p.id} style={{ backgroundColor: '#161616', border: `1px solid ${p.accent}28`, display: 'flex', flexDirection: 'column' }}>
              <div style={{ backgroundColor: '#1A1A1A', padding: '28px 24px 22px', borderBottom: `1px solid ${p.accent}18`, textAlign: 'center' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '9px', letterSpacing: '0.3em', marginBottom: '10px' }}
                  className="uppercase">{p.eyebrow}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '0.9rem', lineHeight: '1.4', marginBottom: '14px' }}>{p.name}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: p.accent, fontSize: p.id === 'body' ? '2.8rem' : '1.2rem', lineHeight: '1', letterSpacing: '-0.01em' }}>
                  {p.price}
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '9px', marginTop: '6px', letterSpacing: '0.15em' }}>
                  {p.priceNote}
                </p>
              </div>
              <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '9px', letterSpacing: '0.25em', marginBottom: '14px' }}
                  className="uppercase">Includes</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.includes.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: p.accent, fontSize: '11px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', lineHeight: '1.5' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to={p.href}
                  style={{
                    display: 'block',
                    backgroundColor: p.accent,
                    color: '#FFFFFF',
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    padding: '14px',
                    textAlign: 'center',
                    textDecoration: 'none',
                  }}
                  className="uppercase hover:opacity-90 transition-opacity">
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '10px', letterSpacing: '0.3em', textAlign: 'center', marginBottom: '40px' }}
            className="uppercase">What Clients Say</p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { quote: 'This showed me what my body actually needed. First time I had a real roadmap instead of just guessing.', name: 'J. Thornton', detail: 'Muscle & Recovery Client', accent: '#C9A96E' },
              { quote: "First time I wasn't guessing with my supplements and protocols. The data changed everything for me.", name: 'M. Rodriguez', detail: 'Muscle & Recovery Client', accent: '#C9A96E' },
            ].map((t) => (
              <div key={t.name} style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E', padding: '36px' }}>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: t.accent, fontSize: '13px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: 'Georgia, serif', color: '#CACACA', fontSize: '0.95rem', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '24px' }}>
                  "{t.quote}"
                </p>
                <div style={{ width: '28px', height: '1px', backgroundColor: t.accent, marginBottom: '16px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px' }}>{t.name}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', letterSpacing: '0.12em', marginTop: '4px' }}
                  className="uppercase">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
