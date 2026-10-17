// Service Worker: إشعارات Firebase بالخلفية + تشغيل التطبيق بدون إنترنت
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const CACHE = 'garden-v2';
const SHELL = ['./', 'index.html', 'engine.js', 'manifest.json', 'icon.png'];

try {
  const c = new URL(self.location.href).searchParams.get('c');
  if (c) {
    firebase.initializeApp(JSON.parse(atob(c)));
    firebase.messaging().onBackgroundMessage((m) => {
      if (m.notification) return; // تنعرض تلقائياً
      const d = m.data || {};
      self.registration.showNotification(d.title || 'حديقتي', { body: d.body || '', icon: 'icon.png', tag: d.tag, dir: 'rtl', lang: 'ar' });
    });
  }
} catch (e) { /* إعداد ناقص */ }

self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {})); self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html'))));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const link = e.notification.data?.FCM_MSG?.fcmOptions?.link || './';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ws) => {
    for (const w of ws) if ('focus' in w) return w.focus();
    return clients.openWindow(link);
  }));
});
