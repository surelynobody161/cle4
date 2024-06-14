import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy, Buttons } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js';

const options = {
    displayMode: DisplayMode.Fill,
    physics: {
        solver: SolverStrategy.Realistic,
        gravity: new Vector(0, 0),
    }
};
export class Game extends Engine {

    mygamepad

    constructor() {
        super(options)
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected")
            this.mygamepad = connectevent.gamepad
        })
    }

    onInitialize(engine) {
        const player = new Player(500, 450)
        this.add(player);

        engine.input.gamepads.setMinimumGamepadConfiguration({
            axis: 4,
            buttons: 6,
        });
        engine.input.gamepads.enabled = true;

        engine.input.gamepads.on('connect', (connectEvent) => {
            console.log('controllers connected')
            this.gamepadConnected = true;
        });

        setTimeout(() => {
            if (!this.gamepadConnected) {
                console.log('no controllers connected!')

            }
        }, 2000);
    }

}

new Game()
