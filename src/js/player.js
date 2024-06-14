export class Player extends Actor {
    constructor() {
        super();
        this.body.collisionType = CollisionType.Active;
        this.body.mass = 10;
        this.vel = new Vector(0, 0);
        this.scale = new Vector(0.18, 0.18);
    }



    onPreUpdate(engine) {
        if (engine.mygamepad === null) {
            console.log("error geen gamepad")
            return
        }
        const xValue = engine.mygamepad.getAxes(Axes.LeftStickX)
        const yValue = engine.myamepad.getAxes(Axes.LeftStickY)
        this.vel = new Vector(xValue * 100, yValue * 100)

        if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
            console.log("jump!")
        }
    }
}