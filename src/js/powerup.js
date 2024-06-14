import { Actor, Vector, CollisionType, Keys } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";

export class Powerup extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Powerup.width, height: Resources.Powerup.height });
        this.scale = new Vector(0.1, 0.1)
        this.isPickedUp = false;
    }

    onInitialize() {
        this.graphics.use(Resources.Powerup.toSprite());
        this.body.collisionType = CollisionType.Passive;
        
    }

 
    pickUp(player) {
        if (!this.isPickedUp) {
            this.isPickedUp = true;
            console.log("picked up powerup!")
            this.actions.fade(0, 200).die();
            player.addToInventory(this);
        }
    }

    onPostUpdate(engine) {
       
    }
}