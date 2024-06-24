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

export class Elevator extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        Resources.Elevator.addToScene(this)
        localStorage.setItem(`inventory`, JSON.stringify([]));



        const player = new Player(30, 80);
        this.add(player);

        this.add(new Wall(0, 150, 10, 300));
        this.add(new Wall(512, 0, 1024, 10));

        const invisibleCollider = new InvisibleCollider(1024, 150, 10, 300);
        this.add(invisibleCollider);


        console.log(engine, engine.mygamepad);

        this.camera.zoom = 7;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 1024, 256)); // Set the game bounds
    }
}
