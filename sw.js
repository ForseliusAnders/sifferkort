// Natverk forst for kod (sa uppdateringar nar fram), cache forst for bilder.
const CACHE = 'sifferkort-v4';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const nycklar = await caches.keys();
    await Promise.all(nycklar.filter((n) => n !== CACHE).map((n) => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  const arBild = url.pathname.includes('/bilder/');
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (arBild) {
      const traff = await cache.match(e.request);
      if (traff) return traff;
      const svar = await fetch(e.request);
      if (svar.ok) cache.put(e.request, svar.clone());
      return svar;
    }
    // Kod och HTML: forsok natet forst, fall tillbaka pa cache offline.
    try {
      const svar = await fetch(e.request);
      if (svar.ok) cache.put(e.request, svar.clone());
      return svar;
    } catch (fel) {
      const traff = await cache.match(e.request);
      if (traff) return traff;
      throw fel;
    }
  })());
});
