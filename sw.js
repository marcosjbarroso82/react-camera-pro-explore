const CACHE_NAME = 'camera-pro-v1';
const urlsToCache = [
  '/',
  '/camera',
  '/settings',
  '/gallery',
  '/manifest.json',
  '/favicon.ico',
  '/index.html',
  '/404.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});