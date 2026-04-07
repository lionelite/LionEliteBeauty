export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111111', padding: '60px 0 32px' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Row */}
        <div className="grid md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid #222222' }}>
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', letterSpacing: '0.15em', fontSize: '16px' }}
                className="uppercase">Lion Elite</p>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em', fontSize: '10px' }}
                className="uppercase tracking-widest mt-1">Beauty & Wellness</p>
            </div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginTop: '16px' }}>
              Powered by Lion Elite Wellness. Clinical-grade, peptide-driven skincare for discerning clients who demand real results.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              {['IG', 'FB', 'TK', 'YT'].map(s => (
                <a key={s} href="#"
                  style={{ width: '32px', height: '32px', border: '1px solid #2E2E2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px', letterSpacing: '0.05em' }}>{s}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }}
              className="uppercase tracking-widest">Products</p>
            {['GHK-Cu Face Wash', 'Peptide Serum', 'Anti-Aging Cream', 'Recovery Kit', 'Shop All'].map(item => (
              <a key={item} href="#products"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }}
              className="uppercase tracking-widest">Services</p>
            {['Injectables', 'Tirzepatide', 'Microneedling', 'Chemical Peels', 'LED Therapy'].map(item => (
              <a key={item} href="#services"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>

          {/* Info */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }}
              className="uppercase tracking-widest">Company</p>
            {['About Us', 'Results', 'Blog', 'Contact', 'Careers'].map(item => (
              <a key={item} href="#"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', letterSpacing: '0.08em' }}>
            © 2024 Lion Elite Beauty · Powered by Lion Elite Wellness · lionelitebeauty.com
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Medical Disclaimer'].map(link => (
              <a key={link} href="#"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '11px', letterSpacing: '0.08em' }}
                className="hover:text-[#C9A96E] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
