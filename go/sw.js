// Service worker code
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;

// Define cache name
const cacheName = 'kodeWeave-cache';

// Cache files in the .libraries folder
registerRoute(
  ({ url }) => url.pathname.startsWith('/.libraries/'),
  new CacheFirst({
    cacheName: cacheName,
    plugins: [
      // Any additional plugins can be added here
    ],
  })
);

// Cache other types of resources
registerRoute(
  ({ request }) => request.destination === 'script' ||
                  request.destination === 'style' ||
                  request.destination === 'document' ||
                  request.destination === 'image' ||
                  request.destination === 'font',
  new CacheFirst({
    cacheName: cacheName,
    plugins: [
      // Any additional plugins can be added here
    ],
  })
);