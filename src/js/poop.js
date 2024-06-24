import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class Poop extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 10,
            height: 10,
            collisionType: CollisionType.Passive
        });
        const poop = SpriteSheet.fromImageSource({
            image: Resources.Poop,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 31,
                spriteHeight: 42
            }
        });

        this.runAnimation = Animation.fromSpriteSheet(poop, range(0, 1), 150);
        this.graphics.use(this.runAnimation);
    }

    onInitialize(engine) {
        this.vel = new Vector(0, 300); // Adjust the velocity as needed
    }
}
