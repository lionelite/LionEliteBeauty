import { Link } from 'react-router-dom'

const timeline = [
  { week: 'Week 1–2', title: 'Hormonal Baseline', items: ['Full reproductive hormone panel reviewed', 'Inflammatory and thyroid markers assessed', 'Metabolic and nutrient status evaluated', 'Protocol built around your hormonal profile'] },
  { week: 'Week 3–6', title: 'Protocol Launch', items: ['Personalized fertility peptide protocol begins', 'Hormonal environment begins to shift', 'Cycle regularity often improves early for women', 'Energy and libido changes commonly noted'] },
  { week: 'Week 7–10', title: 'Optimization Phase', items: ['Reproductive markers trending toward optimal', 'Hormonal balance consolidating', 'Energy, mood, and physical wellness improving', 'Adjustments made based on mid-protocol data'] },
  { week: 'Week 11+', title: 'Maintenance & Review', items: ['Sustained hormonal optimization', 'Progress reviewed and protocol refined', 'Long-term fertility support strategy established', 'Ongoing monitoring and guidance in place'] },
]

export default function FertilityProgram() {
  return (
    <div>
      {/* Who This Is For */}
      <section style={{ backgroundColor: '#0A0812', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Who This Is For</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                For individuals struggling with:
              </h2>
              <div className="space-y-3 mb-10">
                {[
                  'Hormonal imbalances affecting reproductive function and overall wellbeing',
                  'Difficulty conceiving or wanting to optimize fertility proactively',
                  'Irregular cycles, low libido, or unexplained hormonal symptoms',
                  'Wanting a data-driven approach before pursuing conventional treatments',
                  'Men and women seeking to understand and optimize their reproductive biology',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4" style={{ backgroundColor: '#0C0A16', border: '1px solid #181420', padding: '16px 20px' }}>
                    <span style={{ color: '#B8A4D4', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>→</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A6A9A', fontSize: '14px', lineHeight: '1.6' }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#100E1A', border: '1px solid #B8A4D422', padding: '28px 32px' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#B8A4D4', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.7' }}>
                  "Fertility optimization isn't just for those struggling — it's for anyone who wants to take control of their reproductive health."
                </p>
              </div>
            </div>

            <div>
              <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">What This Program Fixes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                Root causes, not guesswork.
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { problem: 'Hormonal Imbalance', fix: 'Targeted hormonal pathway optimization and regulation' },
                  { problem: 'Low AMH / FSH', fix: 'Ovarian reserve and follicle support protocols for women' },
                  { problem: 'Low Testosterone', fix: 'Testosterone pathway support and optimization for men' },
                  { problem: 'Inflammation', fix: 'Systemic inflammation reduction for reproductive environment' },
                  { problem: 'Thyroid Dysfunction', fix: 'Thyroid and metabolic support affecting reproductive health' },
                  { problem: 'Poor Egg / Sperm Quality', fix: 'Antioxidant and cellular health support for gamete quality' },
                ].map(item => (
                  <div key={item.problem} style={{ backgroundColor: '#0C0A16', border: '1px solid #181420', padding: '20px 18px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '12px', letterSpacing: '0.08em', marginBottom: '6px' }} className="uppercase">{item.problem}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A3A6A', fontSize: '12px', lineHeight: '1.6' }}>{item.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ backgroundColor: '#080610', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">What's Included</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">Everything in the Program</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🧬', title: 'Full Reproductive Panel', desc: 'Comprehensive at-home testing covering sex hormones, thyroid, inflammation, and fertility-specific markers for both men and women.' },
              { icon: '📋', title: 'Personalized Fertility Protocol', desc: 'A targeted peptide and optimization protocol built around your specific hormonal profile and reproductive goals.' },
              { icon: '🎯', title: '1-on-1 Strategy Session', desc: 'A direct consultation to walk through your results, discuss your fertility goals, and align on the protocol approach.' },
              { icon: '📈', title: 'Implementation Guidance', desc: 'Clear, step-by-step protocol instructions. Timing, dosing, and cycling all mapped out precisely.' },
              { icon: '🔄', title: 'Ongoing Refinements', desc: 'Protocol adjusted based on response and hormone changes throughout the program.' },
              { icon: '⚡', title: 'Priority Support Access', desc: 'Direct support throughout the program for monitoring, questions, and protocol adjustments.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#0A0812', border: '1px solid #181420', padding: '32px 28px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '14px' }}>{item.icon}</span>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', letterSpacing: '0.06em', marginBottom: '8px' }} className="uppercase">{item.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#B8A4D4', marginBottom: '12px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: '#0A0812', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">Program Timeline</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">What to Expect & When</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-0">
            {timeline.map((t, i) => (
              <div key={t.week} style={{ padding: '36px 28px', borderLeft: i === 0 ? '1px solid #181420' : 'none', borderRight: '1px solid #181420', borderTop: '1px solid #181420', borderBottom: '1px solid #181420' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#B8A4D4', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '8px' }} className="uppercase">{t.week}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1rem', marginBottom: '16px', lineHeight: '1.3' }}>{t.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#B8A4D4', marginBottom: '14px' }}></div>
                <ul className="space-y-2">
                  {t.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#B8A4D444', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A3A6A', fontSize: '12px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + Why */}
      <section style={{ backgroundColor: '#080610', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: '#B8A4D4', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Expected Outcomes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">What you will actually notice.</h2>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '28px' }}>
                Results vary by individual. These are the most commonly reported outcomes from consistent protocol adherence:
              </p>
              <div className="space-y-3">
                {[
                  { outcome: 'Hormonal balance', detail: 'More stable hormonal levels — measurable in follow-up panels.' },
                  { outcome: 'Energy & libido', detail: 'Improved energy and drive commonly among the earliest reported changes.' },
                  { outcome: 'Cycle regularity', detail: 'More predictable and consistent cycles for women on protocol.' },
                  { outcome: 'Reproductive markers', detail: 'AMH, FSH, testosterone, and other key markers trending toward optimal.' },
                  { outcome: 'Overall wellbeing', detail: 'Mood, sleep, and physical wellbeing consistently improved.' },
                ].map(item => (
                  <div key={item.outcome} style={{ borderLeft: '2px solid #B8A4D433', paddingLeft: '20px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', marginBottom: '3px' }}>{item.outcome}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A2A5A', fontSize: '12px', lineHeight: '1.6' }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: '#0C0A16', border: '1px solid #B8A4D422', padding: '48px 40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#B8A4D4', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Why Early Action Matters</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.4rem', lineHeight: '1.5', marginBottom: '24px' }} className="font-normal">
                Fertility is easier to optimize<br />than it is to rescue.
              </p>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#B8A4D4', marginBottom: '24px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '24px' }}>
                Whether you're actively trying to conceive or simply want to understand and protect your reproductive health — starting with data gives you a significant advantage over waiting for a problem to appear.
              </p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9' }}>
                Programs typically range from <span style={{ color: '#FAFAF8' }}>$800–$1,500</span> depending on protocol complexity and support level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#0A0812', padding: '80px 0', borderTop: '1px solid #181420' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.4', maxWidth: '560px', margin: '0 auto 28px' }} className="font-normal">
            Ready to take a proactive, data-driven approach to your reproductive health?
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A2A5A', fontSize: '14px', lineHeight: '1.8', marginBottom: '36px' }}>
            Application required. Limited intake. Every protocol is built personally.
          </p>
          <Link to="/apply?program=fertility"
            style={{ display: 'inline-block', backgroundColor: '#B8A4D4', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '20px 56px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply for This Program →
          </Link>
        </div>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#1A1228', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '640px', margin: '48px auto 0', padding: '0 24px' }}>
          The information provided is for educational and informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before making health-related decisions.
        </p>
      </section>
    </div>
  )
}
