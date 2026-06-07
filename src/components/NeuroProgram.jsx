import { Link } from 'react-router-dom'

const timeline = [
  { week: 'Week 1–2', title: 'Baseline & Setup', items: ['Cognitive baseline markers established', 'Sleep & recovery patterns reviewed', 'Neurotransmitter and inflammation markers noted', 'Protocol designed around your specific presentation'] },
  { week: 'Week 3–4', title: 'Protocol Launch', items: ['Personalized neuro peptide protocol begins', 'Focus and mental clarity shifts begin', 'Sleep quality improvements commonly reported', 'Baseline cognitive load feeling lighter'] },
  { week: 'Week 5–8', title: 'Cognitive Shift', items: ['Sustained focus during high-demand tasks', 'Reduction in afternoon energy crashes', 'Memory recall and processing speed improving', 'Mental stamina under pressure noticeably better'] },
  { week: 'Week 9+', title: 'Optimized Performance', items: ['Peak cognitive output becoming consistent', 'Stress resilience and mental clarity stable', 'Protocol refined for long-term maintenance', 'High-performance baseline locked in'] },
]

export default function NeuroProgram() {
  return (
    <div>
      {/* Who This Is For */}
      <section style={{ backgroundColor: '#080F08', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Who This Is For</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                For individuals struggling with:
              </h2>
              <div className="space-y-3 mb-10">
                {[
                  'Persistent brain fog that affects decision-making and output',
                  'Inability to sustain focus through long or complex work sessions',
                  'Mental fatigue that sets in earlier than it should',
                  'Memory, recall, or cognitive processing feeling slower',
                  'High-demand lifestyle with no cognitive reserve left by end of day',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4" style={{ backgroundColor: '#0A120A', border: '1px solid #151E15', padding: '16px 20px' }}>
                    <span style={{ color: '#8A9E85', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>→</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A7A6A', fontSize: '14px', lineHeight: '1.6' }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#0E160E', border: '1px solid #8A9E8522', padding: '28px 32px' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#8A9E85', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.7' }}>
                  "If your thinking isn't keeping pace with your ambition — this program closes that gap."
                </p>
              </div>
            </div>

            <div>
              <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">What This Program Fixes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                Root causes, not symptoms.
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { problem: 'Brain Fog', fix: 'Neuroinflammation reduction and neurotransmitter support' },
                  { problem: 'Focus Drop-Off', fix: 'Sustained acetylcholine and dopamine pathway optimization' },
                  { problem: 'Mental Fatigue', fix: 'Mitochondrial energy support in neural tissue' },
                  { problem: 'Poor Memory', fix: 'Hippocampal and synaptic plasticity support' },
                  { problem: 'Stress Sensitivity', fix: 'Cortisol and HPA axis regulation support' },
                  { problem: 'Sleep Quality', fix: 'Recovery-phase neural repair and deep sleep support' },
                ].map(item => (
                  <div key={item.problem} style={{ backgroundColor: '#0A120A', border: '1px solid #151E15', padding: '20px 18px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '12px', letterSpacing: '0.08em', marginBottom: '6px' }} className="uppercase">{item.problem}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A5A4A', fontSize: '12px', lineHeight: '1.6' }}>{item.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ backgroundColor: '#060806', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">What's Included</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">Everything in the Program</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🧬', title: 'Cognitive Biomarker Testing', desc: 'At-home testing covering neuro-relevant markers — inflammation, hormonal function, nutrient status, and cognitive performance indicators.' },
              { icon: '📋', title: 'Personalized Neuro Protocol', desc: 'A precision peptide protocol built for your specific cognitive profile. No generic stacks — every compound and dose is selected for your data.' },
              { icon: '🎯', title: '1-on-1 Strategy Session', desc: 'A direct consultation to review your results, establish cognitive goals, and ensure you start the program with full clarity on implementation.' },
              { icon: '📈', title: 'Step-by-Step Implementation', desc: 'Exact guidance on protocol timing, dosing, and cycling. Nothing left to interpretation.' },
              { icon: '🔄', title: 'Protocol Refinements', desc: 'Ongoing adjustments as your response evolves. What works at week 3 is refined for week 8 performance.' },
              { icon: '⚡', title: 'Priority Support Access', desc: 'Direct access to your protocol team throughout the program. Questions answered, adjustments made fast.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#080F08', border: '1px solid #151E15', padding: '32px 28px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '14px' }}>{item.icon}</span>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', letterSpacing: '0.06em', marginBottom: '8px' }} className="uppercase">{item.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#8A9E85', marginBottom: '12px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: '#080F08', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">Program Timeline</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">What to Expect & When</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-0">
            {timeline.map((t, i) => (
              <div key={t.week} style={{ padding: '36px 28px', borderLeft: i === 0 ? '1px solid #151E15' : 'none', borderRight: '1px solid #151E15', borderTop: '1px solid #151E15', borderBottom: '1px solid #151E15' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '8px' }} className="uppercase">{t.week}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1rem', marginBottom: '16px', lineHeight: '1.3' }}>{t.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#8A9E85', marginBottom: '14px' }}></div>
                <ul className="space-y-2">
                  {t.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#8A9E8544', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A5A4A', fontSize: '12px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + Why */}
      <section style={{ backgroundColor: '#060806', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: '#8A9E85', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Expected Outcomes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">What you will actually notice.</h2>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '28px' }}>
                Results vary by individual. These are the most commonly reported outcomes from consistent protocol adherence:
              </p>
              <div className="space-y-3">
                {[
                  { outcome: 'Mental clarity', detail: 'The fog lifts. Decisions feel sharper and less effortful.' },
                  { outcome: 'Sustained focus', detail: 'Longer work sessions without the mid-day cognitive wall.' },
                  { outcome: 'Memory & recall', detail: 'Information processing feels faster; retention improves.' },
                  { outcome: 'Stress resilience', detail: 'High-pressure situations are managed with more composure.' },
                  { outcome: 'Energy consistency', detail: 'Less variance between morning peak and afternoon crash.' },
                ].map(item => (
                  <div key={item.outcome} style={{ borderLeft: '2px solid #8A9E8533', paddingLeft: '20px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', marginBottom: '3px' }}>{item.outcome}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A4A3A', fontSize: '12px', lineHeight: '1.6' }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: '#0A120A', border: '1px solid #8A9E8522', padding: '48px 40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Why Personalization Matters</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.4rem', lineHeight: '1.5', marginBottom: '24px' }} className="font-normal">
                Cognitive performance is not one-size-fits-all.
              </p>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#8A9E85', marginBottom: '24px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '24px' }}>
                What causes brain fog in one person differs from another. Our biomarker-first approach identifies the actual root cause — then targets it specifically. That's what generic supplements cannot do.
              </p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9' }}>
                Programs typically range from <span style={{ color: '#FAFAF8' }}>$800–$1,500</span> depending on protocol complexity and support level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#080F08', padding: '80px 0', borderTop: '1px solid #151E15' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.4', maxWidth: '560px', margin: '0 auto 28px' }} className="font-normal">
            Ready to operate at your highest level — mentally and cognitively?
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A4A3A', fontSize: '14px', lineHeight: '1.8', marginBottom: '36px' }}>
            Application required. Limited intake. Every protocol is built personally.
          </p>
          <Link to="/apply?program=neuro"
            style={{ display: 'inline-block', backgroundColor: '#8A9E85', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '20px 56px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply for This Program →
          </Link>
        </div>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#1E2A1E', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '640px', margin: '48px auto 0', padding: '0 24px' }}>
          The information provided is for educational and informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before making health-related decisions.
        </p>
      </section>
    </div>
  )
}
