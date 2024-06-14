import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class WoodenPlatform extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.WoodenPlatform.width - 60, height: Resources.WoodenPlatform.height - 290});
        this.scale = new Vector(0.2, 0.1)
    }

    onInitialize() {
        this.graphics.use(Resources.WoodenPlatform.toSprite());
        this.body.collisionType = CollisionType.Fixed;
    }
}
