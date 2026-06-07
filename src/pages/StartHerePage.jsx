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
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.8' }}>{desc}</p>
      </div>
    </div>
  )
}

const ingredients = [
  // ─── PEPTIDES ───────────────────────────────────────────────────────────────
  {
    name: 'GHK-Cu',
    fullName: 'Glycyl-L-Histidyl-L-Lysine Copper',
    accent: '#C9A96E',
    badge: 'Core Peptide',
    group: 'Peptides',
    tagline: 'The copper peptide at the foundation of our entire range.',
    what: 'GHK-Cu is a naturally occurring copper peptide found in human blood and tissue. Your body produces it — but levels decline significantly after your 20s. It is the foundational ingredient across the Lion Elite Beauty range, present in five of our six products.',
    does: [
      'Studied alongside thousands of genes involved in skin renewal and barrier repair',
      'Supports the appearance of skin firmness and a more youthful-looking complexion',
      'Helps support the appearance of smoother skin texture and a more even tone',
      'Supports the appearance of a comfortable, nourished complexion after procedures',
      'Formulated into cleansers, serums, creams and body wash for full-routine nourishment',
    ],
    products: ['GHK-Cu Peptide Face Wash', 'Rejuvenate Serum', 'Collagen Boost Face Cream', 'Hydra Boost Body Wash', 'Post-Procedure Recovery Kit'],
    slugs: ['ghk-cu-face-wash', 'rejuvenate-serum', 'collagen-boost-cream', 'hydra-boost-body-wash', 'recovery-kit'],
    why: 'GHK-Cu has been studied since the 1970s and is one of the most researched peptides in dermatology. We chose it as the foundation of our entire range because the depth of research behind it is unmatched. Formulated at meaningful concentrations — not trace marketing amounts.',
  },
  {
    name: 'KPV',
    fullName: 'Lysine-Proline-Valine Tripeptide',
    accent: '#8A7AB0',
    badge: 'Calming Peptide',
    group: 'Peptides',
    tagline: 'The calming peptide for reactive, sensitive, and post-procedure skin.',
    what: 'KPV is a tripeptide fragment derived from alpha-MSH — a peptide studied for its role in skin comfort and calming. It is the hero ingredient in the KPV Recovery Moisturizer and Post-Procedure Recovery Kit.',
    does: [
      'Helps support the appearance of calm, even-toned skin — not just surface masking',
      'Formulated to help support a more comfortable skin appearance for sensitive skin types',
      'Supports the appearance of a more resilient skin barrier with consistent use',
      'Helps support a more comfortable skin appearance during and after procedures',
      'Pairs with Centella Asiatica in the KPV Moisturizer for a dual calming approach',
    ],
    products: ['KPV Recovery Moisturizer', 'Post-Procedure Recovery Kit'],
    slugs: ['kpv-moisturizer', 'recovery-kit'],
    why: 'Most "calming" skincare uses botanical extracts that temporarily mask the appearance of redness. KPV is a peptide — formulated to work alongside the skin\'s own biology to help support a calm, comfortable appearance, not just cover it up.',
  },
  {
    name: 'Palmitoyl Tripeptide-1',
    fullName: 'Palmitoyl Oligopeptide (Matrixyl Component)',
    accent: '#8A9E85',
    badge: 'Firming Peptide',
    group: 'Peptides',
    tagline: 'The firming peptide in the Rejuvenate Serum and Collagen Boost Cream.',
    what: 'Palmitoyl Tripeptide-1 is a key peptide that helps support the appearance of the skin\'s structural framework. It is a component of the Matrixyl 3000 complex — formulated individually into the Rejuvenate Serum, and as part of the full Matrixyl 3000 complex in the Collagen Boost Face Cream.',
    does: [
      'Supports the appearance of a smoother, more even skin surface over time',
      'Helps support the appearance of skin firmness and structure with consistent use',
      'Helps support the appearance of firmer, more resilient skin overnight',
      'One of the most researched firming peptide components in cosmetic science',
      'Non-irritating — suitable for all skin types including sensitive skin',
    ],
    products: ['Rejuvenate Serum', 'Collagen Boost Face Cream'],
    slugs: ['rejuvenate-serum', 'collagen-boost-cream'],
    why: 'The Rejuvenate Serum includes Palmitoyl Tripeptide-1 as a standalone firming peptide to complement GHK-Cu during the day. The Collagen Boost Face Cream takes this further with the full Matrixyl 3000 complex — so both your day serum and night cream are actively supporting skin appearance.',
  },
  // ─── HYDRATION & BARRIER ───────────────────────────────────────────────────
  {
    name: 'Hyaluronic Acid',
    fullName: 'Sodium Hyaluronate (3 molecular weights)',
    accent: '#7A9FBF',
    badge: 'Hydration Complex',
    group: 'Hydration & Barrier',
    tagline: 'Three-weight hydration in the Rejuvenate Serum and Recovery Kit.',
    what: 'Hyaluronic acid is a naturally occurring polysaccharide found throughout the body. The Rejuvenate Serum uses three different molecular weights — each formulated to nourish at a different skin depth. It also appears in the Post-Procedure Recovery Kit to support comfort during recovery.',
    does: [
      'Three molecular weights nourish at the surface, mid-layer, and deeper skin simultaneously',
      'Helps support the appearance of plumper, more hydrated-looking skin',
      'Supports the appearance of skin suppleness and a healthy, comfortable feel',
      'Helps nourish the skin barrier and support moisture comfort throughout the day',
      'Included in the Recovery Kit to help support a comfortable post-procedure appearance',
    ],
    products: ['Rejuvenate Serum', 'Post-Procedure Recovery Kit'],
    slugs: ['rejuvenate-serum', 'recovery-kit'],
    why: 'Many brands use a single molecular weight that only works at the surface. The Rejuvenate Serum uses three different molecular weights — small, medium, and large — so nourishment is supported at multiple depths of the skin, not just the top layer.',
  },
  {
    name: 'Ceramide Complex',
    fullName: 'Ceramide NP, AP & EOP Complex',
    accent: '#B8A4D4',
    badge: 'Barrier Complex',
    group: 'Hydration & Barrier',
    tagline: 'The barrier-nourishing complex in the Collagen Boost Cream and Recovery Kit.',
    what: 'Ceramides are lipid molecules naturally found in the skin\'s outer layer — the key structural component of the skin barrier. The Collagen Boost Face Cream and Post-Procedure Recovery Kit both contain a multi-ceramide complex to help support the appearance of a healthy, comfortable barrier.',
    does: [
      'Helps support the appearance of a healthy, nourished skin barrier',
      'Supports the appearance of comfortable, less reactive skin with consistent use',
      'Helps nourish and support moisture retention throughout the day and night',
      'Supports the appearance of resilient skin in the Collagen Boost overnight formula',
      'Included in the Recovery Kit to support the appearance of a recovered barrier post-procedure',
    ],
    products: ['Collagen Boost Face Cream', 'Post-Procedure Recovery Kit'],
    slugs: ['collagen-boost-cream', 'recovery-kit'],
    why: 'Ceramide levels decline with age and can be disrupted by over-exfoliation and harsh cleansers. They appear in both the Collagen Boost Face Cream (overnight barrier support) and the Recovery Kit (post-procedure barrier nourishment) — because healthy-looking skin starts with a healthy barrier.',
  },
  {
    name: 'Glycerin',
    fullName: 'Glycerol (Vegetable-Derived)',
    accent: '#C9A96E',
    badge: 'Humectant',
    group: 'Hydration & Barrier',
    tagline: 'The moisture-drawing humectant in the GHK-Cu Peptide Face Wash.',
    what: 'Glycerin is a naturally derived humectant — it draws moisture from the environment into the skin. It is included in the GHK-Cu Peptide Face Wash to help maintain post-cleanse comfort, so skin feels hydrated and soft rather than tight or stripped after washing.',
    does: [
      'Helps draw moisture into the skin and supports a comfortable post-cleanse feel',
      'Supports the appearance of a hydrated, supple skin surface',
      'Helps maintain the skin\'s natural moisture balance during cleansing',
      'Suitable for all skin types — including dry and sensitive skin',
      'Pairs with Aloe Vera in the Face Wash to support a nourished cleanse experience',
    ],
    products: ['GHK-Cu Peptide Face Wash'],
    slugs: ['ghk-cu-face-wash'],
    why: 'One of the biggest downsides of daily face washing is the stripped, tight feeling it can leave. Glycerin is included in the Face Wash specifically to counteract this — helping the skin retain moisture throughout the cleanse so it feels balanced and comfortable immediately after.',
  },
  {
    name: 'Panthenol (B5)',
    fullName: 'D-Panthenol / Provitamin B5',
    accent: '#C9A96E',
    badge: 'Barrier Support',
    group: 'Hydration & Barrier',
    tagline: 'The skin-softening barrier ingredient in the GHK-Cu Peptide Face Wash.',
    what: 'Panthenol (Provitamin B5) is a widely used skincare ingredient that converts to Vitamin B5 on the skin. It is included in the GHK-Cu Peptide Face Wash to help support the appearance of a healthy skin barrier and lasting post-cleanse softness.',
    does: [
      'Supports the appearance of a healthy, comfortable skin barrier',
      'Helps nourish and soften skin — supporting a smooth, comfortable feel after cleansing',
      'Supports the appearance of resilient skin with regular use',
      'Well-tolerated by all skin types including sensitive skin',
      'Works alongside Glycerin and Aloe Vera in the Face Wash for a nourishing cleanse',
    ],
    products: ['GHK-Cu Peptide Face Wash'],
    slugs: ['ghk-cu-face-wash'],
    why: 'Panthenol is included in the Face Wash because cleansing is the most frequent point of contact with your skin in any routine. Supporting barrier comfort at this step — alongside GHK-Cu, Glycerin, and Aloe Vera — means your skin is in the best possible state before you apply anything else.',
  },
  {
    name: 'Beta-Glucan',
    fullName: 'Oat-Derived Beta-1,3/1,6-Glucan',
    accent: '#8A7AB0',
    badge: 'Soothing Hydrator',
    group: 'Hydration & Barrier',
    tagline: 'The deep-nourishing hydrator in the KPV Recovery Moisturizer.',
    what: 'Beta-Glucan is a naturally derived polysaccharide from oats that helps support skin hydration and a soothed, comfortable appearance. It is formulated into the KPV Recovery Moisturizer alongside KPV peptide and Centella Asiatica.',
    does: [
      'Helps nourish and hydrate skin; supports a comfortable, supple-feeling complexion',
      'Supports the appearance of calm, comfortable skin alongside KPV and Centella Asiatica',
      'Helps support the appearance of a healthy, resilient skin barrier',
      'Lightweight — provides a non-greasy nourishing feel to the Recovery Moisturizer',
      'Suitable for sensitive and redness-prone skin types',
    ],
    products: ['KPV Recovery Moisturizer'],
    slugs: ['kpv-moisturizer'],
    why: 'Beta-Glucan supports the KPV and Centella Asiatica already at work in the Recovery Moisturizer. While KPV helps support the appearance of a calm complexion, Beta-Glucan ensures the formula also nourishes and hydrates comfortably — so the moisturizer does more than one thing at once.',
  },
  {
    name: 'Squalane',
    fullName: 'Plant-Derived Squalane (Olive)',
    accent: '#8A9E85',
    badge: 'Skin-Identical Lipid',
    group: 'Hydration & Barrier',
    tagline: 'The lightweight nourishing oil in the Collagen Boost Face Cream.',
    what: 'Squalane is a stable, plant-derived lipid that is structurally similar to lipids naturally found in the skin. It is the primary nourishing carrier in the Collagen Boost Face Cream — allowing the formula to absorb comfortably overnight without greasiness.',
    does: [
      'Helps nourish deeply without heaviness or greasiness — absorbs comfortably overnight',
      'Supports the appearance of a healthy, comfortable skin barrier',
      'Non-comedogenic — suitable for oily, combination, and sensitive skin',
      'Helps support the texture and absorption of the Collagen Boost Face Cream formula',
      'Provides antioxidant support to help maintain the appearance of healthy-looking skin',
    ],
    products: ['Collagen Boost Face Cream'],
    slugs: ['collagen-boost-cream'],
    why: 'Many overnight creams use heavy oils that feel greasy and can block pores. Squalane is structurally similar to the skin\'s own lipids — it absorbs quickly and comfortably, allowing the Collagen Boost Face Cream to feel premium to use while nourishing effectively throughout the night.',
  },
  // ─── BRIGHTENING & MULTI-TASKERS ────────────────────────────────────────────
  {
    name: 'Niacinamide',
    fullName: 'Vitamin B3 (Nicotinamide)',
    accent: '#C4A265',
    badge: 'Brightening + Barrier',
    group: 'Brightening & Multi-Taskers',
    tagline: 'The multi-tasker in the Rejuvenate Serum.',
    what: 'Niacinamide is a form of Vitamin B3 and one of the most versatile and well-tolerated actives in skincare. It is included in the Rejuvenate Serum where it works alongside GHK-Cu and Hyaluronic Acid to help support a brighter, more even-looking complexion.',
    does: [
      'Supports the appearance of a more even, brighter-looking skin tone',
      'Helps support the appearance of refined pores and a smoother skin surface',
      'Supports the appearance of a healthy skin barrier and moisture comfort',
      'Helps support the appearance of calm, even-toned skin',
      'Works alongside GHK-Cu in the Rejuvenate Serum to support overall skin appearance',
    ],
    products: ['Rejuvenate Serum'],
    slugs: ['rejuvenate-serum'],
    why: 'Niacinamide is one of the most broadly studied actives in skincare across multiple skin concerns. Its inclusion in the Rejuvenate Serum is deliberate — it supports barrier function and skin tone appearance simultaneously, amplifying what GHK-Cu and Hyaluronic Acid are already delivering.',
  },
  // ─── CALMING BOTANICALS ─────────────────────────────────────────────────────
  {
    name: 'Centella Asiatica',
    fullName: 'Cica / Gotu Kola Extract',
    accent: '#5BA87A',
    badge: 'Calming Botanical',
    group: 'Calming Botanicals',
    tagline: 'The botanical calming ingredient in the KPV Recovery Moisturizer.',
    what: 'Centella Asiatica (also known as Cica or Gotu Kola) is a botanical extract with centuries of traditional use and decades of dermatology research. It is formulated into the KPV Recovery Moisturizer alongside KPV peptide to help support the appearance of calm, resilient skin.',
    does: [
      'Supports the appearance of calm, soothed skin through its active botanical compounds',
      'Helps support the appearance of an even, comfortable complexion for redness-prone skin',
      'Supports the appearance of a healthy, nourished skin barrier',
      'Works alongside KPV peptide in the Recovery Moisturizer for a dual calming approach',
      'Supports the appearance of skin resilience with consistent daily use',
    ],
    products: ['KPV Recovery Moisturizer'],
    slugs: ['kpv-moisturizer'],
    why: 'Centella Asiatica pairs with KPV in the Recovery Moisturizer to help support the appearance of calm, comfortable skin from two directions — a peptide approach and a botanical approach. The combination is formulated to be more comprehensive than either ingredient alone.',
  },
  {
    name: 'Aloe Vera Extract',
    fullName: 'Aloe Barbadensis Leaf Extract',
    accent: '#5BA87A',
    badge: 'Soothing Extract',
    group: 'Calming Botanicals',
    tagline: 'The calming, hydrating extract in the GHK-Cu Peptide Face Wash.',
    what: 'Aloe Vera is one of the most widely used botanical extracts in skincare, known for its high water content and ability to help support a soothed, comfortable skin appearance post-cleanse. It is included in the GHK-Cu Peptide Face Wash to help offset any drying effect from cleansing.',
    does: [
      'Helps calm and hydrate skin immediately after cleansing',
      'Supports the appearance of a comfortable, non-stripped complexion post-wash',
      'Pairs with GHK-Cu in the Face Wash to help prime skin before serum application',
      'Suitable for all skin types — including sensitive and dry skin',
      'Supports the appearance of soft, comfortable skin with regular daily use',
    ],
    products: ['GHK-Cu Peptide Face Wash'],
    slugs: ['ghk-cu-face-wash'],
    why: 'The GHK-Cu Peptide Face Wash is designed to cleanse effectively without leaving skin tight or stripped. Aloe Vera is a key part of that balance — immediately helping to soothe and hydrate after cleansing so your skin is in the best possible state to absorb the Rejuvenate Serum that follows.',
  },
  {
    name: 'Allantoin',
    fullName: 'Allantoin (Comfrey-Derived)',
    accent: '#8A7AB0',
    badge: 'Skin Soother',
    group: 'Calming Botanicals',
    tagline: 'The softening, soothing ingredient in the KPV Recovery Moisturizer.',
    what: 'Allantoin is a naturally occurring compound derived from comfrey root, widely used in skincare for its ability to help support a soft, comfortable skin appearance. It is included in the KPV Recovery Moisturizer to complement the calming work of KPV and Centella Asiatica.',
    does: [
      'Helps soften and soothe skin — supports the appearance of a comfortable complexion',
      'Supports the appearance of smooth, even-textured skin with consistent use',
      'Helps support the appearance of a healthy skin surface',
      'Well-tolerated by all skin types, including very sensitive skin',
      'Works as part of the three-ingredient calming system in the KPV Recovery Moisturizer',
    ],
    products: ['KPV Recovery Moisturizer'],
    slugs: ['kpv-moisturizer'],
    why: 'Allantoin rounds out the calming trio in the KPV Recovery Moisturizer alongside KPV peptide and Centella Asiatica. Its role is to help soften and smooth the skin surface — supporting a more comfortable and even complexion feel with every use.',
  },
  // ─── HYDRA BOOST BODY WASH ──────────────────────────────────────────────────
  {
    name: 'Vitamin E',
    fullName: 'Tocopherol (Natural Vitamin E)',
    accent: '#7A9FBF',
    badge: 'Antioxidant',
    group: 'Body Wash Actives',
    tagline: 'The antioxidant that supports healthy-looking skin in the Hydra Boost Body Wash.',
    what: 'Vitamin E (Tocopherol) is a fat-soluble antioxidant naturally found in the skin. It is included in the Hydra Boost Body Wash alongside GHK-Cu and botanical oils to help support the appearance of healthy, nourished skin across the whole body after each shower.',
    does: [
      'Antioxidant properties that help support the appearance of healthy-looking skin',
      'Helps nourish and support skin after cleansing — reducing the tight, dry post-wash feeling',
      'Supports the appearance of comfortable, hydrated-looking skin with each use',
      'Works alongside GHK-Cu in the Hydra Boost Body Wash for all-over skin support',
      'Non-comedogenic and suitable for all body skin types',
    ],
    products: ['Hydra Boost Body Wash'],
    slugs: ['hydra-boost-body-wash'],
    why: 'Most body washes strip the skin and leave it feeling dry. Vitamin E is included in the Hydra Boost Body Wash to help counteract this — working alongside GHK-Cu so your skin feels nourished and comfortable straight out of the shower, not stripped.',
  },
  {
    name: 'Decyl Glucoside',
    fullName: 'Decyl Glucoside (Coconut & Glucose Derived)',
    accent: '#7A9FBF',
    badge: 'Gentle Cleanser',
    group: 'Body Wash Actives',
    tagline: 'The natural, gentle foaming agent in the Hydra Boost Body Wash.',
    what: 'Decyl Glucoside is a mild, plant-derived surfactant made from coconut alcohol and glucose. It is the cleansing base of the Hydra Boost Body Wash — chosen specifically because it cleans effectively without the harsh stripping effect of conventional synthetic surfactants.',
    does: [
      'Gently removes dirt, oil and buildup without stripping the skin\'s natural moisture',
      'Creates a light, comfortable lather that rinses cleanly',
      'Biodegradable and derived from natural sources — coconut and glucose',
      'Well-tolerated by sensitive skin — low irritation profile',
      'Allows GHK-Cu and Vitamin E to remain active and effective throughout the wash',
    ],
    products: ['Hydra Boost Body Wash'],
    slugs: ['hydra-boost-body-wash'],
    why: 'The choice of surfactant determines how a body wash feels on the skin. Decyl Glucoside was chosen for the Hydra Boost Body Wash because it cleans without compromising the other active ingredients — meaning GHK-Cu and Vitamin E can do their work rather than being neutralised by a harsh cleansing base.',
  },
  {
    name: 'Lavender & Rosemary Oils',
    fullName: 'Lavandula Angustifolia & Rosmarinus Officinalis Essential Oils',
    accent: '#8A7AB0',
    badge: 'Botanical Aromatics',
    group: 'Body Wash Actives',
    tagline: 'The premium botanical aromatics in the Hydra Boost Body Wash.',
    what: 'Lavender and Rosemary essential oils are naturally derived botanical aromatics included in the Hydra Boost Body Wash to create a premium sensory experience. Both have long histories of use in traditional wellness and are chosen to complement the functional peptide and vitamin ingredients in the formula.',
    does: [
      'Creates a calming, premium aromatic experience with every shower',
      'Lavender oil supports a soothed, comfortable sensory experience',
      'Rosemary oil adds an energising, fresh element to the formula',
      'Both are naturally derived — no synthetic fragrance',
      'Formulated at sensory-level concentrations alongside the active ingredients',
    ],
    products: ['Hydra Boost Body Wash'],
    slugs: ['hydra-boost-body-wash'],
    why: 'Skincare should feel as good as it performs. Lavender and Rosemary essential oils are included in the Hydra Boost Body Wash to ensure every shower feels like a premium ritual — not just a functional step. The scent experience reinforces the quality of every other ingredient in the formula.',
  },
]

