import { Actor, CollisionType, Color, Vector, SpriteSheet } from 'excalibur';
import { Ball } from './ball';
import { Paper } from './paper'

export class Kid extends Actor {
    constructor(x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            color: Color.Green,
            collisionType: CollisionType.passive
        });
        this.originalColor = Color.Green;
    }

    onIntialize() {
        const spriteSheet = SpriteSheet.fromImageSource({
            image: Resources.Kid,
            grid: {
                rows: 1,
                columns: 6,
                spriteWidth: 64,
                spriteHeight: 64
            }
        })
        this.pickup = Animation.fromSpriteSheet(spriteSheet, range(0, 3), 1000, AnimationStrategy.End)
        this.idle = Animation.fromSpriteSheet(spriteSheet, range(0, 0), 100)
        this.graphics.use(this.idle)
        this.on('collisionstart', (event) => this.stoneOnPlate(event))
    }

    givePaper() {
        // notification en +1 paper
    }

    ballstouch(event) {
        console.log(event.other);
        if (event.other instanceof Ball) {
            console.log('Kid caught ball')
            this.graphics.use(this.pickup);
            event.other.givePaper();
        } else {
            console.log('BALL!!!!')
        }
    }

}
