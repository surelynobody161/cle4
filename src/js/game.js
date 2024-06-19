import '../css/style.css';
import { Engine, Vector, DisplayMode, SolverStrategy, Scene } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Lobby } from './lobby';
import { Level1 } from './level1';
import { Level2 } from './level2';
import { Level3 } from './level3';
import { Level4 } from './level4';

const options = {
    width: 1440, height: 900,
    // displayMode: DisplayMode.FitScreen,
    physics: {
        solver: SolverStrategy.Realistic,
        gravity: new Vector(0, 900),
    }
}


export class Game extends Engine {
    mygamepad

    constructor() {
        super(options);

        this.showDebug(true);
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {
        const lobby = new Lobby(this);
        this.addScene('lobby', lobby);



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

    showlevel1() {
        const voedbalveld = new Level1();
        this.addScene('voedbalveld', voedbalveld);
        this.goToScene('voedbalveld');

    }
    showlevel2() {
        const cafe = new Level2();
        this.addScene('cafe', cafe);
        this.goToScene('cafe');

    }
    showlevel3() {
        const appartement = new Level3();
        this.addScene('appartement', appartement);
        this.goToScene('appartement');

    }
    showlevel4() {
        const haven = new Level4();
        this.addScene('haven', haven);
        this.goToScene('haven');

    }
}

new Game();
