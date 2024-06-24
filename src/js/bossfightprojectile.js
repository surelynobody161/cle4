import { Actor, Vector, CollisionType, Color, Shape } from "excalibur";
import { Resources } from "./resources.js";

export class Projectile extends Actor {
    constructor(startPos, targetPos) {
        super({
            pos: startPos,
            radius: 5,
            scale: new Vector(5, 5),
            collisionType: CollisionType.Passive,
            collider: Shape.Circle(5),
            image: Resources.Knife,
        });

        this.targetPos = targetPos;
        this.speed = 300; // Speed of the projectile
    }

    onInitialize(engine) {
        this.vel = this.targetPos.sub(this.pos).normalize().scale(this.speed);
    }
}
