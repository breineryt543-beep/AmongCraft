// index.js (Cloudflare Worker - Workers Sites)

// Este Worker sirve los archivos estáticos usando Workers Sites
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Simplemente devolveremos los archivos estáticos desde el bucket
  return fetch(request);
}
