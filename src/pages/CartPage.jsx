import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>
      <SEO title="Shopping Cart" description="Review your peptide skincare and wellness selections." />
      <Navbar />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '64px', borderBottom: '1px solid #E8DDD0' }}>
        <div className="max-w-5xl mx-auto px-6">
          <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.3em', fontSize: '10px', marginBottom: '16px' }}
            className="uppercase">Shopping Cart</p>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '2.6rem', lineHeight: '1.1', letterSpacing: '-0.02em' }}
            className="font-normal">
            Your Cart{itemCount > 0 ? ` (${itemCount})` : ''}
          </h1>
          <div style={{ width: '48px', height: '1px', backgroundColor: '#C9A96E', marginTop: '20px' }}></div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="max-w-5xl mx-auto px-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ fontFamily: 'Georgia, serif', color: '#8A8A8A', fontSize: '1.2rem', marginBottom: '24px' }}>
                Your cart is empty.
              </p>
              <Link to="/skincare"
                style={{
                  display: 'inline-block', backgroundColor: '#C9A96E', color: '#000',
                  fontFamily: 'Helvetica Neue, Arial, sans-serif',
                  fontSize: '12px', letterSpacing: '0.18em',
                  padding: '16px 40px', textDecoration: 'none',
                }}
                className="uppercase hover:opacity-90 transition-opacity">
                Browse Products →
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-10">
              {/* Cart items */}
              <div className="md:col-span-2 space-y-px" style={{ backgroundColor: '#E8DDD0' }}>
                {items.map((item, idx) => (
                  <div key={item.slug} style={{ backgroundColor: '#FFFFFF', padding: '28px 32px', borderLeft: '2px solid transparent' }}
                    className="flex items-center justify-between gap-6 transition-colors group">
                    <div className="flex-1 flex items-center gap-4">
                      <div style={{ width: '4px', height: '32px', backgroundColor: '#C9A96E', opacity: '0.3', flexShrink: 0 }}></div>
                      <div>
                        <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '15px', lineHeight: '1.3', marginBottom: '4px' }}>
                          {item.name}
                        </p>
                        <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '11px', letterSpacing: '0.1em' }} className="uppercase">
                          {item.size || ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center" style={{ border: '1px solid #D0C8BA' }}>
                        <button onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', color: '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}
                          className="hover:text-[#C9A96E] transition-colors">
                          −
                        </button>
                        <span style={{ padding: '8px 12px', color: '#2A2A2A', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '13px', borderLeft: '1px solid #D0C8BA', borderRight: '1px solid #D0C8BA' }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          style={{ padding: '8px 12px', backgroundColor: 'transparent', border: 'none', color: '#6A6A6A', cursor: 'pointer', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: '14px' }}
                          className="hover:text-[#C9A96E] transition-colors">
                          +
                        </button>
                      </div>
                      <p style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '16px', minWidth: '70px', textAlign: 'right' }}>
                        ${(item.priceNum * item.quantity).toFixed(2)}
                      </p>
                      <button onClick={() => removeItem(item.slug)}
                        style={{ backgroundColor: 'transparent', border: '1px solid #D0C8BA', color: '#8A8A8A', cursor: 'pointer', fontSize: '13px', padding: '6px 10px', lineHeight: '1' }}
                        className="hover:border-[#C9A96E44] hover:text-[#C9A96E] transition-colors">
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0D5C5', padding: '32px', alignSelf: 'start', position: 'sticky', top: '120px' }}>
                <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A9E85', letterSpacing: '0.25em', fontSize: '10px', marginBottom: '24px' }}
                  className="uppercase">Order Summary</p>

                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.slug} className="flex justify-between">
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px' }}>
                        {item.name} × {item.quantity}
                      </span>
                      <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#2A2A2A', fontSize: '13px' }}>
                        ${(item.priceNum * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #E0D5C5', paddingTop: '16px', marginBottom: '24px' }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#6A6A6A', fontSize: '13px' }}>Subtotal</span>
                    <span style={{ fontFamily: 'Georgia, serif', color: '#2A2A2A', fontSize: '16px' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  <p style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', color: '#8A8A8A', fontSize: '12px' }}>
                    Shipping calculated at checkout
                  </p>
                </div>

                <Link to="/checkout"
                  style={{
                    display: 'block', backgroundColor: '#C9A96E', color: '#000',
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: '12px', letterSpacing: '0.18em',
                    padding: '16px', textAlign: 'center', textDecoration: 'none',
                  }}
                  className="uppercase hover:opacity-90 transition-opacity">
                  Proceed to Checkout →
                </Link>

                <Link to="/skincare"
                  style={{
                    display: 'block', marginTop: '16px',
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    color: '#8A8A8A', fontSize: '11px', letterSpacing: '0.12em',
                    textAlign: 'center', textDecoration: 'none',
                  }}
                  className="uppercase hover:text-[#C9A96E] transition-colors">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}