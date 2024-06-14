import { Resources } from './resources';
import { Actor, CollisionType, Vector, Sprite, Axes, } from 'excalibur';

export class Player extends Actor {
    constructor(x, y) {
        super(x, y);
        this.body.collisionType = CollisionType.Active;
        this.graphics.use(Resources.Seagull.toSprite())
        this.body.mass = 10;
        this.scale = new Vector(0.18, 0.18);

    }

    // onPreUpdate(engine) {
    //     if (engine.mygamepad === null) {
    //         console.log("error ahoele");
    //         return;
    //     }
    //     const xValue = engine.mygamepad.getAxes(Axes.LeftStickX);
    //     const yValue = engine.mygamepad.getAxes(Axes.LeftStickY);
    //     this.vel = new Vector(xValue * 100, yValue * 100);

    //     if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
    //         console.log("jump!");
    //     }
    // }
}
