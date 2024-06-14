import { Scene, Keys } from "excalibur";
import { FinishBanner } from "./finishBanner.js";

export class Finish extends Scene {
    onInitialize() {
        this.add(new FinishBanner(750, 400))
    }

    onActivate() {
        console.log("FINISH")
        this.on('preupdate', (event) => {
            if (event.engine.input.keyboard.wasPressed(Keys.R)) {
                event.engine.goToScene('intro')
            }
        });
    }
}
