import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Floor extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Floor.width - 60, height: Resources.Floor.height - 40 });
        // this.scale = new Vector(0.6, 0.5)
    }

    onInitialize() {
        this.graphics.use(Resources.Floor.toSprite());
        this.body.collisionType = CollisionType.Fixed;
        this.z = 10

    }
}
