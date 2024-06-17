import '../css/style.css';
import { Engine, Vector, DisplayMode, SolverStrategy } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Floor } from './floor.js';


const options = {
    displayMode: DisplayMode.Fill,
    physics: {
        solver: SolverStrategy.Realistic,
        gravity: new Vector(0, 500),
    }
};

export class Game extends Engine {
    mygamepad = null;

    constructor() {
        super(options);
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        this.input.gamepads.enabled = true;
        this.input.gamepads.on('connect', (connectEvent) => {
            console.log("Gamepad detected");
            this.mygamepad = connectEvent.gamepad;
        });
    }

    onInitialize(engine) {
        const player = new Player(400, 350);
        this.add(player);

        const floor = new Floor(500, 650);
        this.add(floor);


        engine.input.gamepads.setMinimumGamepadConfiguration({
            axis: 4,
            buttons: 6,
        });
        engine.input.gamepads.enabled = true;

        engine.input.gamepads.on('connect', (connectEvent) => {
            console.log('Controllers connected');
            this.gamepadConnected = true;
        });

        setTimeout(() => {
            if (!this.gamepadConnected) {
                console.log('No controllers connected!');
            }
        }, 2000);

    }
}

new Game();