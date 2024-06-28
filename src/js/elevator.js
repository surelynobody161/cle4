import { Actor, Scene, DisplayMode, Keys, Vector } from "excalibur";
import { Resources, ResourceLoader } from './resources';

import { ElevatorActor } from './elevatorActor.js';
import { Appartment } from './appartment';
import { House } from './house';


export class Elevator extends Scene {
    constructor(game) {
        super({
            displayMode: DisplayMode.FillScreen
        });
    }

    onInitialize(engine) {
        console.log('You are now in the elevator');

        // const background = new Actor({
        //     x: engine.drawWidth / 2,
        //     y: engine.drawHeight / 2,
        //     anchor: new Vector(0.5, 0.5)
        // });

        const elevatorAnimation = new ElevatorActor(720, 450);
        this.add(elevatorAnimation);

        localStorage.setItem('inventory', JSON.stringify([]));


        this.on('postupdate', (event) => {
            if (event.engine.input.keyboard.wasPressed(Keys.Space)) {
                engine.goToScene('house');
            }
        });
    }
}
