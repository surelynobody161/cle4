import { ScreenElement, Actor, Color, Vector } from "excalibur";

export class UI extends ScreenElement {
    constructor() {
        super();
        this.healthbar = null;
    }

    onInitialize(engine) {
        let barbackground = new Actor({
            pos: new Vector(10, 10), // position the bar at the top-left corner
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 200,
            height: 20,
            anchor: Vector.Zero
        });
        this.addChild(barbackground);

        this.healthbar = new Actor({
            pos: new Vector(10, 10),
            color: Color.Green,
            width: 200,
            height: 20,
            anchor: Vector.Zero
        });
        this.addChild(this.healthbar);
    }

    updateHealth(percentage) {
        this.healthbar.scale = new Vector(percentage, 1);
    }
}

export class UITWO extends ScreenElement {
    constructor() {
        super();
        this.healthbar = null;
    }

    onInitialize(engine) {
        let barbackground = new Actor({
            pos: new Vector(590, 10), // position the bar at the top-left corner
            color: Color.fromRGB(255, 255, 255, 0.4),
            width: 200,
            height: 20,
            anchor: Vector.Zero
        });
        this.addChild(barbackground);

        this.healthbar = new Actor({
            pos: new Vector(590, 10),
            color: Color.Red,
            width: 200,
            height: 20,
            anchor: Vector.Zero
        });
        this.addChild(this.healthbar);
    }

    updateHealth(percentage) {
        this.healthbar.scale = new Vector(percentage, 1);
    }
}
