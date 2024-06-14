import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class BlackRocks extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.RockFloor.width + 1050, height: Resources.BlackRocks.height});
        this.scale = new Vector(0.1, 2.5)
    }

    onInitialize() {
        this.graphics.use(Resources.BlackRocks.toSprite());
        this.body.collisionType = CollisionType.Fixed;
    }
}
