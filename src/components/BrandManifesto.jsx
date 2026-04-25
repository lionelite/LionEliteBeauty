import { Link } from 'react-router-dom'

export default function BrandManifesto() {
  return (
    <>
      {/* Philosophy strip */}
      <section style={{ backgroundColor: '#0D0D0D', padding: '100px 0', borderTop: '1px solid #141414', borderBottom: '1px solid #141414' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* Left — Statement */}
            <div>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '24px' }} className="uppercase">Our Philosophy</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.6rem', lineHeight: '1.2', marginBottom: '32px' }} className="font-normal">
                Optimization, not<br />just appearance.
              </h2>
              <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '32px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '16px', lineHeight: '1.9', marginBottom: '24px' }}>
                Most brands sell products. We build systems. Every program and product in the Lion Elite ecosystem is designed around one principle — working with your biology, not against it.
              </p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.7' }}>
                "Built for results, not hype."
              </p>
            </div>

            {/* Right — 4 pillars */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🧬', title: 'Peptide-Powered', desc: 'Advanced peptide science at the core of every formulation and protocol.' },
                { icon: '📊', title: 'Data-Driven', desc: 'Every recommendation backed by biomarker testing and real data.' },
                { icon: '⚕️', title: 'Clinical Grade', desc: 'Formulations and protocols held to medical-grade standards.' },
                { icon: '🎯', title: 'Precision First', desc: 'No guesswork. Every strategy is tailored to your unique biology.' },
              ].map(p => (
                <div key={p.title} style={{ backgroundColor: '#0A0A0A', border: '1px solid #1E1E1E', padding: '28px 24px' }}>
                  <span style={{ fontSize: '20px', display: 'block', marginBottom: '12px' }}>{p.icon}</span>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '8px' }} className="uppercase">{p.title}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', lineHeight: '1.7' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process strip — Test → Analyze → Optimize → Maintain */}
      <section style={{ backgroundColor: '#050505', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px' }} className="uppercase mb-3">How It Works</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">The Lion Elite Method</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { step: '01', title: 'Test', desc: 'At-home biomarker testing shipped directly to you. Comprehensive, clinical-grade analysis.' },
              { step: '02', title: 'Analyze', desc: 'Your data is reviewed and interpreted. No guesswork — only precision insights.' },
              { step: '03', title: 'Optimize', desc: 'A personalized strategy is built around your biology, goals, and performance targets.' },
              { step: '04', title: 'Maintain', desc: 'Guided implementation with ongoing recommendations to sustain and build on results.' },
            ].map((item, i) => (
              <div key={item.step} style={{
                padding: '40px 32px',
                borderLeft: i === 0 ? '1px solid #1A1A1A' : 'none',
                borderRight: '1px solid #1A1A1A',
                borderTop: '1px solid #1A1A1A',
                borderBottom: '1px solid #1A1A1A',
                position: 'relative',
              }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#1E1E1E', fontSize: '4rem', position: 'absolute', bottom: '16px', right: '20px', lineHeight: '1', userSelect: 'none' }}>{item.step}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '12px' }} className="uppercase">Step {item.step}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.4rem', marginBottom: '12px' }} className="font-normal">{item.title}</p>
                <div style={{ width: '24px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '14px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/programs/optimization"
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.2em', textDecoration: 'none' }}
              className="uppercase hover:opacity-70 transition-opacity">
              See All Programs →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
