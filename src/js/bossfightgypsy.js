import { Actor, Vector, CollisionType, Animation, Shape, Timer, SpriteSheet, range } from "excalibur";
import { Resources } from './resources.js';
import { Poop } from "./bossfightpoop.js";
import { Projectile } from "./bossfightprojectile.js"; // Import the Projectile class
import { Gull } from "./bossfightgull.js"; // Import the Gull class
import { UITWO } from "./bossfighthealthbar.js";

export class Killer extends Actor {
    constructor(engine) {
        super({
            collisionType: CollisionType.Passive,
            collider: Shape.Box(49, 23) // Ensure collider is the same size as the sprite
        });

        this.engine = engine;
        this.z = 10;
        this.scale = new Vector(3, 3);
        this.pos = new Vector(500, 500);
        this.health = 300;
        this.maxHealth = 300; // Initieer maxHealth

        this.graphics.use(Resources.Killer.toSprite());
    }

    onInitialize(engine) {
        this.ui = new UITWO();
        engine.add(this.ui);

        const killerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.Killer,
            grid: {
                rows: 1,
                columns: 7,
                spriteWidth: 14,
                spriteHeight: 41
            }
        });
        this.runAnimation = Animation.fromSpriteSheet(killerSpriteSheet, range(1, 2), 100);
        this.graphics.use(this.runAnimation);

        this.updateMovement();

        this.on('collisionstart', (event) => {
            if (event.other instanceof Poop) {
                this.takeDamage(20);
                event.other.kill(); // Remove the poop after collision
            }
        });

        // Set up a timer to shoot projectiles at random intervals
        this.shootTimer = new Timer({
            fcn: () => this.shootAtGull(engine),
            interval: Math.random() * 2000 + 1000, // Random interval between 1 and 3 seconds
            repeats: true
        });

        engine.currentScene.add(this.shootTimer);
        this.shootTimer.start();

        // Listen for 'gulldied' event from Gull
        engine.currentScene.on('gulldied', () => {
            this.shootTimer.cancel();
        });
    }

    updateMovement() {
        let direction = 1;

        this.on('preupdate', () => {
            // Move the Killer left and right
            if (this.pos.x >= this.engine.drawWidth - this.width) {
                direction = -1;
            } else if (this.pos.x <= 0) {
                direction = 1;
            }
            
            this.vel.x = direction * 100;
        });
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
        if (this.ui) {
            this.ui.updateHealth(this.health / this.maxHealth); // Update de health bar
        }
        console.log(`Killer health: ${this.health}`);
        if (this.health <= 0) {
            this.kill();
            this.shootTimer.cancel();
            if (this.gameUI) {
                this.gameUI.showWin(this.engine); // Show win label
            }
            console.log('Killer is defeated!');
        }
    }

    shootAtGull(engine) {
        const gull = engine.currentScene.actors.find(actor => actor instanceof Gull);
        if (gull) {
            const projectile = new Projectile(this.pos, gull.pos);
            engine.currentScene.add(projectile);
        }
    }
}
