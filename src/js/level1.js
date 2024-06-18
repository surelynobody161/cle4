import { Scene } from 'excalibur';
import { Player } from './player';
import { Floor } from './floor';
import { Ball } from './ball';
import { Ramp } from './ramp';
import { Kid } from './kid';

export class Level1 extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        const player = new Player(600, 350);
        this.add(player);

        this.add(new Floor(500, 650));
        this.add(new Floor(200, 650));

        // const ball = new Ball(100, 100);
        this.add(new Ball(110, 100));
        // this.add(new Ball(500, 100));

        const ramp = new Ramp(300, 450, 200, 20, Math.PI / -20); // Position, size, and angle of the ramp
        this.add(ramp);

        const kid = new Kid(250, 400, 100, 100); // Position and size of the box
        this.add(kid)


        console.log(engine, engine.mygamepad);
    }
}
