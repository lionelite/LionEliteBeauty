import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [discountError, setDiscountError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    const saved = sessionStorage.getItem('leb_active_discount_code')
    if (saved === 'COLIN10') {
      setDiscountCode('COLIN10')
      setDiscountApplied(true)
    }
  }, [])

  function applyDiscount() {
    const code = discountCode.trim().toUpperCase()
    if (code === 'COLIN10') {
      sessionStorage.setItem('leb_active_discount_code', 'COLIN10')
      setDiscountCode('COLIN10')
      setDiscountApplied(true)
      setDiscountError('')
      return
    }
    setDiscountApplied(false)
    sessionStorage.removeItem('leb_active_discount_code')
    setDiscountError('Invalid code. Please check the code and try again.')
  }

  function removeDiscount() {
    sessionStorage.removeItem('leb_active_discount_code')
    setDiscountCode('')
    setDiscountApplied(false)
    setDiscountError('')
  }

  const discountAmount = discountApplied ? subtotal * 0.10 : 0
  const total = subtotal - discountAmount
  const checkoutHref = discountApplied ? '/checkout?discount=COLIN10' : '/checkout'

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="Shopping Cart" description="Review your peptide skincare and wellness selections." />
      <Navbar />

      <section style={{ paddingTop: '140px', paddingBottom: '64px', borderBottom: '1px solid #E8DDD0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }} className="uppercase">Shopping Cart</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2.6rem', lineHeight: '1.1', letterSpacing: '-0.02em' }} className="font-normal">
            Your Cart{itemCount > 0 ? ` (${itemCount})` : ''}
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginTop: '20px' }}></div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ fontFamily: 'Georgia, serif', color: '#8A8A8A', fontSize: '1.2rem', marginBottom: '24px' }}>Your cart is empty.</p>
              <Link to="/skincare" style={{ display: 'inline-block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em', padding: '16px 40px', textDecoration: 'none' }} className="uppercase hover:opacity-90 transition-opacity">Browse Products →</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-2 space-y-px" style={{ backgroundColor: '#E8DDD0' }}>
                {items.map(item => (
                  <div key={item.slug} style={{ backgroundColor: '#FFFFFF', padding: '28px 32px', borderLeft: '2px solid transparent' }} className="flex items-center justify-between gap-6 transition-colors group">
                    <div className="flex-1 flex items-center gap-4">
                      <div style={{ width: '4px', height: '32px', backgroundColor: '#C9A96E', opacity: '0.3', flexShrink: 0 }}></div>
                      <div>
                        <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '15px', lineHeight: '1.3', marginBottom: '4px' }}>{item.name}</p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.1em' }} className="uppercase">{item.size || ''}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center" style={{ border: '1px solid #D0C8BA' }}>
                        <button onClick={() => updateQuantity(item.slug, item.quantity - 1)} style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', color: '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>−</button>
                        <span style={{ padding: '8px 12px', color: '#2A2A2A', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', borderLeft: '1px solid #D0C8BA', borderRight: '1px solid #D0C8BA' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', color: '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}>+</button>
                      </div>
                      <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '16px', minWidth: '70px', textAlign: 'right' }}>${(item.priceNum * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeItem(item.slug)} style={{ backgroundColor: 'transparent', border: '1px solid #D0C8BA', color: '#8A8A8A', cursor: 'pointer', fontSize: '13px', padding: '6px 10px', lineHeight: '1' }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '32px', alignSelf: 'start', position: 'sticky', top: '120px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }} className="uppercase">Order Summary</p>

                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.slug} className="flex justify-between">
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px' }}>{item.name} × {item.quantity}</span>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px' }}>${(item.priceNum * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #E0D5C5', paddingTop: '18px', marginBottom: '22px' }}>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '10px', letterSpacing: '0.16em', marginBottom: '9px' }} className="uppercase">Discount Code</p>
                  <div className="flex gap-2">
                    <input value={discountCode} onChange={e => { setDiscountCode(e.target.value.toUpperCase()); setDiscountError('') }} disabled={discountApplied} placeholder="Enter code" style={{ minWidth: 0, flex: 1, border: '1px solid #D0C8BA', padding: '11px 12px', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', outline: 'none', backgroundColor: discountApplied ? '#F7F3EC' : '#FFF' }} />
                    <button onClick={discountApplied ? removeDiscount : applyDiscount} style={{ border: 'none', backgroundColor: discountApplied ? '#8A9E85' : '#C9A96E', color: '#000', padding: '11px 13px', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '9px', letterSpacing: '0.12em' }} className="uppercase">{discountApplied ? 'Remove' : 'Apply'}</button>
                  </div>
                  {discountApplied && <p style={{ color: '#5BA87A', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', marginTop: '8px' }}>COLIN10 applied — 10% off.</p>}
                  {discountError && <p style={{ color: '#B85C5C', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '11px', marginTop: '8px', lineHeight: 1.5 }}>{discountError}</p>}
                </div>

                <div style={{ borderTop: '1px solid #E0D5C5', paddingTop: '16px', marginBottom: '24px' }}>
                  <div className="flex justify-between mb-2"><span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px' }}>Subtotal</span><span style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '16px' }}>${subtotal.toFixed(2)}</span></div>
                  {discountApplied && <div className="flex justify-between mb-2"><span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '13px' }}>COLIN10 (10%)</span><span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#5BA87A', fontSize: '13px' }}>−${discountAmount.toFixed(2)}</span></div>}
                  <div className="flex justify-between mb-3" style={{ borderTop: discountApplied ? '1px solid #EEE6DB' : 'none', paddingTop: discountApplied ? '10px' : 0 }}><span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px', fontWeight: 600 }}>Total</span><span style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '18px' }}>${total.toFixed(2)}</span></div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px' }}>Shipping calculated at checkout</p>
                </div>

                <Link to={checkoutHref} style={{ display: 'block', backgroundColor: '#C9A96E', color: '#000', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.18em', padding: '16px', textAlign: 'center', textDecoration: 'none' }} className="uppercase hover:opacity-90 transition-opacity">Proceed to Checkout →</Link>
                <Link to="/skincare" style={{ display: 'block', marginTop: '16px', fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.12em', textAlign: 'center', textDecoration: 'none' }} className="uppercase hover:text-[#C9A96E] transition-colors">← Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
