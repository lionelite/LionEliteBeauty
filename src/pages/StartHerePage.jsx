import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Step({ number, title, desc, accent = '#C9A96E' }) {
  return (
    <div className="flex items-start gap-5">
      <div style={{ width: '40px', height: '40px', border: `1px solid ${accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: 'Georgia, serif', color: accent, fontSize: '13px' }}>{number}</span>
      </div>
      <div>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>{title}</p>
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '13px', lineHeight: '1.8' }}>{desc}</p>
      </div>
    </div>
  )
}

const ingredients = [
  {
    name: 'GHK-Cu',
    fullName: 'Glycyl-L-Histidyl-L-Lysine Copper',
    accent: '#C9A96E',
    badge: 'Core Peptide',
    tagline: 'The copper peptide found in five of our six products.',
    what: 'GHK-Cu is a naturally occurring copper peptide found in human blood and tissue. Your body produces it — but levels decline significantly after your 20s. It is the foundational ingredient across the Lion Elite Beauty range, included in every core product.',
    does: [
      'Studied alongside thousands of genes involved in skin renewal and barrier repair',
      'Supports the appearance of skin firmness and a more youthful-looking complexion',
      'Helps support the appearance of smoother skin texture and a more even tone',
      'Supports the appearance of a comfortable, nourished complexion after procedures',
      'Formulated into cleansers, serums, creams and body wash for full-routine nourishment',
    ],
    products: ['GHK-Cu Peptide Face Wash', 'Rejuvenate Serum', 'Collagen Boost Face Cream', 'Hydra Boost Body Wash', 'Post-Procedure Recovery Kit'],
    slugs: ['ghk-cu-face-wash', 'rejuvenate-serum', 'collagen-boost-cream', 'hydra-boost-body-wash', 'recovery-kit'],
    why: 'GHK-Cu has been studied since the 1970s and is one of the most researched peptides in dermatology. We chose it as the foundation of our entire range because the depth of research behind it is unmatched. It is formulated at meaningful concentrations — not trace marketing amounts.',
  },
  {
    name: 'KPV',
    fullName: 'Lysine-Proline-Valine Tripeptide',
    accent: '#8A7AB0',
    badge: 'Calming Peptide',
    tagline: 'The calming peptide in the KPV Moisturizer and Recovery Kit.',
    what: 'KPV is a tripeptide fragment derived from alpha-MSH — a peptide studied for its role in skin comfort and calming. It is formulated into the KPV Recovery Moisturizer and Post-Procedure Recovery Kit to help support the appearance of calm, comfortable skin.',
    does: [
      'Helps support the appearance of calm, even-toned skin — not just surface masking',
      'Formulated to help support a more comfortable skin appearance for sensitive skin types',
      'Supports the appearance of a more resilient skin barrier with consistent use',
      'Helps support a more comfortable skin appearance during and after procedures',
      'Pairs with Centella Asiatica in the KPV Moisturizer for a dual-ingredient calming approach',
    ],
    products: ['KPV Recovery Moisturizer', 'Post-Procedure Recovery Kit'],
    slugs: ['kpv-moisturizer', 'recovery-kit'],
    why: 'Most "calming" skincare uses botanical extracts that temporarily mask the appearance of redness. KPV is a peptide — formulated to work alongside the skin\'s own biology to help support a calm, comfortable appearance, not just cover it up.',
  },
  {
    name: 'Hyaluronic Acid',
    fullName: 'Sodium Hyaluronate (3 molecular weights)',
    accent: '#7A9FBF',
    badge: 'Hydration Complex',
    tagline: 'Three-weight hydration in the Rejuvenate Serum and Recovery Kit.',
    what: 'Hyaluronic acid is a naturally occurring polysaccharide found throughout your body. It is included in the Rejuvenate Serum at three different molecular weights — each one formulated to nourish at a different skin depth. It also appears in the Post-Procedure Recovery Kit.',
    does: [
      'Three different molecular weights nourish at different skin depths simultaneously',
      'Helps support the appearance of plumper, more hydrated-looking skin',
      'Supports the appearance of skin suppleness and a healthy, comfortable feel',
      'Helps nourish the skin barrier and support moisture comfort throughout the day',
      'Included in the Recovery Kit to help support a comfortable post-procedure appearance',
    ],
    products: ['Rejuvenate Serum', 'Post-Procedure Recovery Kit'],
    slugs: ['rejuvenate-serum', 'recovery-kit'],
    why: 'Many brands use a single molecular weight of hyaluronic acid that only works at the surface. The Rejuvenate Serum uses three different molecular weights — small, medium and large — so nourishment is supported at multiple depths of the skin, not just the top layer.',
  },
  {
    name: 'Niacinamide',
    fullName: 'Vitamin B3 (Nicotinamide)',
    accent: '#C4A265',
    badge: 'Brightening + Barrier',
    tagline: 'The multi-tasker in the Rejuvenate Serum.',
    what: 'Niacinamide is a form of Vitamin B3 and one of the most versatile and well-tolerated ingredients in skincare. It is included in the Rejuvenate Serum, where it works alongside GHK-Cu and Hyaluronic Acid to help support a brighter, more even-looking complexion.',
    does: [
      'Supports the appearance of a more even, brighter-looking skin tone',
      'Helps support the appearance of refined pores and a smoother skin surface',
      'Supports the appearance of a healthy skin barrier and moisture comfort',
      'Helps support the appearance of calm, even-toned skin',
      'Works alongside GHK-Cu in the Rejuvenate Serum to support overall skin appearance',
    ],
    products: ['Rejuvenate Serum'],
    slugs: ['rejuvenate-serum'],
    why: 'Niacinamide is one of the most broadly studied ingredients in skincare. Its inclusion in the Rejuvenate Serum is deliberate — it supports skin barrier function, helping the skin respond better to everything the formula delivers, while independently supporting skin tone appearance.',
  },
  {
    name: 'Ceramides',
    fullName: 'Ceramide Complex (NP, AP & EOP)',
    accent: '#B8A4D4',
    badge: 'Barrier Complex',
    tagline: 'The barrier-nourishing complex in the Collagen Boost Cream and Recovery Kit.',
    what: 'Ceramides are lipid molecules naturally found in the skin\'s outer layer. They are the key structural component of the skin barrier — helping to hold moisture in and keep environmental irritants out. The Collagen Boost Face Cream and Post-Procedure Recovery Kit both contain a ceramide complex.',
    does: [
      'Helps support the appearance of a healthy, nourished skin barrier',
      'Supports the appearance of comfortable, less reactive skin with consistent use',
      'Helps nourish and support moisture retention throughout the day and night',
      'Supports the appearance of resilient skin in the Collagen Boost Cream overnight formula',
      'Included in the Recovery Kit to help support the appearance of a recovered barrier post-procedure',
    ],
    products: ['Collagen Boost Face Cream', 'Post-Procedure Recovery Kit'],
    slugs: ['collagen-boost-cream', 'recovery-kit'],
    why: 'Ceramide levels decline with age and can be disrupted by over-exfoliation, harsh cleansers, and environmental stress. They appear in both the Collagen Boost Face Cream (for overnight barrier support) and the Recovery Kit (for post-procedure barrier nourishment) — because healthy skin appearance starts with a healthy barrier.',
  },
  {
    name: 'Centella Asiatica',
    fullName: 'Cica / Gotu Kola Extract',
    accent: '#5BA87A',
    badge: 'Calming Botanical',
    tagline: 'The botanical calming ingredient in the KPV Recovery Moisturizer.',
    what: 'Centella Asiatica (also known as Cica or Gotu Kola) is a botanical extract with centuries of use in traditional wellness and decades of research in dermatology. It is formulated into the KPV Recovery Moisturizer alongside KPV peptide to help support the appearance of calm, resilient skin.',
    does: [
      'Supports the appearance of calm, soothed skin through its active botanical compounds',
      'Helps support the appearance of an even, comfortable complexion for redness-prone skin',
      'Supports the appearance of a healthy, nourished skin barrier',
      'Works alongside KPV peptide in the Recovery Moisturizer for a dual calming approach',
      'Supports the appearance of skin resilience with consistent daily use',
    ],
    products: ['KPV Recovery Moisturizer'],
    slugs: ['kpv-moisturizer'],
    why: 'Centella Asiatica pairs with KPV in the Recovery Moisturizer to help support the appearance of calm, comfortable skin from two different directions — a peptide approach and a botanical approach. The combination is formulated to be more comprehensive than either ingredient alone.',
  },
]

export default function StartHerePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#080808', paddingTop: '140px', paddingBottom: '80px', borderBottom: '1px solid #141414' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.3em', fontSize: '10px' }}
            className="uppercase mb-5">New to Peptide Skincare?</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3rem', lineHeight: '1.12', letterSpacing: '-0.02em' }}
            className="font-normal mb-6">
            Understand what's in<br />your skincare. And why.
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '16px', lineHeight: '1.9', maxWidth: '540px', margin: '0 auto' }}>
            Every ingredient in the Lion Elite Beauty range is here for a reason. This page explains what each one is, what it does to your skin, and which product it's in — so you can make informed decisions, not guesses.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section style={{ backgroundColor: '#050505', borderBottom: '1px solid #111', padding: '24px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '10px', letterSpacing: '0.2em' }} className="uppercase">Jump to:</span>
            {ingredients.map(ing => (
              <a key={ing.name} href={`#${ing.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: ing.accent, fontSize: '11px', letterSpacing: '0.1em', textDecoration: 'none', border: `1px solid ${ing.accent}33`, padding: '5px 12px' }}
                className="uppercase hover:opacity-70 transition-opacity">
                {ing.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient deep-dives */}
      {ingredients.map((ing, idx) => (
        <section key={ing.name} id={ing.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '')}
          style={{ backgroundColor: idx % 2 === 0 ? '#080808' : '#050505', padding: '80px 0', borderBottom: '1px solid #111' }}>
          <div className="max-w-7xl mx-auto px-6">

            {/* Header */}
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div style={{ backgroundColor: ing.accent, padding: '4px 12px' }}>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#000', fontSize: '8px', letterSpacing: '0.2em' }} className="uppercase">{ing.badge}</span>
                  </div>
                </div>
                <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.2rem', lineHeight: '1.15', marginBottom: '6px' }}
                  className="font-normal">{ing.name}</h2>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '20px' }}
                  className="uppercase">{ing.fullName}</p>
                <div style={{ width: '32px', height: '1px', backgroundColor: ing.accent, marginBottom: '20px' }}></div>
                <p style={{ fontFamily: 'Georgia, serif', color: ing.accent, fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '20px' }}>
                  "{ing.tagline}"
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '15px', lineHeight: '1.9' }}>
                  {ing.what}
                </p>
              </div>

              {/* What it does */}
              <div style={{ backgroundColor: '#0A0A0A', border: `1px solid ${ing.accent}18`, padding: '36px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: ing.accent, letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }} className="uppercase">
                  What It Does to Your Skin
                </p>
                <ul className="space-y-4">
                  {ing.does.map(point => (
                    <li key={point} className="flex items-start gap-3">
                      <span style={{ color: ing.accent, fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>✔</span>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '13px', lineHeight: '1.7' }}>{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Why we use it + products */}
            <div className="grid md:grid-cols-2 gap-px mt-px" style={{ backgroundColor: '#141414' }}>
              <div style={{ backgroundColor: idx % 2 === 0 ? '#080808' : '#050505', padding: '32px 36px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: ing.accent, letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">
                  Why We Use It
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '14px', lineHeight: '1.9' }}>
                  {ing.why}
                </p>
              </div>

              <div style={{ backgroundColor: idx % 2 === 0 ? '#080808' : '#050505', padding: '32px 36px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: ing.accent, letterSpacing: '0.25em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">
                  Found In
                </p>
                <div className="space-y-3">
                  {ing.products.map((prod, i) => (
                    <Link key={prod} to={`/skincare/${ing.slugs[i]}`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', padding: '12px 16px', border: `1px solid ${ing.accent}22` }}
                      className="group hover:border-opacity-60 transition-all">
                      <div className="flex items-center gap-3">
                        <div style={{ width: '6px', height: '6px', backgroundColor: ing.accent, borderRadius: '50%', flexShrink: 0 }}></div>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '12px', letterSpacing: '0.05em' }}>{prod}</p>
                      </div>
                      <span style={{ color: ing.accent, fontSize: '12px' }} className="opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Your first routine */}
      <section style={{ backgroundColor: '#080808', padding: '80px 0', borderBottom: '1px solid #111' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                className="uppercase">Now That You Know — Start Here</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2rem', lineHeight: '1.2', marginBottom: '20px' }}
                className="font-normal">Your first routine.<br />Three products. Every day.</h2>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '15px', lineHeight: '1.9', marginBottom: '32px' }}>
                Start with the core three. Build the habit. Add more as needed.
              </p>
              <div className="space-y-6">
                <Step number="01" title="Cleanse — GHK-Cu Peptide Face Wash"
                  desc="Morning and evening. Helps nourish and support skin health from the first step. Primes skin to absorb everything that follows." />
                <Step number="02" title="Treat — Rejuvenate Serum"
                  desc="The core product. GHK-Cu + Niacinamide + Hyaluronic Acid (3 weights) — supports the appearance of smoother, firmer, more even skin." />
                <Step number="03" title="Protect — KPV Recovery Moisturizer"
                  desc="Nourish, calm and support. KPV + Centella Asiatica help support the appearance of a healthy, comfortable complexion." />
              </div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '11px', letterSpacing: '0.15em', marginTop: '28px' }} className="uppercase">
                Visible difference expected in 2–4 weeks of consistent use.
              </p>
            </div>

            <div className="space-y-px" style={{ backgroundColor: '#141414' }}>
              {[
                { name: 'GHK-Cu Peptide Face Wash', price: '$69.99', size: '150ml', slug: 'ghk-cu-face-wash', accent: '#C9A96E', tag: 'Step 01 · Cleanse', key: 'GHK-Cu' },
                { name: 'Rejuvenate Serum', price: '$119.99', size: '30ml', slug: 'rejuvenate-serum', accent: '#8A9E85', tag: 'Step 02 · Treat', key: 'GHK-Cu · Niacinamide · HA' },
                { name: 'KPV Recovery Moisturizer', price: '$79.99', size: '50ml', slug: 'kpv-moisturizer', accent: '#8A7AB0', tag: 'Step 03 · Protect', key: 'KPV · Cica · Beta-Glucan' },
              ].map(prod => (
                <div key={prod.slug} style={{ backgroundColor: '#080808', padding: '28px 32px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: prod.accent, fontSize: '9px', letterSpacing: '0.2em', marginBottom: '8px' }} className="uppercase">{prod.tag}</p>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '15px', marginBottom: '4px' }}>{prod.name}</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '11px', marginBottom: '4px' }}>{prod.key}</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '11px' }}>{prod.price} · {prod.size}</p>
                    </div>
                    <Link to={`/skincare/${prod.slug}`}
                      style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: prod.accent, fontSize: '10px', letterSpacing: '0.15em', textDecoration: 'none', flexShrink: 0 }}
                      className="uppercase hover:opacity-70 transition-opacity">
                      View →
                    </Link>
                  </div>
                </div>
              ))}
              <div style={{ backgroundColor: '#0A0A0A', padding: '28px 32px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '9px', letterSpacing: '0.25em', marginBottom: '8px' }} className="uppercase">Best Value</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '15px', marginBottom: '4px' }}>Daily Essentials Duo</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '12px', marginBottom: '16px' }}>
                  Face Wash + Serum · <span style={{ textDecoration: 'line-through' }}>$189.99</span> → <span style={{ color: '#C9A96E' }}>$159.99</span>
                </p>
                <Link to="/skincare"
                  style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.18em', padding: '12px 24px', textDecoration: 'none' }}
                  className="uppercase hover:opacity-90 transition-opacity">
                  Shop the Bundle →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: '#050505', padding: '80px 0' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
            className="uppercase">Ready?</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.2rem', lineHeight: '1.15', marginBottom: '20px' }}
            className="font-normal">You now know more about<br />your skincare than most people ever will.</h2>
          <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 24px' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '15px', lineHeight: '1.9', maxWidth: '440px', margin: '0 auto 36px' }}>
            Put it to work. Start with the core routine and see the difference in your skin within weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/skincare"
              style={{ backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em', padding: '18px 48px', textDecoration: 'none' }}
              className="uppercase hover:opacity-90 transition-opacity">
              Shop All Products →
            </Link>
            <Link to="/skincare/rejuvenate-serum"
              style={{ border: '1px solid #2A2A2A', color: '#5A5A5A', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em', padding: '18px 36px', textDecoration: 'none' }}
              className="uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
              View Flagship Serum
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
