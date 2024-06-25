import { Actor, Resource, Scene, DisplayMode, Keys, Input, Vector, Engine, BoundingBox } from "excalibur";
import { Resources, ResourceLoader } from './resources';
import { Player } from './player';
import { Floor } from './floor';
import { Ball } from './ball';
import { Ramp } from './ramp';
import { Fries } from './fries';
import { Wall } from './wall';
import { Kid } from './kid';
import { InvisibleCollider } from './invisibleCollider';
import { ElevatorActor } from './elevatorActor.js';


export class Elevator extends Scene {
    constructor(game) {
        super({
            displayMode: DisplayMode.FillScreen
        });
        this.game = game;
    }

    onInitialize(engine) {
        console.log('je bent nu in elevator');
        const background = new Actor({
            x: engine.drawWidth / 2,
            y: engine.drawHeight / 2,
            anchor: new Vector(0.5, 0.5)
        });

        const elevatorAnimation = new ElevatorActor(720, 450)
        this.add(elevatorAnimation)

        localStorage.setItem(`inventory`, JSON.stringify([]));



        console.log(engine, engine.mygamepad);

        this.on('preupdate', (event) => {
            if (event.engine.input.keyboard.wasPressed(Keys.Space)) {
                this.game.showAppartement()

            }
        });
    }
}
