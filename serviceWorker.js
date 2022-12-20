const CACHE_NAME = "whatsapp-conv-v2";
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/css/style.css",
  "/css/lato.css",
  "/js/script.js",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", async () => {
  const existingCaches = await caches.keys();
  console.log("activate - existing caches", existingCaches);
  const invalidCaches = existingCaches.filter((c) => c !== CACHE_NAME);
  await Promise.all(invalidCaches.map((ic) => caches.delete(ic)));
});

self.addEventListener("fetch", (fetchEvent) => {
  console.log("fetch event", fetchEvent.request);
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      console.log("caches match?", res);
      return res || fetch(fetchEvent.request);
    })
  );
});
