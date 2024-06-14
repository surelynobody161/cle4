import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class RockRoof2 extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.RockRoof2.width - 20, height: Resources.RockRoof2.height - 110 });
        this.scale = new Vector(0.5, 0.5)
    }

    onInitialize() {
        this.graphics.use(Resources.RockRoof2.toSprite());
        this.body.collisionType = CollisionType.Fixed;
    }
}
