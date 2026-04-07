const pillars = [
  {
    number: '01',
    title: 'Science-Driven',
    description: 'Every formulation is grounded in peer-reviewed peptide research. GHK-Cu is one of the most studied copper peptides in dermatology — and we use clinical concentrations, not cosmetic minimums.',
    accent: '#C9A96E',
  },
  {
    number: '02',
    title: 'Personalized Results',
    description: 'Use each product individually or follow our layered protocol system — designed to work together for synergistic peptide delivery and maximum anti-aging benefit.',
    accent: '#8A9E85',
  },
  {
    number: '03',
    title: 'Real Outcomes',
    description: 'Measurable improvements in texture, firmness, and radiance — documented by real users and supported by the clinical data behind GHK-Cu peptide technology.',
    accent: '#C9A96E',
  },
]

const stats = [
  { value: 'GHK-Cu', label: 'Core Peptide Technology' },
  { value: '4,000+', label: 'Genes Activated by GHK-Cu' },
  { value: 'Clean', label: 'Formulation Standard' },
  { value: 'Medical', label: 'Grade Concentrations' },
]

export default function WhyLionElite() {
  return (
    <section id="about" style={{ backgroundColor: '#FFFFFF', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
              className="text-xs uppercase tracking-widest mb-5">Why Lion Elite Beauty</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2' }}
              className="font-normal mb-6">
              Clinical Standards.<br />
              <span style={{ color: '#C9A96E' }}>Home Convenience.</span>
            </h2>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.9', maxWidth: '440px' }}>
              Lion Elite Beauty is the product line of Lion Elite Wellness — formulated by the same clinical team, held to the same standards. We believe clinical-grade skincare shouldn't require a clinic visit.
            </p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', fontSize: '14px', lineHeight: '1.9', maxWidth: '440px', marginTop: '16px' }}>
              Our GHK-Cu formulations bring the peptide science used in medical aesthetic treatments directly into your daily routine.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} style={{ backgroundColor: '#F5F0E8', padding: '36px 28px' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.6rem', letterSpacing: '-0.02em' }} className="mb-2">{value}</p>
                <div style={{ width: '24px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '12px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.12em' }}
                  className="uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} style={{ borderTop: `3px solid ${pillar.accent}`, paddingTop: '32px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#D0D0D0', fontSize: '11px', letterSpacing: '0.2em' }}
                className="uppercase mb-4">{pillar.number}</p>
              <h3 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.4rem' }} className="font-normal mb-4">{pillar.title}</h3>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8' }}>{pillar.description}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5F0E8', padding: '60px', marginTop: '80px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.3em' }} className="uppercase mb-4">Our Commitment</p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.5rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto', letterSpacing: '0.02em' }}>
            "Beautiful skin is an outcome of science — not guesswork. Every Lion Elite Beauty formulation reflects the clinical integrity of Lion Elite Wellness."
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', marginTop: '24px' }} className="uppercase">
            — Lion Elite Wellness Medical Team
          </p>
        </div>
      </div>
    </section>
  )
}
