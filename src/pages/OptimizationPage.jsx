import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const allPrograms = [
  {
    id: 'muscle',
    label: 'Muscle & Recovery',
    tagline: 'Performance & Strength',
    bestFor: 'Athletes, active individuals, anyone who trains',
    outcome: 'Faster recovery, lean muscle, higher performance output',
    fixes: ['Slow recovery', 'Training plateaus', 'Nagging inflammation', 'Inconsistent strength gains'],
    accent: '#C9A96E',
    bg: '#0C0A08',
    border: '#C9A96E30',
    href: '/programs/muscle',
    icon: '💪',
  },
  {
    id: 'neuro',
    label: 'Neuro / Cognitive',
    tagline: 'Focus & Mental Performance',
    bestFor: 'Executives, high-performers, entrepreneurs',
    outcome: 'Sharper focus, reduced brain fog, sustained mental energy',
    fixes: ['Brain fog', 'Mental fatigue', 'Poor focus', 'Memory & recall issues'],
    accent: '#8A9E85',
    bg: '#080F08',
    border: '#8A9E8530',
    href: '/programs/neuro',
    icon: '🧠',
  },
  {
    id: 'fertility',
    label: 'Fertility & Hormonal',
    tagline: 'Reproductive & Hormonal Health',
    bestFor: 'Men & women optimizing for family planning',
    outcome: 'Balanced hormones, improved reproductive function, clarity',
    fixes: ['Hormonal imbalance', 'Unexplained infertility markers', 'Low energy & libido', 'Cycle irregularity'],
    accent: '#B8A4D4',
    bg: '#0A0810',
    border: '#B8A4D430',
    href: '/programs/fertility',
    icon: '🌿',
  },
  {
    id: 'hair',
    label: 'Hair Restoration',
    tagline: 'Density & Regrowth',
    bestFor: 'Anyone experiencing thinning, loss, or poor hair quality',
    outcome: 'Improved density, stronger follicles, healthier scalp',
    fixes: ['Hair thinning', 'Slow/no regrowth', 'Scalp inflammation', 'Brittle, weak hair'],
    accent: '#C4A265',
    bg: '#100E08',
    border: '#C4A26530',
    href: '/programs/hair',
    icon: '✦',
  },
  {
    id: 'weight',
    label: 'Weight & Metabolic',
    tagline: 'Fat Loss & Metabolic Reset',
    bestFor: 'Anyone with stubborn fat, slow metabolism, or hunger dysregulation',
    outcome: 'Reduced body fat, controlled appetite, stable energy',
    fixes: ['Stubborn fat', 'Constant hunger/cravings', 'Slow metabolism', 'Energy crashes'],
    accent: '#5BA87A',
    bg: '#080F08',
    border: '#5BA87A30',
    href: '/programs/weight',
    icon: '🔥',
  },
  {
    id: 'longevity',
    label: 'Longevity & Anti-Aging',
    tagline: 'Cellular Health & Resilience',
    bestFor: 'Those focused on long-term performance and healthy aging',
    outcome: 'Cellular repair, reduced inflammation, sustained vitality',
    fixes: ['Accelerated aging markers', 'Chronic fatigue', 'Poor injury recovery', 'Inflammation'],
    accent: '#7A9FBF',
    bg: '#08090C',
    border: '#7A9FBF30',
    href: '/programs/longevity',
    icon: '🔬',
  },
]

