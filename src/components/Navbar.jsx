import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{ backgroundColor: '#FAFAF8', borderBottom: '1px solid #E8DDD0' }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', letterSpacing: '0.15em' }}
            className="text-lg font-normal uppercase tracking-widest">Lion Elite</span>
          <span style={{ color: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.2em' }}
            className="text-xs uppercase tracking-widest font-light">Wellness</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Shop Skincare', href: '#skincare' },
            { label: 'Elite Access', href: '#elite-access' },
            { label: 'Pricing', href: '#pricing' },
          ].map(link => (
            <a key={link.label} href={link.href}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em' }}
              className="text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">{link.label}</a>
          ))}
          <a href="#pricing"
            style={{ backgroundColor: '#C9A96E', fontFamily: 'Helvetica Neue, Arial, sans-serif', letterSpacing: '0.12em' }}
            className="text-white text-xs uppercase tracking-wider px-6 py-3 hover:opacity-90 transition-opacity">Start Program</a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span style={{ backgroundColor: '#2A2A2A' }} className="block w-6 h-0.5"></span>
          <span style={{ backgroundColor: '#2A2A2A' }} className="block w-6 h-0.5"></span>
          <span style={{ backgroundColor: '#2A2A2A' }} className="block w-6 h-0.5"></span>
        </button>
      </div>
      {menuOpen && (
        <div style={{ backgroundColor: '#FAFAF8', borderTop: '1px solid #E8DDD0' }} className="md:hidden px-6 py-6 flex flex-col gap-5">
          {[
            { label: 'How It Works', href: '#how-it-works' },
            { label: 'Shop Skincare', href: '#skincare' },
            { label: 'Elite Access', href: '#elite-access' },
            { label: 'Pricing', href: '#pricing' },
          ].map(link => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5A5A5A', letterSpacing: '0.1em' }}
              className="text-sm uppercase tracking-wider">{link.label}</a>
          ))}
          <a href="#pricing" onClick={() => setMenuOpen(false)}
            style={{ backgroundColor: '#C9A96E' }}
            className="text-white text-xs uppercase tracking-wider px-6 py-3 text-center">Start Program</a>
        </div>
      )}
    </nav>
  )
}
