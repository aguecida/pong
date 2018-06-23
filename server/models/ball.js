class Ball {
    constructor() {
        this.position = { x: 50, y: 50 };
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

        return this.position;
    }
}

module.exports = { 
    Ball
};