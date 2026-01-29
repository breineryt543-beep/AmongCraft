addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const websocket = new WebSocket(url)

  websocket.onmessage = (event) => {
    // Manejar los mensajes del cliente aquí
  }

  return new Response('Conectado al servidor de juego!')
}
