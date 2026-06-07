import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const programs = [
  { label: 'Muscle & Recovery Program', href: '/programs/muscle', accent: '#C9A96E', desc: 'Strength & performance' },
  { label: 'Neuro Program', href: '/programs/neuro', accent: '#8A9E85', desc: 'Cognitive performance' },
  { label: 'Fertility Program', href: '/programs/fertility', accent: '#B8A4D4', desc: 'Reproductive health' },
  { label: 'Hair Program', href: '/programs/hair', accent: '#C4A265', desc: 'Hair restoration & density' },
  { label: 'Weight Program', href: '/programs/weight', accent: '#5BA87A', desc: 'Fat loss & metabolic health' },
  { label: 'Longevity Program', href: '/programs/longevity', accent: '#7A9FBF', desc: 'Anti-aging & cellular repair' },
]

const skincareItems = [
  { label: 'GHK-Cu Intensive Serum', href: '/skincare/ghk-cu-serum', desc: 'Coming Soon' },
  { label: 'GHK-Cu Peptide Face Wash', href: '/skincare/ghk-cu-face-wash', desc: '$69.99 · 150ml' },
  { label: 'Rejuvenate Serum', href: '/skincare/rejuvenate-serum', desc: '$119.99 · 30ml' },
  { label: 'Collagen Boost Face Cream', href: '/skincare/collagen-boost-cream', desc: '$99.99 · 50ml' },
  { label: 'KPV Recovery Moisturizer', href: '/skincare/kpv-moisturizer', desc: '$79.99 · 50ml' },
  { label: 'Hydra Boost Body Wash', href: '/skincare/hydra-boost-body-wash', desc: '$49.99 · 250ml' },
  { label: 'Post-Procedure Recovery Kit', href: '/skincare/recovery-kit', desc: '$189.99 · Full Kit' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const [skincareOpen, setSkincareOpen] = useState(false)
  const dropdownRef = useRef(null)
  const skincareRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setProgramsOpen(false)
    setSkincareOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <nav style={{ backgroundColor: '#FAFAF8', borderBottom: '1px solid #E8DDD0' }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }} className="flex flex-col">
          <span style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', letterSpacing: '0.15em', fontSize: '18px' }}
            className="uppercase">Lion Elite Beauty</span>
          <span style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em', fontSize: '10px' }}
            className="uppercase font-light">Powered by Lion Elite Wellness</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">

          {/* Programs dropdown */}
          <div className="relative" ref={dropdownRef}
            onMouseEnter={() => setProgramsOpen(true)}
            onMouseLeave={() => setProgramsOpen(false)}>
            <Link
              to="/programs/optimization"
              style={{
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                color: programsOpen ? '#C9A96E' : '#5A5A5A',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              className="text-sm uppercase tracking-wider flex items-center gap-1.5">
              Programs
              <span style={{ fontSize: '7px', display: 'inline-block', transition: 'transform 0.2s', transform: programsOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
            </Link>

            {programsOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8DDD0',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                width: '260px', zIndex: 200,
                paddingTop: '8px',
              }}
                onMouseEnter={() => setProgramsOpen(true)}
                onMouseLeave={() => setProgramsOpen(false)}>
                {programs.map(p => (
                  <Link key={p.label} to={p.href}
                    style={{ display: 'block', padding: '14px 22px', borderBottom: '1px solid #F5F0E8', textDecoration: 'none' }}
                    className="hover:bg-[#FAFAF8] transition-colors group">
                    <div className="flex items-center gap-3">
                      <div style={{ width: '7px', height: '7px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0 }}></div>
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

          {/* Shop Skincare dropdown */}
          <div className="relative" ref={skincareRef}
            onMouseEnter={() => setSkincareOpen(true)}
            onMouseLeave={() => setSkincareOpen(false)}>
            <Link
              to="/skincare"
              style={{
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
                color: skincareOpen ? '#C9A96E' : '#5A5A5A',
                letterSpacing: '0.1em',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              className="text-sm uppercase tracking-wider flex items-center gap-1.5">
              Shop Skincare
              <span style={{ fontSize: '7px', display: 'inline-block', transition: 'transform 0.2s', transform: skincareOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
            </Link>

            {skincareOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8DDD0',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                width: '280px', zIndex: 200,
                paddingTop: '8px',
              }}
                onMouseEnter={() => setSkincareOpen(true)}
                onMouseLeave={() => setSkincareOpen(false)}>
                {skincareItems.map(s => (
                  <Link key={s.label} to={s.href}
                    style={{ display: 'block', padding: '14px 22px', borderBottom: '1px solid #F5F0E8', textDecoration: 'none' }}
                    className="hover:bg-[#FAFAF8] transition-colors group">
                    <div className="flex items-center gap-3">
                      <div style={{ width: '7px', height: '7px', backgroundColor: '#C9A96E', borderRadius: '50%', flexShrink: 0 }}></div>
                      <div className="flex-1">
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#1A1A1A', fontSize: '11px', letterSpacing: '0.1em' }}
                          className="uppercase">{s.label}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '11px', marginTop: '2px' }}>{s.desc}</p>
                      </div>
                      <span style={{ color: '#C9A96E', fontSize: '14px' }} className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </Link>
                ))}
                <div style={{ padding: '12px 22px', backgroundColor: '#FAFAF8' }}>
                  <Link to="/skincare"
                    style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#C9A96E', fontSize: '11px', letterSpacing: '0.1em', textDecoration: 'none' }}
                    className="uppercase hover:opacity-70 transition-opacity">
                    View all products →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link to="/skin-system"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', textDecoration: 'none' }}
            className="text-sm uppercase tracking-wider hover:text-[#C9A96E] transition-colors">
            Skin System
          </Link>

          <Link to="/ingredients"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', textDecoration: 'none' }}
            className="text-sm uppercase tracking-wider hover:text-[#C9A96E] transition-colors">
            Ingredients
          </Link>

          <Link to="/cart"
            style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', textDecoration: 'none', position: 'relative', padding: '8px 4px' }}
            className="text-sm uppercase tracking-wider hover:text-[#C9A96E] transition-colors">
            Cart
            {itemCount > 0 && (
              <span style={{
                position: 'absolute', top: '0', right: '-8px',
                backgroundColor: '#C9A96E', color: '#000',
                fontSize: '9px', fontWeight: 'bold',
                width: '18px', height: '18px',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
              }}>{itemCount}</span>
            )}
          </Link>

          <Link to="/apply"
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
              style={{ textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid #F0EAE0' }}
              className="flex items-center gap-3 group">
              <div style={{ width: '7px', height: '7px', backgroundColor: p.accent, borderRadius: '50%', flexShrink: 0 }}></div>
              <div className="flex-1">
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '12px', letterSpacing: '0.1em' }}
                  className="uppercase">{p.label}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '11px', marginTop: '2px' }}>{p.desc}</p>
              </div>
              <span style={{ color: p.accent, fontSize: '14px' }}>→</span>
            </Link>
          ))}

          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#BABABA', fontSize: '9px', letterSpacing: '0.25em', marginTop: '16px', marginBottom: '8px' }}
            className="uppercase">Skincare</p>

          {skincareItems.map(s => (
            <Link key={s.label} to={s.href}
              style={{ textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid #F0EAE0' }}
              className="flex items-center gap-3 group">
              <div style={{ width: '7px', height: '7px', backgroundColor: '#C9A96E', borderRadius: '50%', flexShrink: 0 }}></div>
              <div className="flex-1">
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '12px', letterSpacing: '0.1em' }}
                  className="uppercase">{s.label}</p>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#9A9A9A', fontSize: '11px', marginTop: '2px' }}>{s.desc}</p>
              </div>
              <span style={{ color: '#C9A96E', fontSize: '14px' }}>→</span>
            </Link>
          ))}

          <div style={{ paddingTop: '16px' }} className="flex flex-col gap-4">
            <Link to="/cart" onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', textDecoration: 'none' }}
              className="text-sm uppercase flex items-center gap-2">
              Cart{itemCount > 0 ? ` (${itemCount})` : ''}
            </Link>
            <Link to="/skin-system" onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', textDecoration: 'none' }}
              className="text-sm uppercase">Skin System</Link>
            <Link to="/ingredients" onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em', textDecoration: 'none' }}
              className="text-sm uppercase">Ingredients</Link>
          </div>

          <Link to="/apply"
            style={{
              backgroundColor: '#C9A96E', color: '#FFFFFF',
              fontFamily: 'Helvetica Neue, neue, Arial, sans-serif',
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
