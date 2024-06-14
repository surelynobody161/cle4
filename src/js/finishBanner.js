import { Actor } from "excalibur";
import { Resources } from './resources.js';

export class FinishBanner extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.FinishBanner.width, height: Resources.FinishBanner.height });
    }

    onInitialize() {
        this.graphics.use(Resources.FinishBanner.toSprite());
    }
}