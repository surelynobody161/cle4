import { Actor, Vector, CollisionType, SpriteSheet, range, Animation } from 'excalibur';
import { Resources } from './resources.js';

export class Poop extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: 10,
            height: 10,
            collisionType: CollisionType.Passive
        });

        const poopSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.Poop,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 31,
                spriteHeight: 42
            }
        });

        // Use Animation.fromSpriteSheet with the correct arguments
        this.runAnimation = Animation.fromSpriteSheet(poopSpriteSheet, range(0, 1), 150);
        this.graphics.use(this.runAnimation);
    }

    onInitialize(engine) {
        this.vel = new Vector(0, 300); // Adjust the velocity as needed
    }
}
