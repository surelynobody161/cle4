import { Scene, Keys } from "excalibur";
import { Resources } from "./resources.js";
import { IntroBanner } from "./introBanner.js";


export class IntroScene extends Scene {

    onInitialize(engine) {
        this.add(new IntroBanner(750, 400))
        const backgroundMusic = Resources.CaveMusic;
        backgroundMusic.loop = true;
        backgroundMusic.play();
    }

    onActivate(context) {
        this.on('preupdate', (event) => {
            if (event.engine.input.keyboard.wasPressed(Keys.S)) {
                event.engine.goToScene('level')
            }
        });
    }
}