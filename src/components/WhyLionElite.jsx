// Repurposed as "Elite Access" + "Why This Is Different" + "Results-Driven" sections
export default function WhyLionElite() {
  return (
    <>
      {/* Elite Access */}
      <section id="elite-access" style={{ backgroundColor: '#1A1A1A', padding: '100px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
              className="text-xs uppercase tracking-widest mb-4">Members Only</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.5rem', lineHeight: '1.2' }}
              className="font-normal">
              Unlock Elite-Level<br />
              <span style={{ color: '#C9A96E' }}>Optimization Tools</span>
            </h2>
            <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '15px', lineHeight: '1.8', maxWidth: '540px', margin: '0 auto' }}>
              Based on your results and goals, many clients choose to explore advanced performance pathways. As a Lion Elite client, you'll receive:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: '🔑',
                title: 'Trusted Optimization Resources',
                description: 'Access to a curated network of advanced performance tools and resources — vetted by our team.',
              },
              {
                icon: '💎',
                title: 'Preferred Client Pricing',
                description: 'As a Lion Elite client, receive preferred pricing on advanced protocols and premium services.',
              },
              {
                icon: '📐',
                title: 'High-Performance Routines',
                description: 'Guidance on how others structure high-performance routines based on similar biomarker profiles.',
              },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: '#222222', border: '1px solid #2E2E2E', padding: '40px 32px' }}>
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '20px' }}>{item.icon}</span>
                <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.4', marginBottom: '14px' }}
                  className="font-normal">{item.title}</h3>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '14px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#161616', border: '1px solid #C9A96E33', padding: '28px 40px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '12px', letterSpacing: '0.15em' }}>
              ⚠️ All recommendations are for educational purposes only.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Is Different */}
      <section id="why-different" style={{ backgroundColor: '#FFFFFF', padding: '100px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
                className="text-xs uppercase tracking-widest mb-5">Our Approach</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.4rem', lineHeight: '1.2' }}
                className="font-normal mb-6">
                Why This Is<br />
                <span style={{ color: '#C9A96E' }}>Different</span>
              </h2>
              <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '28px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.9', marginBottom: '16px' }}>
                Most companies sell products.
              </p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.3rem', lineHeight: '1.7' }}>
                We build <span style={{ color: '#C9A96E' }}>systems.</span>
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {[
                {
                  number: '01',
                  title: 'Clarity on what your body actually needs',
                  description: 'Not guesses or generic recommendations — real biomarker data driving real decisions.',
                  accent: '#C9A96E',
                },
                {
                  number: '02',
                  title: 'A structured path to improvement',
                  description: 'Step-by-step guidance from testing through implementation and beyond.',
                  accent: '#8A9E85',
                },
                {
                  number: '03',
                  title: 'Ongoing optimization — not guesswork',
                  description: 'A repeatable system that evolves with you as your body changes and your goals advance.',
                  accent: '#C9A96E',
                },
              ].map((item) => (
                <div key={item.number} style={{ borderLeft: `3px solid ${item.accent}`, paddingLeft: '24px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#D0D0D0', fontSize: '10px', letterSpacing: '0.2em', marginBottom: '6px' }}
                    className="uppercase">{item.number}</p>
                  <h3 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.05rem', marginBottom: '8px' }}
                    className="font-normal">{item.title}</h3>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results-Driven Experience */}
      <section id="results-driven" style={{ backgroundColor: '#F5F0E8', padding: '100px 0' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
            className="text-xs uppercase tracking-widest mb-5">The System</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.4rem', lineHeight: '1.2' }}
            className="font-normal mb-6">
            A Results-Driven Experience
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '16px', lineHeight: '1.9', maxWidth: '520px', margin: '0 auto 48px' }}>
            This isn't a one-time purchase. This is a system you can repeat.
          </p>

          {/* Cycle visual */}
          <div className="flex flex-wrap items-center justify-center gap-0 mb-16">
            {['Test', 'Adjust', 'Optimize', 'Repeat'].map((item, i, arr) => (
              <div key={item} className="flex items-center">
                <div style={{
                  backgroundColor: i % 2 === 0 ? '#C9A96E' : '#1A1A1A',
                  padding: '18px 28px',
                  minWidth: '110px',
                }}>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#FFFFFF', fontSize: '1rem', letterSpacing: '0.05em', textAlign: 'center' }}>{item}</p>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ color: '#C0B8B0', fontSize: '20px', padding: '0 4px' }}>→</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DDD0', padding: '48px' }}>
            <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.4rem', lineHeight: '1.7', maxWidth: '580px', margin: '0 auto' }}>
              "Clients who stay consistent see the biggest transformations."
            </p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.2em', marginTop: '20px' }}
              className="uppercase">— Lion Elite Wellness</p>
          </div>
        </div>
      </section>
    </>
  )
}
