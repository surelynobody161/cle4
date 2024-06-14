import { Scene, BoundingBox } from "excalibur";
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Door } from "./door.js";
import { Flashlight } from "./flashlight.js";
import { Coin } from "./coin.js";
import { Powerup } from "./powerup.js";
import { Background } from "./background.js";
import { UI } from "./ui.js";
import { RockFloor } from "./rockfloor.js";
import {RockFloor2}  from "./rockfloor2.js";
import { RockRoof } from "./rockroof.js";
import { RockRoof2 } from "./rockroof2.js";
import { BlackRocks } from "./blackrocks.js";
import { WoodenScaffolding } from "./scaffolding.js";
import { WoodenPlatform } from "./woodenplatform.js";

export class Level extends Scene {
    onInitialize(engine) {

        console.log("LEVEL 1")
        localStorage.setItem(`inventory`, JSON.stringify([]));
        this.add(new Background(1000, 520));
        this.add(new Background(2920, 520));

        this.ui = new UI();
        this.add(this.ui);

        const player = new Player(150, 950);
        this.add(player);

        this.add(new Enemy(500, 810));
        this.add(new Enemy(1900, 850));
        this.add(new Enemy(2500, 500));
        this.add(new Door(1600, 850));
        this.add(new Flashlight(1600, 400));
        this.add(new Coin(90, 365));
        this.add(new Powerup(1960, 830));
        //width, height
        //hoger nummer is lager
        //lager nummer is hoger
        this.add(new RockFloor(90, 1000));
        this.add(new RockFloor2(400, 900));
        this.add(new RockFloor(700, 1000));
        this.add(new RockFloor(1000, 1040));
        this.add(new RockFloor2(1250, 980));
        this.add(new RockFloor(1550, 1000));
        this.add(new RockFloor(1850, 950));
        this.add(new RockFloor(2150, 900));
        
        
        
        
        this.add(new RockRoof2(180, 700));
        this.add(new RockRoof(450, 650));
        this.add(new RockRoof2(700, 680));
        this.add(new RockRoof(1100, 680));
        this.add(new RockRoof2(1370, 710));
        this.add(new RockRoof2(1640, 610));
        this.add(new RockRoof(1920, 580));
        
        this.add(new RockRoof(150, 250));
        this.add(new RockRoof2(430, 230));
        this.add(new RockRoof(710, 300));
        this.add(new RockRoof(970, 280));
        this.add(new RockRoof2(1230, 320));
        this.add(new RockRoof(1430, 220));
        this.add(new RockRoof2(1680, 240));
        
        
        this.add(new WoodenScaffolding(910, 850));
        this.add(new WoodenScaffolding(910, 650));
        
        this.add(new WoodenPlatform(920, 850));
        this.add(new WoodenPlatform(870, 790));
        this.add(new WoodenPlatform(920, 730));
        this.add(new WoodenPlatform(880, 630));
        this.add(new WoodenPlatform(1600, 420));
        
        this.add(new RockFloor(150, 500));
        this.add(new RockFloor2(450, 565));
        this.add(new RockFloor(670, 580));
        this.add(new RockFloor(1130, 600));
        this.add(new RockFloor2(1370, 580));
        this.add(new RockFloor(1670, 580));
        this.add(new RockFloor(1830, 420));
        this.add(new RockFloor(1990, 700));
        
        this.add(new BlackRocks(-40, -10));
        

        this.camera.zoom = 3;
        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(0, 0, 3000, 1000));

       
    }

    


    clearActors() {
        this.actors.forEach(actor => {
            actor.kill();
        });
    }

    onActivate(ctx) {
        this.clearActors();
        this.onInitialize(this.engine);
    }
}
