class Ball {
    constructor() {
        this.startingPosition = { x: 50, y: 50 };
        this.position = this.startingPosition;
        this.size = 5;
        this.direction = 'NE';
    }

    moveBall() {
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

        return this.position;
    }
}

module.exports = { 
    Ball
};