importScripts(
   "/DnDSheet/precache-manifest.b2678043f8a76836ad01972bd644cc89.js",
   "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

var APP_PREFIX = "DnDSheet";
var VERSION = "v_1.0.1";
var CACHE_NAME = APP_PREFIX + VERSION;
var URLS = ["/DnDSheet/", "/DnDSheet/index.html"];
URLS = URLS.concat(self.__precacheManifest.map((a) => a.url) || []);

self.addEventListener("fetch", function (e) {
   e.respondWith(
      caches.match(e.request).then(function (request) {
         if (request) {
            console.log("responding with cache : " + e.request.url);
            return request;
         } else {
            console.log("file is not cached, fetching : " + e.request.url);
            return fetch(e.request);
         }
      })
   );
});

self.addEventListener("install", function (e) {
   e.waitUntil(
      caches.open(CACHE_NAME).then(function (cache) {
         return cache.addAll(URLS);
      })
   );
});

self.addEventListener("activate", function (e) {
   e.waitUntil(
      caches.keys().then(function (keyList) {
         var cacheWhitelist = keyList.filter(function (key) {
            return key.indexOf(APP_PREFIX);
         });
         cacheWhitelist.push(CACHE_NAME);

         return Promise.all(
            keyList.map(function (key, i) {
               if (cacheWhitelist.indexOf(key) === -1) {
                  return caches.delete(keyList[i]);
               }
            })
         );
      })
   );
});
