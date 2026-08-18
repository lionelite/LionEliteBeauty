import { Link } from 'react-router-dom'
import { skincareProducts } from '../data/skincareProducts'
import ProductImage from './ProductImage'

export default function SkincareLine() {
  return (
    <section id="skincare" style={{ backgroundColor: '#FAF8F4', padding: '105px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-14">
          <div className="lg:col-span-7">
            <p style={eyebrow}>The current skincare collection</p>
            <h2 style={heading}>Four products. Four clear jobs.</h2>
          </div>
          <div className="lg:col-span-5">
            <p style={copy}>Shop by what each formula is actually meant to do, then use the Ingredient Library when you want the deeper science and formula details.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skincareProducts.map(p => (
            <article key={p.slug} style={card}>
              <Link to={`/skincare/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ minHeight: '190px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4EEE6', marginBottom: '24px' }}>
                  <ProductImage src={p.image} alt={p.name} style={{ maxWidth: '135px', maxHeight: '170px', objectFit: 'contain' }} />
                </div>
                <p style={{ ...eyebrow, color: p.accent }}>{p.step}</p>
                <h3 style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '1.2rem', lineHeight: 1.3, marginBottom: '10px' }}>{p.name}</h3>
                <p style={{ ...copy, fontSize: '12px', minHeight: '64px' }}>{p.tagline}</p>
                <div className="flex items-center justify-between mt-5 pt-5" style={{ borderTop: '1px solid #E7DDD1' }}>
                  <span style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontSize: '1.25rem' }}>{p.price}</span>
                  <span style={{ color: '#A7895B', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase' }}>View →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Link to="/skincare" style={{ ...ctaCard, background: '#F3EDE4' }}>
            <span style={eyebrow}>Shop by skin goal</span>
            <strong style={ctaTitle}>Find the right starting point.</strong>
            <span style={ctaLink}>Explore skincare →</span>
          </Link>
          <Link to="/ingredients" style={{ ...ctaCard, background: '#EFF1EC' }}>
            <span style={eyebrow}>Ingredient Library</span>
            <strong style={ctaTitle}>Know what is in every formula.</strong>
            <span style={ctaLink}>Explore ingredients →</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

const eyebrow = { color: '#A7895B', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '.27em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '14px' }
const heading = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '2.55rem', lineHeight: 1.12 }
const copy = { fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#716D67', fontSize: '14px', lineHeight: 1.8 }
const card = { background: '#FFFDF9', border: '1px solid #E5DACD', padding: '18px' }
const ctaCard = { border: '1px solid #E0D5C8', padding: '32px', textDecoration: 'none', display: 'flex', flexDirection: 'column', minHeight: '175px' }
const ctaTitle = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '1.35rem' }
const ctaLink = { marginTop: 'auto', paddingTop: '24px', color: '#A7895B', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase' }
