import { Scene, Sprite, Actor, Vector, BoundingBox } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Player } from './player';
import { Floor } from './floor';
import { Wall } from './wall';
import { Guard } from './gaurd';
import { InvisibleCollider } from './invisibleCollider';
import { ElevatorCollider } from './elevatorCollider';
import { Fries } from './fries';

export class Level3 extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        const background = new Actor({
            x: 5120,
            y: 1280,
            anchor: new Vector(0.5, 0.5)
        });

        background.graphics.use(Resources.Turbinehal.toSprite());
        this.add(background);

        localStorage.setItem(`inventory`, JSON.stringify([]));

        const player = new Player(1000, 80);
        // player.scale = new Vector(7, 7);
        this.add(player);

        const gaurd = new Guard(9740, 655)
        this.add(gaurd)

        this.add(new Wall(5120, 0, 10240, 100));
        this.add(new Wall(10200, 1500, 100, 3000));
        this.add(new Floor(0, 2560));
        this.add(new Fries(3000, 1230));


        this.add(new InvisibleCollider(0, 1500, 100, 3000));
        this.add(new ElevatorCollider(9840, 655, 100, 300));

        console.log(engine, engine.mygamepad);

        this.camera.zoom = 0.4;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 10230, 2550));
    }
}