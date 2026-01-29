// socket.js

const socket = io(); // Conexión al servidor

// Enviar la posición del jugador al servidor
socket.emit('joinGame', { name: 'Jugador1' }); // El nombre puede ser dinámico

// Recibir actualizaciones de los jugadores
socket.on('updatePlayers', (players) => {
    console.log(players);
});
