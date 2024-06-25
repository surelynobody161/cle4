import { Actor, Resource, Scene, DisplayMode, Keys, Input, Vector, Engine } from "excalibur"
import { Resources, ResourceLoader } from "./resources"


export class Outro extends Scene {
    constructor(game) {
        super({
            displayMode: DisplayMode.FillScreen
        })
        this.game = game
    }

    onInitialize(engine) {






        const background = new Actor({
            x: engine.drawWidth / 2, // Center the actor horizontally
            y: engine.drawHeight / 2, // Center the actor vertically
            anchor: new Vector(0.5, 0.5),
            scale: new Vector(0.65, 0.65) // Adjust scale as needed
        });

        background.graphics.use(Resources.Outro.toSprite());
        this.add(background);






        

        this.on('preupdate', (event) => {
            if (event.engine.input.keyboard.wasPressed(Keys.Space)) {
                this.game.showlevel1()

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
