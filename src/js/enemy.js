import { Actor, Vector, SpriteSheet, Animation, range } from "excalibur";
import { Resources } from './resources.js';
import { Player } from './player.js';

export class Enemy extends Actor {
    constructor(x,y) {
        super({ x, y, width: Resources.Enemy.width - 20, height: Resources.Enemy.height- 20});
        
    }

    onInitialize(engine) {
        this.enemySpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyAnim,
            grid: {
                rows: 1,
                columns: 4, 
                spriteWidth: 32,
                spriteHeight: 32 
            }
        })

        const enemyMoveAnimation = Animation.fromSpriteSheet(this.enemySpriteSheet, range(1, 3), 150)

        this.graphics.add("move", enemyMoveAnimation);

        this.graphics.use("move");
        
        this.scale = new Vector(1.2, 1.2);
        this.vel = new Vector(-50, 0)
        this.graphics.flipHorizontal = true
    }
}
