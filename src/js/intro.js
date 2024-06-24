import { Resource, Scene, DisplayMode, Keys, Input, Vector, Engine } from "excalibur"
import { Resources, ResourceLoader } from "./resources"

export class Intro extends Scene {
    constructor(game) {
        super({
            displayMode: DisplayMode.FillScreen
        })
        this.game = game
    }

    onInitialize(engine) {
        this.game.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.Space) {
                console.log('pressed space')
                this.game.showlobby();
            }
        });
    }
}

// --- put in game.js-- -
//     startGame() {
//     const intro = new Intro();
//     this.addScene('begin', intro);
//     this.goToScene('begin');
// }

// showLobby{
//     const lobby = new Lobby(this);
//     this.addScene('lobby', lobby);
//     this.goToScene('lobby')
//     this.input.gamepads.enabled = true;
//     this.input.gamepads.on('connect', (connectEvent) => {
//         console.log("Gamepad detected");
//         this.mygamepad = connectEvent.gamepad;
//     });
// }
