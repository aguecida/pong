const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const { Player } = require('./player');

const publicDir = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicDir));

let player1 = null;
let player2 = null

io.on('connection', socket => {
    console.log('Client connected');

    if (!player1) {
        player1 = new Player(socket.id, 1);
        socket.emit('readyPlayer', player1);
    }
    else if (!player2) {
        player2 = new Player(socket.id, 2);
        socket.emit('readyPlayer', player2);
    }
    else {
        console.log('Already have two players');
        socket.disconnect();
        return;
    }

    socket.on('disconnect', () => {
        console.log('Client disconnected');

        if (socket.id === player1.id) {
            player1 = null;
        }
        else if (socket.id === player2.id) {
            player2 = null;
        }
    });
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

