import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { shapewearProduct as product, isPurchasable } from '../data/shapewearProduct'
import { trackShapewearEvent } from '../lib/shapewearAnalytics'

const sans = 'Helvetica Neue, Arial, sans-serif'
const serif = 'Georgia, serif'
const ink = '#302E2B'
const body = '#716D67'
const gold = '#A7895B'
const goldFill = '#C9AA73'
const line = '#E4D9CC'

const contactHref = (subject) => `mailto:${product.contactEmail}?subject=${encodeURIComponent(subject)}`

export default function ShapewearPage() {
  const purchasable = isPurchasable(product)
  const [size, setSize] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    trackShapewearEvent('view_item', {
      item_id: product.slug,
      item_name: product.name.value,
      item_category: product.category,
      status: product.status,
    })
  }, [])

  const chooseSize = (value) => {
    setSize(value)
    trackShapewearEvent('select_size', { item_id: product.slug, size: value, status: product.status })
  }

  return (
    <div style={{ backgroundColor: '#FAF8F4', minHeight: '100vh' }}>
      <SEO
        title={`${product.name.value} (Coming Soon)`}
        description="A tummy-control bodysuit from Lion Elite Beauty, designed to be easy to wear and easy to take off. Coming soon: not yet available to order."
        noindex={!purchasable}
      />
      <Navbar />

      <main id="main" style={{ paddingTop: '84px' }}>
        {!purchasable && <PrelaunchBanner />}

        {/* Hero */}
        <section aria-labelledby="shapewear-title" className="px-5 sm:px-6 pt-12 pb-14 md:pt-20 md:pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <p style={eyebrow}>Lion Elite Beauty · Shapewear</p>
            <h1 id="shapewear-title" style={{ fontFamily: serif, color: ink, lineHeight: 1.08, letterSpacing: '-.02em' }} className="text-4xl md:text-6xl font-normal mb-4">
              {product.name.value}
            </h1>
            {!product.name.verified && <div className="mb-6"><PendingBadge>Product name is a placeholder</PendingBadge></div>}
            <p style={{ fontFamily: sans, color: body, fontSize: '17px', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto 34px' }}>
              {product.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a href={contactHref('Shapewear launch updates')} style={primaryBtn}>Email me at launch</a>
              <a href="#size-guide" style={secondaryBtn}>See the size guide</a>
            </div>
          </div>
        </section>

        {/* Product detail */}
        <section aria-labelledby="product-detail-title" className="px-5 sm:px-6 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="grid grid-cols-2 gap-3" role="list" aria-label="Product photos">
              {product.media.map((m, i) => (
                <div key={m.id} role="listitem" className={i === 0 ? 'col-span-2' : ''}>
                  {m.src
                    ? <img src={m.src} alt={m.alt} className="w-full h-auto block" loading={i === 0 ? 'eager' : 'lazy'} />
                    : <MediaPlaceholder label={m.placeholderLabel} alt={m.alt} tall={i === 0} />}
                </div>
              ))}
            </div>

            <div>
              <p style={eyebrow}>{product.category}</p>
              <h2 id="product-detail-title" style={{ fontFamily: serif, color: ink, fontWeight: 400, lineHeight: 1.2 }} className="text-3xl mb-4">
                {product.name.value}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <p style={{ fontFamily: sans, color: ink, fontSize: '18px', margin: 0 }}>
                  {product.price.value != null && product.price.verified
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: product.price.currency }).format(product.price.value)
                    : 'Price to be announced'}
                </p>
                {!product.price.verified && <PendingBadge>Price not set</PendingBadge>}
              </div>

              <p role="status" id="availability" style={{ fontFamily: sans, color: '#6B5233', background: '#F3EDE4', border: `1px solid ${line}`, fontSize: '13px', lineHeight: 1.6, padding: '12px 14px', marginBottom: '24px' }}>
                {purchasable
                  ? 'Available to order.'
                  : 'Coming soon. This product is not available to order yet, and no sizes or colors are in stock.'}
              </p>

              <fieldset style={{ border: 0, padding: 0, margin: '0 0 22px' }}>
                <legend style={{ ...label, marginBottom: '10px' }}>
                  Size {size && <span style={{ color: body, textTransform: 'none', letterSpacing: 0 }}>· {size} selected</span>}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.options.map(s => {
                    const checked = size === s
                    return (
                      <label key={s} className="cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#A7895B]"
                        style={{ minWidth: '52px', minHeight: '44px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 12px', fontFamily: sans, fontSize: '13px', border: `1px solid ${checked ? ink : '#D7CCBD'}`, background: checked ? ink : '#FFFDF9', color: checked ? '#FAF8F4' : ink }}>
                        <input type="radio" name="shapewear-size" value={s} checked={checked} onChange={() => chooseSize(s)} className="sr-only" />
                        {s}
                      </label>
                    )
                  })}
                </div>
                <p style={{ ...help, marginTop: '10px' }}>
                  Picking a size highlights it in the size guide below. It does not reserve anything.
                </p>
                {!product.sizes.verified && <div className="mt-2"><PendingBadge>Size range to be confirmed</PendingBadge></div>}
              </fieldset>

              <div style={{ marginBottom: '26px' }}>
                <p style={{ ...label, marginBottom: '8px' }}>Color</p>
                {product.colors.options.length > 0
                  ? <p style={help}>{product.colors.options.join(', ')}</p>
                  : <div className="flex flex-wrap items-center gap-3"><p style={{ ...help, margin: 0 }}>Colors to be announced</p><PendingBadge /></div>}
              </div>

              <button type="button" disabled={!purchasable} aria-describedby="availability"
                style={{ width: '100%', minHeight: '52px', border: 0, fontFamily: sans, fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', background: purchasable ? goldFill : '#E7DFD3', color: purchasable ? ink : '#8A8279', cursor: purchasable ? 'pointer' : 'not-allowed' }}>
                {purchasable ? 'Add to bag' : 'Not available yet'}
              </button>
              <p style={{ ...help, marginTop: '12px' }}>
                Want to hear when it launches? <a href={contactHref('Shapewear launch updates')} style={inlineLink}>Email us</a> and we will reply when ordering opens.
              </p>

              <dl className="mt-8" style={{ borderTop: `1px solid ${line}` }}>
                <DetailRow term="Fabric" value={product.fabric.value} verified={product.fabric.verified} />
                <DetailRow term="Care" value={product.care.value} verified={product.care.verified} />
              </dl>
            </div>
          </div>
        </section>

        {/* Features */}
        <section aria-labelledby="features-title" style={{ background: '#F3EDE4', borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }} className="px-5 sm:px-6 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <p style={{ ...eyebrow, textAlign: 'center' }}>Why it is designed this way</p>
            <h2 id="features-title" style={sectionTitle} className="text-3xl md:text-4xl text-center mb-10">Made for real days, not just photos</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {product.features.map(f => (
                <article key={f.id} style={{ background: '#FFFDF9', border: `1px solid ${line}`, padding: '28px' }}>
                  <h3 style={{ fontFamily: serif, color: ink, fontWeight: 400, fontSize: '1.3rem', lineHeight: 1.3, marginBottom: '12px' }}>{f.title}</h3>
                  <p style={{ ...help, fontSize: '14px', marginBottom: '16px' }}>{f.body}</p>
                  {!f.verified && <PendingBadge />}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Size guide */}
        <section id="size-guide" aria-labelledby="size-guide-title" className="px-5 sm:px-6 py-16 md:py-20" style={{ scrollMarginTop: '90px' }}>
          <div className="max-w-4xl mx-auto">
            <p style={eyebrow}>Size and fit</p>
            <h2 id="size-guide-title" style={sectionTitle} className="text-3xl md:text-4xl mb-6">Find your size</h2>

            <h3 style={subTitle}>How to measure</h3>
            <ol style={{ ...help, fontSize: '14px', paddingLeft: '20px', listStyle: 'decimal', marginBottom: '28px' }}>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: ink }}>Waist:</strong> measure around the narrowest part of your waist, usually just above the belly button. Keep the tape level and snug, not tight.</li>
              <li style={{ marginBottom: '8px' }}><strong style={{ color: ink }}>Hips:</strong> stand with your feet together and measure around the fullest part of your hips and seat.</li>
              <li><strong style={{ color: ink }}>Between sizes:</strong> fit advice for in-between measurements will be added once samples are wear-tested.</li>
            </ol>

            <div className="overflow-x-auto">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: sans, fontSize: '14px', color: ink }}>
                <caption style={{ ...help, textAlign: 'left', captionSide: 'top', marginBottom: '10px' }}>
                  Body measurements in inches. {!product.sizeChart.verified && 'Measurements will be added after samples are measured.'}
                </caption>
                <thead>
                  <tr style={{ background: '#F3EDE4' }}>
                    <th scope="col" style={th}>Size</th>
                    <th scope="col" style={th}>Waist ({product.sizeChart.unit})</th>
                    <th scope="col" style={th}>Hips ({product.sizeChart.unit})</th>
                  </tr>
                </thead>
                <tbody>
                  {product.sizeChart.rows.map(r => {
                    const active = r.size === size
                    return (
                      <tr key={r.size} aria-current={active ? 'true' : undefined} style={{ background: active ? '#EFE4D2' : 'transparent' }}>
                        <th scope="row" style={{ ...td, fontWeight: 600 }}>{r.size}</th>
                        <td style={td}>{r.waist ?? <Pending />}</td>
                        <td style={td}>{r.hips ?? <Pending />}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {!product.sizeChart.verified && <div className="mt-4"><PendingBadge>Size chart pending sample measurements</PendingBadge></div>}
          </div>
        </section>

        {/* Shipping and returns */}
        <section aria-labelledby="shipping-title" className="px-5 sm:px-6 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            <h2 id="shipping-title" className="sr-only">Shipping and returns</h2>
            <PolicyCard title="Shipping" verified={product.shipping.verified}
              items={[
                ['Ships from', product.shipping.origin],
                ['Processing time', product.shipping.processingTime],
                ['Delivery estimate', product.shipping.deliveryEstimate],
              ]}
              note="Shipping details will be posted here before ordering opens." />
            <PolicyCard title="Returns and exchanges" verified={product.returns.verified}
              items={[
                ['Return window', product.returns.window],
                ['Conditions', product.returns.conditions],
              ]}
              note="Return and exchange terms will be posted here before ordering opens." />
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" style={{ borderTop: `1px solid ${line}` }} className="px-5 sm:px-6 py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <p style={eyebrow}>Questions</p>
            <h2 id="faq-title" style={sectionTitle} className="text-3xl md:text-4xl mb-8">Frequently asked</h2>
            <div style={{ borderTop: `1px solid ${line}` }}>
              {faqs.map(f => (
                <details key={f.q} style={{ borderBottom: `1px solid ${line}` }}>
                  <summary className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A7895B]"
                    style={{ fontFamily: serif, color: ink, fontSize: '1.1rem', padding: '18px 0', listStylePosition: 'inside' }}>
                    {f.q}
                  </summary>
                  <p style={{ ...help, fontSize: '14px', paddingBottom: '18px' }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section aria-labelledby="help-title" style={{ background: '#F3EDE4', borderTop: `1px solid ${line}` }} className="px-5 sm:px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="help-title" style={sectionTitle} className="text-3xl mb-4">Questions about fit or launch?</h2>
            <p style={{ ...help, fontSize: '15px', marginBottom: '26px' }}>
              Email us and a real person on the Lion Elite Beauty team will get back to you.
            </p>
            <a href={contactHref('Shapewear question')} style={primaryBtn}>Email {product.contactEmail}</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const faqs = [
  { q: 'When can I order?', a: 'Not yet. We are testing samples for fit, comfort and quality first. Ordering opens only after sizes, price, shipping and returns are confirmed and posted on this page.' },
  { q: 'How does the bathroom-friendly design work?', a: 'The bodysuit is designed with a gusset or closure so you do not need to take the whole garment off. We will describe exactly how it works once the final construction is confirmed with our supplier.' },
  { q: 'How do I pick my size?', a: 'Use the measuring steps in the size guide above. Final measurements and fit notes will be added after we measure and wear-test samples across the size range.' },
  { q: 'What is it made of?', a: 'Fabric composition and care instructions will be listed here once they are confirmed on the final product.' },
  { q: 'What is your return policy?', a: 'Return and exchange terms will be published on this page before ordering opens.' },
]

function PrelaunchBanner() {
  return (
    <div role="note" style={{ background: ink, color: '#FAF8F4', fontFamily: sans, fontSize: '12px', letterSpacing: '.06em', textAlign: 'center', padding: '10px 16px' }}>
      Coming soon · Not available to order yet
    </div>
  )
}

function PendingBadge({ children = 'Pending product validation' }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: sans, fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#6B5233', background: '#FBF3E4', border: '1px dashed #C9AA73', padding: '4px 8px' }}>
      <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9AA73', display: 'inline-block' }} />
      {children}
    </span>
  )
}

function Pending() {
  return <span style={{ color: '#9A9188' }}><span aria-hidden="true">—</span><span className="sr-only">Pending</span></span>
}

function MediaPlaceholder({ label: text, alt, tall }) {
  return (
    <div role="img" aria-label={`Placeholder for: ${alt}`}
      style={{ aspectRatio: tall ? '4 / 5' : '1 / 1', background: 'repeating-linear-gradient(135deg, #F3EDE4, #F3EDE4 12px, #EFE7DB 12px, #EFE7DB 24px)', border: `1px dashed #CDBFAE`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', textAlign: 'center' }}>
      <span style={{ fontFamily: sans, color: '#7A6F63', fontSize: '12px' }}>{text}</span>
      <span style={{ fontFamily: sans, color: '#9A8C7C', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase' }}>Replace with final asset</span>
    </div>
  )
}

function DetailRow({ term, value, verified }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: `1px solid ${line}`, padding: '14px 0' }}>
      <dt style={label}>{term}</dt>
      <dd className="flex flex-wrap items-center gap-3" style={{ margin: 0, fontFamily: sans, fontSize: '13px', color: body }}>
        {value || 'To be confirmed'}
        {!verified && <PendingBadge />}
      </dd>
    </div>
  )
}

function PolicyCard({ title, items, verified, note }) {
  return (
    <article style={{ background: '#FFFDF9', border: `1px solid ${line}`, padding: '26px' }}>
      <h3 style={{ ...subTitle, marginBottom: '14px' }}>{title}</h3>
      <dl style={{ margin: '0 0 14px' }}>
        {items.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4" style={{ padding: '8px 0', borderBottom: '1px solid #F0E8DE', fontFamily: sans, fontSize: '13px' }}>
            <dt style={{ color: ink }}>{k}</dt>
            <dd style={{ margin: 0, color: body, textAlign: 'right' }}>{v || 'To be confirmed'}</dd>
          </div>
        ))}
      </dl>
      {!verified && <><p style={{ ...help, marginBottom: '12px' }}>{note}</p><PendingBadge /></>}
    </article>
  )
}

const eyebrow = { color: gold, fontFamily: sans, letterSpacing: '.3em', fontSize: '10px', textTransform: 'uppercase', marginBottom: '16px' }
const sectionTitle = { fontFamily: serif, color: ink, fontWeight: 400, lineHeight: 1.15 }
const subTitle = { fontFamily: serif, color: ink, fontWeight: 400, fontSize: '1.25rem', marginBottom: '12px' }
const label = { fontFamily: sans, color: ink, fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase' }
const help = { fontFamily: sans, color: body, fontSize: '13px', lineHeight: 1.7 }
const inlineLink = { color: '#8A6E43', textDecoration: 'underline' }
const primaryBtn = { display: 'inline-block', background: goldFill, color: ink, textDecoration: 'none', padding: '16px 30px', fontFamily: sans, fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', textAlign: 'center' }
const secondaryBtn = { display: 'inline-block', border: '1px solid #D7CCBD', color: '#5F5A54', textDecoration: 'none', padding: '16px 30px', fontFamily: sans, fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', textAlign: 'center' }
const th = { textAlign: 'left', padding: '12px 14px', fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', borderBottom: `1px solid ${line}` }
const td = { textAlign: 'left', padding: '12px 14px', borderBottom: '1px solid #F0E8DE' }
