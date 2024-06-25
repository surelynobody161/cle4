import { Actor, CollisionType, Vector, Color, Shape, SpriteSheet, range, Animation, AnimationStrategy } from 'excalibur';
import { Resources, ResourceLoader } from './resources';




export class ElevatorActor extends Actor {
    constructor(x, y) {
        super({
            x, y,
        });
        this.graphics.use(Resources.Elevator.toSprite());
        this.scale = new Vector(0.5, 0.5);

    this.z = 5
    
    }


    onInitialize(engine) {
        const tvSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.Elevator,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 2880,
                spriteHeight: 1920
            },
        });

        const ElevatorAnimation = Animation.fromSpriteSheet(tvSpritesheet, range(0, 4), 500, AnimationStrategy.Loop);

        // Add the animation to the graphics component
        this.graphics.add("elevatorAnimation", ElevatorAnimation);

        // Use the animation
        this.graphics.use("elevatorAnimation");
    }
}

