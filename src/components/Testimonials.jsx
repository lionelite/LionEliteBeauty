// Repurposed as Pricing section
export default function Testimonials() {
  return (
    <section id="pricing" style={{ backgroundColor: '#0D0D0D', padding: '100px 0' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
            className="text-xs uppercase tracking-widest mb-4">Investment</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">
            Lion Elite<br />
            <span style={{ color: '#C9A96E' }}>Optimization Program</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
        </div>

        {/* Pricing Card */}
        <div style={{ backgroundColor: '#161616', border: '1px solid #2E2E2E', maxWidth: '560px', margin: '0 auto' }}>
          {/* Price header */}
          <div style={{ backgroundColor: '#1A1A1A', padding: '48px', textAlign: 'center', borderBottom: '1px solid #2E2E2E' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.3em', marginBottom: '16px' }}
              className="uppercase">One-Time Investment</p>
            <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '5rem', lineHeight: '1', letterSpacing: '-0.02em' }}>
              $1,000
            </p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px', marginTop: '12px', letterSpacing: '0.1em' }}>
              Complete Optimization Program
            </p>
          </div>

          {/* Includes */}
          <div style={{ padding: '40px 48px' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '24px' }}
              className="uppercase">Includes</p>
            <ul className="space-y-4 mb-10">
              {[
                'Full biomarker testing kit (shipped to you)',
                'Complete data analysis & breakdown',
                'Personalized optimization strategy',
                '1-on-1 coaching + implementation guidance',
                'Performance & recovery insights',
                'Ongoing recommendations',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: '#C9A96E', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✔</span>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '14px', lineHeight: '1.5' }}>{item}</span>
                </li>
              ))}
            </ul>

            <a href="mailto:info@lionelitewellness.com"
              style={{
                display: 'block',
                backgroundColor: '#C9A96E',
                color: '#FFFFFF',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.15em',
                padding: '18px',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%',
              }}
              className="uppercase hover:opacity-90 transition-opacity">
              👉 Start Your Optimization Program
            </a>
          </div>
        </div>

        {/* Testimonials */}
        <div style={{ marginTop: '80px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '10px', letterSpacing: '0.3em', textAlign: 'center', marginBottom: '40px' }}
            className="uppercase">What Clients Say</p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                quote: 'This showed me what my body actually needed. First time I had a real roadmap instead of just guessing.',
                name: 'J. Thornton',
                detail: 'Optimization Program Client',
              },
              {
                quote: "First time I wasn't guessing with my supplements and protocols. The data changed everything for me.",
                name: 'M. Rodriguez',
                detail: 'Optimization Program Client',
              },
            ].map((t) => (
              <div key={t.name} style={{ backgroundColor: '#161616', border: '1px solid #2A2A2A', padding: '36px' }}>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: '#C9A96E', fontSize: '13px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: 'Georgia, serif', color: '#CACACA', fontSize: '0.95rem', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '24px' }}>
                  "{t.quote}"
                </p>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '16px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px' }}>{t.name}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '11px', letterSpacing: '0.12em', marginTop: '4px' }}
                  className="uppercase">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
