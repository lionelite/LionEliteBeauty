export default function Hero() {
  return (
    <section id="hero" style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', paddingTop: '80px' }}
      className="flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <p style={{
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            color: '#C9A96E',
            letterSpacing: '0.3em',
            fontSize: '11px',
          }} className="uppercase mb-6">Lion Elite Wellness</p>

          <h1 style={{
            fontFamily: 'Georgia, serif',
            color: '#FAFAF8',
            lineHeight: '1.1',
            letterSpacing: '-0.01em',
          }} className="text-5xl md:text-6xl lg:text-7xl font-normal mb-6">
            Stop Guessing.<br />
            <span style={{ color: '#C9A96E' }}>Start Optimizing.</span>
          </h1>

          <p style={{
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            color: '#9A9A9A',
            fontSize: '18px',
            lineHeight: '1.7',
            maxWidth: '580px',
            margin: '0 auto',
          }} className="mb-10">
            A data-driven system using advanced biomarker testing and personalized performance strategies to help you unlock your highest level.
          </p>

          <a href="#pricing"
            style={{
              backgroundColor: '#C9A96E',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              letterSpacing: '0.15em',
              fontSize: '13px',
              display: 'inline-block',
              padding: '18px 48px',
              color: '#fff',
              textDecoration: 'none',
            }}
            className="uppercase hover:opacity-90 transition-opacity">
            Start Your Optimization Program
          </a>

          <div className="flex items-center justify-center gap-10 mt-16 flex-wrap">
            {[
              { label: 'At-Home Testing', icon: '🧪' },
              { label: 'Data Analysis', icon: '📊' },
              { label: '1-on-1 Coaching', icon: '🎯' },
              { label: 'No Guesswork', icon: '🔬' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <span style={{ fontSize: '22px' }}>{item.icon}</span>
                <span style={{
                  fontFamily: 'Helvetica Neue, Arial, sans-serif',
                  color: '#5A5A5A',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                }} className="uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, #C9A96E, transparent)' }}></div>
        </div>
      </div>
    </section>
  )
}
