export class Player extends Actor {

    onPreUpdate(engine) {
        if (engine.mygamepad === null) {
            console.log("er is geen gamepad")
            return
        }

        // bewegen
        const xValue = engine.mygamepad.getAxes(Axes.LeftStickX)
        const yValue = engine.myamepad.getAxes(Axes.LeftStickY)
        this.vel = new Vector(xValue * 100, yValue * 100)

        // schieten / springen
        if (engine.mygamepad.isButtonPressed(Buttons.Face1)) {
            console.log("jump!")
        }
    }
}