import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from './resources.js';

export class Flashlight2 extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Flashlight2.width, height: Resources.Flashlight2.height });
        this.scale = new Vector(0.1, 0.1);
        this.name = `flashlight2`;
    }

    onInitialize() {
        this.graphics.use(Resources.Flashlight2.toSprite());
        this.body.collisionType = CollisionType.Passive;
    }
}