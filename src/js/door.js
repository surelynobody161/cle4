import { Actor, Vector, CollisionType, Label, Font, Color, Keys } from "excalibur";
import { Resources } from './resources.js';
import { Player } from "./player.js";

export class Door extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Door.width, height: Resources.Door.height });
        this.name = `door`;
        this.scale = new Vector(0.4, 0.3)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Door.toSprite());
        this.body.collisionType = CollisionType.Passive;
        this.messageLabel = new Label({
            text: '',
            pos: new Vector(this.pos.x - 100, this.pos.y - 30),
            font: new Font({
                family: 'Impact',
                size: 24,
                color: Color.Yellow
            })
        });

        engine.add(this.messageLabel);
    }


    displayMessage(message) {
        this.messageLabel.text = message;
        this.messageLabel.pos = new Vector(this.pos.x - 200, this.pos.y - 100);
        setTimeout(() => this.messageLabel.text = '', 2000);
    }
}