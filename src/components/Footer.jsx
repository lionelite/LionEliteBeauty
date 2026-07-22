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

  const skincare = [
    { label: 'GHK-Cu Intensive Serum', href: '/skincare/ghk-cu-serum' },
    { label: 'GHK-Cu Peptide Face Wash', href: '/skincare/ghk-cu-face-wash' },
    { label: 'KPV Recovery Moisturizer', href: '/skincare/kpv-moisturizer' },
    { label: 'Hydra Boost Body Wash', href: '/skincare/hydra-boost-body-wash' },
  ]

  return (
    <footer style={{ backgroundColor: '#2A2A2A', padding: '60px 0 32px', borderTop: '1px solid #3A3A3A' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-12" style={{ borderBottom: '1px solid #3A3A3A' }}>
          <div className="md:col-span-1">
            <div className="mb-4">
              <p style={{ fontFamily: 'Georgia, serif', color: '#FAFAF8', letterSpacing: '0.15em', fontSize: '16px' }} className="uppercase">Lion Elite Beauty</p>
              <p style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em', fontSize: '10px' }} className="uppercase mt-1">Powered by Lion Elite Wellness</p>
            </div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.8', marginTop: '16px' }}>
              Advanced peptide skincare and clinical-grade wellness programs — designed to work with your biology and deliver real, lasting results.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.instagram.com/lionelitebeauty" target="_blank" rel="noopener noreferrer" style={{ width: '30px', height: '30px', border: '1px solid #4A4A4A', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hover:border-[#C9A96E] transition-colors"><span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px' }}>IG</span></a>
              <a href="https://www.tiktok.com/@lionelitebeauty" target="_blank" rel="noopener noreferrer" style={{ width: '30px', height: '30px', border: '1px solid #4A4A4A', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hover:border-[#C9A96E] transition-colors"><span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '9px' }}>TK</span></a>
            </div>
          </div>

          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Programs</p>
            {programs.map(p => <Link key={p.label} to={p.href} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px', textDecoration: 'none' }} className="hover:text-[#C9A96E] transition-colors">{p.label}</Link>)}
          </div>

          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Skincare</p>
            {skincare.map(item => <Link key={item.label} to={item.href} style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px', textDecoration: 'none' }} className="hover:text-[#C9A96E] transition-colors">{item.label}</Link>)}
          </div>

          <div>
            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#FAFAF8', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }} className="uppercase">Company</p>
            <Link to="/apply" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px', textDecoration: 'none' }} className="hover:text-[#C9A96E] transition-colors">Apply for a Program</Link>
            <a href="mailto:info@lionelitebeauty.com" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px', textDecoration: 'none' }} className="hover:text-[#C9A96E] transition-colors">Contact Us</a>
            <Link to="/rep/login" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px', textDecoration: 'none' }} className="hover:text-white transition-colors">Rep Portal →</Link>
            <a href="https://lionelitewellness.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '13px', lineHeight: '1.5', display: 'block', marginBottom: '12px', textDecoration: 'none' }}>lionelitewellness.com</a>

            <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.12em', marginTop: '20px', marginBottom: '10px' }} className="uppercase">Policies</p>
            <Link to="/policies/skincare" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', display: 'block', marginBottom: '8px', textDecoration: 'none' }}>Skincare Policies</Link>
            <Link to="/policies/programs" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', display: 'block', marginBottom: '8px', textDecoration: 'none' }}>Programs Policies</Link>
            <Link to="/terms/skincare" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', display: 'block', marginBottom: '8px', textDecoration: 'none' }}>Skincare Terms</Link>
            <Link to="/terms/programs" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px', display: 'block', marginBottom: '8px', textDecoration: 'none' }}>Programs Terms</Link>
          </div>
        </div>

        <div style={{ borderBottom: '1px solid #3A3A3A', padding: '32px 0' }}>
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', lineHeight: '1.9', maxWidth: '900px' }}>
            The products and information provided through this program have not been evaluated by the Food and Drug Administration. This program is not intended to diagnose, treat, cure, or prevent any disease. All information is for educational and informational purposes only and should not be considered medical advice. Always consult with a qualified healthcare professional before making any health decisions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.08em' }}>© {new Date().getFullYear()} Lion Elite Beauty · info@lionelitebeauty.com</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/rep/login" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.08em', textDecoration: 'none' }} className="hover:text-white transition-colors">Rep Portal</Link>
            <Link to="/policies/skincare" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.08em', textDecoration: 'none' }}>Skincare Policies</Link>
            <Link to="/policies/programs" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.08em', textDecoration: 'none' }}>Programs Policies</Link>
            <Link to="/terms/skincare" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.08em', textDecoration: 'none' }}>Skincare Terms</Link>
            <Link to="/terms/programs" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.08em', textDecoration: 'none' }}>Programs Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
