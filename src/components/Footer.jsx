import { Link } from 'react-router-dom'

export default function Footer() {
  const programs = [
    { label: 'Muscle & Recovery', href: '/programs/optimization' },
    { label: 'Neuro Program', href: '/programs/neuro' },
    { label: 'Fertility Program', href: '/programs/fertility' },
    { label: 'Hair Program', href: '/programs/hair' },
    { label: 'Weight Program', href: '/programs/weight' },
    { label: 'Longevity Program', href: '/programs/longevity' },
  ]

  return (
    <footer style={{ backgroundColor: '#040404', padding: '60px 0 32px', borderTop: '1px solid #111' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid #141414' }}>

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', letterSpacing: '0.15em', fontSize: '16px' }} className="uppercase">Lion Elite</p>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em', fontSize: '10px' }} className="uppercase mt-1">Wellness</p>
            </div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '13px', lineHeight: '1.8', marginTop: '16px' }}>
              Precision biomarker testing. Clinical-grade formulations. Data-driven programs — built for people who take their body seriously.
            </p>
            <div className="flex gap-3 mt-6">
              {['IG', 'TK', 'FB'].map(s => (
                <a key={s} href="#"
                  style={{ width: '30px', height: '30px', border: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  className="hover:border-[#C9A96E] transition-colors">
                  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#4A4A4A', fontSize: '9px' }}>{s}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Programs</p>
            {programs.map(p => (
              <Link key={p.label} to={p.href}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px', textDecoration: 'none' }}
                className="hover:text-[#C9A96E] transition-colors">{p.label}</Link>
            ))}
          </div>

          {/* Skincare */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Skincare</p>
            {['GHK-Cu Face Wash', 'Peptide Serum', 'Anti-Aging Cream', 'KPV Moisturizer', 'Recovery Kit'].map(item => (
              <a key={item} href="#skincare"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#3A3A3A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px', textDecoration: 'none' }}
                className="hover:text-[#C9A96E] transition-colors">{item}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Company</p>
            {[
              { label: 'About Us', href: '#' },
              { label: 'Contact', href: 'mailto:info@lionelitewellness.com' },
              { label: 'lionelitewellness.com', href: 'https://lionelitewellness.com', external: true },
            ].map(item => (
              <a key={item.label} href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: item.external ? '#C9A96E' : '#3A3A3A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px', textDecoration: 'none' }}
                className="hover:text-[#C9A96E] transition-colors">{item.label}</a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ borderBottom: '1px solid #141414', padding: '32px 0' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#282828', fontSize: '11px', lineHeight: '1.9', maxWidth: '900px' }}>
            The products and information provided through this program have not been evaluated by the Food and Drug Administration. This program is not intended to diagnose, treat, cure, or prevent any disease. All information is for educational and informational purposes only and should not be considered medical advice. Always consult with a qualified healthcare professional before making any health decisions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#282828', fontSize: '11px', letterSpacing: '0.08em' }}>
            © {new Date().getFullYear()} Lion Elite Wellness · info@lionelitewellness.com
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} href="#"
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#282828', fontSize: '11px', letterSpacing: '0.08em', textDecoration: 'none' }}
                className="hover:text-[#C9A96E] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
