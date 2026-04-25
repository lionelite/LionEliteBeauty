// Repurposed as the "How It Works" section
const steps = [
  {
    number: '01',
    title: 'At-Home Biomarker Testing',
    description: 'We ship a simple test kit directly to your door. You complete it in minutes and send it back.',
    accent: '#C9A96E',
    details: ['Kit shipped to you', 'Complete in minutes', 'Prepaid return label'],
  },
  {
    number: '02',
    title: 'Data Analysis & Breakdown',
    description: 'We review your biomarkers and identify key patterns related to your performance and health.',
    accent: '#8A9E85',
    details: ['Hormones', 'Inflammation', 'Recovery', 'Metabolism'],
  },
  {
    number: '03',
    title: 'Personalized Optimization Plan',
    description: 'You receive a tailored strategy based on your results, goals, and lifestyle.',
    accent: '#C9A96E',
    details: ['Goal-specific strategy', 'Lifestyle-aligned', 'Easy to understand'],
  },
  {
    number: '04',
    title: 'Coaching & Implementation',
    description: 'We guide you on how to apply your plan for maximum results.',
    accent: '#8A9E85',
    details: ['1-on-1 guidance', 'Step-by-step execution', 'Ongoing support'],
  },
]

export default function Products() {
  return (
    <section id="how-it-works" style={{ backgroundColor: '#FFFFFF', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
            className="text-xs uppercase tracking-widest mb-4">The Process</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">How It Works</h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.8', maxWidth: '520px', margin: '20px auto 0' }}>
            No guessing. No random protocols. Just real data + strategic execution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number}
              style={{ backgroundColor: '#F5F0E8', borderTop: `3px solid ${step.accent}`, padding: '40px 32px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: step.accent, fontSize: '11px', letterSpacing: '0.25em', marginBottom: '8px' }}
                className="uppercase">Step {step.number}</p>
              <h3 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.15rem', lineHeight: '1.4', marginBottom: '16px' }}
                className="font-normal">{step.title}</h3>
              <div style={{ width: '28px', height: '1px', backgroundColor: step.accent, marginBottom: '16px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
                {step.description}
              </p>
              <ul className="space-y-2">
                {step.details.map(d => (
                  <li key={d} className="flex items-center gap-2">
                    <div style={{ width: '4px', height: '4px', backgroundColor: step.accent, borderRadius: '50%', flexShrink: 0 }}></div>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px' }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Visual flow */}
        <div style={{ backgroundColor: '#1A1A1A', padding: '48px', marginTop: '60px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '10px', letterSpacing: '0.3em', marginBottom: '24px' }} className="uppercase">
            Your Optimization Cycle
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['Test', 'Analyze', 'Optimize', 'Repeat'].map((item, i, arr) => (
              <div key={item} className="flex items-center gap-4">
                <span style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.1rem', letterSpacing: '0.05em' }}>{item}</span>
                {i < arr.length - 1 && (
                  <span style={{ color: '#3A3A3A', fontSize: '18px' }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
