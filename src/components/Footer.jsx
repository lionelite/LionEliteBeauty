export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#080808', padding: '60px 0 32px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid #1E1E1E' }}>
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', letterSpacing: '0.15em', fontSize: '16px' }} className="uppercase">Lion Elite</p>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em', fontSize: '10px' }} className="uppercase mt-1">Wellness</p>
            </div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.8', marginTop: '16px' }}>
              A data-driven optimization system powered by advanced biomarker testing and personalized performance strategy.
            </p>
            <div className="flex gap-3 mt-6">
              {['IG', 'TK', 'FB'].map(s => (
                <a key={s} href="#"
                  style={{ width: '30px', height: '30px', border: '1px solid #2E2E2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '9px' }}>{s}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Program */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Program</p>
            {['How It Works', 'What You Get', 'Elite Access', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>

          {/* Learn */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Learn</p>
            {['Biomarker Testing', 'Performance Optimization', 'Recovery Science', 'Hormone Health', 'Blog'].map(item => (
              <a key={item} href="#"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Company</p>
            {['About Us', 'Contact', 'lionelitewellness.com'].map(item => (
              <a key={item} href={item === 'lionelitewellness.com' ? 'https://lionelitewellness.com' : '#'}
                target={item === 'lionelitewellness.com' ? '_blank' : undefined}
                rel={item === 'lionelitewellness.com' ? 'noopener noreferrer' : undefined}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>
        </div>

        {/* Disclaimers */}
        <div style={{ borderBottom: '1px solid #1E1E1E', padding: '32px 0' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '11px', lineHeight: '1.9', maxWidth: '900px' }}>
            The products and information provided through this program have not been evaluated by the Food and Drug Administration. This program is not intended to diagnose, treat, cure, or prevent any disease. All information is for educational and informational purposes only and should not be considered medical advice. Always consult with a qualified healthcare professional before making any health decisions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '11px', letterSpacing: '0.08em' }}>
            © {new Date().getFullYear()} Lion Elite Wellness · info@lionelitewellness.com
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(link => (
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
