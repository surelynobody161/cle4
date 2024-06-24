import { Actor, CollisionType, Color, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Ball extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Ball.width, height: Resources.Ball.height,
            radius: 150,
            color: Color.White,
            collisionType: CollisionType.Active,
        });
        this.body.useGravity = true; // Enable gravity
        this.body.bounciness = 0.5; // Make the ball bouncy
        this.scale = new Vector(0.5, 0.5)
        this.z = 11;
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Ball.toSprite());
    }
}
