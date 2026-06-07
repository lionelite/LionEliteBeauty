import { Link } from 'react-router-dom'

const timeline = [
  { week: 'Week 1–4', title: 'Root Cause Assessment', items: ['DHT, hormonal, and inflammation markers evaluated', 'Nutrient deficiencies linked to hair loss identified', 'Scalp health and follicle condition assessed', 'Protocol built for your specific hair loss pattern'] },
  { week: 'Week 5–8', title: 'Protocol Launch', items: ['Personalized hair peptide protocol begins', 'Scalp inflammation pathways targeted', 'Follicle support compounds activated', 'Shedding begins to slow in most cases'] },
  { week: 'Week 9–12', title: 'Visible Progress', items: ['New growth visible at hairline and temples', 'Existing hair becoming thicker and stronger', 'Scalp health visibly improved', 'Shedding rate normalized'] },
  { week: 'Week 13+', title: 'Density Phase', items: ['Continued density improvements', 'Protocol refined for growth consolidation', 'Maintenance phase established', 'Long-term hair health strategy in place'] },
]

export default function HairProgram() {
  return (
    <div>
      {/* Who This Is For */}
      <section style={{ backgroundColor: '#0F0C07', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Who This Is For</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                For individuals struggling with:
              </h2>
              <div className="space-y-3 mb-10">
                {[
                  'Visible thinning at the crown, temples, or hairline',
                  'Increased shedding or finding hair on pillow or in shower',
                  'Hair that has lost density, thickness, or texture quality',
                  'Early-stage androgenic alopecia or diffuse hair loss',
                  'Previously tried products without meaningful results',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4" style={{ backgroundColor: '#130F08', border: '1px solid #1E1810', padding: '16px 20px' }}>
                    <span style={{ color: '#C4A265', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>→</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A6A40', fontSize: '14px', lineHeight: '1.6' }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#181208', border: '1px solid #C4A26522', padding: '28px 32px' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#C4A265', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.7' }}>
                  "Hair loss is almost never just about hair — it's a signal. We find what's driving it."
                </p>
              </div>
            </div>

            <div>
              <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">What This Program Fixes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                Root causes, not surface treatments.
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { problem: 'DHT Sensitivity', fix: 'Targeted support for follicle DHT sensitivity pathways' },
                  { problem: 'Scalp Inflammation', fix: 'Anti-inflammatory peptide support at follicular level' },
                  { problem: 'Poor Circulation', fix: 'Scalp microcirculation and nutrient delivery optimization' },
                  { problem: 'Nutrient Deficiency', fix: 'Targeted correction of hair-critical nutrient gaps' },
                  { problem: 'Hormonal Imbalance', fix: 'Hormonal environment optimization for follicle health' },
                  { problem: 'Weak Follicles', fix: 'Growth factor and peptide support for follicle regeneration' },
                ].map(item => (
                  <div key={item.problem} style={{ backgroundColor: '#130F08', border: '1px solid #1E1810', padding: '20px 18px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '12px', letterSpacing: '0.08em', marginBottom: '6px' }} className="uppercase">{item.problem}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A4A20', fontSize: '12px', lineHeight: '1.6' }}>{item.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ backgroundColor: '#0C0A06', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">What's Included</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">Everything in the Program</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🧬', title: 'Hair-Specific Biomarker Testing', desc: 'At-home panel covering DHT, hormonal profile, inflammation, nutrient status, and other markers directly linked to hair loss.' },
              { icon: '📋', title: 'Personalized Restoration Protocol', desc: 'A targeted peptide protocol addressing your specific hair loss pattern and root causes — not a one-size-fits-all approach.' },
              { icon: '🎯', title: '1-on-1 Strategy Session', desc: 'A direct consultation to review your data, discuss your hair history, and ensure the protocol is aligned with your goals.' },
              { icon: '📈', title: 'Implementation Guidance', desc: 'Exact protocol instructions for topical, systemic, and lifestyle components. Nothing left to guesswork.' },
              { icon: '🔄', title: 'Ongoing Refinements', desc: 'Protocol adjusted based on response and growth progress throughout each phase.' },
              { icon: '⚡', title: 'Priority Support Access', desc: 'Direct support throughout the program for questions, monitoring, and adjustments as your progress develops.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0F0C07', border: '1px solid #1E1810', padding: '32px 28px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '14px' }}>{item.icon}</span>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', letterSpacing: '0.06em', marginBottom: '8px' }} className="uppercase">{item.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#C4A265', marginBottom: '12px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: '#0F0C07', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">Program Timeline</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">What to Expect & When</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-0">
            {timeline.map((t, i) => (
              <div key={t.week} style={{ padding: '36px 28px', borderLeft: i === 0 ? '1px solid #1E1810' : 'none', borderRight: '1px solid #1E1810', borderTop: '1px solid #1E1810', borderBottom: '1px solid #1E1810' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C4A265', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '8px' }} className="uppercase">{t.week}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1rem', marginBottom: '16px', lineHeight: '1.3' }}>{t.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#C4A265', marginBottom: '14px' }}></div>
                <ul className="space-y-2">
                  {t.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#C4A26544', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A4A20', fontSize: '12px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + Why */}
      <section style={{ backgroundColor: '#0C0A06', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: '#C4A265', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Expected Outcomes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">What you will actually notice.</h2>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '28px' }}>
                Hair restoration is a longer process than most programs. These are realistic timelines based on consistent protocol adherence:
              </p>
              <div className="space-y-3">
                {[
                  { outcome: 'Shedding reduction', detail: 'Less hair lost daily — typically one of the first noticeable changes.' },
                  { outcome: 'New growth', detail: 'Fine regrowth at affected areas, typically visible by weeks 8–12.' },
                  { outcome: 'Hair thickness', detail: 'Existing hairs become thicker and stronger over the protocol.' },
                  { outcome: 'Scalp health', detail: 'Reduced inflammation, oiliness, and scalp irritation.' },
                  { outcome: 'Overall density', detail: 'Progressive density improvement with consistent long-term protocol.' },
                ].map(item => (
                  <div key={item.outcome} style={{ borderLeft: '2px solid #C4A26533', paddingLeft: '20px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', marginBottom: '3px' }}>{item.outcome}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A3A10', fontSize: '12px', lineHeight: '1.6' }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: '#130F08', border: '1px solid #C4A26522', padding: '48px 40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C4A265', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Why This Is Different</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.4rem', lineHeight: '1.5', marginBottom: '24px' }} className="font-normal">
                Topicals treat the surface.<br />We address what's underneath.
              </p>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#C4A265', marginBottom: '24px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '24px' }}>
                Most hair products work on the surface. Hair loss is driven by systemic factors — hormones, inflammation, circulation, nutrients. We test for all of them, then build a protocol that actually targets the root.
              </p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9' }}>
                Programs typically range from <span style={{ color: '#FAFAF8' }}>$800–$1,500</span> depending on protocol complexity and support level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#0F0C07', padding: '80px 0', borderTop: '1px solid #1E1810' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.4', maxWidth: '560px', margin: '0 auto 28px' }} className="font-normal">
            Ready to take a real, data-driven approach to your hair?
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A3A10', fontSize: '14px', lineHeight: '1.8', marginBottom: '36px' }}>
            Application required. Limited intake. Every protocol is built personally.
          </p>
          <Link to="/apply?program=hair"
            style={{ display: 'inline-block', backgroundColor: '#C4A265', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '20px 56px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply for This Program →
          </Link>
        </div>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2010', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '640px', margin: '48px auto 0', padding: '0 24px' }}>
          The information provided is for educational and informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before making health-related decisions.
        </p>
      </section>
    </div>
  )
}
