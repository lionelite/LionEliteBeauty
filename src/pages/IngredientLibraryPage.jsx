import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { ingredientLibrary } from '../data/ingredientLibrary'
import { skincareProducts } from '../data/skincareProducts'

export default function IngredientLibraryPage() {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('All')
  const groups = ['All', ...new Set(ingredientLibrary.map(i => i.group))]
  const filtered = useMemo(() => ingredientLibrary.filter(i => {
    const q = query.trim().toLowerCase()
    const matchQ = !q || `${i.name} ${i.fullName} ${i.summary}`.toLowerCase().includes(q)
    return matchQ && (group === 'All' || i.group === group)
  }), [query, group])

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <SEO title="Ingredient Library" description="Explore the peptides, hydrators, calming ingredients and cleansers used in Lion Elite Beauty skincare, with direct links to the products that contain them." />
      <Navbar />
      <main style={{ paddingTop: '130px', paddingBottom: '90px' }}>
        <section className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <p style={eyebrow}>Ingredient Library</p>
            <h1 style={heading}>Know what is in your routine — and why it is there.</h1>
            <p style={copy}>A clean reference for the ingredients used in the current Lion Elite Beauty skincare collection. Each entry links back to the products that actually contain it.</p>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-3 mb-10">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search GHK-Cu, KPV, glycerin…" style={input} />
            <div className="flex flex-wrap gap-2">
              {groups.map(g => <button key={g} onClick={() => setGroup(g)} style={{ ...filterButton, background: group === g ? '#C9AA73' : '#F3EDE4' }}>{g}</button>)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(i => (
              <article id={i.slug} key={i.slug} style={card}>
                <p style={eyebrow}>{i.group}</p>
                <h2 style={{ fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '1.5rem', marginBottom: '6px' }}>{i.name}</h2>
                <p style={{ ...copy, fontSize: '11px', color: '#9A9188', marginBottom: '18px' }}>{i.fullName}</p>
                <p style={{ ...copy, fontSize: '13px' }}>{i.summary}</p>
                <div style={{ borderTop: '1px solid #E7DDD1', paddingTop: '18px', marginTop: '22px' }}>
                  <p style={{ ...eyebrow, marginBottom: '10px' }}>Found in</p>
                  {i.products.map(slug => {
                    const p = skincareProducts.find(x => x.slug === slug)
                    return p ? <Link key={slug} to={`/skincare/${slug}`} style={productLink}>{p.shortName} →</Link> : null
                  })}
                </div>
                <Link to={`/ingredients/${i.slug}`} style={learnLink}>Read ingredient detail →</Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

const eyebrow = { color: '#A7895B', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '.27em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '14px' }
const heading = { fontFamily: 'Georgia, serif', color: '#302E2B', fontWeight: 400, fontSize: '2.7rem', lineHeight: 1.13, marginBottom: '20px' }
const copy = { fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#716D67', fontSize: '15px', lineHeight: 1.8 }
const input = { width: '100%', border: '1px solid #DED2C4', background: '#FFFDF9', padding: '14px 16px', color: '#302E2B', outline: 'none' }
const filterButton = { border: '1px solid #DED2C4', padding: '12px 14px', color: '#5F5A54', fontSize: '10px', letterSpacing: '.08em', cursor: 'pointer' }
const card = { background: '#FFFDF9', border: '1px solid #E4D9CC', padding: '30px', display: 'flex', flexDirection: 'column' }
const productLink = { display: 'block', color: '#A7895B', textDecoration: 'none', fontSize: '11px', marginBottom: '7px' }
const learnLink = { color: '#7C756D', textDecoration: 'none', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', marginTop: '22px' }
