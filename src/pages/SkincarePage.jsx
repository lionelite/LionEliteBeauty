import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { skincareProducts } from '../data/skincareProducts'
import SEO from '../components/SEO'
import ProductImage from '../components/ProductImage'

const goals = ['All', 'Firm + Smooth', 'Calm + Recover', 'Hydrate + Glow', 'Build My Routine']

export default function SkincarePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [goal, setGoal] = useState('All')
  const products = useMemo(() => goal === 'All' ? skincareProducts : skincareProducts.filter(p => (p.goal || []).includes(goal)), [goal])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Lion Elite Beauty Peptide Skincare',
    description: 'A focused peptide skincare collection built around GHK-Cu, KPV and supportive barrier ingredients.'
  }

  return (
    <div style={{ backgroundColor: '#FAF8F4', minHeight: '100vh' }}>
      <SEO title="Peptide Skincare Collection" description="Shop Lion Elite Beauty peptide skincare by skin goal: firm and smooth, calm and recover, hydrate and glow, or build a simple routine." jsonLd={jsonLd} />
      <Navbar />

      <section style={{ paddingTop: '145px', paddingBottom: '74px', borderBottom: '1px solid #E7DDD1' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <p style={eyebrow}>Peptide skincare, simplified</p>
              <h1 style={heading}>Start with what your skin needs.</h1>
            </div>
            <div className="lg:col-span-5">
              <p style={copy}>Four focused products. Clear jobs. A simple routine you can actually understand and use consistently.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '54px 0 30px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <p style={eyebrow}>What does your skin need today?</p>
          <div className="flex flex-wrap gap-2">
            {goals.map(g => (
              <button key={g} onClick={() => setGoal(g)} style={{ ...goalButton, background: goal === g ? '#C9AA73' : '#F3EDE4', color: '#4D4842' }}>{g}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '34px 0 90px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-5">
            {products.map(p => (
              <article key={p.slug} style={card}>
                <div className="grid sm:grid-cols-[180px_1fr] gap-7 items-center">
                  <Link to={`/skincare/${p.slug}`} style={{ background: '#F4EEE6', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ProductImage src={p.image} alt={p.name} style={{ maxWidth: '140px', maxHeight: '185px', objectFit: 'contain' }} />
                  </Link>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span style={{ ...eyebrow, color: p.accent, marginBottom: 0 }}>{p.step}</span>
                      <span style={size}>{p.size}</span>
                    </div>
                    <h2 style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '1.55rem', lineHeight: 1.2, marginBottom: '9px' }}>{p.name}</h2>
                    <p style={{ ...copy, fontSize: '13px', marginBottom: '18px' }}>{p.tagline}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {(p.bestFor || []).slice(0, 3).map(x => <span key={x} style={pill}>{x}</span>)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontSize: '1.5rem' }}>{p.price}</span>
                      <Link to={`/skincare/${p.slug}`} style={view}>View product →</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <div style={{ ...card, background: '#F3EDE4' }}>
              <p style={eyebrow}>The core routine</p>
              <h3 style={smallHeading}>Cleanse → Treat → Recover</h3>
              <p style={copy}>Start with the face wash, add the GHK-Cu serum as your treatment step, then finish with KPV moisturizer when your skin needs hydration and comfort.</p>
            </div>
            <Link to="/ingredients" style={{ ...card, background: '#EFF1EC', textDecoration: 'none' }}>
              <p style={eyebrow}>Ingredient Library</p>
              <h3 style={smallHeading}>Want the deeper science?</h3>
              <p style={copy}>See exactly which current products contain GHK-Cu, KPV, glycerin, panthenol, centella and more.</p>
              <span style={view}>Explore ingredients →</span>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const eyebrow = { color: '#A7895B', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '.27em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '14px' }
const heading = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '3rem', lineHeight: 1.08, letterSpacing: '-.025em' }
const smallHeading = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '1.45rem', marginBottom: '12px' }
const copy = { fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#716D67', fontSize: '15px', lineHeight: 1.8 }
const goalButton = { border: '1px solid #DED2C4', padding: '12px 16px', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer' }
const card = { background: '#FFFDF9', border: '1px solid #E4D9CC', padding: '24px' }
const size = { color: '#A09991', fontSize: '10px' }
const pill = { background: '#F3EDE4', border: '1px solid #E5DACE', padding: '6px 9px', color: '#716D67', fontSize: '9px', letterSpacing: '.06em' }
const view = { color: '#A7895B', textDecoration: 'none', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase' }
