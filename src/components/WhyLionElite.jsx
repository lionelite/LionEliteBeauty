const pillars = [
  {
    number: '01',
    icon: '🔬',
    title: 'Science-Driven',
    description: 'Every product and protocol is grounded in peer-reviewed peptide research. GHK-Cu is one of the most studied copper peptides in dermatology — and we use clinical concentrations.',
    accent: '#C9A96E',
  },
  {
    number: '02',
    icon: '◎',
    title: 'Personalized Care',
    description: 'No generic regimens. Your skin history, treatment goals, and lifestyle inform every recommendation. We build protocols around your biology, not a shelf.',
    accent: '#8A9E85',
  },
  {
    number: '03',
    icon: '★',
    title: 'Real Results',
    description: 'Measurable improvements backed by before & after documentation. We track collagen markers, skin hydration, and texture to show you progress — not just tell you.',
    accent: '#C9A96E',
  },
]

const stats = [
  { value: '10+', label: 'Years Clinical Experience' },
  { value: 'GHK-Cu', label: 'Core Peptide Technology' },
  { value: '98%', label: 'Client Retention Rate' },
  { value: '500+', label: 'Procedures Performed' },
]

export default function WhyLionElite() {
  return (
    <section id="about" style={{ backgroundColor: '#FFFFFF', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Row */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          {/* Left */}
          <div>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
              className="text-xs uppercase tracking-widest mb-5">
              Why Choose Us
            </p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2', letterSpacing: '-0.01em' }}
              className="font-normal mb-6">
              Where Clinical<br />Science Meets<br />
              <span style={{ color: '#C9A96E' }}>Refined Beauty</span>
            </h2>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.9', maxWidth: '440px' }}>
              Lion Elite Beauty is the skincare arm of Lion Elite Wellness — a medically supervised practice specializing in peptide therapeutics and aesthetic medicine. Our products are formulated to clinical standards, not cosmetic minimums.
            </p>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} style={{ backgroundColor: '#F5F0E8', padding: '36px 28px' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2rem', letterSpacing: '-0.02em' }}
                  className="mb-2">{value}</p>
                <div style={{ width: '24px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '12px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.12em' }}
                  className="uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} style={{ borderTop: `3px solid ${pillar.accent}`, paddingTop: '32px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#D0D0D0', fontSize: '11px', letterSpacing: '0.2em' }}
                className="uppercase tracking-widest mb-4">{pillar.number}</p>
              <h3 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.4rem' }}
                className="font-normal mb-4">{pillar.title}</h3>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8' }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Statement */}
        <div style={{ backgroundColor: '#F5F0E8', padding: '60px', marginTop: '80px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.3em' }}
            className="uppercase tracking-widest mb-4">Our Promise</p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.5rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto', letterSpacing: '0.02em' }}>
            "We believe beautiful skin is an outcome of science — not guesswork. Every formulation, every treatment, every protocol reflects our commitment to clinical integrity."
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', marginTop: '24px' }}
            className="uppercase tracking-wider">
            — Lion Elite Wellness Medical Team
          </p>
        </div>
      </div>
    </section>
  )
}
