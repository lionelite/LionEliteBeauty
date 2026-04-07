const cases = [
  {
    id: 1,
    treatment: 'GHK-Cu Serum + Microneedling',
    duration: '8 Weeks',
    concern: 'Fine Lines & Texture',
    improvement: 'Visible smoothing and firmness within 4 weeks',
    beforeNote: 'Before',
    afterNote: 'After 8 Weeks',
    beforeBg: '#D4C4B0',
    afterBg: '#E8DDD0',
  },
  {
    id: 2,
    treatment: 'Post-Procedure Recovery Kit',
    duration: '4 Weeks',
    concern: 'Post-Laser Recovery',
    improvement: 'Accelerated healing, 60% faster redness resolution',
    beforeNote: 'Before',
    afterNote: 'After 4 Weeks',
    beforeBg: '#C8B8A4',
    afterBg: '#DDD0C0',
  },
  {
    id: 3,
    treatment: 'Anti-Aging Cream Protocol',
    duration: '12 Weeks',
    concern: 'Skin Firmness & Glow',
    improvement: 'Measurable collagen density increase, radiant complexion',
    beforeNote: 'Before',
    afterNote: 'After 12 Weeks',
    beforeBg: '#CBBBA7',
    afterBg: '#E0D5C8',
  },
]

export default function BeforeAfter() {
  return (
    <section id="results" style={{ backgroundColor: '#1A1A1A', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
            className="text-xs uppercase tracking-widest mb-4">
            Real Results
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">
            Before & After
          </h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '14px', marginTop: '16px' }}>
            Individual results may vary. All treatments performed or supervised by licensed professionals.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c) => (
            <div key={c.id} style={{ border: '1px solid #2E2E2E' }}>
              {/* Before / After Visual */}
              <div className="grid grid-cols-2" style={{ height: '280px' }}>
                {/* Before */}
                <div style={{ backgroundColor: c.beforeBg, position: 'relative' }}
                  className="flex items-end p-4">
                  {/* Abstract face/skin texture suggestion */}
                  <div style={{
                    position: 'absolute', inset: 0, opacity: 0.3,
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 10px)',
                  }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <div style={{ width: '60px', height: '80px', borderRadius: '50% 50% 45% 45%', backgroundColor: 'rgba(0,0,0,0.08)' }}></div>
                  </div>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '10px', letterSpacing: '0.15em', position: 'relative', zIndex: 1 }}
                    className="uppercase">{c.beforeNote}</span>
                </div>
                {/* After */}
                <div style={{ backgroundColor: c.afterBg, position: 'relative' }}
                  className="flex items-end p-4">
                  <div style={{
                    position: 'absolute', inset: 0, opacity: 0.15,
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(201,169,110,0.2) 0px, rgba(201,169,110,0.2) 1px, transparent 1px, transparent 10px)',
                  }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    <div style={{ width: '60px', height: '80px', borderRadius: '50% 50% 45% 45%', backgroundColor: 'rgba(201,169,110,0.15)' }}></div>
                  </div>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.15em', position: 'relative', zIndex: 1 }}
                    className="uppercase">{c.afterNote}</span>
                </div>
              </div>

              {/* Card Info */}
              <div style={{ backgroundColor: '#222222', padding: '24px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.2em' }}
                  className="uppercase tracking-widest mb-2">
                  {c.concern} · {c.duration}
                </p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '14px', lineHeight: '1.6' }}>
                  {c.treatment}
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.6', marginTop: '8px' }}>
                  {c.improvement}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#consultation"
            style={{ border: '1px solid #C9A96E', color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em' }}
            className="text-xs uppercase tracking-widest px-10 py-4 inline-block hover:bg-[#C9A96E] hover:text-white transition-colors">
            Start Your Transformation
          </a>
        </div>
      </div>
    </section>
  )
}
