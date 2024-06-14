import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class WoodenScaffolding extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.WoodenScaffolding.width - 300, height: Resources.WoodenScaffolding.height });
        this.scale = new Vector(0.6, 0.5)
    }

    onInitialize() {
        this.graphics.use(Resources.WoodenScaffolding.toSprite());
    }
}
