import { Link, Navigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { getIngredient } from '../data/ingredientLibrary'
import { skincareProducts } from '../data/skincareProducts'

export default function IngredientDetailPage() {
  const { slug } = useParams()
  const ingredient = getIngredient(slug)
  if (!ingredient) return <Navigate to="/ingredients" replace />
  const products = ingredient.products.map(s => skincareProducts.find(p => p.slug === s)).filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${ingredient.name} in Skincare`,
    description: ingredient.summary,
    author: { '@type': 'Organization', name: 'Lion Elite Beauty' },
    publisher: { '@type': 'Organization', name: 'Lion Elite Beauty' },
  }

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <SEO title={`${ingredient.name} in Skincare`} description={`${ingredient.summary} Learn why Lion Elite Beauty uses ${ingredient.name} and which current products contain it.`} jsonLd={jsonLd} />
      <Navbar />
      <main style={{ paddingTop: '130px', paddingBottom: '90px' }}>
        <article className="max-w-4xl mx-auto px-6">
          <Link to="/ingredients" style={back}>← Ingredient Library</Link>
          <p style={eyebrow}>{ingredient.group}</p>
          <h1 style={heading}>{ingredient.name}</h1>
          <p style={sub}>{ingredient.fullName}</p>
          <div style={rule} />

          <section style={section}>
            <p style={eyebrow}>What it is</p>
            <p style={copy}>{ingredient.summary}</p>
          </section>
          <section style={section}>
            <p style={eyebrow}>Why we use it</p>
            <p style={copy}>{ingredient.why}</p>
          </section>
          <section style={section}>
            <p style={eyebrow}>Found in the current collection</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {products.map(p => (
                <Link to={`/skincare/${p.slug}`} key={p.slug} style={productCard}>
                  <span style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontSize: '1.05rem' }}>{p.name}</span>
                  <span style={{ color: '#A7895B', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '8px' }}>View product →</span>
                </Link>
              ))}
            </div>
          </section>

          <div style={{ background: '#F3EDE4', border: '1px solid #E0D5C8', padding: '24px', marginTop: '40px' }}>
            <p style={{ ...copy, fontSize: '12px', margin: 0 }}>Ingredient information is provided for cosmetic education and product transparency. It is not medical advice and does not replace individualized guidance from a qualified professional.</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

const eyebrow = { color: '#A7895B', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '.27em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '14px' }
const heading = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '3rem', lineHeight: 1.08, marginBottom: '8px' }
const sub = { color: '#918A82', fontSize: '13px', marginBottom: '24px' }
const copy = { fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#716D67', fontSize: '15px', lineHeight: 1.85 }
const rule = { width: '44px', height: '1px', background: '#C9AA73', marginBottom: '42px' }
const section = { padding: '30px 0', borderBottom: '1px solid #E7DDD1' }
const back = { display: 'inline-block', color: '#8B837A', textDecoration: 'none', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '36px' }
const productCard = { background: '#FFFDF9', border: '1px solid #E4D9CC', padding: '22px', textDecoration: 'none', display: 'flex', flexDirection: 'column' }
