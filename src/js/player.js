import { Resources } from './resources';
import { Actor, CollisionType, Vector, Sprite, Axes, Input } from 'excalibur';

export class Player extends Actor {
    constructor(x, y) {
        super({ x, y });
        this.body.collisionType = CollisionType.Active;
        this.graphics.use(Resources.Seagull.toSprite())
        this.body.mass = 10;
        this.scale = new Vector(0.18, 0.18);

    }

    onPreUpdate(engine) {
        if (engine.mygamepad === null) {
            console.log("error ahoele");
            return;
        }
        let xAxis = engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickX);
        let yAxis = engine.input.gamepads.at(0).getAxes(Input.Axes.LeftStickY);
        //this.vel = new Vector(xValue * 100, yValue * 100);
        console.log(xAxis)
    }

}
