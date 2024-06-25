import { Actor, Vector, SpriteSheet, range, Animation } from 'excalibur';
import { Resources } from './resources';

export class Appartment extends Actor {
    constructor() {
        super({
            pos: new Vector(720, 450), // Center the actor
        });
        this.graphics.use(Resources.Appartment.toSprite());
    }

    onInitialize(engine) {
        const background = SpriteSheet.fromImageSource({
            image: Resources.Appartment,
            grid: {
                rows: 1,
                columns: 18,
                spriteWidth: 205,
                spriteHeight: 128,
            },
        });

        this.runAnimation = Animation.fromSpriteSheet(background, range(0, 17), 100);
        this.graphics.use(this.runAnimation);

        // Scale the actor to fit the screen
        const scaleX = engine.drawWidth / (background.sprites[0].width);
        const scaleY = engine.drawHeight / background.sprites[0].height;

        this.scale = new Vector(scaleX, scaleY);
    }
}