import { Actor, CollisionType, Color, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { Ball } from './ball';

export class Kid extends Actor {
    constructor(x, y) {
        super({
            x, y, width: 10, height: 20,
            collisionType: CollisionType.Passive,
        });
        this.scale = new Vector(10, 10);

    }

    onInitialize(engine) {
        this.graphics.use(Resources.Kid.toSprite());
        this.on('collisionstart', (event) => this.ballstouch(event));
        this.graphics.flipHorizontal = true;
    }

    givePaper(){
        //give paper +1 and notification
    }

    ballstouch(event) {
        console.log(event.other);
        if (event.other instanceof Ball) {
            console.log('Kid caught ball');
            event.other.kill(); // Remove the ball from the game
            this.graphics.use(Resources.KidBall.toSprite());
            this.graphics.flipHorizontal = false;

        } else {
            console.log('Not a ball');
        }
    }
}
