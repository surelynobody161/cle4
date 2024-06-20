import { Actor, CollisionType, Shape, Vector } from 'excalibur';

export class Wall extends Actor {
    constructor(x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed
        });

        // Set up the collider with the given dimensions
        this.collider.set(Shape.Box(width, height));
    }

    onInitialize(engine) {
        // Optionally, add any initialization logic here
    }
}
