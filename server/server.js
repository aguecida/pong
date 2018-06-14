const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const { Player } = require('./player');
const { Game } = require('./game');

const publicDir = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicDir));

let game = new Game();

io.on('connection', socket => {
    if (game.isFull()) {
        console.log('Disconnecting client: Game is already full');
        socket.disconnect();
        return;
    }

    let player = new Player(socket.id);
    game.addPlayer(player);

    socket.emit('readyPlayer', player);

    socket.on('disconnect', () => {
        let player = game.removePlayer(socket.id);

        if (player) {
            console.log(`Player ${player.number} disconnected`);
        }
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

