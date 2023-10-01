class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }

    getOrigin() {
        return this.origin;
    }

    getDirection() {
        return this.direction;
    }

    at(t) {
        return this.getOrigin() + (t * this.getDirection());
    }
}
