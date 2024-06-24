import { Scene, Sprite, Actor, Vector, BoundingBox, CollisionType } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Player } from './player';
import { Floor } from './floor';
import { Ball } from './ball';
import { Ramp, BoxC } from './ramp';
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

        const boxObada = new BoxC(3990, 1700, 120, 400);
        this.add(boxObada);

        const boxDariela = new BoxC(4145, 1705, 90, 310);
        this.add(boxDariela);

        const boxBlondy = new BoxC(4815, 1845, 90, 270);
        this.add(boxBlondy);

        const boxYae = new BoxC(5735, 1735, 90, 290);
        this.add(boxYae);

        const boxJaap = new BoxC(5875, 1705, 90, 330);
        this.add(boxJaap);

        const boxWhity = new BoxC(7060, 1745, 120, 370);
        this.add(boxWhity);

        const boxPurple = new BoxC(7150, 1780, 120, 360);
        this.add(boxPurple);

        const boxFernon = new BoxC(8120, 1735, 240, 290);
        this.add(boxFernon);

        const boxLampOne = new BoxC(3990, 1240, 100, 60);
        this.add(boxLampOne);

        const boxLampTwo = new BoxC(4580, 1240, 100, 60);
        this.add(boxLampTwo);

        const boxLampThree = new BoxC(5160, 1240, 100, 60);
        this.add(boxLampThree);

        const boxLampFour = new BoxC(5730, 1240, 100, 60);
        this.add(boxLampFour);

        const boxLampFive = new BoxC(6320, 1240, 100, 60);
        this.add(boxLampFive);

        const boxLampSix = new BoxC(6890, 1240, 100, 60);
        this.add(boxLampSix);

        const boxLampSeven = new BoxC(7470, 1240, 100, 60);
        this.add(boxLampSeven);

        const boxLampEight = new BoxC(8060, 1240, 100, 60);
        this.add(boxLampEight);

        console.log(engine, engine.mygamepad);

        this.camera.zoom = 0.6;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 10240, 2560)); // Set the game bounds



        const backgroundMusic = Resources.bgm1;
        backgroundMusic.loop = true;
        backgroundMusic.play(0.5);

    }
}
