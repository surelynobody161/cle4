import { Resources } from './resources';
import { Actor, CollisionType, Vector, Input } from 'excalibur';

export class Player extends Actor {
    constructor(x, y) {
        super({ x, y });
        this.body.collisionType = CollisionType.Active;
        this.graphics.use(Resources.Seagull.toSprite());
        this.body.mass = 10;
        this.scale = new Vector(0.18, 0.18);
    }

    onPreUpdate(engine) {
        if (!engine.mygamepad) {
            console.log("No gamepad connected");
            return;
        }
        let gamepad = engine.mygamepad;
        let yAxis = gamepad.getAxes(Input.Axes.LeftStickY);
        if (yAxis < -0.5) {
            this.vel = new Vector(100, -200);
        }
        if (gamepad.isButtonPressed(Input.Buttons.Face1)) {
            this.vel = new Vector(-100, -200);
        }

        console.log(`yAxis: ${yAxis}`);
    }
}
