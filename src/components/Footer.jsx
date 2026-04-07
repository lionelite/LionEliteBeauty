export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111111', padding: '60px 0 32px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid #1E1E1E' }}>
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', letterSpacing: '0.15em', fontSize: '16px' }} className="uppercase">Lion Elite</p>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em', fontSize: '10px' }} className="uppercase mt-1">Beauty</p>
            </div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginTop: '16px' }}>
              Clinical-grade, peptide-driven skincare powered by Lion Elite Wellness. GHK-Cu technology for your home routine.
            </p>
            <div style={{ marginTop: '20px' }}>
              <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '10px', letterSpacing: '0.15em' }} className="uppercase mb-2">Powered by</p>
              <a href="https://lionelitewellness.com" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'Georgia, serif', color: '#C9A96E', fontSize: '13px' }}
                className="hover:opacity-70 transition-opacity">Lion Elite Wellness</a>
            </div>
            <div className="flex gap-3 mt-6">
              {['IG', 'TK', 'FB'].map(s => (
                <a key={s} href="#"
                  style={{ width: '30px', height: '30px', border: '1px solid #2E2E2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '9px' }}>{s}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Shop</p>
            {['GHK-Cu Face Wash', 'Peptide Serum', 'Anti-Aging Cream', 'Recovery Kit', 'Shop the Bundle'].map(item => (
              <a key={item} href="#products"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>

          {/* Learn */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Learn</p>
            {['The Science of GHK-Cu', 'Peptide Protocol Guide', 'How to Layer Products', 'Ingredient Glossary', 'Blog'].map(item => (
              <a key={item} href="#science"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Company</p>
            {['About Us', 'Results', 'Contact', 'Wholesale', 'lionelitewellness.com'].map(item => (
              <a key={item} href="#"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '11px', letterSpacing: '0.08em' }}>
            © 2024 Lion Elite Beauty · lionelitebeauty.com · Powered by Lion Elite Wellness
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping & Returns'].map(link => (
              <a key={link} href="#"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '11px', letterSpacing: '0.08em' }}
                className="hover:text-[#C9A96E] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
