import { Link } from 'react-router-dom'

const timeline = [
  { week: 'Week 1–2', title: 'Metabolic Baseline', items: ['Metabolic markers and hormone panel reviewed', 'Appetite regulation and insulin sensitivity assessed', 'Inflammation and cortisol patterns noted', 'Protocol built around your specific metabolic profile'] },
  { week: 'Week 3–4', title: 'Protocol Launch', items: ['Metabolic peptide protocol begins', 'Appetite and hunger signals begin stabilizing', 'Energy levels becoming more consistent', 'First measurable body composition shifts beginning'] },
  { week: 'Week 5–8', title: 'Active Fat Loss Phase', items: ['Accelerated fat metabolism in effect', 'Cravings and late-day hunger significantly reduced', 'Energy stable without blood sugar crashes', 'Visible changes in body composition underway'] },
  { week: 'Week 9+', title: 'Maintenance & Refinement', items: ['Results consolidating and sustainable', 'Metabolic rate optimized for long-term maintenance', 'Protocol adjusted for preservation phase', 'Lifestyle integration and long-term strategy set'] },
]

export default function WeightProgram() {
  return (
    <div>
      {/* Who This Is For */}
      <section style={{ backgroundColor: '#070E07', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Who This Is For</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                For individuals struggling with:
              </h2>
              <div className="space-y-3 mb-10">
                {[
                  'Stubborn body fat that doesn\'t respond to diet or exercise',
                  'Constant hunger, cravings, or inability to control appetite',
                  'Slow metabolism that makes weight loss feel impossible',
                  'Energy crashes that derail consistency and motivation',
                  'Weight that keeps returning despite repeated attempts',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4" style={{ backgroundColor: '#091209', border: '1px solid #142014', padding: '16px 20px' }}>
                    <span style={{ color: '#5BA87A', fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>→</span>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A7A5A', fontSize: '14px', lineHeight: '1.6' }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#0C160C', border: '1px solid #5BA87A22', padding: '28px 32px' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#5BA87A', fontSize: '1.05rem', fontStyle: 'italic', lineHeight: '1.7' }}>
                  "This isn't about willpower. Your metabolism is a system — and systems can be optimized."
                </p>
              </div>
            </div>

            <div>
              <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">What This Program Fixes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">
                Root causes, not willpower.
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { problem: 'Stubborn Fat', fix: 'GH and lipolysis pathway activation for fat mobilization' },
                  { problem: 'Constant Hunger', fix: 'Ghrelin and appetite hormone regulation support' },
                  { problem: 'Slow Metabolism', fix: 'Mitochondrial and thyroid function optimization' },
                  { problem: 'Energy Crashes', fix: 'Insulin sensitivity and blood sugar stabilization' },
                  { problem: 'Muscle Loss Risk', fix: 'Anti-catabolic preservation during caloric deficit' },
                  { problem: 'Weight Rebound', fix: 'Metabolic set point recalibration and maintenance protocol' },
                ].map(item => (
                  <div key={item.problem} style={{ backgroundColor: '#091209', border: '1px solid #142014', padding: '20px 18px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '12px', letterSpacing: '0.08em', marginBottom: '6px' }} className="uppercase">{item.problem}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A5A3A', fontSize: '12px', lineHeight: '1.6' }}>{item.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ backgroundColor: '#060906', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">What's Included</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">Everything in the Program</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🧬', title: 'Metabolic Biomarker Testing', desc: 'At-home testing covering metabolic rate, hormonal function, insulin sensitivity, inflammation, and body composition markers.' },
              { icon: '📋', title: 'Personalized Fat Loss Protocol', desc: 'A precision peptide protocol targeting your specific metabolic blockers. Built on your data — not a template.' },
              { icon: '🎯', title: '1-on-1 Strategy Session', desc: 'Direct consultation to walk through your results, align on goals, and map out the exact protocol implementation.' },
              { icon: '📈', title: 'Implementation Guidance', desc: 'Step-by-step guidance on protocol timing, cycling, and lifestyle integration for maximum effectiveness.' },
              { icon: '🔄', title: 'Ongoing Refinements', desc: 'Protocol adjusted based on how your body is responding — phase by phase, not set and forgotten.' },
              { icon: '⚡', title: 'Priority Support Access', desc: 'Direct support throughout the program. Questions answered, adjustments made without delay.' },
            ].map(item => (
              <div key={item.title} style={{ backgroundColor: '#070E07', border: '1px solid #142014', padding: '32px 28px' }}>
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '14px' }}>{item.icon}</span>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', letterSpacing: '0.06em', marginBottom: '8px' }} className="uppercase">{item.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#5BA87A', marginBottom: '12px' }}></div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.8' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: '#070E07', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">Program Timeline</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">What to Expect & When</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-0">
            {timeline.map((t, i) => (
              <div key={t.week} style={{ padding: '36px 28px', borderLeft: i === 0 ? '1px solid #142014' : 'none', borderRight: '1px solid #142014', borderTop: '1px solid #142014', borderBottom: '1px solid #142014' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '8px' }} className="uppercase">{t.week}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1rem', marginBottom: '16px', lineHeight: '1.3' }}>{t.title}</p>
                <div style={{ width: '20px', height: '1px', backgroundColor: '#5BA87A', marginBottom: '14px' }}></div>
                <ul className="space-y-2">
                  {t.items.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#5BA87A44', borderRadius: '50%', flexShrink: 0, marginTop: '6px' }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A5A3A', fontSize: '12px', lineHeight: '1.6' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes + Why */}
      <section style={{ backgroundColor: '#060906', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '14px' }} className="uppercase">Expected Outcomes</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.25', marginBottom: '24px' }} className="font-normal">What you will actually notice.</h2>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '28px' }}>
                Results vary by individual. These are the most commonly reported outcomes from consistent protocol adherence:
              </p>
              <div className="space-y-3">
                {[
                  { outcome: 'Appetite & hunger', detail: 'Cravings become manageable. Hunger normalizes between meals.' },
                  { outcome: 'Body composition', detail: 'Visible reduction in body fat, particularly stubborn areas.' },
                  { outcome: 'Energy levels', detail: 'Stable energy throughout the day without crashes or spikes.' },
                  { outcome: 'Metabolic rate', detail: 'Improved fat burning efficiency, even at rest.' },
                  { outcome: 'Mood & motivation', detail: 'Less driven by food cravings; more mental energy for everything else.' },
                ].map(item => (
                  <div key={item.outcome} style={{ borderLeft: '2px solid #5BA87A33', paddingLeft: '20px' }}>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px', marginBottom: '3px' }}>{item.outcome}</p>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A4A2A', fontSize: '12px', lineHeight: '1.6' }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: '#091209', border: '1px solid #5BA87A22', padding: '48px 40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Why This Works</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.4rem', lineHeight: '1.5', marginBottom: '24px' }} className="font-normal">
                Diets address behavior.<br />We address biology.
              </p>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#5BA87A', marginBottom: '24px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9', marginBottom: '24px' }}>
                If your hormones, metabolism, and appetite regulation are working against you — no diet will fix it. We identify which biological systems are underperforming and target them directly.
              </p>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '14px', lineHeight: '1.9' }}>
                Programs typically range from <span style={{ color: '#FAFAF8' }}>$800–$1,500</span> depending on protocol complexity and support level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#070E07', padding: '80px 0', borderTop: '1px solid #142014' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.8rem', lineHeight: '1.4', maxWidth: '560px', margin: '0 auto 28px' }} className="font-normal">
            Ready to finally get results that match the effort you're putting in?
          </p>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A4A2A', fontSize: '14px', lineHeight: '1.8', marginBottom: '36px' }}>
            Application required. Limited intake. Every protocol is built personally.
          </p>
          <Link to="/apply?program=weight"
            style={{ display: 'inline-block', backgroundColor: '#5BA87A', color: '#fff', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '20px 56px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply for This Program →
          </Link>
        </div>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#1A2A1A', fontSize: '11px', lineHeight: '1.8', textAlign: 'center', maxWidth: '640px', margin: '48px auto 0', padding: '0 24px' }}>
          The information provided is for educational and informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before making health-related decisions.
        </p>
      </section>
    </div>
  )
}
