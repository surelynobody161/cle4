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






        const background = new Actor({
            x: 5120,
            y: 1280,
            anchor: new Vector(0.5, 0.5),
            scale: new Vector(1, 1)
        });

        background.graphics.use(Resources.Footballfield.toSprite());
        this.add(background);
        localStorage.setItem(`inventory`, JSON.stringify([]));



        const player = new Player(300, 800);
        player.scale = new Vector(6, 6);
        this.add(player);


        this.add(new Ball(480, 1920));


        const ramp = new Ramp(2000, 2000, 1500, 100, Math.PI / -20);
        this.add(ramp);

        this.add(new Wall(0, 1500, 100, 3000));
        this.add(new Wall(5120, 0, 10240, 100));
        this.add(new Floor(0, 2160));


        const kid = new Kid(3000, 1800, 5, 5);
        this.add(kid)


        const invisibleCollider = new InvisibleCollider(10240, 1500, 100, 3000);
        this.add(invisibleCollider);


        console.log(engine, engine.mygamepad);

        this.camera.zoom = 0.6;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 10240, 2560)); // Set the game bounds



        const backgroundMusic = Resources.bgm1;
        backgroundMusic.loop = true;
        backgroundMusic.play(0.5);

    }
}
