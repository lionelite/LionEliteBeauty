import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const programs = [
  { label: 'Muscle & Recovery Program', href: '/programs/optimization', accent: '#C9A96E', desc: 'Strength & performance' },
  { label: 'Neuro Program', href: '/programs/neuro', accent: '#8A9E85', desc: 'Cognitive performance' },
  { label: 'Fertility Program', href: '/programs/fertility', accent: '#B8A4D4', desc: 'Reproductive health' },
  { label: 'Hair Program', href: '/programs/hair', accent: '#C4A265', desc: 'Hair restoration & density' },
  { label: 'Weight Program', href: '/programs/weight', accent: '#5BA87A', desc: 'Fat loss & metabolic health' },
  { label: 'Longevity Program', href: '/programs/longevity', accent: '#7A9FBF', desc: 'Anti-aging & cellular repair' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProgramsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setProgramsOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  const anchorHref = (anchor) => isHome ? anchor : `/${anchor}`

  return (
    <nav style={{ backgroundColor: '#FAFAF8', borderBottom: '1px solid #E8DDD0' }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }} className="flex flex-col">
          <span style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', letterSpacing: '0.15em', fontSize: '18px' }}
            className="uppercase">Lion Elite</span>
          <span style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em', fontSize: '10px' }}
            className="uppercase font-light">Wellness</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">

          {/* Programs dropdown — click to open */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProgramsOpen(o => !o)}
              style={{
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                color: programsOpen ? '#C9A96E' : '#5A5A5A',
                letterSpacing: '0.1em',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              className="text-sm uppercase tracking-wider flex items-center gap-1.5">
              Programs
              <span style={{ fontSize: '7px', transition: 'transform 0.2s', display: 'inline-block', transform: programsOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
            </button>

            {programsOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8DDD0',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                width: '260px', zIndex: 200,
              }}>
                {programs.map(p => (
                  <Link key={p.label} to={p.href}
                    style={{ display: 'block', padding: '16px 22px', borderBottom: '1px solid #F5F0E8', textDecoration: 'none' }}
                    className="hover:bg-[#FAFAF8] transition-colors group">
                    <div className="flex items-center gap-3">
                      <div style={{ width: '8px', height: '8px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0 }}></div>
                      <div className="flex-1">
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#1A1A1A', fontSize: '11px', letterSpacing: '0.1em' }}
                          className="uppercase">{p.label}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '11px', marginTop: '2px' }}>{p.desc}</p>
                      </div>
                      <span style={{ color: p.accent, fontSize: '14px' }} className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </Link>
                ))}
                <div style={{ padding: '12px 22px', backgroundColor: '#FAFAF8' }}>
                  <Link to="/programs/optimization"
                    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.1em', textDecoration: 'none' }}
                    className="uppercase hover:opacity-70 transition-opacity">
                    View all programs →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <a href={anchorHref('#skincare')}
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em' }}
            className="text-sm uppercase tracking-wider hover:text-[#C9A96E] transition-colors">
            Shop Skincare
          </a>

          <a href={anchorHref('#pricing')}
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em' }}
            className="text-sm uppercase tracking-wider hover:text-[#C9A96E] transition-colors">
            Pricing
          </a>

          <Link to="/programs/optimization"
            style={{
              backgroundColor: '#C9A96E', color: '#FFFFFF',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              letterSpacing: '0.12em', fontSize: '11px',
              padding: '12px 24px', textDecoration: 'none',
            }}
            className="uppercase hover:opacity-90 transition-opacity">
            Start Program
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu">
          <span style={{ backgroundColor: menuOpen ? '#C9A96E' : '#2A2A2A', transition: 'background 0.2s' }} className="block w-6 h-0.5"></span>
          <span style={{ backgroundColor: menuOpen ? '#C9A96E' : '#2A2A2A', transition: 'background 0.2s' }} className="block w-6 h-0.5"></span>
          <span style={{ backgroundColor: menuOpen ? '#C9A96E' : '#2A2A2A', transition: 'background 0.2s' }} className="block w-6 h-0.5"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: '#FAFAF8', borderTop: '1px solid #E8DDD0' }}
          className="md:hidden px-6 py-6 flex flex-col gap-1">

          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '9px', letterSpacing: '0.25em', marginBottom: '8px' }}
            className="uppercase">Programs</p>

          {programs.map(p => (
            <Link key={p.label} to={p.href}
              style={{ textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid #F0EAE0' }}
              className="flex items-center gap-3 group">
              <div style={{ width: '8px', height: '8px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0 }}></div>
              <div className="flex-1">
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '12px', letterSpacing: '0.1em' }}
                  className="uppercase">{p.label}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '11px', marginTop: '2px' }}>{p.desc}</p>
              </div>
              <span style={{ color: p.accent, fontSize: '14px' }}>→</span>
            </Link>
          ))}

          <div style={{ paddingTop: '16px' }} className="flex flex-col gap-4">
            <a href={anchorHref('#skincare')} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', textDecoration: 'none' }}
              className="text-sm uppercase">Shop Skincare</a>

            <a href={anchorHref('#pricing')} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', textDecoration: 'none' }}
              className="text-sm uppercase">Pricing</a>
          </div>

          <Link to="/programs/optimization"
            style={{
              backgroundColor: '#C9A96E', color: '#FFFFFF',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              letterSpacing: '0.15em', fontSize: '12px',
              padding: '16px', textAlign: 'center',
              textDecoration: 'none', marginTop: '16px',
            }}
            className="uppercase">
            Start Program
          </Link>
        </div>
      )}
    </nav>
  )
}
