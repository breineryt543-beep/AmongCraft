// app.js

const socket = io(); // Conectarse al servidor

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let player = { x: 100, y: 100, color: 'blue' }; // Jugador inicial
let players = []; // Todos los jugadores en la partida

// Evento cuando se recibe la lista de jugadores
socket.on('updatePlayers', (updatedPlayers) => {
    players = updatedPlayers;
    updatePlayerList();
});

// Función para actualizar la lista de jugadores
function updatePlayerList() {
    const playerListElement = document.getElementById('player-name');
    playerListElement.textContent = players.map(p => p.name).join(', ');
}

// Función para dibujar a todos los jugadores en el canvas
function drawPlayers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar canvas

    players.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
}

// Función para mover al jugador
function movePlayer(dx, dy) {
    player.x += dx;
    player.y += dy;
    socket.emit('move', { x: player.x, y: player.y });
}

// Control de movimiento del jugador
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') movePlayer(0, -10);
    if (e.key === 'ArrowDown') movePlayer(0, 10);
    if (e.key === 'ArrowLeft') movePlayer(-10, 0);
    if (e.key === 'ArrowRight') movePlayer(10, 0);
});

// Dibujar todo el mundo
function gameLoop() {
    drawPlayers();
    requestAnimationFrame(gameLoop);
}

// Iniciar el loop del juego
gameLoop();
