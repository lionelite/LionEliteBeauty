const products = [
  {
    id: 1,
    name: 'GHK-Cu Peptide Face Wash',
    tagline: 'Clinical Cleansing Formula',
    description: 'A gentle yet powerful cleanser infused with GHK-Cu copper peptides that cleanse without stripping. Prepares skin for optimal peptide absorption.',
    benefits: ['Boosts collagen synthesis', 'Reduces inflammation', 'pH-balanced formula'],
    badge: 'Bestseller',
    badgeColor: '#C9A96E',
    bgColor: '#F5F0E8',
    price: '$68',
  },
  {
    id: 2,
    name: 'Regenerating Peptide Serum',
    tagline: 'Advanced Anti-Aging Complex',
    description: 'Our flagship serum delivers concentrated GHK-Cu peptides deep into the dermis, visibly reducing fine lines and accelerating cellular renewal.',
    benefits: ['Multi-peptide complex', 'Clinical concentration', 'Dermatologist tested'],
    badge: 'Clinical Grade',
    badgeColor: '#8A9E85',
    bgColor: '#F0EEE9',
    price: '$124',
  },
  {
    id: 3,
    name: 'Peptide Anti-Aging Cream',
    tagline: 'Restorative Night Complex',
    description: 'Rich in bioactive peptides and skin-identical lipids. Works overnight to restore skin barrier, firm texture, and reverse photoaging.',
    benefits: ['Deep skin restoration', 'Barrier-supporting', 'Firming peptide matrix'],
    badge: 'New Formula',
    badgeColor: '#C9A96E',
    bgColor: '#F5F0E8',
    price: '$96',
  },
  {
    id: 4,
    name: 'Post-Procedure Recovery Kit',
    tagline: 'Professional Recovery Protocol',
    description: 'Developed for use after microneedling, peels, and laser treatments. Accelerates healing, reduces redness, and maximizes treatment results.',
    benefits: ['Accelerated healing', 'Redness reduction', 'Used by providers'],
    badge: 'Provider Approved',
    badgeColor: '#8A9E85',
    bgColor: '#F0EEE9',
    price: '$185',
  },
]

export default function Products() {
  return (
    <section id="products" style={{ backgroundColor: '#F5F0E8', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
              className="text-xs uppercase tracking-widest mb-4">
              Peptide Skincare
            </p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2', letterSpacing: '-0.01em' }}
              className="font-normal">
              Clinical-Grade<br />GHK-Cu Collection
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8', maxWidth: '300px' }}>
              Scientifically formulated with the most bioavailable form of copper peptide technology available outside clinical settings.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DDD0' }}
              className="group hover:shadow-xl transition-shadow duration-400 flex flex-col">

              {/* Product Image Area */}
              <div style={{ backgroundColor: product.bgColor, height: '240px', position: 'relative' }}
                className="overflow-hidden flex items-center justify-center">
                {/* Badge */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: product.badgeColor }}
                  className="px-3 py-1">
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '9px', letterSpacing: '0.15em' }}
                    className="uppercase tracking-widest">{product.badge}</span>
                </div>

                {/* Stylized Product Visual */}
                <div className="text-center">
                  <div style={{
                    width: '90px',
                    height: product.id % 2 === 0 ? '130px' : '120px',
                    backgroundColor: product.id % 2 === 0 ? '#2A2A2A' : '#FAFAF8',
                    margin: '0 auto',
                    borderRadius: '3px',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    border: `1px solid ${product.badgeColor}22`
                  }}>
                    <div style={{ width: '24px', height: '2px', backgroundColor: product.badgeColor, marginBottom: '8px' }}></div>
                    <p style={{
                      fontFamily: 'Georgia, serif',
                      color: product.id % 2 === 0 ? '#FAFAF8' : '#1A1A1A',
                      fontSize: '8px',
                      textAlign: 'center',
                      lineHeight: '1.8',
                      letterSpacing: '0.1em'
                    }}>LION<br />ELITE</p>
                    <div style={{ width: '24px', height: '1px', backgroundColor: product.badgeColor, marginTop: '8px' }}></div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-1">
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: product.badgeColor, fontSize: '10px', letterSpacing: '0.2em' }}
                  className="uppercase tracking-widest mb-2">
                  {product.tagline}
                </p>
                <h3 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1rem', lineHeight: '1.4' }}
                  className="font-normal mb-3">
                  {product.name}
                </h3>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7' }}
                  className="mb-4 flex-1">
                  {product.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-1.5 mb-6">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: product.badgeColor, borderRadius: '50%' }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px' }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <span style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.2rem' }}>{product.price}</span>
                  <button style={{
                    backgroundColor: 'transparent',
                    border: `1px solid ${product.badgeColor}`,
                    color: product.badgeColor,
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    padding: '8px 16px'
                  }} className="uppercase tracking-widest hover:opacity-70 transition-opacity">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <a href="#consultation"
            style={{ backgroundColor: '#1A1A1A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em' }}
            className="text-white text-xs uppercase tracking-widest px-12 py-4 inline-block hover:opacity-80 transition-opacity">
            Get Personalized Product Recommendations
          </a>
        </div>
      </div>
    </section>
  )
}
