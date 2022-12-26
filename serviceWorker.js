const VERSION = 8;
const CACHE_NAME = `whatsapp-chat-v${VERSION}`;
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/style.css",
  "/css/lato.css",
  "/js/script.js",
];

self.addEventListener("install", (installEvent) => {
  console.log("Install service worker");

  installEvent.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(assets).then(self.skipWaiting());
    })
  );
});

self.addEventListener("activate", async () => {
  console.log("Activate service worker");

  return caches.keys().then((existingCaches) =>
    Promise.all(
      existingCaches
        .filter((c) => c !== CACHE_NAME)
        .map((c) => {
          console.log("Deleting cache:", c);
          return caches.delete(c);
        })
    )
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches
      .match(fetchEvent.request)
      .then((res) => res || fetch(fetchEvent.request))
  );
});
