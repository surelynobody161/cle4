import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';

export class IntroBanner extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.IntroBanner.width, height: Resources.IntroBanner.height });
    }

    onInitialize() {
        this.graphics.use(Resources.IntroBanner.toSprite());
    }
}