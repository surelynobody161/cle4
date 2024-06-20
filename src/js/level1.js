import { Scene, Sprite, Actor, Vector, BoundingBox } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Player } from './player';
import { Floor } from './floor';
import { Ball } from './ball';
import { Ramp } from './ramp';
import { Kid } from './kid';
import { Fries } from './fries';
import { Wall } from './wall';

export class Level1 extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        // const lobbyTexture = Resources.TestBackground;

        // const lobbySprite = new Sprite({
        //     image: lobbyTexture,
        //     destSize: {
        //         width: engine.drawWidth,
        //         height: engine.drawHeight,
        //     }
        // });

        // const lobbyBackground = new Actor({
        //     pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
        //     // anchor: new Vector(0.5, 0.5)
        // });

        // lobbyBackground.graphics.use(lobbySprite);
        // this.add(lobbyBackground);

        Resources.Footballfield.addToScene(this)
        localStorage.setItem(`inventory`, JSON.stringify([]));



        const player = new Player(30, 100);
        this.add(player);

        // this.add(new Floor(500, 650));
        // this.add(new Floor(200, 650));

        this.add(new Ball(48, 192));
        this.add(new Fries(200, 100));


        const ramp = new Ramp(200, 200, 150, 10, Math.PI / -20);
        this.add(ramp);

        this.add(new Wall(0, 150, 10, 300));
        this.add(new Wall(512, 0, 1024, 10));

        // const kid = new Kid(250, 400, 100, 100);
        // this.add(kid)


        console.log(engine, engine.mygamepad);

        this.camera.zoom = 7;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 1024, 256)); // Set the game bounds
    }
}
