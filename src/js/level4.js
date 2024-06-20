import { Scene, Sprite, Actor, Vector, BoundingBox } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Player } from './player';
import { Floor } from './floor';
import { Ball } from './ball';
import { Ramp } from './ramp';
import { Kid } from './kid';
import { Fries } from './fries';

export class Level4 extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        console.log("level 4")

        Resources.Haven.addToScene(this)
        localStorage.setItem(`inventory`, JSON.stringify([]));



        const player = new Player(134, 100);
        this.add(player);


        console.log(engine, engine.mygamepad);

        this.camera.zoom = 7;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 1024, 256)); // Set the game bounds
    }
}
