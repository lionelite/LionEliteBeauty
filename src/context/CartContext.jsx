import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()
const CART_STORAGE_KEY = 'lionelite_cart'

function normalizeCart() { return [] }

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

  function addItem() { /* Product sales are retired on Beauty. */ }

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
