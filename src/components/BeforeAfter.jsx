export default function BeforeAfter() {
  return (
    <section id="results" style={{ backgroundColor: '#1A1A1A', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
            className="text-xs uppercase tracking-widest mb-4">Real People. Real Results.</p>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.5rem', lineHeight: '1.2' }}
            className="font-normal">Before & After</h2>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '24px auto 0' }}></div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', marginTop: '16px' }}>
            Both clients apply GHK-Cu topically as a daily serum. No injections. No procedures. Just the peptide.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Daylen — combined before/after photo */}
          <div>
            <div style={{ border: '1px solid #2A2A2A', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="/results/daylen-beforeafter.jpeg"
                  alt="Daylen before and after GHK-Cu peptide serum"
                  style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                />
                {/* Before / After labels */}
                <div style={{ position: 'absolute', bottom: '16px', left: '0', width: '50%', display: 'flex', justifyContent: 'center' }}>
                  <span style={{ backgroundColor: 'rgba(0,0,0,0.65)', color: '#FAFAF8', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.2em', padding: '5px 14px' }} className="uppercase">Before</span>
                </div>
                <div style={{ position: 'absolute', bottom: '16px', right: '0', width: '50%', display: 'flex', justifyContent: 'center' }}>
                  <span style={{ backgroundColor: 'rgba(201,169,110,0.85)', color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.2em', padding: '5px 14px' }} className="uppercase">After</span>
                </div>
              </div>
              <div style={{ backgroundColor: '#222222', padding: '24px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.25em' }} className="uppercase mb-2">
                  Daylen · GHK-Cu Peptide Serum · Daily Topical Use
                </p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1rem', lineHeight: '1.6' }}>
                  Acne clearance & skin texture improvement
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>
                  Visible reduction in active breakouts, post-inflammatory marks, and overall skin congestion from consistent daily peptide application.
                </p>
              </div>
            </div>
          </div>

          {/* Miranda — two separate photos stacked */}
          <div>
            <div style={{ border: '1px solid #2A2A2A', overflow: 'hidden' }}>
              <div className="grid grid-cols-2" style={{ height: '420px' }}>
                {/* Before */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src="/results/miranda-before.jpeg"
                    alt="Miranda before GHK-Cu peptide serum"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                  <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                    <span style={{ backgroundColor: 'rgba(0,0,0,0.65)', color: '#FAFAF8', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.2em', padding: '5px 14px' }} className="uppercase">Before</span>
                  </div>
                </div>
                {/* After */}
                <div style={{ position: 'relative', overflow: 'hidden', borderLeft: '2px solid #1A1A1A' }}>
                  <img
                    src="/results/miranda-after.jpeg"
                    alt="Miranda after GHK-Cu peptide serum"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                  {/* "Skin is insane" badge */}
                  <div style={{ position: 'absolute', top: '12px', right: '10px', backgroundColor: '#C9A96E', padding: '4px 10px' }}>
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FFFFFF', fontSize: '9px', letterSpacing: '0.1em' }}>"Skin is insane"</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                    <span style={{ backgroundColor: 'rgba(201,169,110,0.85)', color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '10px', letterSpacing: '0.2em', padding: '5px 14px' }} className="uppercase">After</span>
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: '#222222', padding: '24px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '10px', letterSpacing: '0.25em' }} className="uppercase mb-2">
                  Miranda · GHK-Cu Peptide Serum · Daily Topical Use
                </p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1rem', lineHeight: '1.6' }}>
                  Radiance, smoothness & skin clarity
                </p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>
                  Noticeably smoother, glass-like skin texture with improved luminosity and reduction of surface irregularities — her words: <em style={{ color: '#8A9E85' }}>"Skin is insane."</em>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '11px', textAlign: 'center', marginTop: '32px', letterSpacing: '0.05em' }}>
          Individual results may vary. Both clients used GHK-Cu topically as a daily serum without any additional procedures.
        </p>

        <div className="text-center mt-10">
          <a href="#products"
            style={{ border: '1px solid #C9A96E', color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em' }}
            className="text-xs uppercase tracking-widest px-10 py-4 inline-block hover:bg-[#C9A96E] hover:text-white transition-colors">
            Shop GHK-Cu Serum
          </a>
        </div>
      </div>
    </section>
  )
}
