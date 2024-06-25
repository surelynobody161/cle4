import { Actor, CollisionType, Vector, Animation, SpriteSheet, range, AnimationStrategy } from "excalibur";
import { Resources, ResourceLoader } from "./resources";
import { Player } from "./player";
import { Poop } from "./poop";

export class Guard extends Actor {
    constructor(x, y) {
        super({
            x, y, width: 150, height: Resources.Gaurd.height,
            collisionType: CollisionType.Fixed
        })
        this.scale = new Vector(1.2, 1.2);
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.onCollision(event,));
        this.graphics.use(Resources.Gaurd.toSprite());
    }

    onCollision(event,) {
        if (event.other instanceof Player) {
            this.graphics.use(Resources.GaurdWP.toSprite())
            setTimeout(() => {
                this.kill();
                console.log('je moeder')
            }, 1000);
        } else if (event.other instanceof Poop) {
            this.graphics.use(Resources.GaurdWP.toSprite())
            setTimeout(() => {
                this.kill();
            }, 1000);
        }
    }
}