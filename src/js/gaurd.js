import { Actor, CollisionType, SpriteSheet } from "excalibur";
import { Resources, ResourceLoader } from "./resources";

export class Guard extends Actor {
    constructor() {
        super({
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


    }



}