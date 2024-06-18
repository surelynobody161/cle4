import { Scene } from 'excalibur';
import { Player } from './player';
import { Floor } from './floor';
import { Ball } from './ball';

export class Level1 extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        const player = new Player(400, 350);
        this.add(player);

        const floor = new Floor(500, 650);
        this.add(floor);

        const ball = new Ball(100, 100); // Initial position of the ball
        this.add(ball);

        console.log(engine, engine.mygamepad);
    }
}
