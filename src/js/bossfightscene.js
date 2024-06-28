import { Scene, SpriteSheet, Actor, Vector } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Gull } from './bossfightgull';
import { Killer } from './bossfightgypsy';
import { Player } from './player';

export class BossFightScene extends Scene {
    constructor() {
        super();

    }

    onInitialize(engine) {
        const background = new Actor({
            x: 512,
            y: 300,
            anchor: new Vector(0.5, 0.5),
            scale: new Vector(0.5, 0.5)
        });

        background.graphics.use(Resources.HavenBlank.toSprite());
        this.add(background);

        console.log('BossFightScene Initialized');
        // Add initialization logic here, like loading resources, setting up actors, etc.
        const gull = new Gull();
        gull.scale = new Vector(0.1, 0.1);
        this.add(gull);

        const killer = new Killer(this);
        this.add(killer);
    }

    onActivate(context) {
        console.log('BossFightScene Activated');
        // Add activation logic here, like starting animations, playing music, etc.
    }
}
