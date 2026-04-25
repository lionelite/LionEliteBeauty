export default function FertilityProgram() {
  return (
    <section id="fertility" style={{ backgroundColor: '#0A0A0F', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(180,160,210,0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(201,169,110,0.04) 0%, transparent 60%)',
      }}></div>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }}
            className="uppercase mb-4">New Program</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.15', letterSpacing: '-0.01em' }}
            className="font-normal mb-6">
            Optimize Your Fertility.<br />
            <span style={{ color: '#B8A4D4' }}>Take Control of Your Future.</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#B8A4D4', margin: '0 auto 24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8' }}>
            Your fertility is one of the most important — and most overlooked — areas of long-term health. The <strong style={{ color: '#FAFAF8', fontWeight: '400' }}>Lion Elite Fertility Optimization Program</strong> is designed for individuals who want a structured, data-driven approach to understanding and supporting their reproductive health.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#B8A4D4', fontSize: '1rem', marginTop: '20px', fontStyle: 'italic' }}>
            This is not guesswork. This is precision.
          </p>
        </div>

        {/* What + Why grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          {/* What This Program Does */}
          <div>
            <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }}
              className="uppercase mb-5">What This Program Does</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.3', marginBottom: '28px' }}
              className="font-normal">A premium system built to help you:</h3>
            <div className="space-y-4">
              {[
                { label: 'Understand key fertility-related biomarkers', icon: '🔬' },
                { label: 'Optimize hormonal balance', icon: '⚖️' },
                { label: 'Support reproductive function', icon: '🌱' },
                { label: 'Take a proactive approach to future family planning', icon: '🗓️' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4"
                  style={{ borderLeft: '2px solid #B8A4D433', paddingLeft: '20px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.5' }}>{item.label}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px', backgroundColor: '#111116', border: '1px solid #1E1E28', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#B8A4D4', fontSize: '1rem', lineHeight: '1.7', fontStyle: 'italic' }}>
                "Whether you're preparing now or planning ahead, this program gives you clarity and direction."
              </p>
            </div>
          </div>

          {/* Why This Matters */}
          <div>
            <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }}
              className="uppercase mb-5">Why This Matters</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>
              Most people:
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Don't test fertility markers until there's a problem",
                'Have no visibility into hormone balance',
                'Rely on generic advice with no personalization',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3"
                  style={{ backgroundColor: '#111116', border: '1px solid #1E1E28', padding: '16px 20px' }}>
                  <span style={{ color: '#2E2E3A', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✗</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.6' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#161620', border: '1px solid #B8A4D430', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#B8A4D4', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '8px' }}
                className="uppercase">We take a different approach</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We focus on <span style={{ color: '#B8A4D4' }}>early insight</span> + structured optimization.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }}
              className="uppercase mb-3">The Process</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.2' }}
              className="font-normal">How It Works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                title: 'Fertility Biomarker Testing',
                desc: 'We assess key markers that give you real visibility into your reproductive health — not guesswork.',
                points: ['Hormonal balance', 'Reproductive health indicators', 'Overall system readiness'],
              },
              {
                step: '02',
                title: 'Personalized Optimization Strategy',
                desc: 'Based on your results, you receive a structured plan tailored to your biology, goals, and timeline.',
                points: ['Hormone optimization', 'Reproductive function', 'System balance and recovery'],
              },
              {
                step: '03',
                title: 'Guided Implementation',
                desc: "You'll receive clear guidance on how to apply your strategy — step by step, with full support.",
                points: ['Stay consistent', 'Understand what you\'re doing and why', 'Avoid common mistakes'],
              },
            ].map(item => (
              <div key={item.step} style={{ backgroundColor: '#111116', border: '1px solid #1E1E28', padding: '40px 32px', position: 'relative' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A24', fontSize: '5rem', position: 'absolute', top: '16px', right: '24px', lineHeight: '1', userSelect: 'none' }}>
                  {item.step}
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#B8A4D4', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '12px' }}
                  className="uppercase">Step {item.step}</p>
                <h4 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.15rem', marginBottom: '14px', lineHeight: '1.3' }}
                  className="font-normal">{item.title}</h4>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#B8A4D4', marginBottom: '16px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginBottom: '16px' }}>{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map(p => (
                    <li key={p} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#B8A4D4', borderRadius: '50%', flexShrink: 0 }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A6A', fontSize: '12px' }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Pathways + Who It's For */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div style={{ backgroundColor: '#111116', border: '1px solid #B8A4D425', padding: '48px 40px' }}>
            <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }}
              className="uppercase">Advanced Pathways</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }}
              className="font-normal">Advanced Fertility Support Pathways</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#B8A4D4', marginBottom: '20px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginBottom: '20px' }}>
              Some clients choose to explore advanced reproductive-support strategies as part of their optimization process. These approaches are commonly utilized by individuals focused on:
            </p>
            {['Hormonal optimization', 'Reproductive system support', 'Preparing for future conception'].map(item => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <span style={{ color: '#B8A4D4', fontSize: '12px' }}>→</span>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '13px' }}>{item}</p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #1E1E28', paddingTop: '24px', marginTop: '24px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A5A', fontSize: '11px', lineHeight: '1.7' }}>
                As a client, you'll receive access to trusted resources, structured implementation frameworks, and preferred client-level opportunities.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#111116', border: '1px solid #1E1E28', padding: '48px 40px' }}>
            <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }}
              className="uppercase">Ideal Candidate</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }}
              className="font-normal">Who This Is For</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#B8A4D4', marginBottom: '24px' }}></div>
            <div className="space-y-4 mb-8">
              {[
                'Want to take control of their fertility early',
                'Value data and precision over guesswork',
                'Are planning for the future',
                'Want a structured, guided approach',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3"
                  style={{ borderLeft: '2px solid #B8A4D440', paddingLeft: '16px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '14px', lineHeight: '1.5' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0A0A0F', border: '1px solid #1E1E28', padding: '20px 24px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#B8A4D4', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                "This is a high-touch, premium program focused on clarity, strategy, and long-term optimization."
              </p>
            </div>
          </div>
        </div>

        {/* Real Benefit banner */}
        <div style={{ backgroundColor: '#111116', border: '1px solid #1E1E28', padding: '64px 48px', textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
            className="uppercase">The Real Benefit</p>
          <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.9rem', lineHeight: '1.4', maxWidth: '600px', margin: '0 auto 28px' }}
            className="font-normal">This program gives you:</h3>
          <div className="flex flex-wrap justify-center gap-5 mb-16">
            {[
              'Clarity on your reproductive health',
              'Confidence in your optimization strategy',
              'A proactive approach instead of reactive decisions',
              'A structured path toward long-term fertility support',
            ].map((item, i) => (
              <div key={item} style={{
                backgroundColor: i % 2 === 0 ? '#B8A4D4' : '#161620',
                border: i % 2 === 0 ? 'none' : '1px solid #2A2A3A',
                padding: '14px 24px',
                maxWidth: '280px',
              }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: i % 2 === 0 ? '#FFFFFF' : '#6A6A7A', fontSize: '13px', letterSpacing: '0.06em', textAlign: 'center' }}>{item}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Georgia, serif', color: '#7A7A8A', fontSize: '1.1rem', fontStyle: 'italic', maxWidth: '480px', margin: '0 auto 32px' }}>
            "If you're serious about optimizing your future, this is where you start."
          </p>
          <a href="#fertility-pricing"
            style={{
              display: 'inline-block',
              backgroundColor: '#B8A4D4',
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
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2E2E3A', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          The information provided in this program is for educational and informational purposes only and is not intended as medical advice. This program is not designed to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before making any health-related decisions.
        </p>
      </div>
    </section>
  )
}
