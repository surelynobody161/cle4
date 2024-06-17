import '../css/style.css';
import { Engine, Vector, DisplayMode, SolverStrategy } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Player } from './player.js';
import { Floor } from './floor.js';


const options = {
    displayMode: DisplayMode.Fill,
    physics: {
        solver: SolverStrategy.Realistic,
        gravity: new Vector(0, 900),
    }
};

export class Level1 extends Engine {
    mygamepad = null;

    constructor() {
        super(options);
        this.showDebug(true)
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {

        this.input.gamepads.enabled = true;
        this.input.gamepads.on('connect', (connectEvent) => {
            console.log("Gamepad detected:", connectEvent.gamepad.name);
            this.mygamepad = connectEvent.gamepad;
            // Optionally, reset any game state related to the previous controller
        });

        this.input.gamepads.on('disconnect', (disconnectEvent) => {
            console.log("Gamepad disconnected:", disconnectEvent.gamepad.name);
            this.mygamepad = null;
            // Optionally, reset any game state related to the disconnected controller
        });
    }

    onInitialize(engine) {
        const player = new Player(400, 350);
        this.add(player);

        // const floor = new Floor(500, 650);
        this.add(new Floor(500, 650));
        this.add(new Floor(900, 350));



    }
}