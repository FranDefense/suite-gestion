const CACHE_NAME = 'layer4-v1.6'; // Cambia esto para forzar actualización
const assets = [
  'index.html',
  'consumos_v3.html',
  'vozydatos_exp.html',
  'calculadoras.html',
  'changelog.html',
  'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js'
];

// Instalación: Guarda los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

// Estrategia: Carga desde caché, pero busca en la red si hay cambios
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );

});

// Escuchar el mensaje para activar la nueva versión inmediatamente
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
