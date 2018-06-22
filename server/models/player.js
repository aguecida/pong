class Player {
    constructor(id, number) {
        this.id = id;
        this.number = number;
        this.startingPosition = number === 1 ? { x: 0, y: 65 } : { x: 295, y: 65 };
        this.position = this.startingPosition;
    }

    moveUp() {
        this.position.y -= this.position.y === 0 ? 0 : 5;
    }

    moveDown() {
        this.position.y += this.position.y === 130 ? 0 : 5;
    }

    resetPosition() {
        this.position = this.startingPosition;
    }
}

module.exports = {
    Player
};