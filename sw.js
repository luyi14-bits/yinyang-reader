const CACHE = 'yinyang-v3';
const STATIC_CACHE = 'yinyang-static-v3';
const STORY_CACHE = 'yinyang-stories-v3';

const STATIC_ASSETS = [
  '/reader.html',
  '/index.html',
  '/manifest.json',
  '/icons/icon.svg',
  '/sw.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(err => {
      console.warn('[SW] Static cache install partial:', err);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== STATIC_CACHE && k !== STORY_CACHE && k !== CACHE)
          .map(k => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isStoryData = url.pathname.startsWith('/stories/') && url.pathname.endsWith('.json');
  const isHtml = url.pathname.endsWith('.html') || url.pathname === '/';
  const isStatic = isStaticAsset(url);

  if (isStoryData) {
    event.respondWith(networkFirst(event.request, STORY_CACHE));
  } else if (isHtml) {
    event.respondWith(networkFirst(event.request, STATIC_CACHE));
  } else if (isStatic) {
    event.respondWith(cacheFirst(event.request));
  }
});

function isStaticAsset(url) {
  const path = url.pathname;
  if (path === '/reader.html' || path === '/index.html') return true;
  if (path === '/manifest.json' || path === '/sw.js') return true;
  if (path.startsWith('/icons/')) return true;
  return false;
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const network = await fetch(request);
    if (network.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, network.clone());
    }
    return network;
  } catch (err) {
    return new Response('', { status: 408, statusText: 'Offline' });
  }
}

async function networkFirst(request, cacheName = STORY_CACHE) {
  try {
    const network = await fetch(request);
    if (network.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, network.clone());
      if (cacheName === STORY_CACHE) {
        trimStoryCache();
      }
    }
    return network;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    return new Response(
      JSON.stringify({ error: true, message: '故事未缓存，无法离线阅读' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function trimStoryCache() {
  const cache = await caches.open(STORY_CACHE);
  const keys = await cache.keys();
  if (keys.length > 10) {
    const toDelete = keys.slice(0, keys.length - 10);
    await Promise.all(toDelete.map(k => cache.delete(k)));
  }
}
