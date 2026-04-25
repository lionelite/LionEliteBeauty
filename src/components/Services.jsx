// Repurposed as the "Problem" section
export default function Services() {
  return (
    <section id="problem" style={{ backgroundColor: '#F5F0E8', padding: '100px 0' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
            className="text-xs uppercase tracking-widest mb-4">The Problem</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">
            Most People Are Guessing<br />
            <span style={{ color: '#C9A96E' }}>With Their Health.</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: '💊',
              title: 'Try Supplements Blindly',
              description: 'Spending money on supplements without knowing what your body actually needs. Random stacking with no data to back it up.',
            },
            {
              icon: '📋',
              title: 'Follow Generic Plans',
              description: 'Using one-size-fits-all fitness and nutrition plans that weren\'t designed for your unique biology and goals.',
            },
            {
              icon: '❓',
              title: 'Use Protocols Without Data',
              description: 'Exploring advanced performance tools without knowing what your body actually needs — flying blind without biomarker insights.',
            },
          ].map((item) => (
            <div key={item.title}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DDD0', padding: '40px 32px' }}>
              <span style={{ fontSize: '28px', display: 'block', marginBottom: '20px' }}>{item.icon}</span>
              <h3 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.15rem', marginBottom: '14px' }}
                className="font-normal">{item.title}</h3>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Result banner */}
        <div style={{ backgroundColor: '#1A1A1A', padding: '48px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            "Wasted time. Wasted money.<br />
            <span style={{ color: '#C9A96E' }}>Inconsistent results.</span>"
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', marginTop: '16px', letterSpacing: '0.1em' }}>
            There's a better way.
          </p>
        </div>
      </div>
    </section>
  )
}
