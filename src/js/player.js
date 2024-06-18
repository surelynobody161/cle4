import { Floor } from './floor';
import { Resources } from './resources';
import { Actor, CollisionType, Vector, Input, DegreeOfFreedom, SpriteSheet } from 'excalibur';

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
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
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

        let gamepad = engine.mygamepad;
        let yAxis = gamepad.getAxes(Input.Axes.LeftStickY);

        const now = Date.now();
        if (yAxis < -0.5 && now > this.lastInputTime + 800) { //800 miliseconde delay
            this.vel = new Vector(100, -300);
            this.lastInputTime = now; 
        }

        if (yAxis < -0.5 && gamepad.isButtonPressed(Input.Buttons.Face1 && now > this.lastInputTime + 800)) { //800 miliseconde delay
            this.vel = new Vector(0, -300);
            // this.lastInputTime = now;
        }

        // Check for Face1 button input with a delay
        if (gamepad.isButtonPressed(Input.Buttons.Face1) && now > this.lastInputTime + 800) { //800 miliseconde delay
            this.vel = new Vector(-100, -300);
            this.lastInputTime = now; 
        }

        if (!gamepad.isButtonPressed(Input.Buttons.Face1) && yAxis >= -0.5) {
            this.buttonPressed = false;
        }

        console.log(`yAxis: ${yAxis}`);
    }
}