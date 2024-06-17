import { Floor } from './floor';
import { Resources } from './resources';
import { Actor, CollisionType, Vector, Input, DegreeOfFreedom } from 'excalibur';

export class Player extends Actor {
    constructor(x, y) {
        super({ x, y, collisionType: CollisionType.Active, width: 200, height: 200 });
        this.graphics.use(Resources.Seagull.toSprite());
        this.isGrounded = false;
        this.scale = new Vector(0.18, 0.18);
        this.buttonPressed = false;
        this.lastInputTime = 0;
    }

    onInitialize(engine) {
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.z = 10;
    }

    onCollisionStart(evt) {
        if (!evt.other) {
            return;
        }

        if (evt.other.body.collisionType === CollisionType.Fixed) {
            this.isGrounded = true;
        }

        if (evt.other instanceof Floor) {
            console.log("floor");
        }
    }

    onPreUpdate(engine) {
        if (!engine.mygamepad) {
            console.log("No gamepad connected");
            return;
        }
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        let gamepad = engine.mygamepad;
        let yAxis = gamepad.getAxes(Input.Axes.LeftStickY);

        // Check for Y-axis input with a delay
        const now = Date.now();
        if (yAxis < -0.5 && now > this.lastInputTime + 400) { // 500ms delay
            this.vel = new Vector(100, -200);
            this.lastInputTime = now; // Update the last input time
        }

        // Check for Face1 button input with a delay
        if (gamepad.isButtonPressed(Input.Buttons.Face1) && now > this.lastInputTime + 400) { // 500ms delay
            this.vel = new Vector(-100, -200);
            this.lastInputTime = now; // Update the last input time
        }

        // Reset the buttonPressed flag when buttons are released
        if (!gamepad.isButtonPressed(Input.Buttons.Face1) && yAxis >= -0.5) {
            this.buttonPressed = false;
        }

        console.log(`yAxis: ${yAxis}`);
    }
}
