import { Actor, CollisionType, Vector, Color, Shape } from 'excalibur';

export class Ramp extends Actor {
    constructor(x, y, width, height, angle) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed
        });
        this.angle = angle;
    }

    onInitialize(engine) {
        // Set the rotation to the desired angle
        this.rotation = this.angle;

        // Set up the collider with the given dimensions
        this.collider.set(Shape.Box(this.width, this.height));
    }
}
