import { skincareProducts } from '../src/data/skincareProducts.js'

export default function handler(req, res) {
  const product = skincareProducts.find((item) => item.slug === 'ghk-cu-serum')

  if (!product) {
    return res.status(500).json({
      ok: false,
      error: 'GHK-Cu serum product not found in deployed catalog',
      commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
    })
  }

  const purchasable = product.badge !== 'Pre-Order' && product.badge !== 'Coming Soon' && Number(product.priceNum) > 0

  res.setHeader('Cache-Control', 'no-store, max-age=0')
  return res.status(purchasable ? 200 : 503).json({
    ok: purchasable,
    environment: process.env.VERCEL_ENV || null,
    commit: process.env.VERCEL_GIT_COMMIT_SHA || null,
    product: {
      slug: product.slug,
      name: product.name,
      badge: product.badge,
      price: product.price,
      priceNum: product.priceNum,
      purchasable,
      route: `/skincare/${product.slug}`,
    },
    verifiedAt: new Date().toISOString(),
  })
}
