const staticWhatsappConversation = "whatsapp-conversation-v1";
const assets = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/",
  "/css/style.css",
  "/css/lato.css",
  "/js/script.js",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticWhatsappConversation).then((cache) => {
      cache.addAll(assets);
    })
  );
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
