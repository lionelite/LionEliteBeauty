const CACHE = 'lion-elite-v1'
const PRECACHE = ['/', '/offline']

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  )
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  e.respondWith(
    fetch(e.request)
      .then(r => {
        // Only cache successful, same-origin, basic responses. Caching a 404
        // or 5xx previously let an error page be re-served from cache.
        if (r && r.ok && r.type === 'basic') {
          const clone = r.clone()
          caches.open(CACHE).then(c => c.put(e.request, clone))
        }
        return r
      })
      .catch(() => caches.match(e.request).then(m => m || caches.match('/')))
  )
})