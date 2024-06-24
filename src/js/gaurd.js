import { Actor, CollisionType, Vector, Animation, SpriteSheet, range, AnimationStrategy } from "excalibur";
import { Resources, ResourceLoader } from "./resources";
import { Poop } from "./poop";

export class Guard extends Actor {
    constructor() {
        super({
            //hitbox fix, no art put yet
            pos: new Vector(288, 64),
            width: 64,
            height: 32,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine) {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.Guard,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 32,
                spriteHeight: 32
            }
        })
        //idk if there is going to be movement animation 
        this.idle = Animation.fromSpriteSheet(spriteSheet, range(0, 0), 100)
        this.moved = Animation.fromSpriteSheet(spriteSheet, range(1, 3), 100, AnimationStrategy.End)
        this.graphics.use(this.idle)
    }

    gaurdHit(event) {
        if (event.other instanceof Poop) {
            this.graphics.use(this.moved)
            this.body.collisionType = CollisionType.Passive;
        } else {
            console.log('squeeky clean');
        }
    }
}