const { Player } = require('./player');

class Game {
    constructor() {
        this.players = [];
    }

    addPlayer(id) {
        if (this.isFull()) {
            throw new Error('Cannot add player. Game is already full.');
        }

        let number = !this.getPlayer(1) ? 1 : 2; // Set player number based on spot available
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

    getPlayer(number) {
        return this.players.find(player => player.number === number);
    }
}

module.exports = {
    Game
};