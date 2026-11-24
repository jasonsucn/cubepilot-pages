/* CubePilot generated app-shell worker. Do not hand edit dist/sw.js. */
const VERSION = "86332c3cb35d0c75692d";
const FILES = ["assets/Achievements-BcB01O7r.css","assets/Achievements-Cvdgplej.js","assets/Capture-BNczJn68.css","assets/Capture-DIVrzpDP.js","assets/Challenge-Bpo7mDOA.css","assets/Challenge-DQGcOXvS.js","assets/Complete-C-ZSAJOp.js","assets/Complete-zIXyF_tl.css","assets/ConfirmDialog-CoLX8MzJ.js","assets/CubeModel-Br-VR7p5.js","assets/CubeScene-Db6iOYGb.js","assets/Demo-CMz1O0FW.css","assets/Demo-DYFXcqKE.js","assets/Dialog-xccySxyp.css","assets/DialogFrame-DIIFw1zM.js","assets/Editor-CVn4z5h6.css","assets/Editor-DWo43wus.js","assets/GlassCard-DI2o6r3A.js","assets/Guide-B6DEzTox.js","assets/Guide-BOaqumGq.css","assets/Manual-C8REZjjO.js","assets/NotationChip-DXa6-X2J.css","assets/Patterns-DwkodVXu.css","assets/Patterns-Gqp-qA6X.js","assets/Settings-FhwsrwdU.js","assets/Settings-wIluxPCh.css","assets/Solving-C-aVnTS4.css","assets/Solving-D0esXf-2.js","assets/Stats-CojKgby9.css","assets/Stats-CrTGVcfr.js","assets/Switch-BkGjTBG5.js","assets/Switch-DPFuTUpc.css","assets/Timer-BsiIuP35.js","assets/Timer-Cfbzx4G0.css","assets/Tutorial-B5wzn-ja.js","assets/Tutorial-Df5CQwYW.css","assets/Verify-Cxx-OKdt.js","assets/Welcome-C2G5_cmn.css","assets/Welcome-CXbl-8Gq.js","assets/capture-yXbWcaGN.js","assets/challenge-BmjEIr7O.js","assets/classifier.worker-RswcwIFj.js","assets/client-DMOXP1Yw.js","assets/context-W2PBkNi8.js","assets/engine-DJYrISi2.js","assets/index-Bif91Yoz.css","assets/index-DWUoK1WK.js","assets/math-CsPvMr7i.js","assets/model-CqYnFxER.js","assets/pruning-cache-Y-kpxSpv.bin","assets/random-DMtxwQky.js","assets/solver.worker-DEWWE1qX.js","assets/statistics-B7-mjsz1.js","assets/text-cXhOLJZD.js","assets/three-CrXk2xYr.js","assets/thumbnails-BpscRi2A.js","assets/tutorial-HFnXTz_1.js","audio/neon-orbit-loop.mp3","fonts/chakra-petch-a5888696e9eb.woff2","fonts/chakra-petch-ce5095dc1cb2.woff2","fonts/noto-sans-sc-f0881786bb92.woff2","fonts/orbitron-c25a9f9da5d9.woff2","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","manifest.webmanifest"];
const SCOPE = self.registration.scope;
const PREFIX = 'cubepilot-shell-' + new URL(SCOPE).pathname + '-';
const CACHE = PREFIX + VERSION;
const INDEX = new URL('index.html', SCOPE).href;
const URLS = FILES.map((file) => new URL(file, SCOPE).href);
const STATIC = new Set(URLS);
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    try {
      await cache.addAll(URLS.map((url) => new Request(url, { cache: 'reload' })));
    } catch (error) {
      await caches.delete(CACHE);
      throw error;
    }
    // Updates wait for existing clients to close; in-progress guides keep their matching assets.
  })());
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
async function navigate(request) {
  try {
    const response = await fetch(request);
    if (response.ok) return response;
  } catch { /* Offline routes use the exact shell that matches this cache version. */ }
  return (await (await caches.open(CACHE)).match(INDEX)) || new Response('Offline shell unavailable', { status: 503 });
}
async function staticAsset(request, key) {
  const cache = await caches.open(CACHE);
  let response = await cache.match(key);
  if (!response) {
    response = await fetch(new Request(key, { credentials: 'same-origin' }));
    if (response.ok && response.type !== 'opaque') await cache.put(key, response.clone());
  }
  const range = request.headers.get('range');
  if (!range || !response.ok) return response;
  // Browsers may request byte ranges when playing the offline BGM.
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match || (!match[1] && !match[2])) return response;
  const bytes = await response.arrayBuffer();
  const size = bytes.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (start >= size || start > end) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  const headers = new Headers(response.headers);
  headers.delete('content-encoding');
  headers.set('Accept-Ranges', 'bytes');
  headers.set('Content-Range', 'bytes ' + start + '-' + end + '/' + size);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(SCOPE)) return;
  if (request.mode === 'navigate') {
    event.respondWith(navigate(request));
    return;
  }
  url.search = '';
  url.hash = '';
  // Allowlist emitted assets only: never cache arbitrary endpoints, uploads or photos.
  if (STATIC.has(url.href)) event.respondWith(staticAsset(request, url.href));
});
