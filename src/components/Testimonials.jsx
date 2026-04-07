const testimonials = [
  {
    id: 1,
    quote: "I've tried every high-end serum on the market. The GHK-Cu Peptide Serum from Lion Elite is genuinely the first product I've seen move the needle on my fine lines. My aesthetician noticed the difference before I said anything.",
    name: 'M. Rodriguez',
    detail: 'GHK-Cu Serum · 10 weeks',
    stars: 5,
  },
  {
    id: 2,
    quote: "After my laser treatment, I used the Post-Procedure Recovery Kit and healed in half the time I expected. The redness was gone in four days. My provider was stunned. I won't do another procedure without it.",
    name: 'D. Kim',
    detail: 'Recovery Kit · Post-Laser',
    stars: 5,
  },
  {
    id: 3,
    quote: "Tirzepatide through Lion Elite Wellness changed my life — and the skincare line has kept my skin in step with my body transformation. The anti-aging cream is now a daily non-negotiable for me.",
    name: 'J. Thornton',
    detail: 'Wellness Program + Skincare',
    stars: 5,
  },
  {
    id: 4,
    quote: "What I appreciate most is that nothing feels gimmicky. The science is real, the team explains everything, and the products are formulated the way I'd want as a nurse. Clean, clinical, and it works.",
    name: 'A. Patel, RN',
    detail: 'Full Skincare Protocol',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ backgroundColor: '#F5F0E8', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
            className="text-xs uppercase tracking-widest mb-4">
            Client Stories
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">
            Trusted by Those Who<br />Demand Results
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id}
              style={{ backgroundColor: '#FFFFFF', padding: '40px', border: '1px solid #E8DDD0' }}
              className="flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} style={{ color: '#C9A96E', fontSize: '14px' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '1rem', lineHeight: '1.8', fontStyle: 'italic', flex: 1 }}>
                "{t.quote}"
              </p>

              {/* Divider */}
              <div style={{ width: '32px', height: '1px', backgroundColor: '#C9A96E', margin: '24px 0' }}></div>

              {/* Attribution */}
              <div>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#1A1A1A', fontSize: '13px', letterSpacing: '0.08em' }}
                  className="font-medium">{t.name}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', fontSize: '11px', letterSpacing: '0.15em', marginTop: '4px' }}
                  className="uppercase tracking-wider">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Logos / Media Badges */}
        <div style={{ marginTop: '60px', padding: '40px', borderTop: '1px solid #E8DDD0', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#B0B0B0', fontSize: '10px', letterSpacing: '0.25em' }}
            className="uppercase tracking-widest mb-8">Featured In & Trusted By</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {['Medical Aesthetics Journal', 'Peptide Review', 'DermNews', 'Wellness Today'].map(name => (
              <span key={name}
                style={{ fontFamily: 'Georgia, serif', color: '#C0B8B0', fontSize: '13px', letterSpacing: '0.05em' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
