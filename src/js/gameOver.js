import { Scene, Actor, Vector, Input, Keys } from "excalibur";
import { GameOverBanner } from "./gameOverBanner.js";

export class GameOver extends Scene {
    onInitialize() {
        this.add(new GameOverBanner(750, 400))
    }

    onActivate() {
        console.log("GAME OVER")
        this.on('preupdate', (event) => {
            if (event.engine.input.keyboard.wasPressed(Keys.R)) {
                event.engine.goToScene('level')
            }
        });
    }
}
