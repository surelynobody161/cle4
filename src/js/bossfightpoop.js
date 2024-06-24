import { Actor, Vector, CollisionType, Animation, Shape, range, SpriteSheet } from "excalibur";
import { Resources } from './resources.js';

export class Poop extends Actor {
    constructor() {
        super({
            collisionType: CollisionType.Passive,
            collider: Shape.Box(53, 48) // Ensure collider is the same size as the sprite
        });

        this.z = 10;
        this.scale = new Vector(0.3, 0.3);
        this.pos = new Vector(200, 200);

        this.graphics.use(Resources.Poop.toSprite());
    }

    onInitialize() {
        const poop = SpriteSheet.fromImageSource({
            image: Resources.Poop,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 53,
                spriteHeight: 48
            }
        });
        this.runAnimation = Animation.fromSpriteSheet(poop, range(0, 1), 100);
        this.graphics.use(this.runAnimation);
    }
}
