import { Link } from 'react-router-dom'

const steps = [
  { step: '01', label: 'Cleanse', product: 'GHK-Cu Peptide Face Wash', slug: 'ghk-cu-face-wash', accent: '#C9AA73', micro: 'Clean without stripping. Prep skin for what comes next.' },
  { step: '02', label: 'Treat', product: 'GHK-Cu Intensive Serum', slug: 'ghk-cu-serum', accent: '#C9AA73', micro: 'Concentrated copper peptide care for smoother, firmer-looking skin.' },
  { step: '03', label: 'Recover', product: 'KPV Recovery Moisturizer', slug: 'kpv-moisturizer', accent: '#9C8BAF', micro: 'Calm, hydrate and support the look of a comfortable skin barrier.' },
]

export default function RoutineSection() {
  return (
    <section style={{ backgroundColor: '#F8F4EE', padding: '105px 0', borderTop: '1px solid #E8DDD0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p style={eyebrow}>Peptide skincare, simplified</p>
          <h2 style={heading}>Cleanse. Treat. Recover.</h2>
          <p style={copy}>Three essential steps. Purposeful formulas. No complicated 12-step routine.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {steps.map(s => (
            <Link key={s.step} to={`/skincare/${s.slug}`} style={card}>
              <div className="flex items-center justify-between mb-12">
                <span style={{ ...eyebrow, color: s.accent, marginBottom: 0 }}>{s.step} / {s.label}</span>
                <span style={{ color: s.accent }}>↗</span>
              </div>
              <p style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontSize: '1.45rem', lineHeight: 1.25, marginBottom: '14px' }}>{s.product}</p>
              <p style={{ ...copy, fontSize: '13px', marginBottom: 0 }}>{s.micro}</p>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <Link to="/skincare/hydra-boost-body-wash" style={{ ...card, background: '#F1F4F4' }}>
            <p style={eyebrow}>For the body</p>
            <p style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontSize: '1.35rem', marginBottom: '10px' }}>Hydra Boost Body Wash</p>
            <p style={{ ...copy, fontSize: '13px' }}>Peptide-inspired body care designed to cleanse while supporting a soft, comfortable skin feel.</p>
            <span style={textLink}>Explore body care →</span>
          </Link>
          <Link to="/ingredients" style={{ ...card, background: '#F3EDE4' }}>
            <p style={eyebrow}>Ingredient Library</p>
            <p style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontSize: '1.35rem', marginBottom: '10px' }}>Know what is in your routine.</p>
            <p style={{ ...copy, fontSize: '13px' }}>Explore GHK-Cu, KPV and the supportive ingredients used throughout the current collection.</p>
            <span style={textLink}>Explore ingredients →</span>
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link to="/skincare" style={primary}>Shop Skincare →</Link>
        </div>
      </div>
    </section>
  )
}

const eyebrow = { color: '#A7895B', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '.28em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '14px' }
const heading = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '2.6rem', lineHeight: 1.12, marginBottom: '18px' }
const copy = { fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#716D67', fontSize: '15px', lineHeight: 1.8 }
const card = { background: '#FAF8F4', border: '1px solid #E6DCCF', padding: '38px', textDecoration: 'none', display: 'block', minHeight: '230px' }
const textLink = { color: '#A7895B', fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase' }
const primary = { display: 'inline-block', background: '#C9AA73', color: '#302E2B', textDecoration: 'none', padding: '15px 28px', fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase' }
