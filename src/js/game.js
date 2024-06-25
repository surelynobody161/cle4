import { Engine, Vector, DisplayMode, SolverStrategy } from 'excalibur';
import { Resources, ResourceLoader } from './resources';
import { Lobby } from './lobby';
import { Intro } from './intro';
import { Level1 } from './level1';
import { Level2 } from './level2';
import { Level3 } from './level3';
import { Level4 } from './level4';
import { Elevator } from './elevator';
import { Level4Boss } from './level4boss';
import { BossFightScene } from './bossfightscene';

const options = {
    width: 1440,
    height: 900,
    physics: {
        solver: SolverStrategy.Realistic,
        gravity: new Vector(0, 1800),
    },
};

export class Game extends Engine {
    mygamepad;

    constructor() {
        super(options);
        this.showDebug(true);
        this.start(ResourceLoader).then(() => this.startGame());
    }

    startGame() {

        const lobby = new Lobby(this);
        this.addScene('lobby', lobby);

        // Register other scenes
        this.addScene('bossfight', new BossFightScene());
        this.addScene('level4boss', new Level4Boss());
        this.addScene('elevator', new Elevator(this));

        this.input.gamepads.enabled = true;
        this.input.gamepads.on('connect', (connectEvent) => {
            console.log('Gamepad detected');
            this.mygamepad = connectEvent.gamepad;
        });


        const intro = new Intro(this);
        this.addScene('begin', intro);
        this.goToScene('begin');

    }

    showLobby() {
        const lobby = new Lobby(this);
        this.addScene('lobby', lobby);
        this.goToScene('lobby')
        this.input.gamepads.enabled = true;
        this.input.gamepads.on('connect', (connectEvent) => {
            console.log("Gamepad detected");
            this.mygamepad = connectEvent.gamepad;
        });
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

    showElevator() {
        const elevator = new Elevator(this);
        this.addScene('elevator', elevator);
        this.goToScene('elevator');
    }

    showBossFight() {
        const bossfight = new Level4Boss();
        this.addScene('bossfight', bossfight);
        this.goToScene('bossfight');
    }
}

new Game();
