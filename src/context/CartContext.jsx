import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()
const CART_STORAGE_KEY = 'lionelite_cart'

function normalizeCart(raw) {
  if (!Array.isArray(raw)) return []

  return raw
    .filter(item => item && typeof item.slug === 'string' && item.slug.trim())
    .map(item => ({
      ...item,
      quantity: Math.max(1, Number.parseInt(item.quantity, 10) || 1),
      priceNum: Number.isFinite(Number(item.priceNum)) ? Number(item.priceNum) : 0,
    }))
}

function readStoredCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    return saved ? normalizeCart(JSON.parse(saved)) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Cart still works in memory if storage is unavailable.
    }
  }, [items])

  useEffect(() => {
    function syncCartAcrossTabs(event) {
      if (event.key !== CART_STORAGE_KEY) return
      try {
        setItems(event.newValue ? normalizeCart(JSON.parse(event.newValue)) : [])
      } catch {
        setItems([])
      }
    }

    window.addEventListener('storage', syncCartAcrossTabs)
    return () => window.removeEventListener('storage', syncCartAcrossTabs)
  }, [])

  function addItem(product, quantity = 1) {
    const qty = Math.max(1, Number.parseInt(quantity, 10) || 1)
    const normalizedProduct = {
      ...product,
      priceNum: Number.isFinite(Number(product?.priceNum)) ? Number(product.priceNum) : 0,
    }

    if (!normalizedProduct.slug) return

    setItems(prev => {
      const existing = prev.find(i => i.slug === normalizedProduct.slug)
      if (existing) {
        return prev.map(i =>
          i.slug === normalizedProduct.slug
            ? { ...i, ...normalizedProduct, quantity: i.quantity + qty }
            : i
        )
      }
      return [...prev, { ...normalizedProduct, quantity: qty }]
    })
  }

  function removeItem(slug) {
    setItems(prev => prev.filter(i => i.slug !== slug))
  }

  function updateQuantity(slug, quantity) {
    const qty = Number.parseInt(quantity, 10)
    if (!Number.isFinite(qty) || qty <= 0) {
      removeItem(slug)
      return
    }
    setItems(prev => prev.map(i => i.slug === slug ? { ...i, quantity: qty } : i))
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.priceNum * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
