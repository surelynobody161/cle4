// level4.js

import { Scene, Actor, Vector, BoundingBox } from 'excalibur';
import { Resources } from './resources';
import { Player } from './player';
import { Wall } from './wall';
import { Floor } from './floor';
import { InvisibleCollider } from './invisibleCollider';
import { BossFightCollider } from './bossfightcollider';

export class Level4 extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        const background = new Actor({
            x: 5120,
            y: 1280,
            anchor: new Vector(0.5, 0.5),
            scale: new Vector(1, 1)
        });
        background.graphics.use(Resources.Haven.toSprite());
        this.add(background);

        const player = new Player(1000, 80);
        // player.scale = new Vector(7, 7);
        this.add(player);

        this.add(new Wall(5120, 0, 10240, 100));
        this.add(new Floor(0, 2300));
        this.add(new InvisibleCollider(0, 1500, 100, 3000));
        this.add(new InvisibleCollider(8000, 1500, 100, 3000));

        const bossFightCollider = new BossFightCollider(2740, 1900, 100, 300);
        this.add(bossFightCollider);

        this.camera.zoom = 0.6;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 10240, 2560)); // Set the game bounds
    }
}
