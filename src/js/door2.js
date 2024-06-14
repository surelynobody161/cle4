import { Actor, Vector, CollisionType, Label, Font, Color } from "excalibur";
import { Resources } from './resources.js';

export class Door2 extends Actor {
    constructor(x, y) {
        super({ x, y, width: Resources.Door2.width, height: Resources.Door2.height });
        this.name = `door2`;
        this.scale = new Vector(0.2, 0.3)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Door2.toSprite());
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