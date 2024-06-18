import { Actor, CollisionType, Color, Vector } from 'excalibur';

export class Kid extends Actor {
    constructor(x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            color: Color.Green,
            collisionType: CollisionType.Fixed
        });
        this.originalColor = Color.Green;
    }
}
