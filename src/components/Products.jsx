const products = [
  {
    id: 1,
    name: 'GHK-Cu Peptide Face Wash',
    tagline: 'Daily Cleansing Formula',
    description: 'A gentle yet powerful cleanser infused with GHK-Cu copper peptides. Cleanses without stripping, preps skin for optimal serum absorption, and delivers an immediate peptide boost with every wash.',
    benefits: ['Boosts collagen synthesis', 'pH-balanced, sulfate-free', 'Morning & evening use'],
    badge: 'Bestseller',
    badgeColor: '#C9A96E',
    bgColor: '#F5F0E8',
    price: '$68',
    volume: '150ml',
  },
  {
    id: 2,
    name: 'Regenerating Peptide Serum',
    tagline: 'Advanced Anti-Aging Complex',
    description: 'Our flagship serum delivers concentrated GHK-Cu peptides deep into the dermis, visibly reducing fine lines and accelerating cellular renewal. The cornerstone of any clinical-grade home routine.',
    benefits: ['Multi-peptide complex', 'Clinical concentration', 'Dermatologist tested'],
    badge: 'Clinical Grade',
    badgeColor: '#8A9E85',
    bgColor: '#F0EEE9',
    price: '$124',
    volume: '30ml',
  },
  {
    id: 3,
    name: 'Peptide Anti-Aging Cream',
    tagline: 'Restorative Night Complex',
    description: 'Rich in bioactive peptides and skin-identical lipids. Works overnight to restore skin barrier, firm texture, and reverse photoaging. Wake up to visibly plumper, smoother skin.',
    benefits: ['Deep skin restoration', 'Barrier-supporting', 'Firming peptide matrix'],
    badge: 'New Formula',
    badgeColor: '#C9A96E',
    bgColor: '#F5F0E8',
    price: '$96',
    volume: '50ml',
  },
  {
    id: 4,
    name: 'Post-Procedure Recovery Kit',
    tagline: 'Professional Recovery Protocol',
    description: 'Developed for use after microneedling, peels, and at-home dermaroller sessions. Accelerates healing, reduces redness, and maximizes your treatment investment. Includes cleanser, serum, and barrier cream.',
    benefits: ['Accelerated healing', 'Reduces redness & sensitivity', 'Kit of 3 products'],
    badge: 'Full Kit',
    badgeColor: '#8A9E85',
    bgColor: '#F0EEE9',
    price: '$185',
    volume: 'Kit',
  },
]

export default function Products() {
  return (
    <section id="products" style={{ backgroundColor: '#F5F0E8', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
              className="text-xs uppercase tracking-widest mb-4">The Collection</p>
            <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2' }}
              className="font-normal">
              Clinical-Grade<br />GHK-Cu Collection
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '14px', lineHeight: '1.8', maxWidth: '300px' }}>
              Four products. One peptide system. Formulated to be used together or individually — each delivering clinical performance at home.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DDD0' }}
              className="group hover:shadow-xl transition-shadow duration-400 flex flex-col">

              {/* Product Image Area */}
              <div style={{ backgroundColor: product.bgColor, height: '260px', position: 'relative' }}
                className="overflow-hidden flex items-center justify-center">
                <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: product.badgeColor }}
                  className="px-3 py-1">
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '9px', letterSpacing: '0.15em' }}
                    className="uppercase">{product.badge}</span>
                </div>

                {/* Product bottle visual */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: product.id === 3 ? '100px' : '85px',
                    height: product.id === 3 ? '100px' : '140px',
                    backgroundColor: product.id % 2 === 0 ? '#2A2A2A' : '#FAFAF8',
                    borderRadius: product.id === 3 ? '50%' : '4px',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '14px',
                    border: `1px solid ${product.badgeColor}33`,
                    margin: '0 auto',
                  }}>
                    <div style={{ width: '22px', height: '2px', backgroundColor: product.badgeColor, marginBottom: '7px' }}></div>
                    <p style={{
                      fontFamily: 'Georgia, serif',
                      color: product.id % 2 === 0 ? '#FAFAF8' : '#1A1A1A',
                      fontSize: '7px', textAlign: 'center', lineHeight: '1.9', letterSpacing: '0.12em'
                    }}>LION<br />ELITE</p>
                    <div style={{ width: '22px', height: '1px', backgroundColor: product.badgeColor, marginTop: '7px' }}></div>
                  </div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '10px', letterSpacing: '0.1em', marginTop: '10px' }}>
                    {product.volume}
                  </p>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-1">
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: product.badgeColor, fontSize: '10px', letterSpacing: '0.2em' }}
                  className="uppercase tracking-widest mb-2">{product.tagline}</p>
                <h3 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1rem', lineHeight: '1.4' }}
                  className="font-normal mb-3">{product.name}</h3>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7' }}
                  className="mb-4 flex-1">{product.description}</p>

                <ul className="space-y-1.5 mb-6">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-center gap-2">
                      <div style={{ width: '4px', height: '4px', backgroundColor: product.badgeColor, borderRadius: '50%', flexShrink: 0 }}></div>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '12px' }}>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-auto">
                  <span style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.2rem' }}>{product.price}</span>
                  <button style={{
                    backgroundColor: product.badgeColor,
                    color: '#FFFFFF',
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: '10px', letterSpacing: '0.15em',
                    padding: '9px 18px', border: 'none', cursor: 'pointer'
                  }} className="uppercase tracking-widest hover:opacity-85 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bundle CTA */}
        <div style={{ backgroundColor: '#1A1A1A', padding: '48px', marginTop: '48px', display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, alignItems: 'center', gap: '24px', justifyContent: 'space-between' }}
          className="flex-col md:flex-row text-center md:text-left">
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.25em' }} className="uppercase mb-2">Best Value</p>
            <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.3rem' }}>Complete GHK-Cu System</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', marginTop: '6px' }}>All 4 products. Save $40. Free shipping.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <span style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.6rem' }}>$433</span>
            <a href="#"
              style={{ backgroundColor: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em' }}
              className="text-white text-xs uppercase tracking-widest px-10 py-4 hover:opacity-90 transition-opacity whitespace-nowrap">
              Shop the Bundle
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
