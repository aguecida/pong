class Game {
    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        if (this.isFull()) {
            throw new Error('Cannot add player. Game is already full.');
        }

        // Set player number based on spot available
        player.number = !this.getPlayer(1) ? 1 : 2;

        console.log(`Added player ${player.number}`);

        this.players.push(player);
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