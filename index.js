// index.js (Cloudflare Worker)

// Definimos los archivos estáticos que queremos servir
const assets = {
  "/": "<html><body><h1>¡Bienvenido a AmongCraft!</h1><script src='/app.js'></script></body></html>",
  "/index.html": "<html><body><h1>¡Bienvenido a AmongCraft!</h1><script src='/app.js'></script></body></html>",
  "/style.css": "body { background-color: #f0f0f0; font-family: Arial, sans-serif; text-align: center; }",
  "/app.js": "console.log('¡El juego ha comenzado!');",
};

// Función para manejar las solicitudes
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Si el archivo está en el objeto assets, lo devolvemos
  if (assets[path]) {
    return new Response(assets[path], {
      headers: {
        "Content-Type": path.endsWith(".css") ? "text/css" : "text/javascript",
      },
    });
  } else {
    // Si no existe, devolver un error 404
    return new Response("404 Not Found", { status: 404 });
  }
}

// Escuchamos las solicitudes de fetch
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
