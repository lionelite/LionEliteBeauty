export default function NeuroProgram() {
  return (
    <section id="neuro" style={{ backgroundColor: '#080808', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(138,158,133,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.05) 0%, transparent 60%)',
      }}></div>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }}
            className="uppercase mb-4">New Program</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.15', letterSpacing: '-0.01em' }}
            className="font-normal mb-6">
            Unlock Elite<br />
            <span style={{ color: '#8A9E85' }}>Cognitive Performance</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#8A9E85', margin: '0 auto 24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8' }}>
            This is not a basic wellness program. The <strong style={{ color: '#FAFAF8', fontWeight: '400' }}>Lion Elite Neuro Optimization Program</strong> is designed for individuals who want to operate at the highest level — mentally, physically, and strategically.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#8A9E85', fontSize: '1rem', marginTop: '20px', fontStyle: 'italic' }}>
            If you rely on your brain to perform, produce, and lead… this is where optimization becomes precision.
          </p>
        </div>

        {/* What this program does */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }}
              className="uppercase mb-5">What This Program Does</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.3', marginBottom: '28px' }}
              className="font-normal">A premium, data-driven system built to help you:</h3>
            <div className="space-y-4">
              {[
                { label: 'Increase focus and mental clarity', icon: '🧠' },
                { label: 'Improve memory and cognitive sharpness', icon: '⚡' },
                { label: 'Enhance mental endurance and output', icon: '🎯' },
                { label: 'Support long-term brain performance', icon: '📈' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4"
                  style={{ borderLeft: '2px solid #8A9E8533', paddingLeft: '20px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.5' }}>{item.label}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px', backgroundColor: '#111111', border: '1px solid #1E1E1E', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#8A9E85', fontSize: '1rem', lineHeight: '1.7', fontStyle: 'italic' }}>
                "This is about removing guesswork and replacing it with structured optimization."
              </p>
            </div>
          </div>

          {/* Why Different */}
          <div>
            <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }}
              className="uppercase mb-5">Why This Is Different</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>
              Most people:
            </p>
            <div className="space-y-3 mb-8">
              {[
                'Rely on caffeine, nootropics, or trial-and-error',
                'Experience inconsistent focus and mental fatigue',
                'Never actually understand what their brain needs',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3"
                  style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E', padding: '16px 20px' }}>
                  <span style={{ color: '#3A3A3A', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✗</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.6' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#161616', border: '1px solid #8A9E8530', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '8px' }}
                className="uppercase">We take a different approach</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We start with <span style={{ color: '#8A9E85' }}>real data</span>, then build a system around you.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }}
              className="uppercase mb-3">The Process</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.2' }}
              className="font-normal">How It Works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                title: 'Baseline Assessment',
                desc: 'We evaluate key biomarkers and performance indicators related to cognitive function, recovery capacity, stress response, and overall system balance.',
                points: ['Cognitive function', 'Recovery capacity', 'Stress response', 'Overall system balance'],
              },
              {
                step: '02',
                title: 'Neuro Optimization Strategy',
                desc: 'Based on your results and goals, you receive a structured framework designed to support your specific cognitive profile.',
                points: ['Focus and clarity', 'Cognitive efficiency', 'Mental recovery and resilience'],
              },
              {
                step: '03',
                title: 'Guided Implementation',
                desc: "You're not left figuring it out on your own. We walk you through every step so you can stay consistent and maximize your results.",
                points: ['Stay consistent', 'Avoid common mistakes', 'Maximize your results'],
              },
            ].map(item => (
              <div key={item.step} style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E', padding: '40px 32px', position: 'relative' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#1E1E1E', fontSize: '5rem', position: 'absolute', top: '16px', right: '24px', lineHeight: '1', userSelect: 'none' }}>
                  {item.step}
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '12px' }}
                  className="uppercase">Step {item.step}</p>
                <h4 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.15rem', marginBottom: '14px', lineHeight: '1.3' }}
                  className="font-normal">{item.title}</h4>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#8A9E85', marginBottom: '16px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginBottom: '16px' }}>{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map(p => (
                    <li key={p} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#8A9E85', borderRadius: '50%', flexShrink: 0 }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px' }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Pathways + Who It's For */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Advanced Pathways */}
          <div style={{ backgroundColor: '#111111', border: '1px solid #8A9E8525', padding: '48px 40px' }}>
            <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }}
              className="uppercase">Advanced Pathways</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }}
              className="font-normal">Advanced Optimization Pathways</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#8A9E85', marginBottom: '20px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginBottom: '20px' }}>
              High-level clients often choose to explore advanced neuro-support strategies as part of their optimization. These approaches are commonly used by individuals focused on:
            </p>
            {['High-performance output', 'Cognitive longevity', 'Mental precision under pressure'].map(item => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <span style={{ color: '#8A9E85', fontSize: '12px' }}>→</span>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '13px' }}>{item}</p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: '24px', marginTop: '24px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', lineHeight: '1.7' }}>
                As a client, you'll receive access to trusted resources, structured implementation frameworks, and preferred client-level opportunities.
              </p>
            </div>
          </div>

          {/* Who It's For */}
          <div style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E', padding: '48px 40px' }}>
            <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }}
              className="uppercase">Ideal Candidate</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }}
              className="font-normal">Who This Is For</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#8A9E85', marginBottom: '24px' }}></div>
            <div className="space-y-4 mb-8">
              {[
                'Demand high performance from themselves',
                'Want to eliminate mental fog and inconsistency',
                'Are serious about optimizing how they think and operate',
                'Value precision, structure, and results',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3"
                  style={{ borderLeft: '2px solid #8A9E8540', paddingLeft: '16px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '14px', lineHeight: '1.5' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0D0D0D', border: '1px solid #1E1E1E', padding: '20px 24px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#8A9E85', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                "This is a high-touch, premium system. You're not buying information — you're stepping into a structured optimization process."
              </p>
            </div>
          </div>
        </div>

        {/* The Real Benefit banner */}
        <div style={{ backgroundColor: '#111111', border: '1px solid #1E1E1E', padding: '64px 48px', textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
            className="uppercase">The Real Benefit</p>
          <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.9rem', lineHeight: '1.4', maxWidth: '600px', margin: '0 auto 28px' }}
            className="font-normal">
            This isn't just about "feeling better."
          </h3>
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {['Thinking faster', 'Executing sharper', 'Staying focused longer', 'Performing consistently at a higher level'].map((item, i) => (
              <div key={item} style={{
                backgroundColor: i % 2 === 0 ? '#8A9E85' : '#161616',
                border: i % 2 === 0 ? 'none' : '1px solid #2A2A2A',
                padding: '14px 24px',
              }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: i % 2 === 0 ? '#FFFFFF' : '#6A6A6A', fontSize: '13px', letterSpacing: '0.08em' }}>{item}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Georgia, serif', color: '#7A7A7A', fontSize: '1.1rem', fontStyle: 'italic', maxWidth: '480px', margin: '0 auto 32px' }}>
            "When your brain is optimized, everything else follows."
          </p>
          <a href="#neuro-pricing"
            style={{
              display: 'inline-block',
              backgroundColor: '#8A9E85',
              color: '#FFFFFF',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.2em',
              padding: '18px 48px',
              textDecoration: 'none',
            }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>

        {/* Disclaimer */}
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2E2E2E', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          The information provided in this program is for educational and informational purposes only and is not intended as medical advice. This program is not designed to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before making any health-related decisions.
        </p>
      </div>
    </section>
  )
}
