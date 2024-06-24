import { Actor, Vector, CollisionType, Color, Shape } from "excalibur";

export class Projectile extends Actor {
    constructor(startPos, targetPos) {
        super({
            pos: startPos,
            radius: 5,
            color: Color.Red,
            collisionType: CollisionType.Passive,
            collider: Shape.Circle(5)
        });

        this.targetPos = targetPos;
        this.speed = 300; // Speed of the projectile
    }

    onInitialize(engine) {
        this.vel = this.targetPos.sub(this.pos).normalize().scale(this.speed);
    }
}
