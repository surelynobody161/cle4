import { Scene, Sprite, Actor, Vector, BoundingBox } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Player } from './player';
import { Floor } from './floor';
import { Wall } from './wall';
import { InvisibleCollider } from './invisibleCollider';

export class Level2 extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {

        const background = new Actor({
            x: 5120,
            y: 1280,
            anchor: new Vector(0.5, 0.5)
        });

        background.graphics.use(Resources.Cafe.toSprite());
        this.add(background);

        localStorage.setItem(`inventory`, JSON.stringify([]));

        const player = new Player(30, 80);
        player.scale = new Vector(7, 7);
        this.add(player);

        this.add(new Wall(0, 1500, 10, 3000));
        this.add(new Wall(5120, 0, 10240, 100));
        this.add(new Floor(0, 2560));

        const invisibleCollider = new InvisibleCollider(10240, 1500, 100, 3000);
        this.add(invisibleCollider);

        console.log(engine, engine.mygamepad);

        this.camera.zoom = 0.6;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 10240, 2560)); // Set the game bounds
    }

    onActivate(ctx) {
        const engine = ctx.engine;

        // Check if physics engine is initialized and has gravity property
        if (engine.physics && engine.physics.acc) {
            // Save the original gravity
            this.originalGravity = engine.physics.acc.clone();
            // Set the gravity specific to this level
            engine.physics.acc = new Vector(0, 400);
        } else {
            console.warn('Physics engine or gravity property is not initialized.');
        }
    }

    onDeactivate(ctx) {
        const engine = ctx.engine;

        // Restore the original gravity when the level is exited
        if (this.originalGravity && engine.physics) {
            engine.physics.acc = this.originalGravity;
        }
    }
}