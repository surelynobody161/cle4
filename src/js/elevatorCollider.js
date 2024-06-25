import { Actor, CollisionType } from 'excalibur';
import { Player } from './player';

export class ElevatorCollider extends Actor {
    constructor(x, y, width, height) {
        super({
            x, y, width, height,
            collisionType: CollisionType.Passive,
        });
        // No visual representation, just the collision box
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.onCollision(event, engine));
    }

    onCollision(event, engine) {
        if (event.other instanceof Player) {
            engine.goToScene('elevator');
        } else {
            console.log('squeeky clean');
        }

    }
}
