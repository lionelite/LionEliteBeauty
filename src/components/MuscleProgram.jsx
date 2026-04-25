export default function MuscleProgram() {
  return (
    <section id="muscle" style={{ backgroundColor: '#0C0A08', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse at 60% 30%, rgba(201,169,110,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(201,169,110,0.04) 0%, transparent 60%)',
      }}></div>

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '11px' }} className="uppercase mb-4">Muscle & Recovery</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.15' }} className="font-normal mb-6">
            Build Strength. Recover Faster.<br /><span style={{ color: '#C9A96E' }}>Perform at a Higher Level.</span>
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '17px', lineHeight: '1.8' }}>
            Your body's ability to grow, recover, and perform is everything. The <strong style={{ color: '#FAFAF8', fontWeight: '400' }}>Lion Elite Muscle & Recovery Optimization Program</strong> is a structured, data-driven system designed to help you maximize muscle development, accelerate recovery, and operate at peak physical performance.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1rem', marginTop: '20px', fontStyle: 'italic' }}>
            This is not just training harder. This is optimizing how your body responds.
          </p>
        </div>

        {/* What + Why */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-5">What This Program Is</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.3', marginBottom: '28px' }} className="font-normal">A premium system designed to help you:</h3>
            <div className="space-y-4">
              {[
                { label: 'Build lean muscle more efficiently', icon: '💪' },
                { label: 'Improve recovery between workouts', icon: '⚡' },
                { label: 'Enhance strength and performance', icon: '🏋️' },
                { label: 'Support joint, tendon, and tissue health', icon: '🔩' },
                { label: 'Increase overall physical resilience', icon: '🛡️' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4" style={{ borderLeft: '2px solid #C9A96E33', paddingLeft: '20px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.5' }}>{item.label}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px', backgroundColor: '#161208', border: '1px solid #252015', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1rem', lineHeight: '1.7', fontStyle: 'italic' }}>
                "This is about creating an environment where your body can grow and recover at its highest level."
              </p>
            </div>
          </div>

          <div>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-5">Why This Is Different</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>Most people:</p>
            <div className="space-y-3 mb-8">
              {[
                'Train hard but recover poorly',
                'Plateau due to lack of proper recovery',
                'Deal with nagging injuries or inflammation',
                'Miss out on their full growth potential',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3" style={{ backgroundColor: '#161208', border: '1px solid #252015', padding: '14px 18px' }}>
                  <span style={{ color: '#C9A96E', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>✗</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.6' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#161208', border: '1px solid #C9A96E30', padding: '24px 28px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '8px' }} className="uppercase">Our approach</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We optimize the <span style={{ color: '#C9A96E' }}>internal systems</span> responsible for growth, repair, and recovery.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-3">The Process</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">How It Works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { step: '01', title: 'Performance & Recovery Assessment', desc: 'We evaluate key factors related to your recovery capacity, hormonal balance, inflammation levels, and training output.', points: ['Recovery capacity', 'Hormonal balance', 'Inflammation levels', 'Training output'] },
              { step: '02', title: 'Muscle & Recovery Strategy', desc: 'You receive a structured framework designed to support muscle growth, recovery speed, joint repair, and performance output.', points: ['Muscle growth & protein synthesis', 'Recovery speed & efficiency', 'Joint and tissue repair', 'Performance output'] },
              { step: '03', title: 'Guided Implementation', desc: 'We guide you through your plan so you can stay consistent, train smarter, and maximize results while reducing setbacks.', points: ['Stay consistent', 'Train smarter, not just harder', 'Maximize results'] },
            ].map(item => (
              <div key={item.step} style={{ backgroundColor: '#161208', border: '1px solid #252015', padding: '40px 32px', position: 'relative' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '12px' }} className="uppercase">Step {item.step}</p>
                <h4 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.15rem', marginBottom: '14px', lineHeight: '1.3' }} className="font-normal">{item.title}</h4>
                <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '16px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginBottom: '16px' }}>{item.desc}</p>
                <ul className="space-y-2">
                  {item.points.map(p => (
                    <li key={p} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#C9A96E', borderRadius: '50%', flexShrink: 0 }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7060', fontSize: '12px' }}>{p}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ fontFamily: 'Georgia, serif', color: '#221E14', fontSize: '5rem', lineHeight: '1', userSelect: 'none', textAlign: 'right', marginTop: '24px' }}>{item.step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase mb-3">Advanced Pathways</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', maxWidth: '640px', margin: '0 auto' }} className="font-normal">Key Benefits of Advanced Muscle & Recovery Optimization</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Enhanced Muscle Growth & Lean Mass', desc: "Support your body's ability to build and maintain quality muscle." },
              { title: 'Faster Recovery Between Workouts', desc: 'Train more frequently without excessive fatigue or burnout.' },
              { title: 'Improved Sleep & Deep Recovery', desc: 'Better recovery at night leads to better performance during the day.' },
              { title: 'Increased Strength & Performance Output', desc: 'Push harder and perform at a higher level consistently.' },
              { title: 'Joint, Tendon & Tissue Support', desc: 'Support recovery of connective tissue and reduce wear and tear.' },
              { title: 'Reduced Inflammation & Faster Healing', desc: 'Bounce back quicker from intense training or minor injuries.' },
              { title: 'Improved Body Composition', desc: 'Build muscle while supporting fat metabolism and overall physique.' },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: '#161208', border: '1px solid #252015', padding: '28px 24px' }} className="flex gap-4">
                <span style={{ color: '#C9A96E', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                <div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7060', fontSize: '12px', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who It's For + Real Benefit */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div style={{ backgroundColor: '#161208', border: '1px solid #252015', padding: '48px 40px' }}>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Ideal Candidate</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }} className="font-normal">Who This Is For</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
            <div className="space-y-4 mb-8">
              {['Want to build muscle efficiently', 'Train consistently and push performance', 'Struggle with recovery or plateaus', 'Want a structured, optimized system'].map((item, i) => (
                <div key={i} className="flex items-start gap-3" style={{ borderLeft: '2px solid #C9A96E40', paddingLeft: '16px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '14px', lineHeight: '1.5' }}>{item}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0C0A08', border: '1px solid #252015', padding: '20px 24px' }}>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                "This is a premium, high-touch system focused on performance and results."
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: '#161208', border: '1px solid #C9A96E25', padding: '48px 40px' }}>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">The Real Benefit</p>
            <h3 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.5rem', lineHeight: '1.3', marginBottom: '16px' }} className="font-normal">This isn't just about gaining muscle.</h3>
            <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
            <div className="space-y-3 mb-8">
              {['Recovering faster', 'Training at a higher level', 'Staying consistent without setbacks', 'Building a stronger, more resilient body'].map((item, i) => (
                <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#C9A96E' : '#1A1610', border: i % 2 === 0 ? 'none' : '1px solid #252015', padding: '14px 20px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: i % 2 === 0 ? '#000000' : '#7A7060', fontSize: '13px' }}>{item}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'Georgia, serif', color: '#6A6050', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: '1.6' }}>
              "When recovery improves, performance follows."
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ backgroundColor: '#161208', border: '1px solid #252015', padding: '48px', textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.6rem', lineHeight: '1.5', maxWidth: '560px', margin: '0 auto 28px' }} className="font-normal">
            Ready to train harder, recover faster,<br />and build at a higher level?
          </p>
          <a href="mailto:info@lionelitewellness.com"
            style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '18px 48px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            👉 Apply / Get Started Now
          </a>
        </div>

        {/* Disclaimer */}
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3428', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          The information provided in this program is for educational and informational purposes only and is not intended as medical advice. This program is not designed to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before making any health-related decisions.
        </p>
      </div>
    </section>
  )
}
