import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Fries extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Fries.width, height: Resources.Fries.height });
        this.scale = new Vector(1, 1);
        this.isPickedUp = false;
        this.z = 10;
    }

    onInitialize() {
        this.graphics.use(Resources.Fries.toSprite());
        this.body.collisionType = CollisionType.Passive;
    }

    pickUp(player) {
        if (!this.isPickedUp) {
            this.isPickedUp = true;
            console.log("picked up powerup!");
            this.actions.fade(0, 200).die();
            player.enablePooping();
        }
    }
}
