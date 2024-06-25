import { Actor, CollisionType, Vector, Animation, SpriteSheet, range, AnimationStrategy } from "excalibur";
import { Resources, ResourceLoader } from "./resources";
import { Poop } from "./poop";

export class Guard extends Actor {
    constructor(x, y) {
        super({
            x, y, width: Resources.Gaurd.width, height: Resources.Gaurd.height,
            collisionType: CollisionType.Fixed
        })
        this.scale = new Vector(1.2, 1.2);
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Gaurd.toSprite());
    }

    gaurdHit(event) {
        if (event.other instanceof Poop) {
            this.graphics.use(Resources.GaurdWP.toSprite())
            this.body.collisionType = CollisionType.Passive;
        } else {
            console.log('squeeky clean');
        }
    }
}