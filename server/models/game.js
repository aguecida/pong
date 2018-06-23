const { Player } = require('./player');
const { Ball } = require('./ball');

class Game {
    constructor() {
        this.players = [];
        this.ball = new Ball();
        this.interval = null;
    }

    addPlayer(id) {
        if (this.isFull()) {
            throw new Error('Cannot add player. Game is already full.');
        }

        let number = !this.getPlayerByNumber(1) ? 1 : 2; // Set player number based on spot available
        let player = new Player(id, number);
        this.players.push(player);

        console.log(`Added player ${player.number}`);

        return player;
    }

    removePlayer(id) {
        let player = this.players.find(player => player.id === id);
        this.players = this.players.filter(player => player.id !== id);

        if (player) {
            console.log(`Removed player ${player.number}`);
        }

        return player;
    }

    isFull() {
        return this.players.length === 2;
    }

    getPlayerById(id) {
        return this.players.find(player => player.id === id);
    }

    getPlayerByNumber(number) {
        return this.players.find(player => player.number === number);
    }

    start(callback) {
        this.interval = setInterval(() => {
            let newPosition = this.ball.moveBall();
            callback(newPosition);
        }, 50);
    }

    stop() {
        clearInterval(this.interval);
        this.ball.position = { x: 50, y: 50 };
    }
}

module.exports = {
    Game
};