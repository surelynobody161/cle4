import { Actor, CollisionType, Vector, Color, Shape, SpriteSheet, range, Animation, AnimationStrategy } from 'excalibur';
import { Resources, ResourceLoader } from './resources';




export class Tv extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            
        });
        this.graphics.use(Resources.Tv.toSprite());
    this.z = 11
    
    }


    onInitialize(engine) {

        const tvSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.Tv,
            grid: {
                rows: 1,
                columns: 5,
                spriteWidth: 860,
                spriteHeight: 600
            },
        });

        this.tv = Animation.fromSpriteSheet(tvSpritesheet, range(0, 1), 300, AnimationStrategy.Loop)

        this.graphics.add("tv", Tv)


    }
}

