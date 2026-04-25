export default function CTASection() {
  return (
    <section id="cta-final" style={{ backgroundColor: '#1A1A1A', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,169,110,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(138,158,133,0.06) 0%, transparent 60%)',
        pointerEvents: 'none'
      }}></div>

      <div className="max-w-3xl mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
          className="text-xs uppercase tracking-widest mb-6">Ready to Begin</p>

        <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.2', maxWidth: '700px', margin: '0 auto' }}
          className="font-normal mb-6">
          Ready to Stop Guessing<br />
          <span style={{ color: '#C9A96E' }}>and Start Optimizing?</span>
        </h2>

        <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 32px' }}></div>

        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#7A7A7A', fontSize: '16px', lineHeight: '1.9', maxWidth: '480px', margin: '0 auto 48px' }}>
          Join the Lion Elite Optimization Program and get the data-driven clarity your body deserves.
        </p>

        <a href="mailto:info@lionelitewellness.com"
          style={{
            display: 'inline-block',
            backgroundColor: '#C9A96E',
            color: '#FFFFFF',
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontSize: '13px',
            letterSpacing: '0.15em',
            padding: '20px 56px',
            textDecoration: 'none',
          }}
          className="uppercase hover:opacity-90 transition-opacity mb-16">
          👉 Start Your Optimization Program
        </a>

        {/* Lion Elite Wellness Link */}
        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: '40px', marginTop: '20px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', letterSpacing: '0.2em' }} className="uppercase mb-3">
            Part of the Lion Elite Family
          </p>
          <a href="https://lionelitewellness.com" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '14px', letterSpacing: '0.05em' }}
            className="hover:opacity-70 transition-opacity">
            lionelitewellness.com →
          </a>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', marginTop: '8px', lineHeight: '1.7' }}>
            For clinical wellness programs and medical services,<br />visit our wellness practice.
          </p>
        </div>
      </div>
    </section>
  )
}
