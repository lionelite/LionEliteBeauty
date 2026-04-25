// Repurposed as "What You Get" + "Who This Is For"
export default function BeforeAfter() {
  return (
    <>
      {/* What You Get */}
      <section id="what-you-get" style={{ backgroundColor: '#0D0D0D', padding: '100px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
              className="text-xs uppercase tracking-widest mb-4">Everything Included</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.5rem', lineHeight: '1.2' }}
              className="font-normal">What You Get</h2>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              { item: 'At-home biomarker testing kit', desc: 'Shipped directly to your door. Simple, fast, no clinic visit needed.' },
              { item: 'Full results breakdown', desc: 'Easy-to-understand analysis of your biomarker data.' },
              { item: 'Personalized optimization strategy', desc: 'A tailored plan based on your results, goals, and lifestyle.' },
              { item: '1-on-1 coaching guidance', desc: 'Direct coaching to help you implement your plan effectively.' },
              { item: 'Performance + recovery insights', desc: 'Clear action steps targeting your specific gaps.' },
              { item: 'Ongoing recommendations', desc: 'Continued guidance as you progress and optimize over time.' },
            ].map(({ item, desc }) => (
              <div key={item} style={{ backgroundColor: '#161616', border: '1px solid #2A2A2A', padding: '28px' }}
                className="flex gap-4">
                <span style={{ color: '#C9A96E', fontSize: '16px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                <div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
                    {item}
                  </p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '13px', lineHeight: '1.6' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section id="who-its-for" style={{ backgroundColor: '#F5F0E8', padding: '100px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
                className="text-xs uppercase tracking-widest mb-5">Ideal Candidate</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.4rem', lineHeight: '1.2' }}
                className="font-normal mb-6">Who This Is For</h2>
              <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '28px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.9' }}>
                This program is built for individuals who are serious about understanding and optimizing their body — not just following trends.
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Want real data instead of guessing',
                'Care about performance, recovery, and longevity',
                'Are serious about optimizing their body',
                'Want a premium, guided experience',
              ].map((point, i) => (
                <div key={i} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DDD0', padding: '22px 28px' }}
                  className="flex items-center gap-4">
                  <div style={{ width: '28px', height: '28px', backgroundColor: '#C9A96E', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#FFFFFF', fontSize: '12px' }}>→</span>
                  </div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '14px', lineHeight: '1.5' }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
