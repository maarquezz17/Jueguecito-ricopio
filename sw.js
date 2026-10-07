const CACHE_NAME = 'clicker-cache-v1';

// Añade aquí los nombres exactos de tus archivos
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css', // Cambia esto por el nombre real de tu CSS si es distinto
  './scripts_1.js',
  './scripts_2.js',
  './manifest.webmanifest'
];

// Instalación: Guarda los archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activación: Limpia cachés antiguas si actualizas la versión (v1 -> v2)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch: Intercepta las peticiones de red y sirve desde la caché si es posible
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve el recurso cacheado si existe, si no, lo pide a la red
        return response || fetch(event.request);
      })
  );
});