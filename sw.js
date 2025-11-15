// content of sw.js
const CACHE_NAME = "jesus-cares-v1";
const urlsToCache = [ "/", "/p/app-home.html", "/favicon.ico" ];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
    // Remove old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      // Simple cache-first, falling back to network
      return cached || fetch(event.request);
    })
  );
});