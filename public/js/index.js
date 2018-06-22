var context;
var keys = { up: 38, down: 40 };
var ballPosition = { x: 50, y: 50 };

let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
    document.onkeydown = null;
});

socket.on('readyPlayer', player => {
    console.log(`Ready player ${player.number}`);

    document.onkeydown = e => {
        if (e.keyCode === keys.up) {
            socket.emit('movePaddle', 'up');
        }
        else if (e.keyCode === keys.down) {
            socket.emit('movePaddle', 'down');
        }
    };
});

socket.on('notifyBallMove', ball => {
    console.log(`New ball position is ${ball.position}`);
    
    clearBall();
    ballPosition = ball.position;
    drawBall();
});

socket.on('notifyPlayerMove', player => {
    clearPaddle(player);
    drawPlayer(player);
});

function onLoad() {
    context = document.getElementById('table').getContext('2d');
    
    drawTable();
    drawNet();
    //drawPlayerOnePaddle();
    //drawPlayerTwoPaddle();
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

function clearPaddle(player) {
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