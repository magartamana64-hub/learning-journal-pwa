const CACHE_NAME = "journal-cache-v1";
const urlsToCache = [
    "/",
    "/about",
    "/projects",
    "/reflections",
    "/static/css/style.css",
    "/static/js/script.js",
    "/static/images/cover.png",
    "/static/images/project.jpg",
    "/static/images/icon.png",
    "/static/manifest.json"
];

// Install SW
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
