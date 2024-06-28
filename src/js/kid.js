import { Actor, CollisionType, Color, Vector, DegreeOfFreedom, CompositeCollider, Shape, SpriteSheet, Animation, AnimationStrategy, range ,} from 'excalibur';
import { Resources } from './resources.js';
import { Ball } from './ball';
import { Paper } from './paper.js';

export class Kid extends Actor {
    constructor(x, y) {
        super({
            x, y, width: 100, height: 200,
            collisionType: CollisionType.Passive,
        });

        

    }

    onInitialize(engine) {
        this.graphics.use(Resources.Kid.toSprite());
        this.on('collisionstart', (event) => this.ballstouch(event));
        this.graphics.flipHorizontal = true;

        this.collider.set(Shape.Box(this.width, this.height));


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
