import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Coin extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Coin.width, height: Resources.Coin.height });
        this.scale = new Vector(0.2, 0.2)
        this.isPickedUp = false;
    }

    onInitialize() {
        this.graphics.use(Resources.Coin.toSprite());
        this.body.collisionType = CollisionType.Passive;
    }

    pickUp() {
        if (!this.isPickedUp) {
            this.isPickedUp = true;
            this.actions.fade(0, 200).die();
            
        }
    }
}