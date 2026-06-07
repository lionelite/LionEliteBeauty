import { Link } from 'react-router-dom'

const timeline = [
  { week: 'Week 1–2', title: 'Longevity Baseline', items: ['Cellular health and inflammation markers assessed', 'Hormonal and metabolic aging indicators reviewed', 'Mitochondrial and oxidative stress markers noted', 'Protocol designed for your aging profile and goals'] },
  { week: 'Week 3–6', title: 'Protocol Launch', items: ['Cellular repair peptide protocol begins', 'Energy production and mitochondrial support activated', 'Anti-inflammatory pathways targeted', 'Earliest recovery and energy improvements typically felt'] },
  { week: 'Week 7–10', title: 'Systemic Shift', items: ['Inflammation markers trending lower', 'Physical recovery from exertion improving', 'Sleep quality and deep recovery enhanced', 'Cognitive sharpness and energy more consistent'] },
  { week: 'Week 11+', title: 'Long-Term Optimization', items: ['Cellular health markers measurably improved', 'Protocol refined for sustained vitality', 'Long-term longevity maintenance strategy established', 'Ongoing monitoring and protocol evolution in place'] },
]

export default function LongevityProgram() {
  return (
    <div>
      {/* Who This Is For */}
      <section style={{ backgroundColor: '#08090F', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Who This Is For</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                For individuals struggling with:
              </h2>
              <div className="space-y-3 mb-10">
                {[
                  'Feeling older than your age — less energy, less recovery, less resilience',
                  'Chronic low-grade inflammation affecting performance and longevity',
                  'Slower recovery from physical or mental stress than you used to have',
                  'Wanting to proactively invest in long-term health before decline sets in',
                  'Serious about maintaining strength, sharpness, and vitality long-term',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4" style={{ backgroundColor: '#0A0B12', border: '1px solid #14161E', padding: '16px 20px' }}>
                    <span style={{ color: '#7A9FBF', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>→</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A6A7A', fontSize: '14px', lineHeight: '1.6' }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#0C0D16', border: '1px solid #7A9FBF22', padding: '28px 32px' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#7A9FBF', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.7' }}>
                  "The best time to invest in longevity is before you need to. The second best time is now."
                </p>
              </div>
            </div>

            <div>
              <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">What This Program Fixes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                Root causes of accelerated aging.
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { problem: 'Chronic Inflammation', fix: 'Systemic anti-inflammatory peptide protocols targeting cellular aging' },
                  { problem: 'Mitochondrial Decline', fix: 'Energy production optimization at the cellular level' },
                  { problem: 'Poor Recovery', fix: 'Accelerated cellular repair and tissue regeneration support' },
                  { problem: 'Hormonal Aging', fix: 'Age-related hormonal decline support and optimization' },
                  { problem: 'Cognitive Decline', fix: 'Neuroprotective and brain longevity support protocols' },
                  { problem: 'Accelerated Aging', fix: 'Telomere-adjacent cellular protection and repair pathways' },
                ].map(item => (
                  <div key={item.problem} style={{ backgroundColor: '#0A0B12', border: '1px solid #14161E', padding: '20px 18px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '12px', letterSpacing: '0.08em', marginBottom: '6px' }} className="uppercase">{item.problem}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A4A5A', fontSize: '12px', lineHeight: '1.6' }}>{item.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ backgroundColor: '#060709', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">What's Included</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">Everything in the Program</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🧬', title: 'Longevity Biomarker Panel', desc: 'At-home testing covering cellular health, inflammation, hormonal aging, mitochondrial function, and key longevity markers.' },
              { icon: '📋', title: 'Personalized Longevity Protocol', desc: 'A precision peptide protocol targeting your specific aging indicators — built to address what\'s driving your biological age.' },
              { icon: '🎯', title: '1-on-1 Strategy Session', desc: 'Direct consultation to review your longevity data, align on your goals, and map out the exact protocol approach.' },
              { icon: '📈', title: 'Implementation Guidance', desc: 'Clear protocol guidance for each phase — what to take, when, and why. Nothing left to guesswork.' },
              { icon: '🔄', title: 'Ongoing Refinements', desc: 'Protocol evolves as you do. Adjustments made based on your body\'s response and marker improvements.' },
              { icon: '⚡', title: 'Priority Support Access', desc: 'Direct access to your protocol team throughout. Questions answered, adjustments made promptly.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#08090F', border: '1px solid #14161E', padding: '32px 28px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '14px' }}>{item.icon}</span>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', letterSpacing: '0.06em', marginBottom: '8px' }} className="uppercase">{item.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#7A9FBF', marginBottom: '12px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: '#08090F', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">Program Timeline</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">What to Expect & When</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-0">
            {timeline.map((t, i) => (
              <div key={t.week} style={{ padding: '36px 28px', borderLeft: i === 0 ? '1px solid #14161E' : 'none', borderRight: '1px solid #14161E', borderTop: '1px solid #14161E', borderBottom: '1px solid #14161E' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A9FBF', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '8px' }} className="uppercase">{t.week}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1rem', marginBottom: '16px', lineHeight: '1.3' }}>{t.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#7A9FBF', marginBottom: '14px' }}></div>
                <ul className="space-y-2">
                  {t.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#7A9FBF44', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A4A5A', fontSize: '12px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + Why */}
      <section style={{ backgroundColor: '#060709', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: '#7A9FBF', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Expected Outcomes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">What you will actually notice.</h2>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '28px' }}>
                Results vary by individual. These are the most commonly reported outcomes from consistent protocol adherence:
              </p>
              <div className="space-y-3">
                {[
                  { outcome: 'Energy & vitality', detail: 'More sustained energy — less fatigue, more physical and mental drive.' },
                  { outcome: 'Recovery speed', detail: 'Faster bounce-back from physical exertion and stress.' },
                  { outcome: 'Inflammation reduction', detail: 'Lower systemic inflammation — measurable in follow-up panels.' },
                  { outcome: 'Cognitive sharpness', detail: 'Mental clarity and focus maintained as part of overall longevity.' },
                  { outcome: 'Physical resilience', detail: 'Body handles stress, injury, and aging more effectively over time.' },
                ].map(item => (
                  <div key={item.outcome} style={{ borderLeft: '2px solid #7A9FBF33', paddingLeft: '20px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', marginBottom: '3px' }}>{item.outcome}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A3A4A', fontSize: '12px', lineHeight: '1.6' }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: '#0A0B12', border: '1px solid #7A9FBF22', padding: '48px 40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A9FBF', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">The Long Game</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.4rem', lineHeight: '1.5', marginBottom: '24px' }} className="font-normal">
                You can't buy back decades.<br />But you can protect the ones ahead.
              </p>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#7A9FBF', marginBottom: '24px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '24px' }}>
                Most people wait until decline is obvious before addressing it. Our clients invest now — when protocols are most effective and the biological window for optimization is still wide open.
              </p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9' }}>
                Programs typically range from <span style={{ color: '#FAFAF8' }}>$800–$1,500</span> depending on protocol complexity and support level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#08090F', padding: '80px 0', borderTop: '1px solid #14161E' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.4', maxWidth: '560px', margin: '0 auto 28px' }} className="font-normal">
            Ready to invest in the decades ahead?
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A3A4A', fontSize: '14px', lineHeight: '1.8', marginBottom: '36px' }}>
            Application required. Limited intake. Every protocol is built personally.
          </p>
          <Link to="/apply?program=longevity"
            style={{ display: 'inline-block', backgroundColor: '#7A9FBF', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '20px 56px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply for This Program →
          </Link>
        </div>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#14161E', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '640px', margin: '48px auto 0', padding: '0 24px' }}>
          The information provided is for educational and informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before making health-related decisions.
        </p>
      </section>
    </div>
  )
}
