import { Actor, Engine, Scene, Vector, Sprite } from 'excalibur';
import { Resources } from './resources';
import '../css/style.css';
import { Player } from './player.js';
import { ResourceLoader } from './resources.js';
import { DisplayMode, SolverStrategy } from 'excalibur';

export class Lobby extends Scene {
    constructor() {
        super();
    }

    onInitialize(engine) {
        const lobbyTexture = Resources.LobbyBackground;

        lobbyTexture.load().then(() => {
            const lobbySprite = new Sprite({
                image: lobbyTexture,
                destSize: {
                    width: 1440,
                    height: 900,
                }
            });

            const lobbyBackground = new Actor({
                pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
                anchor: new Vector(0.5, 0.5)
            });

            lobbyBackground.graphics.use(lobbySprite);
            this.add(lobbyBackground);
        });
    }

    onActivate() {
        console.log("Lobby scene is now active");
    }

    onDeactivate() {
        console.log("Lobby scene is now inactive");
    }
}

const options = {
    displayMode: DisplayMode.Fill,
};

const game = new Engine(options);

const lobby = new Lobby();
game.add('lobby', lobby);

// Define the game class
export class Game extends Engine {
    mygamepad = null;

    constructor() {
        super(options);
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
        const player = new Player(500, 450);
        this.add(player);

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
        this.goToScene('lobby');
    }
}
new Game();
