import { Scene, Sprite, Actor, Vector, BoundingBox, CollisionType, SpriteSheet, range, Animation, ScaleBy, DisplayMode } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Appartment } from './appartment.js';
import { Floor } from './floor';
import { Wall } from './wall';
import { BoxC } from './ramp';
import { Player } from './player';
import { InvisibleCollider } from './invisibleCollider.js';


export class House extends Scene {
    constructor() {
        super({
            displayMode: DisplayMode.FillScreen
        });
        const background = new Appartment()
        this.add(background);

    }

    onInitialize(engine) {

        const player = new Player(300, 800);
        // player.scale = new Vector(6, 6);
        this.add(player);
        

        this.add(new Floor(90, 950));
        this.add(new Wall(-100, -63, 12, 2000));
        this.add(new Floor(90, 18));
        this.add(new InvisibleCollider(1800, 63, 100, 2000))

        const wall =  new BoxC(1490, 0, 7, 500);
        this.add(wall);

        const wallunder =  new BoxC(1490, 820, 7, 500);
        this.add(wallunder);

        const line = new Actor({
            pos: new Vector(1490, 456),
            scale: new Vector(10, 10),
            z: 9
        });
        line.graphics.use(Resources.Line.toSprite());
        this.add(line);

        this.camera.zoom = 0.71;
   
    }
}
