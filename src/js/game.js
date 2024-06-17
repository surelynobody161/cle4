import '../css/style.css';
import { Engine, Vector, DisplayMode, SolverStrategy, Scene } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Lobby } from './lobby';
import { Level1 } from './level1';
import { Level2 } from './level2';
import { Level3 } from './level3';
import { Level4 } from './level4';

export class Game extends Engine {
    mygamepad

    constructor() {
        super();
        this.showDebug(true);
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        const lobby = new Lobby(this);
        this.addScene('lobby', lobby);
        const level1 = new Level1();
        this.addScene('level1', level1);


        this.input.gamepads.enabled = true;
        this.input.gamepads.on('connect', (connectEvent) => {
            console.log("Gamepad detected");
            this.mygamepad = connectEvent.gamepad;
        });
        this.showlobby();
    }

    showlobby() {
        this.goToScene('lobby');
    }

    // showlevel1() {
    //     this.goToScene('level1');
    // }
}

new Game();
