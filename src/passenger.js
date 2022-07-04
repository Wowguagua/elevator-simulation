import { STATUS } from './elevator';

class Passenger {
    constructor() {
        this.from = 0;
        this.to = 0;
        this.direction = STATUS.UP;
        this.init();
    }

    init() {
        this.from = this._getRandom();
        this.to = this._getRandom();
        while (this.from === this.to) {
            this.to = this._getRandom();
        }
        this.direction = this.to > this.from ? STATUS.UP : STATUS.DOWN;
    }

    _getRandom() {
        return Math.floor(Math.random() * 10) + 1;
    }

}

export default Passenger;