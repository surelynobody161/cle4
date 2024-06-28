import { Actor, Vector, SpriteSheet, range, Animation,DisplayMode } from 'excalibur';
import { Resources } from './resources';

export class Appartment extends Actor {
    constructor() {
        super({
            pos: new Vector(720, 450), // Center the actor
            displayMode: DisplayMode.FillScreen

        });
        this.graphics.use(Resources.Appartment.toSprite());

    }

    onInitialize(engine) {
        const background = SpriteSheet.fromImageSource({
            image: Resources.Appartment,
            grid: {
                rows: 1,
                columns: 6,
                spriteWidth: 2050,
                spriteHeight: 1280,
            },
        });

        this.runAnimation = Animation.fromSpriteSheet(background, range(0, 17), 1000);
        this.graphics.use(this.runAnimation);


    }
}