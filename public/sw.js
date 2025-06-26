const CACHE_NAME = 'youtube-summarizer-v1'
const STATIC_ASSETS = [
  '/',
  '/globals.css',
  '/favicon.ico',
  '/robots.txt'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  )
})

self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return

  // Skip non-HTTP requests
  if (!event.request.url.startsWith('http')) return

  // Skip ad networks and analytics - never cache these
  const excludedDomains = [
    'profitableratecpm.com',
    'highperformanceformat.com',  // Banner ads
    'googletagmanager.com',
    'google-analytics.com',
    'vercel-scripts.com',
    'vercel.com'
  ]
  
  // Skip API routes - never cache dynamic content
  const excludedPaths = [
    '/api/',
    '/_next/static/chunks/src_components_', // Hot reload in dev
    '/__nextjs_original-stack-frames'       // Dev error handling
  ]
  
  const shouldExclude = excludedDomains.some(domain => 
    event.request.url.includes(domain)
  ) || excludedPaths.some(path => 
    event.request.url.includes(path)
  )
  
  if (shouldExclude) return

  // Cache strategy: Network first, then cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response before caching
        const responseClone = response.clone()
        
        // Only cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone))
        }
        
        return response
      })
      .catch(() => {
        // If network fails, try to serve from cache
        return caches.match(event.request)
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
