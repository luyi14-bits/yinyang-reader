// SPDX-FileCopyrightText: 2026 阴阳先生手记
// SPDX-License-Identifier: AGPL-3.0-only
// 阴阳先生手记 — Service Worker — Cache-First 离线策略

var CACHE_NAME = 'yinyang-v5';
var PRECACHE_URLS = [
  './',
  './reader.html',
  './index.html',
  './manifest.json',
  './icons/icon.svg',
  './sw.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS).catch(function (err) {
        console.warn('[SW] Pre-cache partial:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (name) {
          return name !== CACHE_NAME;
        }).map(function (name) {
          return caches.delete(name);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);
  var isStory = url.pathname.startsWith('/stories/') && url.pathname.endsWith('.json');

  if (isStory) {
    event.respondWith(networkFirst(event.request));
  } else {
    event.respondWith(cacheFirst(event.request));
  }
});

function cacheFirst(request) {
  return caches.match(request).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (network) {
      if (network.ok) {
        var clone = network.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(request, clone);
        });
      }
      return network;
    }).catch(function () {
      return new Response('', { status: 408, statusText: 'Offline' });
    });
  });
}

function networkFirst(request) {
  return fetch(request).then(function (network) {
    if (network.ok) {
      var clone = network.clone();
      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(request, clone);
        trimStoryCache();
      });
    }
    return network;
  }).catch(function () {
    return caches.match(request).then(function (cached) {
      if (cached) return cached;
      return new Response(
        JSON.stringify({ error: true, message: '故事未缓存，无法离线阅读' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    });
  });
}

function trimStoryCache() {
  caches.open(CACHE_NAME).then(function (cache) {
    cache.keys().then(function (keys) {
      var stories = keys.filter(function (k) {
        return k.url.includes('/stories/') && k.url.endsWith('.json');
      });
      if (stories.length > 10) {
        for (var i = 0; i < stories.length - 10; i++) {
          cache.delete(stories[i]);
        }
      }
    });
  });
}
