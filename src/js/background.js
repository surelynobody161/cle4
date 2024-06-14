import { Actor, Vector } from "excalibur";
import { Resources } from './resources.js';

export class Background extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Background.width, height: Resources.Background.height});
        this.scale = new Vector(2,2)
    }

    onInitialize() {
        this.graphics.use(Resources.Background.toSprite());
    }
}
