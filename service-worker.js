const CACHE_NAME = "koki-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/site.webmanifest",
  "/favicon.ico",
  "/favicon.svg",
  "/favicon-96x96.png",
  "/apple-touch-icon.png",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/assets/logo.png",
  "/assets/gif/peck.gif",
  "/assets/gif/cluck.gif"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((response) => {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseCopy));
          return response;
        })
        .catch(() => {
          if (request.mode === "navigate") {
            return caches.match("/index.html");
          }

          return new Response("", { status: 504, statusText: "Offline" });
        });
    })
  );
});

self.addEventListener("message", (event) => {
  if (!event.data || event.data.type !== "KOKI_TIMER_DONE") {
    return;
  }

  event.waitUntil(showKokiNotification(event.data.body));
});

self.addEventListener("push", (event) => {
  let body = "Яйцо готово!";

  if (event.data) {
    try {
      const payload = event.data.json();
      body = payload.body || body;
    } catch {
      body = event.data.text() || body;
    }
  }

  event.waitUntil(showKokiNotification(body));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow("/");
      }

      return undefined;
    })
  );
});

function showKokiNotification(body) {
  return self.registration.showNotification("КОКИ: яйцо готово!", {
    body,
    icon: "/web-app-manifest-192x192.png",
    badge: "/favicon-96x96.png",
    tag: "koki-timer",
    renotify: true
  });
}
