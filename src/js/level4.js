import { Scene, Sprite, Actor, Vector, BoundingBox } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Player } from './player';
import { Floor } from './floor';
import { Ball } from './ball';
import { Ramp } from './ramp';
import { Fries } from './fries';
import { Wall } from './wall';
import { Kid } from './kid';
import { InvisibleCollider } from './invisibleCollider';

export class Level4 extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        // Resources.Haven.addToScene(this)
        const background = new Actor({
            x: 5120,
            y: 1280,
            anchor: new Vector(0.5, 0.5),
            scale: new Vector(10, 10)
        });

        background.graphics.use(Resources.Haven.toSprite());
        this.add(background);
        localStorage.setItem(`inventory`, JSON.stringify([]));



        const player = new Player(1000, 80);
        player.scale = new Vector(7, 7);
        this.add(player);

        this.add(new Wall(5120, 0, 10240, 100));
        this.add(new Floor(0, 2300));
        this.add(new InvisibleCollider(0, 1500, 100, 3000));
        const invisibleCollider = new InvisibleCollider(8000, 1500, 100, 3000);


        console.log(engine, engine.mygamepad);

        this.camera.zoom = 0.6;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 10240, 2560)); // Set the game bounds
    }
}
