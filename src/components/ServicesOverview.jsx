import { Link } from 'react-router-dom'

const skincare = [
  { name: 'GHK-Cu Intensive Serum', tagline: 'High-potency copper peptide complex — coming soon', price: 'Coming Soon', accent: '#C9A96E', slug: 'ghk-cu-serum' },
  { name: 'GHK-Cu Peptide Face Wash', tagline: 'Helps nourish & support daily skin health', price: '$69.99', accent: '#C9A96E', slug: 'ghk-cu-face-wash' },
  { name: 'Rejuvenate Serum', tagline: 'Supports the appearance of firmer, smoother skin', price: '$119.99', accent: '#8A9E85', slug: 'rejuvenate-serum' },
  { name: 'Collagen Boost Face Cream', tagline: 'Supports the appearance of skin firmness overnight', price: '$99.99', accent: '#C9A96E', slug: 'collagen-boost-cream' },
  { name: 'KPV Recovery Moisturizer', tagline: 'Helps calm the appearance of redness & sensitivity', price: '$79.99', accent: '#8A7AB0', slug: 'kpv-moisturizer' },
  { name: 'Hydra Boost Body Wash', tagline: 'Helps nourish & hydrate skin all over', price: '$49.99', accent: '#7A9FBF', slug: 'hydra-boost-body-wash' },
  { name: 'Post-Procedure Recovery Kit', tagline: 'Supports recovery appearance & skin comfort', price: '$189.99', accent: '#C9A96E', slug: 'recovery-kit' },
]

const programs = [
  { name: 'Muscle & Recovery', tagline: 'Build strength, recover faster, perform at a higher level.', accent: '#C9A96E', href: '/programs/muscle', applyHref: '/apply?program=muscle' },
  { name: 'Neuro Program', tagline: 'Unlock elite cognitive focus, clarity, and mental endurance.', accent: '#8A9E85', href: '/programs/neuro', applyHref: '/apply?program=neuro' },
  { name: 'Fertility Program', tagline: 'Data-driven hormonal and reproductive health optimization.', accent: '#B8A4D4', href: '/programs/fertility', applyHref: '/apply?program=fertility' },
  { name: 'Hair Program', tagline: 'Restore density, strengthen follicles, rebuild confidence.', accent: '#C4A265', href: '/programs/hair', applyHref: '/apply?program=hair' },
  { name: 'Weight Program', tagline: 'Precision fat loss, hunger control, and metabolic health.', accent: '#5BA87A', href: '/programs/weight', applyHref: '/apply?program=weight' },
  { name: 'Longevity Program', tagline: 'Cellular repair, anti-aging, and long-term resilience.', accent: '#7A9FBF', href: '/programs/longevity', applyHref: '/apply?program=longevity' },
]

export default function ServicesOverview() {
  return (
    <section id="services" style={{ backgroundColor: '#0A0A0A', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-20">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px' }}
            className="uppercase mb-4">What We Offer</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.5rem', lineHeight: '1.15', letterSpacing: '-0.01em' }}
            className="font-normal mb-6">
            Skincare &amp; Wellness,<br />Built Around Your Biology.
          </h2>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.8', maxWidth: '520px', margin: '0 auto' }}>
            From clinical-grade peptide skincare to targeted wellness programs — everything designed to help you look, feel, and perform at your best.
          </p>
        </div>

        {/* ── SKINCARE ── */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase">
              Advanced Peptide Skincare
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-px" style={{ backgroundColor: '#1A1A1A' }}>
            {skincare.map((product) => (
              <div key={product.name}
                style={{ backgroundColor: '#0A0A0A', padding: '32px' }}
                className="group hover:bg-[#0F0F0F] transition-colors">
                <div style={{ width: '8px', height: '8px', backgroundColor: product.accent, borderRadius: '50%', marginBottom: '20px' }}></div>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '16px', lineHeight: '1.3', marginBottom: '8px' }}>
                  {product.name}
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', lineHeight: '1.7', marginBottom: '20px' }}>
                  {product.tagline}
                </p>
                <div className="flex items-center justify-between">
                  <p style={{ fontFamily: 'Georgia, serif', color: product.accent, fontSize: '15px' }}>{product.price}</p>
                  <Link to={`/skincare/${product.slug}`}
                    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: product.accent, fontSize: '10px', letterSpacing: '0.15em', textDecoration: 'none' }}
                    className="uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#0F0F0F', border: '1px solid #1A1A1A', padding: '20px 32px', marginTop: '1px' }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', letterSpacing: '0.1em' }} className="uppercase">
              Complete Skincare Bundle — All Products
            </p>
            <Link to="/skincare"
              style={{
                backgroundColor: '#C9A96E', color: '#000',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                letterSpacing: '0.15em', fontSize: '11px',
                padding: '12px 28px', textDecoration: 'none',
              }}
              className="uppercase hover:opacity-90 transition-opacity whitespace-nowrap">
              Shop the Bundle — $499.99
            </Link>
          </div>
        </div>

        {/* ── WELLNESS PROGRAMS ── */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase">
              Optimization Programs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ backgroundColor: '#1A1A1A' }}>
            {programs.map((program) => (
              <div key={program.name}
                style={{ backgroundColor: '#0A0A0A', padding: '32px', display: 'flex', flexDirection: 'column' }}
                className="group hover:bg-[#0F0F0F] transition-colors">
                <div style={{ width: '8px', height: '8px', backgroundColor: program.accent, borderRadius: '50%', marginBottom: '20px' }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '16px', lineHeight: '1.3', marginBottom: '8px' }}>
                    {program.name}
                  </p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', lineHeight: '1.7', marginBottom: '20px' }}>
                    {program.tagline}
                  </p>
                </div>
                <Link to={program.applyHref}
                  style={{
                    display: 'block', backgroundColor: program.accent, color: '#000', textAlign: 'center',
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: '10px', letterSpacing: '0.2em',
                    padding: '12px', textDecoration: 'none',
                  }}
                  className="uppercase hover:opacity-90 transition-opacity">
                  Apply Now →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
