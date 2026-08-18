import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import ProductImage from '../components/ProductImage'
import { skincareProducts } from '../data/skincareProducts'

export default function ProductPage() {
  const { slug } = useParams()
  const product = skincareProducts.find(p => p.slug === slug)
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  if (!product) return <Navigate to="/skincare" replace />
  const p = product
  const related = p.pairsWith.map(s => skincareProducts.find(x => x.slug === s)).filter(Boolean)

  function addToCart() {
    addItem({ slug: p.slug, name: p.name, size: p.size, priceNum: p.priceNum })
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    image: p.image,
    description: p.description,
    brand: { '@type': 'Brand', name: 'Lion Elite Beauty' },
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: p.priceNum, availability: 'https://schema.org/InStock', url: `https://lionelitebeauty.com/skincare/${p.slug}` }
  }

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <SEO title={p.name} description={`${p.tagline} Shop ${p.name} from Lion Elite Beauty and explore the ingredients used in the formula.`} ogImage={p.image} jsonLd={jsonLd} />
      <Navbar />
      <main style={{ paddingTop: '110px' }}>
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <div className="flex items-center gap-2 mb-8">
            <Link to="/skincare" style={crumb}>Skincare</Link><span style={{ color: '#B9B0A7' }}>·</span><span style={{ ...crumb, color: '#A7895B' }}>{p.shortName}</span>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div style={{ background: '#F3EDE4', minHeight: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '55px' }}>
              <ProductImage src={p.image} alt={p.name} style={{ maxWidth: '300px', maxHeight: '400px', objectFit: 'contain' }} />
            </div>
            <div>
              <p style={{ ...eyebrow, color: p.accent }}>{p.step} · {p.size}</p>
              <h1 style={heading}>{p.name}</h1>
              <p style={{ fontFamily: 'Georgia, serif', color: '#72685D', fontSize: '1.25rem', lineHeight: 1.5, marginBottom: '22px' }}>{p.tagline}</p>
              <p style={copy}>{p.description}</p>

              <div className="flex flex-wrap gap-2 my-6">
                {(p.bestFor || []).map(x => <span key={x} style={pill}>{x}</span>)}
              </div>

              <div className="flex items-center gap-5 mt-8 mb-5">
                <span style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontSize: '2rem' }}>{p.price}</span>
                <button onClick={addToCart} style={{ ...primary, background: added ? '#A9B29E' : '#C9AA73' }}>{added ? '✓ Added' : 'Add to Bag →'}</button>
              </div>
              <p style={{ ...copy, fontSize: '12px' }}>Questions? <a href="mailto:info@lionelitebeauty.com" style={{ color: '#A7895B' }}>info@lionelitebeauty.com</a></p>
            </div>
          </div>
        </section>

        <section style={{ background: '#F3EDE4', borderTop: '1px solid #E3D7CA', borderBottom: '1px solid #E3D7CA', padding: '75px 0' }}>
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
            <div>
              <p style={eyebrow}>Why you may love it</p>
              <div className="space-y-4">
                {p.benefits.map(b => <div key={b.title} style={softCard}><strong style={miniTitle}>{b.title}</strong><p style={{ ...copy, fontSize: '13px', margin: 0 }}>{b.desc}</p></div>)}
              </div>
            </div>
            <div>
              <p style={eyebrow}>How to use</p>
              <ol className="space-y-4">
                {p.howToUse.map((x, i) => <li key={x} style={softCard}><span style={{ ...eyebrow, marginBottom: '6px' }}>0{i + 1}</span><p style={{ ...copy, fontSize: '13px', margin: 0 }}>{x}</p></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <p style={eyebrow}>Ingredient transparency</p>
              <h2 style={sectionHeading}>Powered by purposeful ingredients.</h2>
              <p style={copy}>Tap any ingredient for a plain-English explanation and the exact products in the current collection that contain it.</p>
              <Link to="/ingredients" style={textLink}>Explore the full Ingredient Library →</Link>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {p.keyIngredients.map(i => (
                <Link key={i.slug} to={`/ingredients/${i.slug}`} style={ingredientCard}>
                  <span style={miniTitle}>{i.name}</span>
                  <span style={{ ...copy, fontSize: '12px' }}>{i.role}</span>
                  <span style={{ ...textLink, marginTop: '18px' }}>Learn about {i.name} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#F8F4EE', padding: '70px 0', borderTop: '1px solid #E7DDD1' }}>
          <div className="max-w-7xl mx-auto px-6">
            <p style={eyebrow}>Complete the routine</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              {related.map(r => <Link key={r.slug} to={`/skincare/${r.slug}`} style={relatedCard}><span style={miniTitle}>{r.name}</span><span style={{ ...copy, fontSize: '12px' }}>{r.tagline}</span><span style={textLink}>View product →</span></Link>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

const eyebrow = { color: '#A7895B', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '.27em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '14px' }
const heading = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '2.8rem', lineHeight: 1.08, letterSpacing: '-.02em', marginBottom: '12px' }
const sectionHeading = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '2rem', lineHeight: 1.18, marginBottom: '18px' }
const copy = { fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#716D67', fontSize: '15px', lineHeight: 1.8 }
const crumb = { color: '#827B73', textDecoration: 'none', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase' }
const pill = { background: '#F3EDE4', border: '1px solid #E2D7CA', padding: '7px 10px', color: '#716D67', fontSize: '9px', letterSpacing: '.05em' }
const primary = { border: 0, color: '#302E2B', padding: '15px 26px', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer' }
const softCard = { background: '#FAF8F4', border: '1px solid #E3D8CB', padding: '22px' }
const miniTitle = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '1.05rem', display: 'block', marginBottom: '7px' }
const textLink = { display: 'inline-block', color: '#A7895B', textDecoration: 'none', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '18px' }
const ingredientCard = { background: '#FFFDF9', border: '1px solid #E4D9CC', padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column' }
const relatedCard = { background: '#FFFDF9', border: '1px solid #E4D9CC', padding: '24px', textDecoration: 'none', display: 'flex', flexDirection: 'column' }
