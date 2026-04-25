const products = [
  {
    name: 'GHK-Cu Peptide\nFace Wash',
    price: '$68',
    size: '150ml',
    badge: 'Bestseller',
    badgeColor: '#C9A96E',
    tagline: 'Daily peptide-activated cleanse',
    benefits: ['Deep pore activation', 'GHK-Cu complex', 'Prepares skin for serum'],
    bg: '#F5F0E8',
    accent: '#C9A96E',
  },
  {
    name: 'Regenerating\nPeptide Serum',
    price: '$124',
    size: '30ml',
    badge: 'Clinical Grade',
    badgeColor: '#8A9E85',
    tagline: 'High-concentration bioactive serum',
    benefits: ['4,000+ gene activation', 'Collagen stimulation', 'Cellular repair'],
    bg: '#1A1A1A',
    accent: '#C9A96E',
  },
  {
    name: 'Peptide\nAnti-Aging Cream',
    price: '$96',
    size: '50ml',
    badge: 'New Formula',
    badgeColor: '#C9A96E',
    tagline: 'Sustained-release peptide delivery',
    benefits: ['Barrier restoration', 'Overnight recovery', 'Firming complex'],
    bg: '#F5F0E8',
    accent: '#8A9E85',
  },
  {
    name: 'KPV Recovery\nMoisturizer',
    price: '$78',
    size: '50ml',
    badge: 'New',
    badgeColor: '#8A7AB0',
    tagline: 'Advanced peptide skin recovery',
    benefits: ['Calms redness & irritation', 'Strengthens skin barrier', 'Deep hydration, no heaviness'],
    bg: '#F5F0E8',
    accent: '#8A7AB0',
    label: 'KPV',
  },
  {
    name: 'Post-Procedure\nRecovery Kit',
    price: '$185',
    size: 'Full Kit',
    badge: 'Complete Kit',
    badgeColor: '#2A2A2A',
    tagline: 'Accelerated recovery protocol',
    benefits: ['Post-treatment healing', 'Inflammation control', 'Includes all 3 products'],
    bg: '#2A2A2A',
    accent: '#C9A96E',
  },
]

export default function SkincareLine() {
  const isDark = (bg) => bg === '#1A1A1A' || bg === '#2A2A2A'

  return (
    <section id="skincare" style={{ backgroundColor: '#FAFAF8', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-6">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }}
            className="uppercase mb-4">Lion Elite Beauty</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">
            GHK-Cu Skincare Collection
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto' }}>
            Clinical-grade, peptide-driven formulations — the same technology used in medical-grade treatments, now available for your daily routine. Often recommended as part of your optimization plan.
          </p>
        </div>

        {/* Connection callout */}
        <div style={{ backgroundColor: '#1A1A1A', padding: '20px 40px', maxWidth: '680px', margin: '0 auto 60px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '13px', lineHeight: '1.7', letterSpacing: '0.05em' }}>
            <span style={{ color: '#C9A96E' }}>Coming soon:</span> Optimization Program clients will receive direct access to lionelitewellness.com peptide protocols — integrated with your personalized plan.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {products.map((p) => (
            <div key={p.name} style={{ backgroundColor: p.bg, display: 'flex', flexDirection: 'column' }}>
              {/* Badge */}
              <div style={{ backgroundColor: p.badgeColor, padding: '8px 16px', alignSelf: 'flex-start' }}>
                <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '9px', letterSpacing: '0.2em' }}
                  className="uppercase">{p.badge}</span>
              </div>

              {/* Product visual */}
              <div style={{ padding: '32px 28px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Bottle illustration */}
                <div style={{
                  width: '70px', height: '110px', backgroundColor: p.accent, margin: '0 auto 28px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', top: '-8px', width: '30px', height: '10px', backgroundColor: p.accent, opacity: 0.6 }}></div>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#FFFFFF', fontSize: '7px', letterSpacing: '0.15em', textAlign: 'center', lineHeight: '2', opacity: 0.9 }}>
                    LION<br />ELITE
                  </p>
                  <div style={{ width: '24px', height: '0.5px', backgroundColor: 'rgba(255,255,255,0.4)', margin: '4px 0' }}></div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '6px', letterSpacing: '0.1em', opacity: 0.7 }}>{p.label || 'GHK-Cu'}</p>
                </div>

                {/* Name */}
                <p style={{
                  fontFamily: 'Georgia, serif',
                  color: isDark(p.bg) ? '#FAFAF8' : '#1A1A1A',
                  fontSize: '1rem', lineHeight: '1.4', marginBottom: '8px',
                }} className="font-normal whitespace-pre-line">{p.name}</p>

                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '11px', letterSpacing: '0.12em', marginBottom: '16px' }}
                  className="uppercase">{p.tagline}</p>

                <div style={{ width: '28px', height: '1px', backgroundColor: p.accent, marginBottom: '16px' }}></div>

                {/* Benefits */}
                <ul className="space-y-2 mb-6 flex-1">
                  {p.benefits.map(b => (
                    <li key={b} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0 }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark(p.bg) ? '#7A7A7A' : '#6A6A6A', fontSize: '12px' }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div style={{ borderTop: `1px solid ${isDark(p.bg) ? '#2E2E2E' : '#E8DDD0'}`, paddingTop: '20px', marginTop: 'auto', paddingBottom: '28px' }}>
                  <div className="flex items-center justify-between mb-4">
                    <p style={{ fontFamily: 'Georgia, serif', color: isDark(p.bg) ? '#FAFAF8' : '#1A1A1A', fontSize: '1.4rem' }}>{p.price}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: isDark(p.bg) ? '#4A4A4A' : '#9A9A9A', fontSize: '11px' }}>{p.size}</p>
                  </div>
                  <button
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: `1px solid ${p.accent}`,
                      color: isDark(p.bg) ? '#FAFAF8' : '#1A1A1A',
                      fontFamily: 'Helvetica Neue, Arial, sans-serif',
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      padding: '12px',
                      cursor: 'pointer',
                    }}
                    className="uppercase hover:opacity-70 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle CTA */}
        <div style={{ marginTop: '48px', backgroundColor: '#1A1A1A', padding: '40px 48px' }}
          className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '8px' }}
              className="uppercase">Best Value</p>
            <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.3rem' }}>
              Complete Skincare System
            </p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '13px', marginTop: '6px' }}>
              All 5 products · Save on the full protocol
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px', textDecoration: 'line-through' }}>$551</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '2rem' }}>$499</p>
            </div>
            <a href="#"
              style={{
                backgroundColor: '#C9A96E',
                color: '#FFFFFF',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.2em',
                padding: '16px 32px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
              className="uppercase hover:opacity-90 transition-opacity">Shop the Bundle</a>
          </div>
        </div>
      </div>
    </section>
  )
}
