const pillars = [
  {
    icon: '◈',
    category: 'The Active Ingredient',
    title: 'GHK-Cu Copper Peptide',
    description: 'Glycyl-L-histidyl-L-lysine-copper is one of the most research-backed peptides in dermatology. It stimulates collagen and elastin production, accelerates wound healing, and reduces oxidative damage — all at the cellular level.',
    accent: '#C9A96E',
    bg: '#F5F0E8',
  },
  {
    icon: '◇',
    category: 'How It Works',
    title: 'Peptide-Driven Repair',
    description: 'GHK-Cu binds to skin receptors and activates over 4,000 genes involved in cellular repair. Unlike surface-level moisturizers, our formulas work at the dermis to rebuild structure, density, and radiance from within.',
    accent: '#8A9E85',
    bg: '#F0EEE9',
  },
  {
    icon: '◉',
    category: 'Our Standard',
    title: 'Clinical Concentrations',
    description: 'Most cosmetic brands use trace amounts of peptides — not us. Every Lion Elite Beauty product is formulated at concentrations validated in clinical literature, the same levels used in medical-grade treatments.',
    accent: '#C9A96E',
    bg: '#F5F0E8',
  },
]

export default function Services() {
  return (
    <section id="science" style={{ backgroundColor: '#FFFFFF', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
            className="text-xs uppercase tracking-widest mb-4">The Science</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">
            Why GHK-Cu Changes<br />Everything
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div key={p.title}
              style={{ backgroundColor: p.bg, border: '1px solid #E8DDD0' }}
              className="p-10 hover:shadow-lg transition-shadow duration-300">
              <span style={{ color: p.accent, fontSize: '1.5rem' }} className="block mb-6">{p.icon}</span>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, letterSpacing: '0.2em', fontSize: '10px' }}
                className="uppercase tracking-widest mb-3">{p.category}</p>
              <h3 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.3rem' }}
                className="font-normal mb-4">{p.title}</h3>
              <div style={{ width: '32px', height: '1px', backgroundColor: p.accent }} className="mb-5"></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '14px', lineHeight: '1.8' }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Powered by banner */}
        <div style={{ backgroundColor: '#1A1A1A', padding: '40px 48px', marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '10px', letterSpacing: '0.3em' }} className="uppercase">Formulated Under</p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.1rem', letterSpacing: '0.08em' }}>
            Lion Elite Wellness Medical Team
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', marginTop: '4px', textAlign: 'center', maxWidth: '500px', lineHeight: '1.7' }}>
            Every product in the Lion Elite Beauty line is developed and quality-verified by the clinical team at Lion Elite Wellness — bringing medical-grade standards to your home routine.
          </p>
        </div>
      </div>
    </section>
  )
}
