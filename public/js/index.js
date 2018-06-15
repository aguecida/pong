let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    document.onkeydown = e => {
        if (e.keyCode === 38) { // Up arrow
            socket.emit('movePaddle', 'up');
        }
        else if (e.keyCode === 40) { // Down arrow
            socket.emit('movePaddle', 'down');
        }
    };
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    document.onkeydown = null;
});

socket.on('readyPlayer', player => {
    console.log(`Ready player ${player.number}`);
});

socket.on('notifyPaddleMove', data => {
    console.log(`Player ${data.player.number} moved paddle ${data.direction}`);
});