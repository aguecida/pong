var context = null;
var interval = null;
var keyState = {};
var keys = { up: 38, down: 40 };
var ballPosition = { x: 50, y: 50 };
var ready = false;

let socket = io();

socket.on('connect', () => {
    context = document.getElementById('table').getContext('2d');
});

socket.on('disconnect', () => {
    
});

socket.on('gameOver', winner => {
    setStatusText(`Game over. Player ${winner} wins.`);
    drawTable();
    clearInterval(interval);
    window.removeEventListener('keydown', keyDown);
    window.removeEventListener('keyup', keyUp);
    socket.disconnect();
});

socket.on('playerLeft', player => {
    setStatusText(`Waiting for player ${player.number}...`);
    drawTable();
});

socket.on('readyPlayer', data => {
    clearStatusText();

    if (data.players.length === 1) {
        let waitingFor = data.player.number === 1 ? 2 : 1;
        setStatusText(`Waiting for player ${waitingFor}...`);
    }

    data.players.forEach(player => drawPlayer(player));
   
    if (!ready) {
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);
    
        interval = setInterval(() => {
            if (keyState[keys.up]){
                socket.emit('movePaddle', 'up');
            }
            if (keyState[keys.down]){
                socket.emit('movePaddle', 'down');
            }
        }, 50);
    }
    
    ready = true;
});

socket.on('notifyBallMove', position => {
    clearStatusText();
    clearBall();
    ballPosition = position;
    drawBall();
    drawNet();
});

socket.on('notifyPlayerMove', player => {
    clearPlayer(player);
    drawPlayer(player);
});

function onLoad() {
    context = document.getElementById('table').getContext('2d');
    drawTable();
    drawNet();
}

function drawTable() {
    context.fillStyle = '#777';
    for (let i = 0; i < 400; i += 5) {
        for (let j = 0; j < 600; j += 5) {
            context.fillRect(i, j, 5, 5);
        }
    }
}

function drawNet() {
    context.fillStyle = '#fff';
    for (let i = 0; i < 600; i += 10) {
        context.fillRect(150, i, 1, 3);
    }
}

function drawPlayer(player) {
    context.fillStyle = '#fff';
    for (let i = 0; i < 20; i += 5) {
        context.fillRect(player.position.x, i + player.position.y, 5, 5);
    }
}

function clearPlayer(player) {
    context.fillStyle = '#777';
    for (let i = 0; i < 400; i += 5) {
        context.fillRect(player.position.x, i, 5, 5);
    }
}

function drawBall() {
    let { x, y } = ballPosition;
    context.fillStyle = '#fff';
    context.fillRect(x, y, 5, 5);
}

function clearBall() {
    let { x, y } = ballPosition;
    context.fillStyle = '#777';
    context.fillRect(x, y, 5, 5);
}

function setStatusText(text) {
    document.getElementById('status-text').innerText = text;
}

function clearStatusText() {
    document.getElementById('status-text').innerText = '';
}

function keyDown(e) {
    keyState[e.keyCode || e.which] = true;
}

function keyUp(e) {
    keyState[e.keyCode || e.which] = false;
}