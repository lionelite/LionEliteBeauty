import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const programs = [
  { label: 'Optimization Program', href: '/programs/optimization', accent: '#C9A96E', desc: 'Body & performance' },
  { label: 'Neuro Program', href: '/programs/neuro', accent: '#8A9E85', desc: 'Cognitive performance' },
  { label: 'Fertility Program', href: '/programs/fertility', accent: '#B8A4D4', desc: 'Reproductive health' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav style={{ backgroundColor: '#FAFAF8', borderBottom: '1px solid #E8DDD0' }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex flex-col" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', letterSpacing: '0.15em' }}
            className="text-lg font-normal uppercase tracking-widest">Lion Elite</span>
          <span style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em' }}
            className="text-xs uppercase tracking-widest font-light">Wellness</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {/* Programs dropdown */}
          <div className="relative"
            onMouseEnter={() => setProgramsOpen(true)}
            onMouseLeave={() => setProgramsOpen(false)}>
            <button
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer' }}
              className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity flex items-center gap-1">
              Programs
              <span style={{ fontSize: '8px', marginTop: '1px' }}>▼</span>
            </button>
            {programsOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                backgroundColor: '#FAFAF8', border: '1px solid #E8DDD0',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                width: '240px', marginTop: '12px', zIndex: 100,
              }}>
                {programs.map(p => (
                  <Link key={p.label} to={p.href}
                    onClick={() => setProgramsOpen(false)}
                    style={{ display: 'block', padding: '18px 22px', borderBottom: '1px solid #F0EAE0', textDecoration: 'none' }}
                    className="hover:bg-[#F5F0E8] transition-colors group">
                    <div className="flex items-center gap-3">
                      <div style={{ width: '8px', height: '8px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0 }}></div>
                      <div>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '11px', letterSpacing: '0.1em' }}
                          className="uppercase">{p.label}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '11px', marginTop: '3px' }}>{p.desc}</p>
                      </div>
                      <span style={{ color: p.accent, fontSize: '12px', marginLeft: 'auto', opacity: 0 }}
                        className="group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </Link>
                ))}
                <div style={{ padding: '14px 22px' }}>
                  <Link to="/#pricing"
                    onClick={() => setProgramsOpen(false)}
                    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.1em', textDecoration: 'none' }}
                    className="uppercase hover:opacity-70 transition-opacity">
                    Compare all programs →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {[
            { label: 'Shop Skincare', href: '/#skincare' },
            { label: 'Pricing', href: '/#pricing' },
          ].map(link => (
            <a key={link.label} href={link.href}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em' }}
              className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">{link.label}</a>
          ))}

          <Link to="/programs/optimization"
            style={{ backgroundColor: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.12em', textDecoration: 'none' }}
            className="text-white text-xs uppercase tracking-wider px-6 py-3 hover:opacity-90 transition-opacity">
            Start Program
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span style={{ backgroundColor: '#2A2A2A' }} className="block w-6 h-0.5"></span>
          <span style={{ backgroundColor: '#2A2A2A' }} className="block w-6 h-0.5"></span>
          <span style={{ backgroundColor: '#2A2A2A' }} className="block w-6 h-0.5"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: '#FAFAF8', borderTop: '1px solid #E8DDD0' }} className="md:hidden px-6 py-6 flex flex-col gap-5">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '9px', letterSpacing: '0.25em' }}
            className="uppercase">Programs</p>
          {programs.map(p => (
            <Link key={p.label} to={p.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', textDecoration: 'none' }}
              className="text-sm uppercase tracking-wider flex items-center gap-3">
              <div style={{ width: '6px', height: '6px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0 }}></div>
              {p.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid #E8DDD0', paddingTop: '16px' }} className="flex flex-col gap-5">
            {[
              { label: 'Shop Skincare', href: '/#skincare' },
              { label: 'Pricing', href: '/#pricing' },
            ].map(link => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em' }}
                className="text-sm uppercase tracking-wider">{link.label}</a>
            ))}
          </div>
          <Link to="/programs/optimization" onClick={() => setMenuOpen(false)}
            style={{ backgroundColor: '#C9A96E', textDecoration: 'none' }}
            className="text-white text-xs uppercase tracking-wider px-6 py-3 text-center">
            Start Program
          </Link>
        </div>
      )}
    </nav>
  )
}
