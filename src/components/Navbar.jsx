import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const programs = [
  ['Muscle & Recovery', '/programs/muscle'],
  ['Weight', '/programs/weight'],
  ['Neuro', '/programs/neuro'],
  ['Longevity', '/programs/longevity'],
  ['Fertility', '/programs/fertility'],
  ['Hair', '/programs/hair'],
]

const skincare = [
  ['GHK-Cu Intensive Serum', '/skincare/ghk-cu-serum'],
  ['GHK-Cu Peptide Face Wash', '/skincare/ghk-cu-face-wash'],
  ['KPV Recovery Moisturizer', '/skincare/kpv-moisturizer'],
  ['Hydra Boost Body Wash', '/skincare/hydra-boost-body-wash'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const [skinOpen, setSkinOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()

  useEffect(() => { setOpen(false); setProgramsOpen(false); setSkinOpen(false) }, [location.pathname])

  return (
    <nav style={{ background: 'rgba(250,248,244,.97)', borderBottom: '1px solid #E7DDD1', backdropFilter: 'blur(14px)' }} className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Georgia, serif', color: '#302E2B', letterSpacing: '.14em', fontSize: '18px', textTransform: 'uppercase', display: 'block' }}>Lion Elite Beauty</span>
          <span style={{ color: '#B1976E', letterSpacing: '.18em', fontSize: '9px', textTransform: 'uppercase' }}>Powered by Lion Elite Wellness</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          <div className="relative" onMouseEnter={() => setProgramsOpen(true)} onMouseLeave={() => setProgramsOpen(false)}>
            <Link to="/programs/optimization" style={navLink}>Private Coaching</Link>
            {programsOpen && <Dropdown items={programs} footer={['View all programs', '/programs/optimization']} />}
          </div>
          <div className="relative" onMouseEnter={() => setSkinOpen(true)} onMouseLeave={() => setSkinOpen(false)}>
            <Link to="/skincare" style={navLink}>Skincare</Link>
            {skinOpen && <Dropdown items={skincare} footer={['Shop all skincare', '/skincare']} />}
          </div>
          <Link to="/ingredients" style={navLink}>Ingredients</Link>
          <Link to="/vip" style={navLink}>VIP Account</Link>
          <Link to="/cart" style={{ ...navLink, position: 'relative' }}>Bag{itemCount > 0 ? ` (${itemCount})` : ''}</Link>
          <Link to="/apply" style={apply}>Apply</Link>
        </div>

        <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu" className="lg:hidden" style={{ background: 'transparent', border: 0, color: '#302E2B', fontSize: '25px' }}>{open ? '×' : '☰'}</button>
      </div>

      {open && (
        <div className="lg:hidden px-6 pb-8" style={{ background: '#FAF8F4', borderTop: '1px solid #E7DDD1', maxHeight: 'calc(100vh - 70px)', overflowY: 'auto' }}>
          <MobileSection title="Private Coaching" items={programs} top="/programs/optimization" />
          <MobileSection title="Skincare" items={skincare} top="/skincare" />
          <Link to="/ingredients" style={mobileTop}>Ingredient Library</Link>
          <Link to="/vip" style={mobileTop}>VIP Account</Link>
          <Link to="/cart" style={mobileTop}>Bag {itemCount > 0 ? `(${itemCount})` : ''}</Link>
          <Link to="/apply" style={{ ...apply, display: 'block', textAlign: 'center', marginTop: '18px' }}>Apply for Coaching</Link>
        </div>
      )}
    </nav>
  )
}

function Dropdown({ items, footer }) {
  return (
    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: '260px', background: '#FFFDF9', border: '1px solid #E4D9CC', boxShadow: '0 16px 35px rgba(70,55,40,.10)', paddingTop: '10px' }}>
      {items.map(([label, href]) => <Link key={href} to={href} style={dropLink}>{label}<span>→</span></Link>)}
      <Link to={footer[1]} style={{ ...dropLink, background: '#F3EDE4', color: '#A7895B', textTransform: 'uppercase', fontSize: '9px', letterSpacing: '.12em' }}>{footer[0]}<span>→</span></Link>
    </div>
  )
}

function MobileSection({ title, items, top }) {
  return (
    <div style={{ paddingTop: '20px' }}>
      <Link to={top} style={mobileTop}>{title}</Link>
      {items.map(([label, href]) => <Link key={href} to={href} style={mobileSub}>{label}</Link>)}
    </div>
  )
}

const navLink = { color: '#5E5953', textDecoration: 'none', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', padding: '18px 0' }
const apply = { background: '#C9AA73', color: '#302E2B', textDecoration: 'none', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', padding: '12px 20px' }
const dropLink = { color: '#5E5953', textDecoration: 'none', fontSize: '11px', padding: '13px 18px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0E8DE' }
const mobileTop = { display: 'block', color: '#302E2B', textDecoration: 'none', fontFamily: 'Georgia, serif', fontSize: '1.1rem', padding: '10px 0' }
const mobileSub = { display: 'block', color: '#7A736B', textDecoration: 'none', fontSize: '11px', padding: '8px 0 8px 14px' }
