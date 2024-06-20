import { Floor } from './floor';
import { Fries } from './fries';
import { Resources } from './resources';
import { Actor, CollisionType, Vector, Input, DegreeOfFreedom, CompositeCollider, Shape } from 'excalibur';

export class Player extends Actor {
    constructor(x, y) {
        super({ x, y, collisionType: CollisionType.Active });
        this.graphics.use(Resources.Seagull.toSprite());
        this.isGrounded = false;
        this.scale = new Vector(0.05, 0.05);
        this.buttonPressed = false;
        this.lastInputTime = 0;
        this.inventory = [];
        this.isFace1Pressed = false;
        this.jumpSpeed = -5000;

    }

    onInitialize(engine) {
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.z = 10;

        let circle = new CompositeCollider([
            Shape.Circle(100, new Vector(0, 10)),
        ]);
        this.collider.set(circle);
    }

    onCollisionStart(evt) {
        if (!evt.other) {
            return;
        }

        // if (evt.other.body.collisionType === CollisionType.Fixed) {
        //     this.isGrounded = true;
        // }

        if (evt.other instanceof Floor) {
            console.log("floor");
        }

        if (evt.other instanceof Fries) {
            evt.other.pickUp(this);
            console.log("POOP CHARGE")
            this.jumpSpeed = -7000;
            // this.scene.engine.clock.schedule(() => (
            //     this.jumpSpeed = -5000
            // ), 5000);
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
        const cooldown = 400; // Cooldown period in milliseconds

        if (yAxis < -0.5 && now > this.lastInputTime + cooldown && !this.buttonPressed) {
            this.vel = new Vector(100, -300);
            this.lastInputTime = now;
            this.buttonPressed = true;
        }

        if (yAxis < -0.5 && gamepad.isButtonPressed(Input.Buttons.Face1)  && !this.buttonPressed) {
            this.vel = new Vector(0, -300);
            this.lastInputTime = now;
            this.buttonPressed = true;
        }

        if (gamepad.isButtonPressed(Input.Buttons.Face1) && now > this.lastInputTime + cooldown && !this.isFace1Pressed) {
            this.vel = new Vector(-100, -300);
            this.lastInputTime = now;
            this.isFace1Pressed = true;
        }

        // Reset button states when buttons are released
        if (!gamepad.isButtonPressed(Input.Buttons.Face1) && yAxis >= -0.5) {
            this.buttonPressed = false;
            this.isFace1Pressed = false;
        }

        console.log(`yAxis: ${yAxis}`);

        // if (gamepad.isButtonPressed(Input.Buttons.Face2) && now > this.lastInputTime + cooldown && !this.isFace1Pressed && !this.isFace2Pressed) {
        //     this.vel = new Vector(100, -300);
        //     this.lastInputTime = now;
        //     this.buttonPressed = true;
        // }

        // if (gamepad.isButtonPressed(Input.Buttons.Face2) && gamepad.isButtonPressed(Input.Buttons.Face1) && !this.isFace1Pressed && !this.isFace2Pressed) {
        //     this.vel = new Vector(0, -300);
        //     this.lastInputTime = now;
        //     this.buttonPressed = true;
        // }

        // if (gamepad.isButtonPressed(Input.Buttons.Face1) && now > this.lastInputTime + cooldown && !this.isFace1Pressed && !this.isFace2Pressed) {
        //     this.vel = new Vector(-100, -300);
        //     this.lastInputTime = now;
        //     this.isFace1Pressed = true;
        // }


        // // Reset button states when buttons are released
        // if (!gamepad.isButtonPressed(Input.Buttons.Face1) && gamepad.isButtonPressed(Input.Buttons.Face2)) {
        //     this.buttonPressed = false;
        //     this.isFace1Pressed = false;
        // }
    }

    // addToInventory(item) {
    //     this.inventory.push(item);
    //     console.log("Item added to inventory:", item);
    // }
}
