export default function WeightProgram() {
  return (
    <section id="weight" style={{ backgroundColor: '#080C08', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 60% 40%, rgba(80,160,100,0.06) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(201,169,110,0.04) 0%, transparent 60%)',
      }}></div>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-4">New Program</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.15' }} className="font-normal mb-6">
            Burn Fat. Control Hunger.<br /><span style={{ color: '#5BA87A' }}>Take Back Your Body.</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#5BA87A', margin: '0 auto 24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8' }}>
            Weight loss isn't just about willpower — it's about biology. The <strong style={{ color: '#FAFAF8', fontWeight: '400' }}>Lion Elite Weight Optimization Program</strong> is a structured, data-driven system designed to help you reduce body fat, control appetite, and improve metabolic efficiency at a high level.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#5BA87A', fontSize: '1rem', marginTop: '20px', fontStyle: 'italic' }}>
            This is not dieting. This is precision-based optimization.
          </p>
        </div>

        {/* What + Why */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-5">What This Program Does</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.3', marginBottom: '28px' }} className="font-normal">A premium system designed to help you:</h3>
            <div className="space-y-4">
              {[
                { label: 'Reduce body fat efficiently', icon: '🔥' },
                { label: 'Control hunger and cravings', icon: '⚡' },
                { label: 'Improve metabolic function', icon: '⚙️' },
                { label: 'Stabilize energy levels', icon: '📈' },
                { label: 'Maintain long-term results', icon: '🎯' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4" style={{ borderLeft: '2px solid #5BA87A33', paddingLeft: '20px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.5' }}>{item.label}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px', backgroundColor: '#0D120D', border: '1px solid #152015', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#5BA87A', fontSize: '1rem', lineHeight: '1.7', fontStyle: 'italic' }}>
                "This is about working with your body, not against it."
              </p>
            </div>
          </div>

          <div>
            <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-5">Why This Is Different</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>Most people:</p>
            <div className="space-y-3 mb-8">
              {[
                'Struggle with constant hunger',
                'Lose weight only to gain it back',
                'Rely on extreme diets that aren\'t sustainable',
                'Never address the biological drivers of weight gain',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3" style={{ backgroundColor: '#0D120D', border: '1px solid #152015', padding: '14px 18px' }}>
                  <span style={{ color: '#1E2A1E', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✗</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.6' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0F160F', border: '1px solid #5BA87A30', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Our approach</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We target the <span style={{ color: '#5BA87A' }}>root mechanisms</span> that control appetite, metabolism, and energy balance.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-3">The Process</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">How It Works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { step: '01', title: 'Metabolic & Biomarker Assessment', desc: 'We evaluate the key biological factors that drive weight gain and metabolism to build your complete picture.', points: ['Hormonal balance', 'Metabolic efficiency', 'Appetite signaling', 'Energy regulation'] },
              { step: '02', title: 'Weight Optimization Strategy', desc: 'Based on your assessment, you receive a structured framework targeting the root mechanisms of your metabolism.', points: ['Appetite control', 'Fat metabolism', 'Energy balance', 'Sustainable weight reduction'] },
              { step: '03', title: 'Guided Implementation', desc: 'We guide you through every step of your plan to ensure consistency and maximum fat loss while maintaining performance.', points: ['Stay consistent', 'Avoid common pitfalls', 'Maximize fat loss'] },
            ].map(item => (
              <div key={item.step} style={{ backgroundColor: '#0D120D', border: '1px solid #152015', padding: '40px 32px', position: 'relative' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#131A13', fontSize: '5rem', position: 'absolute', top: '16px', right: '24px', lineHeight: '1', userSelect: 'none' }}>{item.step}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '12px' }} className="uppercase">Step {item.step}</p>
                <h4 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.15rem', marginBottom: '14px', lineHeight: '1.3' }} className="font-normal">{item.title}</h4>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#5BA87A', marginBottom: '16px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginBottom: '16px' }}>{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map(p => (
                    <li key={p} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#5BA87A', borderRadius: '50%', flexShrink: 0 }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A6A5A', fontSize: '12px' }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits of Advanced Metabolic Optimization */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-3">Advanced Pathways</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', maxWidth: '600px', margin: '0 auto' }} className="font-normal">Key Benefits of Advanced Metabolic Optimization</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Reduced Hunger & Cravings', desc: 'Feel in control of your appetite instead of constantly fighting it.' },
              { title: 'Improved Fat Burning Efficiency', desc: "Support your body's ability to use stored fat as fuel." },
              { title: 'Better Blood Sugar Stability', desc: 'Avoid energy crashes and maintain consistent daily performance.' },
              { title: 'Sustained Energy Levels', desc: 'Feel more energized without relying on stimulants.' },
              { title: 'Easier Adherence to Nutrition Plans', desc: 'Less hunger = more consistency = better results.' },
              { title: 'Long-Term Weight Maintenance', desc: 'Build a system that helps you keep the weight off — not just lose it.' },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: '#0D120D', border: '1px solid #1A261A', padding: '28px 24px' }} className="flex gap-4">
                <span style={{ color: '#5BA87A', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                <div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A6A5A', fontSize: '12px', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who It's For + Real Benefit */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div style={{ backgroundColor: '#0D120D', border: '1px solid #152015', padding: '48px 40px' }}>
            <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Ideal Candidate</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }} className="font-normal">Who This Is For</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#5BA87A', marginBottom: '24px' }}></div>
            <div className="space-y-4 mb-8">
              {['Struggle with stubborn weight loss', 'Experience constant hunger or cravings', 'Want a structured, science-backed approach', 'Are serious about long-term results'].map((item, i) => (
                <div key={i} className="flex items-start gap-3" style={{ borderLeft: '2px solid #5BA87A40', paddingLeft: '16px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '14px', lineHeight: '1.5' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#080C08', border: '1px solid #152015', padding: '20px 24px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#5BA87A', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                "This is a premium, high-touch system focused on results and sustainability."
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#0D120D', border: '1px solid #5BA87A25', padding: '48px 40px' }}>
            <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">The Real Benefit</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }} className="font-normal">This isn't just about losing weight.</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#5BA87A', marginBottom: '24px' }}></div>
            <div className="space-y-3 mb-8">
              {['Feeling in control of your body', 'Eliminating constant hunger', 'Creating sustainable results', 'Operating with more energy and confidence'].map((item, i) => (
                <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#5BA87A' : '#0F160F', border: i % 2 === 0 ? 'none' : '1px solid #1A261A', padding: '14px 20px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: i % 2 === 0 ? '#FFFFFF' : '#5A6A5A', fontSize: '13px' }}>{item}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'Georgia, serif', color: '#4A5A4A', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6' }}>
              "When your biology is aligned, results come easier."
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ backgroundColor: '#0D120D', border: '1px solid #152015', padding: '48px', textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.6rem', lineHeight: '1.5', maxWidth: '560px', margin: '0 auto 28px' }} className="font-normal">
            Ready to stop fighting your body<br />and start working with it?
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#5BA87A', color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>

        {/* Disclaimer */}
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#1E2A1E', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          The information provided in this program is for educational and informational purposes only and is not intended as medical advice. This program is not designed to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before making any health-related decisions.
        </p>
      </div>
    </section>
  )
}
