import { Link } from 'react-router-dom'

const skincare = [
  { name: 'GHK-Cu Intensive Serum', tagline: 'High-potency copper peptide complex', price: '$69.99', accent: '#C9A96E', slug: 'ghk-cu-serum' },
  { name: 'GHK-Cu Peptide Face Wash', tagline: 'Helps nourish & support daily skin health', price: '$69.99', accent: '#C9A96E', slug: 'ghk-cu-face-wash' },
  { name: 'KPV Recovery Moisturizer', tagline: 'Helps calm the appearance of redness & sensitivity', price: '$79.99', accent: '#8A7AB0', slug: 'kpv-moisturizer' },
  { name: 'Hydra Boost Body Wash', tagline: 'Helps nourish & hydrate skin all over', price: '$49.99', accent: '#7A9FBF', slug: 'hydra-boost-body-wash' },
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
    <section id="services" style={{ backgroundColor: '#FAF7F2', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.3em', fontSize: '10px' }}
            className="uppercase mb-4">What We Offer</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2.5rem', lineHeight: '1.15', letterSpacing: '-0.01em' }}
            className="font-normal mb-6">
            Skincare &amp; Wellness,<br />Built Around Your Biology.
          </h2>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '15px', lineHeight: '1.8', maxWidth: '520px', margin: '0 auto' }}>
            From clinical-grade peptide skincare to targeted wellness programs — everything designed to help you look, feel, and perform at your best.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: '32px', height: '1px', backgroundColor: '#8A9E85' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase">
              Advanced Peptide Skincare
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: '#E0D5C5' }}>
            {skincare.map((product) => (
              <div key={product.name}
                style={{ backgroundColor: '#FFFFFF', padding: '32px' }}
                className="group hover:bg-[#FAF7F2] transition-colors">
                <div style={{ width: '8px', height: '8px', backgroundColor: product.accent, borderRadius: '50%', marginBottom: '20px' }}></div>
                <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '16px', lineHeight: '1.3', marginBottom: '8px' }}>
                  {product.name}
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', lineHeight: '1.7', marginBottom: '20px' }}>
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

          <div style={{ backgroundColor: '#F5F0E8', border: '1px solid #E0D5C5', padding: '20px 32px', marginTop: '1px' }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', letterSpacing: '0.1em' }} className="uppercase">
              Current Skincare Collection — 4 Products
            </p>
            <Link to="/skincare"
              style={{
                backgroundColor: '#8A9E85', color: '#FFF',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                letterSpacing: '0.15em', fontSize: '11px',
                padding: '12px 28px', textDecoration: 'none',
              }}
              className="uppercase hover:opacity-90 transition-opacity whitespace-nowrap">
              Shop Skincare →
            </Link>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-10">
            <div style={{ width: '32px', height: '1px', backgroundColor: '#8A9E85' }}></div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.25em', fontSize: '10px' }} className="uppercase">
              Optimization Programs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ backgroundColor: '#E0D5C5' }}>
            {programs.map((program) => (
              <div key={program.name}
                style={{ backgroundColor: '#FFFFFF', padding: '32px', display: 'flex', flexDirection: 'column' }}
                className="group hover:bg-[#FAF7F2] transition-colors">
                <div style={{ width: '8px', height: '8px', backgroundColor: program.accent, borderRadius: '50%', marginBottom: '20px' }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '16px', lineHeight: '1.3', marginBottom: '8px' }}>
                    {program.name}
                  </p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '12px', lineHeight: '1.7', marginBottom: '20px' }}>
                    {program.tagline}
                  </p>
                </div>
                <Link to={program.applyHref}
                  style={{
                    display: 'block', backgroundColor: program.accent, color: '#FFF', textAlign: 'center',
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
