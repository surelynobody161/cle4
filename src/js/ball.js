import { Actor, CollisionType, Color, Vector } from 'excalibur';
import { Kid } from './kid';

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

    onInitialize(engine) {
        // this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.graphics.use(Resources.Ball.toSprite())
    }

    // onCollisionStart(evt) {
    //     if (evt.other instanceof Kid) {
    //         evt.other.pos = new Vector(600, 400);
    //     }
    // }
}
