const CACHE='regina-sofia-preview-menu-v2';
const FILES=["./ordina/", "./ordina/index.html", "./ordina/style.css", "./ordina/app.js", "./ordina/data/menu.js", "./regina-sofia/", "./regina-sofia/index.html", "./report/", "./report/index.html", "./", "./index.html", "./style.css", "./app.js", "./manifest.webmanifest", "./data/menu.js", "./assets/hero.jpg", "./assets/font-8.ttf", "./assets/logo.png", "./assets/font-1.ttf", "./assets/pizza.jpg", "./assets/sfizi.jpg", "./assets/primi.jpg", "./assets/font-6.ttf", "./assets/font-3.ttf", "./assets/font-0.ttf", "./assets/font-5.ttf", "./assets/dolci.jpg", "./assets/font-7.ttf", "./assets/font-4.ttf", "./assets/sala.jpg", "./assets/fonts.css", "./assets/icon.svg", "./assets/icon-512.png", "./assets/outside.jpg", "./assets/font-2.ttf", "./assets/icon-192.png", "./assets/story.jpg"];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('regina-sofia-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.includes('/downloads/'))return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).catch(()=>caches.match(event.request).then(cached=>cached||new Response('Pagina non disponibile offline. Riconnettiti e riprova.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}}))));return;
 }
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});
