import { Actor, CollisionType } from 'excalibur';
import { Player } from './player'; // Ensure the Player class is imported
import { BossFightScene } from './bossfightscene';

export class BossFightCollider extends Actor {
    constructor(x, y, width, height) {
        super({
            x, y, width, height,
            collisionType: CollisionType.Passive,
        });
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.onCollision(event, engine));
    }

    onCollision(event, engine) {
        if (event.other instanceof Player) {
            // Ensure the bossfight scene is added before transitioning
            if (!engine.scenes['bossfight']) {
                engine.addScene('bossfight', new BossFightScene());
            }
            engine.goToScene('bossfight');
        }
    }
}
