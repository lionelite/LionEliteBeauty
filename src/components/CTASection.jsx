import { useState } from 'react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="consultation" style={{ backgroundColor: '#1A1A1A', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,169,110,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(138,158,133,0.06) 0%, transparent 60%)',
        pointerEvents: 'none'
      }}></div>

      <div className="max-w-4xl mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.3em' }}
          className="text-xs uppercase tracking-widest mb-6">Start Your Routine</p>

        <h2 style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', fontSize: '2.8rem', lineHeight: '1.2', maxWidth: '700px', margin: '0 auto' }}
          className="font-normal mb-6">
          Bring Clinical Peptides<br />
          <span style={{ color: '#C9A96E' }}>Into Your Home</span>
        </h2>

        <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', margin: '0 auto 28px' }}></div>

        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '15px', lineHeight: '1.9', maxWidth: '500px', margin: '0 auto 48px' }}>
          Join our list for early product drops, peptide skincare education, and exclusive subscriber pricing on every new formula.
        </p>

        {/* Email Sign-Up */}
        {!submitted ? (
          <form onSubmit={handleSubmit}
            style={{ display: 'flex', gap: '0', maxWidth: '480px', margin: '0 auto 48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              style={{
                flex: '1 1 260px',
                backgroundColor: '#222222',
                border: '1px solid #3A3A3A',
                borderRight: 'none',
                color: '#FAFAF8',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '13px',
                padding: '16px 20px',
                outline: 'none',
                letterSpacing: '0.05em',
                minWidth: '220px',
              }}
            />
            <button type="submit"
              style={{
                backgroundColor: '#C9A96E',
                color: '#FFFFFF',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.2em',
                padding: '16px 28px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              className="uppercase hover:opacity-90 transition-opacity">
              Join the List
            </button>
          </form>
        ) : (
          <div style={{ maxWidth: '480px', margin: '0 auto 48px', backgroundColor: '#222222', padding: '24px', border: '1px solid #C9A96E33' }}>
            <p style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '1rem' }}>You're on the list.</p>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', marginTop: '8px' }}>
              Welcome to Lion Elite Beauty. Expect peptide science, clean luxury, and early access.
            </p>
          </div>
        )}

        {/* Shop CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#products"
            style={{ backgroundColor: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em' }}
            className="text-white text-xs uppercase tracking-widest px-10 py-4 hover:opacity-90 transition-opacity">
            Shop the Collection
          </a>
          <a href="#products"
            style={{ border: '1px solid #3A3A3A', color: '#8A8A8A', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.15em' }}
            className="text-xs uppercase tracking-widest px-10 py-4 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
            Shop the Bundle
          </a>
        </div>

        {/* Lion Elite Wellness Link */}
        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: '40px' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', letterSpacing: '0.2em' }} className="uppercase mb-3">
            Part of the Lion Elite Family
          </p>
          <a href="https://lionelitewellness.com" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '14px', letterSpacing: '0.05em' }}
            className="hover:opacity-70 transition-opacity">
            lionelitewellness.com →
          </a>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '12px', marginTop: '8px', lineHeight: '1.7' }}>
            For clinical wellness programs, injectables, and medical aesthetic treatments,<br />visit our wellness practice.
          </p>
        </div>
      </div>
    </section>
  )
}
