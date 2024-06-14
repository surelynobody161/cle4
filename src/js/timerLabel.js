
import { Label, Font, FontUnit, Vector, Color } from "excalibur";

export class TimerLabel extends Label {
    constructor() {
        super({
            text: 'Time: 60',
            font: new Font({
                family: 'impact',
                size: 24,
                unit: FontUnit.Px
            }),
            pos: new Vector(10, 10),
            color: Color.White
        });
        this.remainingTime = 120;
    }

    updateTime(seconds) {
        this.remainingTime = seconds;
        this.text = `Time: ${this.remainingTime}`;
    }
}
