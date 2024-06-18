import { Actor, CollisionType, Vector, Color } from 'excalibur';

export class Ramp extends Actor {
    constructor(x, y, width, height, angle) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            color: Color.Gray,
            collisionType: CollisionType.Fixed
        });
        this.angle = angle;
    }

    onInitialize(engine) {
        // Set the rotation to the desired angle
        this.rotation = this.angle;
    }
}
