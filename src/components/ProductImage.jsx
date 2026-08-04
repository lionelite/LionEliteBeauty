import { useState } from 'react'

// Renders a product photo, falling back to the supplied placeholder when the
// image is missing OR fails to load/decode. A corrupt asset previously rendered
// the browser's broken-image icon on the storefront, so the failure is caught
// here rather than shown to a customer.
export default function ProductImage({ src, alt, style, fallback = null }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) return fallback

  return <img src={src} alt={alt} style={style} onError={() => setFailed(true)} />
}
