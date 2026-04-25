export default function LongevityProgram() {
  return (
    <section id="longevity" style={{ backgroundColor: '#080A0C', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 65% 35%, rgba(100,140,180,0.07) 0%, transparent 60%), radial-gradient(ellipse at 25% 70%, rgba(100,140,180,0.04) 0%, transparent 60%)',
      }}></div>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-4">Longevity & Anti-Aging</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.15' }} className="font-normal mb-6">
            Extend Your Prime.<br /><span style={{ color: '#7A9FBF' }}>Optimize Your Future.</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#7A9FBF', margin: '0 auto 24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8' }}>
            Aging is inevitable. Decline is not. The <strong style={{ color: '#FAFAF8', fontWeight: '400' }}>Lion Elite Longevity & Anti-Aging Optimization Program</strong> is a premium, data-driven system designed to support cellular health, recovery, and long-term performance at the highest level.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#7A9FBF', fontSize: '1rem', marginTop: '20px', fontStyle: 'italic' }}>
            This is about more than living longer. This is about staying strong, sharp, and resilient over time.
          </p>
        </div>

        {/* What + Why */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-5">What This Program Is</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.3', marginBottom: '28px' }} className="font-normal">A high-level system designed to help you:</h3>
            <div className="space-y-4">
              {[
                { label: 'Support cellular repair and regeneration', icon: '🔬' },
                { label: 'Improve energy production at a foundational level', icon: '⚡' },
                { label: 'Enhance recovery from daily stress and physical strain', icon: '🔄' },
                { label: 'Reduce systemic wear and tear over time', icon: '🛡️' },
                { label: 'Maintain performance, mobility, and resilience', icon: '📈' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4" style={{ borderLeft: '2px solid #7A9FBF33', paddingLeft: '20px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.5' }}>{item.label}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px', backgroundColor: '#0D1018', border: '1px solid #1A2030', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#7A9FBF', fontSize: '1rem', lineHeight: '1.7', fontStyle: 'italic' }}>
                "This is optimization at the cellular + recovery level."
              </p>
            </div>
          </div>

          <div>
            <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-5">Why This Is Different</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>Most people:</p>
            <div className="space-y-3 mb-8">
              {[
                'Ignore recovery until something breaks',
                'Accept inflammation, fatigue, and decline as "normal"',
                'Focus only on surface-level health',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3" style={{ backgroundColor: '#0D1018', border: '1px solid #1A2030', padding: '14px 18px' }}>
                  <span style={{ color: '#7A9FBF', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✗</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.6' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0D1018', border: '1px solid #7A9FBF30', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A9FBF', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Our approach</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We focus on <span style={{ color: '#7A9FBF' }}>repairing, restoring, and strengthening</span> the body from within.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-3">The Process</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">How It Works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { step: '01', title: 'Longevity & Recovery Assessment', desc: 'We evaluate key factors related to your cellular health, inflammation and recovery capacity, energy production, and system-wide balance.', points: ['Cellular health', 'Inflammation & recovery capacity', 'Energy production', 'System-wide balance'] },
              { step: '02', title: 'Longevity Optimization Strategy', desc: 'You receive a structured framework designed to support cellular repair, recovery from physical and internal stress, and long-term resilience.', points: ['Cellular repair & regeneration', 'Recovery from stress', 'Long-term system resilience', 'Energy efficiency'] },
              { step: '03', title: 'Guided Implementation', desc: "We guide you through your strategy so you can stay consistent and support your body's natural repair processes for maximum long-term results.", points: ['Stay consistent', "Support natural repair processes", 'Maximize long-term results'] },
            ].map(item => (
              <div key={item.step} style={{ backgroundColor: '#0D1018', border: '1px solid #1A2030', padding: '40px 32px', position: 'relative' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A9FBF', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '12px' }} className="uppercase">Step {item.step}</p>
                <h4 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.15rem', marginBottom: '14px', lineHeight: '1.3' }} className="font-normal">{item.title}</h4>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#7A9FBF', marginBottom: '16px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginBottom: '16px' }}>{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map(p => (
                    <li key={p} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#7A9FBF', borderRadius: '50%', flexShrink: 0 }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A7A8A', fontSize: '12px' }}>{p}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ fontFamily: 'Georgia, serif', color: '#141820', fontSize: '5rem', lineHeight: '1', userSelect: 'none', textAlign: 'right', marginTop: '24px' }}>{item.step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-3">Advanced Pathways</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', maxWidth: '640px', margin: '0 auto' }} className="font-normal">Key Benefits of Advanced Longevity & Recovery Optimization</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Enhanced Cellular Repair & Regeneration', desc: "Support your body's ability to repair and maintain itself over time." },
              { title: 'Improved Recovery from Physical Stress', desc: 'Bounce back faster from workouts, injuries, and daily wear.' },
              { title: 'Reduced Inflammation & Internal Stress', desc: 'Support a healthier internal environment for long-term performance.' },
              { title: 'Stronger Joints, Tissues & Structural Support', desc: 'Promote resilience in connective tissue and overall physical durability.' },
              { title: 'Improved Gut & Internal System Support', desc: 'Support internal systems that play a major role in overall health and recovery.' },
              { title: 'Increased Energy & Vitality', desc: 'Feel more consistent energy as your body functions more efficiently.' },
              { title: 'Support for Healthy Aging Processes', desc: 'Maintain strength, mobility, and performance as you age.' },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: '#0D1018', border: '1px solid #1A2030', padding: '28px 24px' }} className="flex gap-4">
                <span style={{ color: '#7A9FBF', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                <div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A7A8A', fontSize: '12px', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who It's For + Real Benefit */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div style={{ backgroundColor: '#0D1018', border: '1px solid #1A2030', padding: '48px 40px' }}>
            <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Ideal Candidate</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }} className="font-normal">Who This Is For</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#7A9FBF', marginBottom: '24px' }}></div>
            <div className="space-y-4 mb-8">
              {['Want to stay active and strong long-term', 'Feel the effects of stress, fatigue, or wear and tear', 'Value recovery just as much as performance', 'Want a structured, proactive approach to aging'].map((item, i) => (
                <div key={i} className="flex items-start gap-3" style={{ borderLeft: '2px solid #7A9FBF40', paddingLeft: '16px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '14px', lineHeight: '1.5' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#080A0C', border: '1px solid #1A2030', padding: '20px 24px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#7A9FBF', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                "This is a premium, high-touch system focused on long-term resilience and performance."
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#0D1018', border: '1px solid #7A9FBF25', padding: '48px 40px' }}>
            <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">The Real Benefit</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }} className="font-normal">This isn't just about aging slower.</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#7A9FBF', marginBottom: '24px' }}></div>
            <div className="space-y-3 mb-8">
              {['Recovering faster', 'Staying strong and mobile', 'Reducing breakdown over time', 'Building a body that lasts'].map((item, i) => (
                <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#7A9FBF' : '#111520', border: i % 2 === 0 ? 'none' : '1px solid #1A2030', padding: '14px 20px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: i % 2 === 0 ? '#000000' : '#6A7A8A', fontSize: '13px' }}>{item}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'Georgia, serif', color: '#5A6A7A', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6' }}>
              "Longevity is built on recovery, repair, and consistency."
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ backgroundColor: '#0D1018', border: '1px solid #1A2030', padding: '48px', textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.6rem', lineHeight: '1.5', maxWidth: '560px', margin: '0 auto 28px' }} className="font-normal">
            Ready to stay strong, recover faster,<br />and perform at a high level for years to come?
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#7A9FBF', color: '#000000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>

        {/* Disclaimer */}
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A4050', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          The information provided in this program is for educational and informational purposes only and is not intended as medical advice. This program is not designed to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before making any health-related decisions.
        </p>
      </div>
    </section>
  )
}
