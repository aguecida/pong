const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const { Game } = require('./models/game');

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

    let player = game.addPlayer(socket.id);

    io.emit('readyPlayer', { player, players: game.players });

    if (game.isFull()) {
        game.start(position => {
            io.emit('notifyBallMove', { position });
        });
    }
    
    socket.on('movePaddle', direction => {
        let player = game.getPlayerById(socket.id);

        if (direction === 'up') {
            player.moveUp();
        }
        else if (direction === 'down') {
            position = player.moveDown();
        }
        else {
            throw new Error('Invalid direction');
        }

        io.emit('notifyPlayerMove', player);
    });

    socket.on('disconnect', () => {
        let player = game.removePlayer(socket.id);
        if (!game.isFull()) game.stop();
        io.emit('playerLeft', player);
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

