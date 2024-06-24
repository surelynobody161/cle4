import { Engine, Scene, Color, DisplayMode } from "excalibur";
import { Resources, ResourceLoader } from './resources.js';
import { Gull } from "./bossfightgull.js";
import { Killer } from "./bossfightgypsy.js";
import { BossFightCollider } from "./bossfightcollider.js";
import { BossFightScene } from "./bossfightscene.js";

export class Level4Boss extends Scene {
    constructor() {
        super({
            width: 1440,
            height: 900,
            // backgroundColor: Color.fromHex("#87CEEB")
        });

        this.on('initialize', () => this.startGame()); // Listen for 'initialize' event to start the game
    }

    onInitialize(engine) {

        // Add initialization logic here, like loading resources, setting up actors, etc.
        console.log('Level 4 Boss Scene Initialized');

        // Example: Add a boss entity to the scene
        const boss = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: 100,
            height: 100,
            color: Color.Red,
        });

        this.add(boss);
    }

    onActivate(context) {
        console.log('Level 4 Boss Scene Activated');
    }

    onDeactivate() {
        console.log('Level 4 Boss Scene Deactivated');
    }

    startGame() {


    }
}
