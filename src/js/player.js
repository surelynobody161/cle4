import { Floor } from './floor';
import { Resources } from './resources';
import { Actor, CollisionType, Vector, Input, DegreeOfFreedom } from 'excalibur';

export class Player extends Actor {
    constructor(x, y) {
        super({ x, y, collisionType: CollisionType.Active, width: 70, height: 70 });
        this.graphics.use(Resources.Seagull.toSprite());
        this.isGrounded = false;
        this.scale = new Vector(0.18, 0.18);
        this.buttonPressed = false;
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

        // Handle Y-axis input
        if (yAxis < -0.5 && !this.buttonPressed) {
            this.vel = new Vector(100, -200);
            this.buttonPressed = true;
        }

        
        
        // Handle Face1 button input
        if (gamepad.isButtonPressed(Input.Buttons.Face1) && !this.buttonPressed) {
            this.vel = new Vector(-100, -200);
            this.buttonPressed = true;
        }

        // Reset the buttonPressed flag when buttons are released
        if (!gamepad.isButtonPressed(Input.Buttons.Face1) && yAxis >= -0.5) {
            this.buttonPressed = false;
        }

        console.log(`yAxis: ${yAxis}`);
    }
}
