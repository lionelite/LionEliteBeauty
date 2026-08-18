import { useEffect } from 'react'

export default function SEO({ title, description, ogImage, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Lion Elite Beauty` : 'Lion Elite Beauty | Private Optimization Coaching & Peptide Skincare'
    const metaDescription = description || 'Private optimization coaching and peptide-powered skincare from Lion Elite Beauty.'
    const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : ''

    document.title = fullTitle

    const setMeta = (name, content, property = false) => {
      if (!content) return
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(property ? 'property' : 'name', name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', metaDescription)
    setMeta('robots', 'index,follow,max-image-preview:large')
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', metaDescription, true)
    setMeta('og:type', 'website', true)
    setMeta('og:url', canonicalUrl, true)
    if (ogImage) setMeta('og:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`, true)
    setMeta('twitter:card', ogImage ? 'summary_large_image' : 'summary')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', metaDescription)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    let script = document.getElementById('page-json-ld')
    if (script) script.remove()
    if (jsonLd) {
      script = document.createElement('script')
      script.id = 'page-json-ld'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      const current = document.getElementById('page-json-ld')
      if (current) current.remove()
    }
  }, [title, description, ogImage, jsonLd])

  return null
}
