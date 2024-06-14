import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
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
    }
}

new Game()
