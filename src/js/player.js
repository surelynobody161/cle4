import { Floor } from './floor';
import { Fries } from './fries';
import { Poop } from './poop';
import { Resources } from './resources';
import { Actor, CollisionType, Vector, Input, DegreeOfFreedom, CompositeCollider, Shape, SpriteSheet, Animation, AnimationStrategy, range, Keys } from 'excalibur';

export class Player extends Actor {
    constructor(x, y) {
        super({
            x, y, collisionType: CollisionType.Active
        });
        this.graphics.use(Resources.SeagullIdle.toSprite());
        this.isGrounded = false;
        this.scale = new Vector(0.5, 0.5);
        this.buttonPressed = false;
        this.isFace1Pressed = false;
        this.lastInputTime = 0;
        this.currentAnimation = 'idle';
        this.inventory = [];
        this.jumpSpeed = -5000;
        this.canPoop = false;
    }

    onInitialize(engine) {
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));
        this.z = 10;

        let circle = new CompositeCollider([
            Shape.Circle(100, new Vector(0, 10)),
        ]);
        this.collider.set(circle);

        const idleSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.SeagullIdle,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 500,
                spriteHeight: 400
            },
        });
        const leftWingSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.LeftWing,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 500,
                spriteHeight: 400
            },
        });
        const rightWingSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.RightWing,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 500,
                spriteHeight: 400
            },
        });
        const bothWingsSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.BothWings,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 510,
                spriteHeight: 400
            },
        });
        const idle = Animation.fromSpriteSheet(idleSpritesheet, range(0, 1), 300)
        const leftWing = Animation.fromSpriteSheet(leftWingSpritesheet, range(0, 1), 150)
        const rightWing = Animation.fromSpriteSheet(rightWingSpritesheet, range(0, 1), 150)
        const bothWings = Animation.fromSpriteSheet(bothWingsSpritesheet, range(0, 1), 150)


        this.graphics.add("idle", idle)
        this.graphics.add("leftwing", leftWing)
        this.graphics.add("rightwing", rightWing)
        this.graphics.add("bothwings", bothWings)

        this.graphics.use(idle);
    }

    enablePooping() {
        this.canPoop = true;
    }

    poop() {
        if (this.canPoop) {
            const projectile = new Poop(this.pos.x, this.pos.y);
            this.scene.add(projectile);
            this.canPoop = false; // Can only poop once
        }
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
            this.enablePooping(); // Enable pooping when fries are picked up
            // this.scene.engine.clock.schedule(() => (
            //     this.jumpSpeed = -5000
            // ), 5000);
        }
    }

    onPreUpdate(engine) {

        const keyboard = engine.input.keyboard;
        const now = Date.now();
        const cooldown = 700;


        //KEYBOARD \/
        keyboard.on('press', (evt) => {
            let key = evt.key;
            if (key == Keys.D && now > this.lastInputTime + cooldown) {
                this.setAnimation('leftwing'); // Set the animation to leftwing
                this.vel = new Vector(600, -700);
                this.lastInputTime = now;

            }
        });



        keyboard.on('press', (evt) => {
            let key = evt.key;
            if (key == Keys.A && now > this.lastInputTime + cooldown) {
                this.setAnimation('rightwing');
                this.vel = new Vector(-600, -700);
                this.lastInputTime = now;

            }
        });


        keyboard.on('press', (evt) => {
            let key = evt.key;
            if (key == Keys.W ) {
                this.setAnimation('bothwings');
                this.vel = new Vector(0, -700);
                this.lastInputTime = now;
                this.buttonPressed = true;

            }
        });

        keyboard.on('press', (evt) => {
            let key = evt.key;
            if (key == Keys.S && now > this.lastInputTime + cooldown) {
                this.poop();

            }
        });





        if (!engine.mygamepad) {
            console.log("No gamepad connected");
            return;
        }


        let gamepad = engine.mygamepad;
        let yAxis = gamepad.getAxes(Input.Axes.LeftStickY);





        //right
        if (yAxis < -0.5 && now > this.lastInputTime + cooldown && !this.buttonPressed) {
            this.setAnimation('leftwing'); // Set the animation to leftwing
            this.vel = new Vector(600, -700);
            this.lastInputTime = now;
            this.buttonPressed = true; // Set the buttonPressed flag to true
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
            this.setAnimation('rightwing');
            // this.vel = new Vector(-100, -300);
            this.vel = new Vector(-600, -700);
            this.lastInputTime = now;
            this.isFace1Pressed = true;
        }

        // To reset the buttonPressed flag
        if (yAxis >= -0.5 && !this.isFace1Pressed) {
            this.buttonPressed = false;
            this.isFace1Pressed = false;

            this.setAnimation('idle');

        }

        // Poop action with Face2 button
        if (gamepad.isButtonPressed(Input.Buttons.Face2) && this.canPoop) {
            this.poop();
        }

        // Reset button states when buttons are released
        if (!gamepad.isButtonPressed(Input.Buttons.Face1) && yAxis >= -0.5) {
            this.buttonPressed = false;
            this.isFace1Pressed = false;
        }












    }





}
