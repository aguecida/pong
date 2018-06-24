class Ball {
    constructor() {
        this.position = { x: 50, y: 50 };
        this.size = 5;
        this.direction = 'NE';
    }

    moveBall(players) {
        let [ player1, player2 ] = players;

        switch(this.direction) {
            case 'NE':
                this.position.x += this.size;
                this.position.y -= this.size;
                break;
            case 'SE':
                this.position.x += this.size;
                this.position.y += this.size;
                break;
            case 'SW':
                this.position.x -= this.size;
                this.position.y += this.size;
                break;
            case 'NW':
                this.position.x -= this.size;
                this.position.y -= this.size;
                break;
            default:
                throw new Error('Invalid direction');
        }

        if (this.position.x < 0) return 2; // Player 2 wins
        if (this.position.x > 295) return 1; // Player 1 wins

        if (this.position.y === 0) {
            if (this.direction === 'NE') {
                this.direction = 'SE';
            }
            else if (this.direction === 'NW') {
                this.direction = 'SW';
            }
        }
        else if (this.position.y === 145) {
            if (this.direction === 'SE') {
                this.direction = 'NE';
            }
            else if (this.direction === 'SW') {
                this.direction = 'NW';
            }
        }

        if (this.position.x === player1.position.x + 5) {
            if (this.direction === 'NW' && (this.position.y >= player1.position.y && this.position.y <= player1.position.y + 25)) {
                this.direction = 'NE';
            }
            else if (this.direction === 'SW' && (this.position.y >= player1.position.y - 5 && this.position.y <= player1.position.y + 20)) {
                this.direction = 'SE';
            }
        }
        else if (this.position.x === player2.position.x - 5) {
            if (this.direction === 'NE' && (this.position.y >= player2.position.y && this.position.y <= player2.position.y + 25)) {
                this.direction = 'NW';
            }
            else if (this.direction === 'SE'  && (this.position.y >= player2.position.y - 5 && this.position.y <= player2.position.y + 20)) {
                this.direction = 'SW';
            }
        }

        return this.position;
    }
}

module.exports = { 
    Ball
};