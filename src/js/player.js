import { Actor, Engine, Vector, Keys, CollisionType, DegreeOfFreedom, SpriteSheet, range, Animation } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Enemy } from "./enemy.js";
import { Coin } from "./coin.js";
import { Powerup } from "./powerup.js";


export class Player extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Player.width, height: Resources.Player.height});
        this.graphics.use(Resources.Player.toSprite());

        this.body.collisionType = CollisionType.Active;
        this.isGrounded = false;
        this.scale = new Vector(1, 1);
        this.pos = new Vector(150, 950)
        this.inventory = [];
        this.jumpSpeed = -5000;
        this.score = 0
        
    }

    onInitialize(engine) {
        this.body.useGravity = true;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.on('collisionstart', (evt) => this.onCollisionStart(evt));




        //animation
        const idleSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerIdle,
            grid: {
                rows: 1,
                columns: 7,
                spriteWidth: 48,
                spriteHeight: 48
            },
        });
        const runningSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerRun,
            grid: {
                rows: 1,
                columns: 7,
                spriteWidth: 48,
                spriteHeight: 48
            },
        });
        const jumpingSpritesheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerJump,
            grid: {
                rows: 2,
                columns: 6,
                spriteWidth: 48,
                spriteHeight: 48
            },
        });
        const idle = Animation.fromSpriteSheet(idleSpritesheet, range(1, 6), 100)
        const walk = Animation.fromSpriteSheet(runningSpritesheet, range(1, 6), 80)
        const run = Animation.fromSpriteSheet(runningSpritesheet, range(1, 6), 80)
        const jump = Animation.fromSpriteSheet(jumpingSpritesheet, range(1, 5), 20)


        this.graphics.add("idle", idle)
        this.graphics.add("walk", walk)
        this.graphics.add("run", run)
        this.graphics.add("jump", jump)

        this.graphics.use(idle);
        this.z = 10

    }

    
    onCollisionStart(evt, engine, score) {
        if (!evt.other) {
            return;
        }

        if (evt.other.body.collisionType === CollisionType.Fixed) {
            this.isGrounded = true;
        }

        if (evt.other instanceof Enemy) {
            evt.other.kill();
            if (this.scene && this.scene.engine) {
                this.scene.engine.goToScene('gameover');
            }
        }

        if (evt.other.name === 'flashlight') {
            evt.other.kill();

            let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
            inventory.push('flashlight');
            localStorage.setItem('inventory', JSON.stringify(inventory));
        } else if (evt.other.name === 'door') {
            this.nearbyDoor = evt.other;
        }

        if (evt.other.name === 'flashlight2') {
            evt.other.kill();

            let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
            inventory.push('flashlight2');
            localStorage.setItem('inventory', JSON.stringify(inventory));
        } else if (evt.other.name === 'door2') {
            this.nearbyDoor = evt.other;
        }

        if (evt.other instanceof Coin) {
            console.log("picked up a coin");
            this.score += 10;
            evt.other.pickUp(this);
            console.log(this.score);
            // if (this.scene && this.scene.engine && this.scene.engine.ui) {
            //     this.scene.engine.updateScore(this.score); // Pass this.score instead of score
            // }
            
        }


        if (evt.other instanceof Powerup) {
            evt.other.pickUp(this);
            console.log("ik pak een powerup")
            this.jumpSpeed = -7000;
            // this.scene.engine.clock.schedule(() => (
            //     this.jumpSpeed = -5000
            // ), 5000);
        }
    }

    onPostUpdate(engine, evt) {
        let xspeed = 0;
        this.graphics.use("idle");

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 200;
            this.graphics.use('walk')
            this.graphics.flipHorizontal = false;

        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -200;
            this.graphics.use('walk')
            this.graphics.flipHorizontal = true;
        }


        this.vel = new Vector(xspeed, this.vel.y);


        if (engine.input.keyboard.wasPressed(Keys.Space) && this.isGrounded) {
            this.graphics.use('jump')
            this.isGrounded = false;
            this.body.applyLinearImpulse(new Vector(0, this.jumpSpeed));
            
        }

        if (engine.input.keyboard.wasPressed(Keys.E) && this.nearbyDoor) {
            let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
            if (inventory.includes('flashlight')) {
                this.nearbyDoor.kill();
                this.nearbyDoor = null;
                engine.goToScene('level2');
            } else {
                this.nearbyDoor.displayMessage('This looks dark, I should find a flashlight');
            }
        }
        if (engine.input.keyboard.wasPressed(Keys.E) && this.nearbyDoor) {
            let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
            if (inventory.includes('flashlight2')) {
                this.nearbyDoor.kill();
                this.nearbyDoor = null;
                engine.goToScene('finish');
            } else {
                this.nearbyDoor.displayMessage('This looks dark, I should find a flashlight');
            }
        }
    }


    addToInventory(item) {
        this.inventory.push(item);
        console.log("Item added to inventory:", item);
    }

}
