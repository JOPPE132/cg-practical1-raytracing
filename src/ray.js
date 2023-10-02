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
        return new Vec3(
            this.getOrigin().x + t * this.getDirection().x,
            this.getOrigin().y + t * this.getDirection().y,
            this.getOrigin().z + t * this.getDirection().z
        );
    }
}