export default function StartHerePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ backgroundColor: '#0A0A0A', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ backgroundColor: '#080808', paddingTop: '140px', paddingBottom: '80px', borderBottom: '1px solid #141414' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-end">
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.35em', fontSize: '10px', marginBottom: '20px' }}
                className="uppercase">Ingredient Transparency</p>
              <h1 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '3.2rem', lineHeight: '1.1', letterSpacing: '-0.02em' }}
                className="font-normal mb-8">
                What's Inside.<br />And Why It's There.
              </h1>
              <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '28px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '16px', lineHeight: '1.9', maxWidth: '480px' }}>
                Every ingredient in the Lion Elite Beauty range earns its place. No filler. No fluff. Here's the full breakdown — what each one is, what it supports, and exactly which product it's in.
              </p>
            </div>
            <div>
              <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #141414', padding: '36px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '9px', letterSpacing: '0.25em', marginBottom: '20px' }} className="uppercase">At a Glance</p>
                {[
                  { label: '15 active ingredients', sub: 'across 6 products' },
                  { label: '3 core peptides', sub: 'GHK-Cu · KPV · Palmitoyl Tripeptide-1' },
                  { label: 'Zero synthetic fragrance', sub: 'except Hydra Boost Body Wash aromatics' },
                  { label: 'No ingredient is decorative', sub: 'every one has a documented function' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 mb-4 last:mb-0">
                    <span style={{ color: '#C9A96E', fontSize: '10px', flexShrink: 0, marginTop: '3px' }}>→</span>
                    <div>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '13px' }}>{item.label}</p>
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', marginTop: '2px' }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #1A1A1A', marginTop: '24px', paddingTop: '20px' }}>
                  <Link to="/skin-system"
                    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.18em', textDecoration: 'none' }}
                    className="uppercase hover:opacity-70 transition-opacity">
                    See the full routine instead →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section style={{ backgroundColor: '#050505', borderBottom: '1px solid #111', padding: '28px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          {['Peptides', 'Hydration & Barrier', 'Brightening & Multi-Taskers', 'Calming Botanicals', 'Body Wash Actives'].map(group => {
            const groupItems = ingredients.filter(i => i.group === group)
            return (
              <div key={group} className="flex flex-wrap items-center gap-2 mb-3 last:mb-0">
                <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '9px', letterSpacing: '0.2em', minWidth: '120px' }} className="uppercase">{group}:</span>
                {groupItems.map(ing => (
                  <a key={ing.name} href={`#${ing.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: ing.accent, fontSize: '10px', letterSpacing: '0.08em', textDecoration: 'none', border: `1px solid ${ing.accent}33`, padding: '4px 10px' }}
                    className="hover:opacity-70 transition-opacity">
                    {ing.name}
                  </a>
                ))}
              </div>
            )
          })}
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
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '20px' }}
                  className="uppercase">{ing.fullName}</p>
                <div style={{ width: '32px', height: '1px', backgroundColor: ing.accent, marginBottom: '20px' }}></div>
                <p style={{ fontFamily: 'Georgia, serif', color: ing.accent, fontSize: '1rem', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '20px' }}>
                  "{ing.tagline}"
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '15px', lineHeight: '1.9' }}>
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
                      <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#CACACA', fontSize: '13px', lineHeight: '1.7' }}>{point}</p>
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
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '14px', lineHeight: '1.9' }}>
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

      {/* CTA */}
      <section style={{ backgroundColor: '#050505', padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '20px' }}
                className="uppercase">Now You Know</p>
              <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.2rem', lineHeight: '1.15', marginBottom: '20px' }}
                className="font-normal">You know what's in it.<br />Now put it to work.</h2>
              <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', marginBottom: '24px' }}></div>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '15px', lineHeight: '1.9', marginBottom: '32px' }}>
                The ingredients are only half the story. See the full daily routine — how to use each product, in what order, and exactly what to expect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/skin-system"
                  style={{ backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em', padding: '18px 40px', textDecoration: 'none', textAlign: 'center' }}
                  className="uppercase hover:opacity-90 transition-opacity">
                  See the Skin System →
                </Link>
                <Link to="/skincare"
                  style={{ border: '1px solid #2A2A2A', color: '#CACACA', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em', padding: '18px 32px', textDecoration: 'none', textAlign: 'center' }}
                  className="uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
                  Shop All Products
                </Link>
              </div>
            </div>
            <div style={{ backgroundColor: '#0A0A0A', border: '1px solid #141414', padding: '40px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '9px', letterSpacing: '0.25em', marginBottom: '20px' }} className="uppercase">The Core Peptides — Quick Ref</p>
              {[
                { name: 'GHK-Cu', role: 'Foundation peptide — in 5 of 6 products', accent: '#C9A96E' },
                { name: 'KPV', role: 'Calming peptide — KPV Moisturizer & Recovery Kit', accent: '#8A7AB0' },
                { name: 'Palmitoyl Tripeptide-1', role: 'Firming peptide — Rejuvenate Serum & Collagen Boost Cream', accent: '#8A9E85' },
              ].map(p => (
                <div key={p.name} style={{ borderBottom: '1px solid #141414', paddingBottom: '16px', marginBottom: '16px' }} className="last:border-0 last:mb-0 last:pb-0">
                  <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '15px', marginBottom: '4px' }}>{p.name}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px' }}>{p.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
