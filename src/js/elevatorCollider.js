import { Actor, CollisionType } from 'excalibur';

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
        // Assuming 'NextScene' is a scene already defined in your game
        engine.goToScene('elevator');
    }
}
