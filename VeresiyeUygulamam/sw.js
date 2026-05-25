self.addEventListener('install', (e) => {
    console.log('[Service Worker] Uygulama Kuruldu');
});

self.addEventListener('fetch', (e) => {
    // Uygulamanın internetteyken çalışması için gerekli köprü
});