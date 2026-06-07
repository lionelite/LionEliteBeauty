import { Link } from 'react-router-dom'

const timeline = [
  { week: 'Week 1–2', title: 'Foundation & Assessment', items: ['Biomarker review & baseline established', 'Recovery capacity evaluated', 'Protocol designed around your data', 'Initial inflammation & hormonal markers noted'] },
  { week: 'Week 3–4', title: 'Protocol Launch', items: ['Personalized peptide protocol begins', 'Training load & recovery patterns monitored', 'First observable improvements in soreness & sleep', 'Adjustments made based on early response'] },
  { week: 'Week 5–8', title: 'Performance Shift', items: ['Accelerated recovery between sessions', 'Noticeable strength and output gains', 'Joint and connective tissue support in effect', 'Energy consistency improving throughout the day'] },
  { week: 'Week 9+', title: 'Compound Results', items: ['Lean mass gains building consistently', 'Recovery windows shortening significantly', 'Performance plateau broken', 'Protocol refined for continued progression'] },
]

export default function MuscleProgram() {
  return (
    <div>
      {/* Who This Is For */}
      <section style={{ backgroundColor: '#0C0A08', padding: '80px 0', borderTop: '1px solid #1A1610' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Who This Is For</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                For individuals struggling with:
              </h2>
              <div className="space-y-3 mb-10">
                {[
                  'Slow recovery that limits how often or hard you can train',
                  'Strength plateaus despite consistent effort',
                  'Nagging joint pain, inflammation, or recurring injuries',
                  'Inconsistent energy and performance output',
                  'Training hard but not seeing results to match',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4" style={{ backgroundColor: '#111009', border: '1px solid #252015', padding: '16px 20px' }}>
                    <span style={{ color: '#C9A96E', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>→</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7060', fontSize: '14px', lineHeight: '1.6' }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#161208', border: '1px solid #C9A96E22', padding: '28px 32px' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.7' }}>
                  "If you train seriously and your body isn't keeping up with your effort — this program is built for you."
                </p>
              </div>
            </div>

            <div>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">What This Program Fixes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                The root causes — not the symptoms.
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { problem: 'Poor Recovery', fix: 'Peptide-supported tissue repair and inflammation reduction' },
                  { problem: 'Strength Plateau', fix: 'Optimized hormonal environment for muscle synthesis' },
                  { problem: 'Joint Inflammation', fix: 'Targeted connective tissue and collagen support' },
                  { problem: 'Energy Inconsistency', fix: 'Metabolic and mitochondrial performance support' },
                  { problem: 'Muscle Loss Risk', fix: 'Anti-catabolic pathways supported during high-stress phases' },
                  { problem: 'Sleep Quality', fix: 'Recovery-phase optimization for deep tissue repair' },
                ].map(item => (
                  <div key={item.problem} style={{ backgroundColor: '#111009', border: '1px solid #252015', padding: '20px 18px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '12px', letterSpacing: '0.08em', marginBottom: '6px' }} className="uppercase">{item.problem}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5040', fontSize: '12px', lineHeight: '1.6' }}>{item.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ backgroundColor: '#080806', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">What's Included</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">Everything in the Program</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🧬', title: 'Full Biomarker Assessment', desc: 'At-home testing kit shipped to you. Covers hormonal, inflammatory, metabolic, and recovery markers relevant to performance.' },
              { icon: '📋', title: 'Personalized Protocol', desc: 'A structured peptide protocol designed around your biomarker data, training history, and recovery patterns. Not a template.' },
              { icon: '🎯', title: '1-on-1 Strategy Session', desc: 'A direct consultation call to walk through your results, set your targets, and ensure your protocol is implemented correctly from day one.' },
              { icon: '📈', title: 'Implementation Guidance', desc: 'Step-by-step guidance so you\'re never guessing. We walk you through each phase of the protocol with full context.' },
              { icon: '🔄', title: 'Ongoing Adjustments', desc: 'Protocols are refined based on your response and progress — not locked in. Your body adapts; your program does too.' },
              { icon: '⚡', title: 'Priority Support Access', desc: 'Direct access to your protocol team throughout the program for questions, adjustments, and accountability.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0C0A08', border: '1px solid #1A1610', padding: '32px 28px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '14px' }}>{item.icon}</span>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', letterSpacing: '0.06em', marginBottom: '8px' }} className="uppercase">{item.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '12px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: '#0A0906', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">Program Timeline</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">What to Expect & When</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-0">
            {timeline.map((t, i) => (
              <div key={t.week} style={{ padding: '36px 28px', borderLeft: i === 0 ? '1px solid #1A1610' : 'none', borderRight: '1px solid #1A1610', borderTop: '1px solid #1A1610', borderBottom: '1px solid #1A1610', position: 'relative' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '8px' }} className="uppercase">{t.week}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1rem', marginBottom: '16px', lineHeight: '1.3' }}>{t.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '14px' }}></div>
                <ul className="space-y-2">
                  {t.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#C9A96E44', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5040', fontSize: '12px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expected Outcomes */}
      <section style={{ backgroundColor: '#080806', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Expected Outcomes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                What you will actually notice.
              </h2>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '28px' }}>
                Results vary by individual. These are the most commonly reported outcomes from consistent protocol adherence:
              </p>
              <div className="space-y-3">
                {[
                  { outcome: 'Recovery between sessions', detail: 'Soreness duration and intensity reduce. You\'re ready to train again sooner.' },
                  { outcome: 'Strength output', detail: 'Progressive strength gains resume after plateau. Lifts start moving again.' },
                  { outcome: 'Sleep quality', detail: 'Deeper, more restorative sleep — which is when real muscle repair occurs.' },
                  { outcome: 'Joint & tissue health', detail: 'Reduced inflammation signals. Less nagging pain during and after training.' },
                  { outcome: 'Energy levels', detail: 'More consistent energy throughout training sessions and the day overall.' },
                ].map(item => (
                  <div key={item.outcome} style={{ borderLeft: '2px solid #C9A96E33', paddingLeft: '20px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', marginBottom: '3px' }}>{item.outcome}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4030', fontSize: '12px', lineHeight: '1.6' }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ backgroundColor: '#111009', border: '1px solid #C9A96E22', padding: '48px 40px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">
                  Why Guidance Matters
                </p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.4rem', lineHeight: '1.5', marginBottom: '24px' }} className="font-normal">
                  Anyone can buy peptides.<br />Most people use them wrong.
                </p>
                <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '24px' }}>
                  Timing, dosage, cycling, and protocol stacking are what separate noticeable results from wasted investment. That's what we design — and what we manage alongside you.
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9' }}>
                  Programs typically range from <span style={{ color: '#FAFAF8' }}>$800–$1,500</span> depending on protocol complexity and support level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ backgroundColor: '#0C0A08', padding: '80px 0', borderTop: '1px solid #1A1610' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.4', maxWidth: '560px', margin: '0 auto 28px' }} className="font-normal">
            Ready to train harder, recover faster,<br />and build at a higher level?
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4030', fontSize: '14px', lineHeight: '1.8', marginBottom: '36px' }}>
            Application required. Limited intake. Every protocol is built personally.
          </p>
          <Link to="/apply?program=muscle"
            style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '20px 56px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply for This Program →
          </Link>
        </div>

        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '640px', margin: '48px auto 0', padding: '0 24px' }}>
          The information provided in this program is for educational and informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before making health-related decisions.
        </p>
      </section>
    </div>
  )
}
