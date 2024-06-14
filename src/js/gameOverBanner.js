import { Actor} from "excalibur";
import { Resources } from './resources.js';

export class GameOverBanner extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.GameOverBanner.width, height: Resources.GameOverBanner.height });
    }

    onInitialize() {
        this.graphics.use(Resources.GameOverBanner.toSprite());
    }
}