// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Almacenamos los jugadores en el servidor
let players = [];

app.use(express.static('public'));

// Cuando un jugador se conecta
io.on('connection', (socket) => {
    console.log('Jugador conectado: ' + socket.id);

    // Nuevo jugador se une
    socket.on('joinGame', (player) => {
        players.push({ id: socket.id, ...player, x: 100, y: 100 });
        io.emit('updatePlayers', players);
    });

    // El jugador se mueve
    socket.on('move', (newPosition) => {
        const player = players.find(p => p.id === socket.id);
        if (player) {
            player.x = newPosition.x;
            player.y = newPosition.y;
        }
        io.emit('updatePlayers', players); // Enviar actualización a todos
    });

    // Cuando un jugador se desconecta
    socket.on('disconnect', () => {
        players = players.filter(p => p.id !== socket.id);
        io.emit('updatePlayers', players);
    });
});

// Iniciar servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