export default function OptimizationPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
      <Navbar />

      {/* Back */}
      <div style={{ paddingTop: '100px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="uppercase hover:text-[#C9A96E] transition-colors flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '20px' }} className="uppercase">
            Lion Elite Programs
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.12', marginBottom: '24px' }} className="font-normal">
            Personalized Peptide Protocols<br /><span style={{ color: '#C9A96E' }}>Built for Real Results.</span>
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '16px', lineHeight: '1.9', maxWidth: '560px', margin: '0 auto 32px' }}>
            Designed to improve recovery, performance, and long-term health through structured protocols built around your biology — not generic programs.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A', padding: '10px 18px' }}>
            <div style={{ width: '5px', height: '5px', backgroundColor: '#C9A96E', borderRadius: '50%' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.08em' }}>
              Application required · Limited client intake · Personalized onboarding
            </p>
          </div>
        </div>
      </section>

      {/* Program Cards */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPrograms.map((p) => (
              <div key={p.id} style={{ backgroundColor: p.bg, border: `1px solid ${p.border}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '40px 36px 28px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontSize: '2rem' }}>{p.icon}</span>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '9px', letterSpacing: '0.3em', paddingTop: '6px' }} className="uppercase">
                      {p.tagline}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.3rem', lineHeight: '1.3', marginBottom: '12px' }} className="font-normal">
                    {p.label}
                  </h2>
                  <div style={{ width: '24px', height: '1px', backgroundColor: p.accent, marginBottom: '16px' }}></div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '8px' }} className="uppercase">
                    Best For
                  </p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.7', marginBottom: '20px' }}>
                    {p.bestFor}
                  </p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '10px' }} className="uppercase">
                    Key Outcomes
                  </p>
                  <div className="space-y-1.5 mb-6">
                    {p.fixes.map(f => (
                      <div key={f} className="flex items-center gap-2">
                        <span style={{ color: p.accent, fontSize: '10px', flexShrink: 0 }}>✔</span>
                        <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '12px' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '0 36px 36px' }}>
                  <Link to={`/apply?program=${p.id}`}
                    style={{ display: 'block', backgroundColor: p.accent, color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.2em', padding: '14px', textAlign: 'center', textDecoration: 'none' }}
                    className="uppercase hover:opacity-90 transition-opacity">
                    Apply Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Comparison Table */}
      <section style={{ backgroundColor: '#050505', borderTop: '1px solid #111', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">
              Not Sure Which Program?
            </p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">
              Find the Right Fit
            </h2>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1A1A1A' }}>
                  <th style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.2em', padding: '16px 20px', textAlign: 'left', fontWeight: 400 }} className="uppercase">Program</th>
                  <th style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.2em', padding: '16px 20px', textAlign: 'left', fontWeight: 400 }} className="uppercase">Best For</th>
                  <th style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.2em', padding: '16px 20px', textAlign: 'left', fontWeight: 400 }} className="uppercase">Primary Outcome</th>
                  <th style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '10px', letterSpacing: '0.2em', padding: '16px 20px', textAlign: 'left', fontWeight: 400 }} className="uppercase">Timeline</th>
                  <th style={{ padding: '16px 20px' }}></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Muscle & Recovery', accent: '#C9A96E', bestFor: 'Athletes & active individuals', outcome: 'Faster recovery + lean mass', timeline: '4–8 weeks', href: '/programs/muscle', id: 'muscle' },
                  { label: 'Neuro / Cognitive', accent: '#8A9E85', bestFor: 'High-performers & executives', outcome: 'Focus, clarity, mental energy', timeline: '3–6 weeks', href: '/programs/neuro', id: 'neuro' },
                  { label: 'Fertility & Hormonal', accent: '#B8A4D4', bestFor: 'Men & women planning ahead', outcome: 'Hormonal balance & function', timeline: '6–12 weeks', href: '/programs/fertility', id: 'fertility' },
                  { label: 'Hair Restoration', accent: '#C4A265', bestFor: 'Thinning or loss concerns', outcome: 'Density & follicle support', timeline: '8–12 weeks', href: '/programs/hair', id: 'hair' },
                  { label: 'Weight & Metabolic', accent: '#5BA87A', bestFor: 'Stubborn fat & slow metabolism', outcome: 'Fat loss + appetite control', timeline: '4–8 weeks', href: '/programs/weight', id: 'weight' },
                  { label: 'Longevity & Anti-Aging', accent: '#7A9FBF', bestFor: 'Long-term health & resilience', outcome: 'Cellular repair + vitality', timeline: '8–16 weeks', href: '/programs/longevity', id: 'longevity' },
                ].map((row, i) => (
                  <tr key={row.label} style={{ borderBottom: '1px solid #0F0F0F', backgroundColor: i % 2 === 0 ? '#050505' : '#080808' }}>
                    <td style={{ padding: '18px 20px' }}>
                      <div className="flex items-center gap-3">
                        <div style={{ width: '7px', height: '7px', backgroundColor: row.accent, borderRadius: '50%', flexShrink: 0 }}></div>
                        <span style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '14px' }}>{row.label}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', padding: '18px 20px' }}>{row.bestFor}</td>
                    <td style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', padding: '18px 20px' }}>{row.outcome}</td>
                    <td style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: row.accent, fontSize: '12px', padding: '18px 20px', letterSpacing: '0.05em' }}>{row.timeline}</td>
                    <td style={{ padding: '18px 20px' }}>
                      <Link to={`/apply?program=${row.id}`}
                        style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: row.accent, fontSize: '10px', letterSpacing: '0.15em', textDecoration: 'none' }}
                        className="uppercase hover:opacity-70 transition-opacity whitespace-nowrap">
                        Apply →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: simple stack */}
          <div className="md:hidden space-y-3">
            {allPrograms.map(p => (
              <div key={p.id} style={{ backgroundColor: '#0A0A0A', border: `1px solid ${p.border}`, padding: '20px 24px' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div style={{ width: '7px', height: '7px', backgroundColor: p.accent, borderRadius: '50%' }}></div>
                    <span style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '14px' }}>{p.label}</span>
                  </div>
                  <Link to={`/apply?program=${p.id}`}
                    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: p.accent, fontSize: '10px', letterSpacing: '0.15em', textDecoration: 'none' }}
                    className="uppercase">Apply →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works (funnel steps) */}
      <section style={{ backgroundColor: '#080808', padding: '80px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '12px' }} className="uppercase">The Process</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem' }} className="font-normal">How You Get Started</h2>
          </div>
          <div className="grid md:grid-cols-5 gap-0">
            {[
              { num: '01', title: 'Apply', desc: 'Submit a short application so we can understand your goals and baseline.' },
              { num: '02', title: 'Consult', desc: 'A direct 1-on-1 call to review your goals and design your program.' },
              { num: '03', title: 'Protocol', desc: 'You receive a fully personalized peptide protocol built for your biology.' },
              { num: '04', title: 'Implement', desc: 'Guided implementation with direct support at every stage.' },
              { num: '05', title: 'Optimize', desc: 'Ongoing refinements based on your progress and response.' },
            ].map((step, i) => (
              <div key={step.num} style={{ padding: '36px 28px', borderLeft: i === 0 ? '1px solid #1A1A1A' : 'none', borderRight: '1px solid #1A1A1A', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', position: 'relative' }}>
                <p style={{ fontFamily: 'Georgia, serif', color: '#111', fontSize: '4rem', position: 'absolute', bottom: '12px', right: '16px', lineHeight: '1', userSelect: 'none' }}>{step.num}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.3em', marginBottom: '10px' }} className="uppercase">Step {step.num}</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', marginBottom: '10px' }} className="font-normal">{step.title}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', lineHeight: '1.8' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: '#050505', padding: '100px 0', borderTop: '1px solid #111' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '20px' }} className="uppercase">
            Ready to Start?
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.6rem', lineHeight: '1.12', marginBottom: '20px' }} className="font-normal">
            We only work with clients<br />we can genuinely help.
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '15px', lineHeight: '1.9', marginBottom: '40px' }}>
            Applications are reviewed personally. If your goals align with what our protocols can deliver, we'll reach out within 24–48 hours with next steps.
          </p>
          <Link to="/apply"
            style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.2em', padding: '20px 56px', textDecoration: 'none' }}
            className="uppercase hover:opacity-90 transition-opacity">
            Apply for a Program →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
