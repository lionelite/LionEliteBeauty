export default function CTASection() {
  return (
    <section id="consultation" style={{ backgroundColor: '#1A1A1A', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,169,110,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(138,158,133,0.06) 0%, transparent 60%)',
        pointerEvents: 'none'
      }}></div>

      <div className="max-w-4xl mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
          className="text-xs uppercase tracking-widest mb-6">
          Begin Your Journey
        </p>

        <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.2', letterSpacing: '-0.01em', maxWidth: '700px', margin: '0 auto' }}
          className="font-normal mb-6">
          Your Skin Deserves<br />
          <span style={{ color: '#C9A96E' }}>Clinical Precision</span>
        </h2>

        <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>

        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '15px', lineHeight: '1.9', maxWidth: '520px', margin: '0 auto 48px' }}>
          Book a complimentary consultation and receive a personalized peptide skincare protocol and treatment plan — designed around your unique skin biology and aesthetic goals.
        </p>

        {/* CTA Form */}
        <div style={{ backgroundColor: '#222222', padding: '48px', maxWidth: '540px', margin: '0 auto', border: '1px solid #2E2E2E' }}>
          <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '1.1rem', marginBottom: '28px' }}>
            Request Your Free Consultation
          </p>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #3A3A3A',
                color: '#FAFAF8',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '13px',
                padding: '14px 18px',
                outline: 'none',
                letterSpacing: '0.05em',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="email"
              placeholder="Email Address"
              style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #3A3A3A',
                color: '#FAFAF8',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '13px',
                padding: '14px 18px',
                outline: 'none',
                letterSpacing: '0.05em',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #3A3A3A',
                color: '#FAFAF8',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '13px',
                padding: '14px 18px',
                outline: 'none',
                letterSpacing: '0.05em',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            <select
              style={{
                backgroundColor: '#1A1A1A',
                border: '1px solid #3A3A3A',
                color: '#8A8A8A',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '13px',
                padding: '14px 18px',
                outline: 'none',
                letterSpacing: '0.05em',
                width: '100%',
                boxSizing: 'border-box',
                appearance: 'none'
              }}>
              <option>Area of Interest</option>
              <option>Peptide Skincare Products</option>
              <option>Injectables / Tirzepatide</option>
              <option>Skin Treatments</option>
              <option>Post-Procedure Recovery</option>
              <option>Full Aesthetic Program</option>
            </select>

            <button
              style={{
                backgroundColor: '#C9A96E',
                color: '#FFFFFF',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.2em',
                padding: '18px',
                border: 'none',
                cursor: 'pointer',
                width: '100%'
              }}
              className="uppercase tracking-widest hover:opacity-90 transition-opacity">
              Book My Free Consultation
            </button>
          </div>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '11px', marginTop: '20px', letterSpacing: '0.05em' }}>
            No obligation. Your information is private and secure.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-14">
          {[
            { label: 'Call Us', value: '(555) 000-0000' },
            { label: 'Email', value: 'hello@lionelitebeauty.com' },
            { label: 'Location', value: 'lionelitebeauty.com' },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', fontSize: '10px', letterSpacing: '0.2em' }}
                className="uppercase tracking-widest mb-1">{label}</p>
              <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '13px' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
