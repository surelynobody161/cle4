import { Actor, Vector, CollisionType, Shape, Input, BoundingBox, EventDispatcher, DegreeOfFreedom } from "excalibur";
import { Resources } from './resources.js';
import { Poop } from "./bossfightpoop.js";
import { Projectile } from "./bossfightprojectile.js";
import { UI } from "./bossfighthealthbar.js";
import { Wall } from "./wall.js";

export class Gull extends Actor {
    constructor() {
        super({
            width: 53,
            height: 48,
            collisionType: CollisionType.Active,
            collider: Shape.Box(53, 48) // Ensure collider is the same size as the sprite
        });

        this.z = 10;
        this.pos = new Vector(200, 200);
        this.health = 100;
        this.maxHealth = 100;
        this.buttonPressed = false;
        this.isFace1Pressed = false;
        this.lastInputTime = 0;
        this.previousFace2Pressed = false; // Track the previous state of the Face2 button

        // Event dispatcher for emitting events
        this.eventDispatcher = new EventDispatcher();
    }

    onInitialize(engine) {
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        if (!engine.mygamepad) {
            console.log("No gamepad connected");
            return;
        }

        let gamepad = engine.mygamepad;

        // Set up the sprite and animations
        this.graphics.use(Resources.SeagullIdle.toSprite());

        // Initialize UI
        this.ui = new UI();
        engine.add(this.ui);

        // Ensure Wall is correctly added to the scene, not the actor
        let wall = new Wall(2500, 600, 5600, 100);
        engine.currentScene.add(wall);

        // Register movement speed function
        this.on('preupdate', () => this.movementSpeed(engine));

        // Handle collisions
        this.on('collisionstart', (event) => {
            if (event.other instanceof Projectile) {
                this.takeDamage(20);
                event.other.kill(); // Remove the projectile after collision
            }
        });

        // Check if health is zero and emit 'gulldied' event
        this.on('postupdate', () => {
            if (this.health <= 0) {
                this.eventDispatcher.emit('gulldied');
                this.kill();
                if (this.ui) {
                    this.ui.showLose(engine); // Show lose label
                }
                console.log('Gull is defeated!');
            }
        });

        // Configure the camera
        const player = this; // Assuming `player` is the current Gull instance
        engine.currentScene.camera.zoom = 1.2;
        engine.currentScene.camera.strategy.lockToActor(player);
        engine.currentScene.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 5120, 640)); // Set the game bounds
    }

    movementSpeed(engine) {
        if (!engine.mygamepad) {
            console.log("No gamepad connected");
            return;
        }

        let gamepad = engine.mygamepad;
        let yAxis = gamepad.getAxes(Input.Axes.LeftStickY);

        const now = Date.now();
        const cooldown = 700;

        // Right movement
        if (yAxis < -0.5 && now > this.lastInputTime + cooldown && !this.buttonPressed) {
            this.vel = new Vector(600, -700);
            this.lastInputTime = now;
            this.buttonPressed = true;
        }

        // Up movement
        if (yAxis < -0.5 && gamepad.isButtonPressed(Input.Buttons.Face1) && !this.buttonPressed) {
            this.vel = new Vector(0, -700);
            this.lastInputTime = now;
            this.buttonPressed = true;
        }

        // Left movement
        if (gamepad.isButtonPressed(Input.Buttons.Face1) && now > this.lastInputTime + cooldown && !this.isFace1Pressed) {
            this.vel = new Vector(-600, -700);
            this.lastInputTime = now;
            this.isFace1Pressed = true;
        }

        // Poop action with Face2 button
        if (gamepad.isButtonPressed(Input.Buttons.Face2) && !this.previousFace2Pressed) {
            this.dropPoop(engine);
        }

        // Update previousFace2Pressed state
        this.previousFace2Pressed = gamepad.isButtonPressed(Input.Buttons.Face2);

        // Reset button states when buttons are released
        if (!gamepad.isButtonPressed(Input.Buttons.Face1) && yAxis >= -0.5) {
            this.buttonPressed = false;
            this.isFace1Pressed = false;
        }

        console.log(`yAxis: ${yAxis}`);
    }
    dropPoop(engine) {
        const poop = new Poop();
        poop.pos = this.pos.clone(); // Start position of poop is the same as the Gull
        poop.vel = new Vector(0, 250); // Poop falls downwards
        engine.currentScene.add(poop);
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
        if (this.ui) {
            this.ui.updateHealth(this.health / this.maxHealth); // Update the health bar
        }
        console.log(`Gull health: ${this.health}`);
    }
}
