import { Scene } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Player } from './player';
import { Floor } from './floor';

export class Level1 extends Scene {

    constructor() {
        super();
    }

    onInitialize(engine) {

        const player = new Player(400, 350);
        this.add(player);

        const floor = new Floor(500, 650);
        this.add(floor);

        console.log(engine, engine.mygamepad);


    }
}