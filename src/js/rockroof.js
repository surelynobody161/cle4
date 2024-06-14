import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class RockRoof extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.RockRoof.width - 20, height: Resources.RockRoof.height - 100 });
        this.scale = new Vector(0.5, 0.5)
    }

    onInitialize() {
        this.graphics.use(Resources.RockRoof.toSprite());
        this.body.collisionType = CollisionType.Fixed;
    }
}
