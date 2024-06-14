// ui.js
import { ScreenElement } from "excalibur";
import { TimerLabel } from "./timerLabel.js";

export class UI extends ScreenElement {
    onInitialize(engine) {
        this.timerLabel = new TimerLabel();
        this.addChild(this.timerLabel);

        this.timeRemaining = 120;
        // this.updateTimer();
    }

    // updateTimer() {
    //     this.engine.clock.schedule(() => {
    //         if (this.timeRemaining < 0) {
    //             this.timeRemaining--;
    //             this.timerLabel.updateTime(this.timeRemaining);
    //             this.updateTimer();
    //         } else {
    //             this.handleTimeUp();
    //         }
    //     }, 1000);
    // }

    // handleTimeUp() {
    //     if (this.engine && this.engine.goToScene) {
    //         this.engine.goToScene('gameover');
    //     }
    // }
}
