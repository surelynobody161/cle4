import { Floor } from './floor';
import { Fries } from './fries';
import { Resources } from './resources';
import { Actor, CollisionType, Vector, Input, DegreeOfFreedom, CompositeCollider, Shape, SpriteSheet, Animation, range } from 'excalibur';

export class Player extends Actor {
    constructor(x, y) {
        super({ x, y, collisionType: CollisionType.Active });
        this.graphics.use(Resources.SeagullIdle.toSprite());
        this.isGrounded = false;
        this.scale = new Vector(0.5, 0.5);
        this.buttonPressed = false;
        this.isFace1Pressed = false;
        this.lastInputTime = 0;
        this.currentAnimation = 'idle';
        this.inventory = [];
        this.jumpSpeed = -5000;
    }

    onInitialize(engine) {
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.z = 10;

        let circle = new CompositeCollider([
            Shape.Circle(10, new Vector(0, 10)),
        ]);
        this.collider.set(circle);

        const idleSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.SeagullIdle,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 50,
                spriteHeight: 40
            },
        });
        const leftWingSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.LeftWing,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 50,
                spriteHeight: 40
            },
        });
        const bothWingsSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.BothWings,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 51,
                spriteHeight: 40
            },
        });
        const idle = Animation.fromSpriteSheet(idleSpritesheet, range(0, 1), 300)
        const leftWing = Animation.fromSpriteSheet(leftWingSpritesheet, range(0, 1), 150)
        // const rightWing = Animation.fromSpriteSheet(rightWingSpritesheet, range(1, 5), 20)
        const bothWings = Animation.fromSpriteSheet(bothWingsSpritesheet, range(0, 1), 150)


        this.graphics.add("idle", idle)
        this.graphics.add("leftwing", leftWing)
        this.graphics.add("bothwings", bothWings)
        // this.graphics.add("jump", jump)

        this.graphics.use(idle);
    }

    setAnimation(animationName) {
        if (this.currentAnimation !== animationName) {
            this.graphics.use(animationName);
            this.currentAnimation = animationName;
        }
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

        // this.graphics.use("idle");

        let gamepad = engine.mygamepad;
        let yAxis = gamepad.getAxes(Input.Axes.LeftStickY);

        const now = Date.now();
        const cooldown = 700;

        //right
        if (yAxis < -0.5 && now > this.lastInputTime + cooldown && !this.buttonPressed) {
            this.setAnimation('idle'); // Keep the animation as idle for this action
            // this.vel = new Vector(100, -300);
            this.vel = new Vector(300, -700);
            this.lastInputTime = now;
            this.buttonPressed = true;
        }

        //up
        if (yAxis < -0.5 && gamepad.isButtonPressed(Input.Buttons.Face1) && !this.buttonPressed) {
            this.setAnimation('bothwings');
            // this.vel = new Vector(0, -300);
            this.vel = new Vector(0, -700);

            this.lastInputTime = now;
            this.buttonPressed = true;
        }

        //left
        if (gamepad.isButtonPressed(Input.Buttons.Face1) && now > this.lastInputTime + cooldown && !this.isFace1Pressed) {
            this.setAnimation('leftwing');
            // this.vel = new Vector(-100, -300);
            this.vel = new Vector(-300, -700);
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
