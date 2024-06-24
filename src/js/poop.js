import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class Poop extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 10,
            height: 10,
            collisionType: CollisionType.Passive
        });
        this.graphics.use(Resources.Poop.toSprite());
    }

    onInitialize(engine) {
        this.vel = new Vector(0, 300); // Adjust the velocity as needed
    }
}
