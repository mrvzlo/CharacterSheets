importScripts(
   "/DnDSheet/precache-manifest.42b1123c417bcf7eae4c5d458a68354a.js",
   "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

var APP_PREFIX = "DnDSheet";
var VERSION = "v_1.0.2";
var CACHE_NAME = APP_PREFIX + VERSION;
var URLS = [
   "/DnDSheet/",
   "/DnDSheet/index.html",
   "/DnDSheet/img/icons/favicon-256x256.png",
   "/DnDSheet/img/icons/favicon-32x32.png",
   "/DnDSheet/img/icons/favicon-16x16.png",
   "/DnDSheet/manifest.json",
];

self.addEventListener("fetch", function (e) {
   e.respondWith(
      caches.match(e.request).then(function (request) {
         if (request) {
            return request;
         } else {
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
