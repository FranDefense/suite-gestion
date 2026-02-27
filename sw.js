const CACHE_NAME = 'layer4-v1.9'; // Cambia esto para forzar actualización
const assets = [
  'index.html',
  'consumos_v3.html',
  'vozydatos_exp.html',
  'calculadoras.html',
  'changelog.html',
  'manifest.json',
  'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js'
];

// Instalación: Guarda los archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

// 2. ACTIVACIÓN: AQUÍ ES DONDE LIMPIAS EL CACHÉ DE TUS COMPAÑEROS
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // Si el caché guardado en el PC del compañero no es el v1.8, SE BORRA
          if (cache !== CACHE_NAME) {
            console.log('Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Escuchar el mensaje para activar la nueva versión inmediatamente
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Permite que la nueva versión se active en cuanto el usuario lo pida
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});






