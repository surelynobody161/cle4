import { Actor, CollisionType, Color, Vector } from 'excalibur';

export class Ball extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            radius: 25,
            color: Color.Red,
            collisionType: CollisionType.Active
        });
        this.body.useGravity = true; // Enable gravity
        this.body.bounciness = 0.6; // Make the ball bouncy
    }
}
