const CACHE = "v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll([
        "/",             // raiz
        "/index.html",   // sua página
        "/style.css",    // ajuste se tiver
        "/script.js",    // ajuste se tiver
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request).catch(() => cached) // fallback offline
      );
    })
  );
});
