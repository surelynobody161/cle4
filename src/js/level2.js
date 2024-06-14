import { Scene, BoundingBox } from "excalibur";
import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Door } from "./door.js";
import { Door2 } from "./door2.js";
import { Flashlight } from "./flashlight.js";
import { Flashlight2 } from "./flashlight2.js";
import { Coin } from "./coin.js";
import { Background } from "./background.js";
import { UI } from "./ui.js";
import { RockFloor } from "./rockfloor.js";
import { RockFloor2 } from "./rockfloor2.js";
import { RockRoof } from "./rockroof.js";
import { RockRoof2 } from "./rockroof2.js";
import { BlackRocks } from "./blackrocks.js";
import { WoodenScaffolding } from "./scaffolding.js";
import { WoodenPlatform } from "./woodenplatform.js";

export class Level2 extends Scene {
    onInitialize(evt) {

        console.log("LEVEL 2")
        localStorage.setItem(`inventory`, JSON.stringify([]));
        this.add(new Background(1000, 520));
        this.add(new Background(2920, 520));

        this.ui = new UI();
        this.add(this.ui);

        const player = new Player();
        this.add(player);

        this.add(new Enemy(700, 830));
        this.add(new Enemy(800, 730));
        this.add(new Enemy(1300, 530));
        this.add(new Door2(1600, 850));
        this.add(new Flashlight2(1600, 400));
        this.add(new Coin(550, 740));
        //width, height
        //hoger nummer is lager
        //lager nummer is hoger
        this.add(new RockFloor(90, 1000));
        this.add(new RockFloor2(400, 1020));
        this.add(new RockFloor(700, 1050));
        this.add(new RockFloor(1000, 1050));
        this.add(new RockFloor2(1250, 980));
        this.add(new RockFloor(1550, 1000));
        this.add(new RockFloor(1850, 950));
        this.add(new RockFloor(2150, 900));

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


        this.add(new WoodenScaffolding(400, 950));
        this.add(new WoodenScaffolding(600, 900));
        this.add(new WoodenScaffolding(750, 850));
        this.add(new WoodenScaffolding(900, 650));
        this.add(new WoodenScaffolding(900, 850));

        this.add(new WoodenPlatform(360, 850));
        this.add(new WoodenPlatform(553, 800));
        this.add(new WoodenPlatform(700, 740));
        this.add(new WoodenPlatform(880, 690));
        this.add(new WoodenPlatform(920, 630));
        this.add(new WoodenPlatform(880, 570));

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
