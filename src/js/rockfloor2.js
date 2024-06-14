import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class RockFloor2 extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.RockFloor2.width - 60, height: Resources.RockFloor2.height - 200 });
        this.scale = new Vector(0.6, 0.5)
    }

    onInitialize() {
        this.graphics.use(Resources.RockFloor2.toSprite());
        this.body.collisionType = CollisionType.Fixed;
    }
}
