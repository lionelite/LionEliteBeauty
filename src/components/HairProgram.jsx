export default function HairProgram() {
  return (
    <section id="hair" style={{ backgroundColor: '#0C0A08', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 70% 40%, rgba(180,140,80,0.06) 0%, transparent 60%), radial-gradient(ellipse at 30% 60%, rgba(201,169,110,0.04) 0%, transparent 60%)',
      }}></div>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }}
            className="uppercase mb-4">New Program</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.15' }}
            className="font-normal mb-6">
            Restore Your Hair.<br />
            <span style={{ color: '#C4A265' }}>Rebuild Your Confidence.</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C4A265', margin: '0 auto 24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8' }}>
            Hair loss isn't just cosmetic — it impacts confidence, presence, and how you show up daily. The <strong style={{ color: '#FAFAF8', fontWeight: '400' }}>Lion Elite Hair Optimization Program</strong> is a structured, data-driven system designed to help you take control.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#C4A265', fontSize: '1rem', marginTop: '20px', fontStyle: 'italic' }}>
            This is not guesswork. This is targeted optimization.
          </p>
        </div>

        {/* What + Why */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }}
              className="uppercase mb-5">What This Program Does</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.3', marginBottom: '28px' }}
              className="font-normal">A premium approach to supporting:</h3>
            <div className="space-y-4">
              {[
                { label: 'Hair regrowth and density', icon: '🌱' },
                { label: 'Scalp health and follicle function', icon: '⚡' },
                { label: 'Hair thickness and quality', icon: '💪' },
                { label: 'Long-term hair maintenance', icon: '📈' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4"
                  style={{ borderLeft: '2px solid #C4A26533', paddingLeft: '20px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.5' }}>{item.label}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px', backgroundColor: '#131109', border: '1px solid #1E1A10', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C4A265', fontSize: '1rem', lineHeight: '1.7', fontStyle: 'italic' }}>
                "Designed for individuals who want real structure — not random products."
              </p>
            </div>
          </div>

          <div>
            <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }}
              className="uppercase mb-5">Why This Is Different</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>Most people:</p>
            <div className="space-y-3 mb-8">
              {[
                'Try random products with no plan',
                'Quit too early due to lack of results',
                "Don't address the root causes of hair thinning",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3"
                  style={{ backgroundColor: '#131109', border: '1px solid #1E1A10', padding: '16px 20px' }}>
                  <span style={{ color: '#2E2A18', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✗</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.6' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#181410', border: '1px solid #C4A26530', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C4A265', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '8px' }}
                className="uppercase">Our approach</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We combine <span style={{ color: '#C4A265' }}>data, structure, and consistency</span> to support real progress over time.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }}
              className="uppercase mb-3">The Process</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">How It Works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { step: '01', title: 'Hair & Health Assessment', desc: 'We evaluate key factors that directly impact hair health and create a clear picture of your starting point.', points: ['Hormonal balance', 'Scalp condition', 'Recovery and stress levels'] },
              { step: '02', title: 'Hair Optimization Strategy', desc: 'Based on your assessment, you receive a structured framework built specifically for your hair goals.', points: ['Follicle stimulation', 'Scalp environment optimization', 'Hair growth cycle support'] },
              { step: '03', title: 'Guided Implementation', desc: "We guide you every step of the way so you stay consistent and see the maximum visible improvement.", points: ['Stay consistent', 'Avoid common mistakes', 'Maximize visible improvements'] },
            ].map(item => (
              <div key={item.step} style={{ backgroundColor: '#131109', border: '1px solid #1E1A10', padding: '40px 32px', position: 'relative' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#1A1610', fontSize: '5rem', position: 'absolute', top: '16px', right: '24px', lineHeight: '1', userSelect: 'none' }}>{item.step}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C4A265', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '12px' }} className="uppercase">Step {item.step}</p>
                <h4 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.15rem', marginBottom: '14px', lineHeight: '1.3' }} className="font-normal">{item.title}</h4>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#C4A265', marginBottom: '16px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginBottom: '16px' }}>{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map(p => (
                    <li key={p} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#C4A265', borderRadius: '50%', flexShrink: 0 }}></div>
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
          <div style={{ backgroundColor: '#131109', border: '1px solid #C4A26525', padding: '48px 40px' }}>
            <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Advanced Pathways</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }} className="font-normal">Advanced Hair Optimization Pathways</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#C4A265', marginBottom: '20px' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginBottom: '20px' }}>
              High-level clients often explore advanced hair-support strategies as part of their program, commonly used by individuals focused on:
            </p>
            {['Increasing hair density', 'Strengthening follicles', 'Supporting long-term regrowth'].map(item => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <span style={{ color: '#C4A265', fontSize: '12px' }}>→</span>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '13px' }}>{item}</p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #1E1A10', paddingTop: '24px', marginTop: '24px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', lineHeight: '1.7' }}>
                As a client, you'll receive access to trusted resources, structured implementation frameworks, and preferred client-level opportunities.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#131109', border: '1px solid #1E1A10', padding: '48px 40px' }}>
            <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Ideal Candidate</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }} className="font-normal">Who This Is For</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#C4A265', marginBottom: '24px' }}></div>
            <div className="space-y-4 mb-8">
              {['Are experiencing thinning or early hair loss', 'Want to be proactive about regrowth', 'Value a structured, guided system', 'Are serious about improving their appearance'].map((item, i) => (
                <div key={i} className="flex items-start gap-3" style={{ borderLeft: '2px solid #C4A26540', paddingLeft: '16px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '14px', lineHeight: '1.5' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0C0A08', border: '1px solid #1E1A10', padding: '20px 24px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C4A265', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                "This is a premium, high-touch system focused on long-term results."
              </p>
            </div>
          </div>
        </div>

        {/* Real Benefit banner */}
        <div style={{ backgroundColor: '#131109', border: '1px solid #1E1A10', padding: '64px 48px', textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }} className="uppercase">The Real Benefit</p>
          <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.9rem', lineHeight: '1.4', maxWidth: '600px', margin: '0 auto 28px' }} className="font-normal">
            This isn't just about hair.
          </h3>
          <div className="flex flex-wrap justify-center gap-5 mb-16">
            {['Looking sharper', 'Feeling more confident', 'Reversing early signs of decline', 'Taking control instead of reacting'].map((item, i) => (
              <div key={item} style={{ backgroundColor: i % 2 === 0 ? '#C4A265' : '#181410', border: i % 2 === 0 ? 'none' : '1px solid #2A2410', padding: '14px 24px', maxWidth: '260px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: i % 2 === 0 ? '#FFFFFF' : '#6A6A5A', fontSize: '13px', letterSpacing: '0.08em', textAlign: 'center' }}>{item}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Georgia, serif', color: '#6A6A5A', fontSize: '1.1rem', fontStyle: 'italic', maxWidth: '400px', margin: '0 auto 32px' }}>
            "Consistency + structure = visible change."
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#C4A265', color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>

        {/* Disclaimer */}
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2E2A18', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          The information provided in this program is for educational and informational purposes only and is not intended as medical advice. This program is not designed to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before making any health-related decisions.
        </p>
      </div>
    </section>
  )
}
