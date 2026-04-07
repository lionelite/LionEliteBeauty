export default function Hero() {
  return (
    <section id="hero" style={{ backgroundColor: '#F5F0E8', minHeight: '100vh' }}
      className="flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.25em' }}
              className="text-xs uppercase tracking-widest mb-6">
              Powered by Lion Elite Wellness
            </p>
            <h1 style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', lineHeight: '1.15', letterSpacing: '-0.02em' }}
              className="text-5xl md:text-6xl font-normal mb-8">
              Advanced Peptide<br />
              Skincare for<br />
              <span style={{ color: '#C9A96E' }}>Real Results</span>
            </h1>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', lineHeight: '1.8' }}
              className="text-base mb-4 max-w-md">
              Clinical-grade, peptide-driven formulations powered by GHK-Cu science —
              available to you at home.
            </p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', lineHeight: '1.8', fontSize: '14px' }}
              className="mb-10 max-w-md">
              The same peptide technology used in medical-grade treatments, now in your daily skincare ritual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#products"
                style={{ backgroundColor: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em' }}
                className="text-white text-xs uppercase tracking-widest px-10 py-4 text-center hover:opacity-90 transition-opacity">
                Shop the Collection
              </a>
              <a href="#science"
                style={{ border: '1px solid #2A2A2A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em', color: '#2A2A2A' }}
                className="text-xs uppercase tracking-widest px-10 py-4 text-center hover:bg-gray-50 transition-colors">
                The Science
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-8 mt-14">
              {[
                { number: 'GHK-Cu', label: 'Peptide Technology' },
                { number: '4', label: 'Products in the Line' },
                { number: '100%', label: 'Clean Formulas' },
              ].map(({ number, label }) => (
                <div key={label} className="text-center">
                  <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '1.4rem' }}
                    className="font-normal">{number}</p>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', letterSpacing: '0.08em' }}
                    className="text-xs uppercase tracking-wide mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden md:block">
            <div style={{ backgroundColor: '#E8DDD0', height: '580px' }} className="relative rounded-sm overflow-hidden">
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(138,158,133,0.1) 100%)'
              }}></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center" style={{ position: 'relative' }}>
                  {/* Main serum bottle */}
                  <div style={{ width: '130px', height: '200px', backgroundColor: '#FAFAF8', margin: '0 auto', borderRadius: '4px', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div style={{ backgroundColor: '#C9A96E', height: '4px', width: '100%', borderRadius: '4px 4px 0 0', position: 'absolute', top: 0, left: 0 }}></div>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '9px', letterSpacing: '0.2em' }} className="uppercase mb-2">Lion Elite</p>
                    <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E', margin: '6px auto' }}></div>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '12px', letterSpacing: '0.1em', textAlign: 'center', lineHeight: '1.6' }}>GHK-Cu<br />Peptide<br />Serum</p>
                    <div style={{ width: '28px', height: '1px', backgroundColor: '#C9A96E', margin: '6px auto' }}></div>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', fontSize: '7px', letterSpacing: '0.15em' }}>CLINICAL GRADE</p>
                  </div>
                  {/* Second bottle — cream jar */}
                  <div style={{ width: '90px', height: '90px', backgroundColor: '#2A2A2A', borderRadius: '50%', boxShadow: '0 12px 40px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '60px', left: '-70px' }}>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '7px', textAlign: 'center', lineHeight: '1.8', letterSpacing: '0.1em' }}>ANTI<br />AGING<br />CREAM</p>
                  </div>
                  {/* Third — face wash */}
                  <div style={{ width: '80px', height: '110px', backgroundColor: '#8A9E85', borderRadius: '4px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '80px', right: '-60px', padding: '10px' }}>
                    <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '7px', textAlign: 'center', lineHeight: '1.8', letterSpacing: '0.1em' }}>FACE<br />WASH</p>
                    <div style={{ width: '20px', height: '1px', backgroundColor: '#FAFAF8', opacity: 0.5, margin: '6px auto' }}></div>
                    <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '6px', letterSpacing: '0.1em', opacity: 0.8 }}>GHK-Cu</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div style={{ position: 'absolute', bottom: '40px', left: '30px', backgroundColor: '#FAFAF8', padding: '16px 20px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '9px', letterSpacing: '0.2em' }} className="uppercase">New</p>
                <p style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontSize: '13px' }} className="mt-1">Recovery Peptide Kit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
