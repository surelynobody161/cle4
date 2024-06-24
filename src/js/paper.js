import * as ex from 'excalibur';

export class Paper extends ex.Actor {
    constructor(x, y) {
        super({
            pos: new ex.Vector(x, y),
            width: 20,
            height: 20,
            color: ex.Color.White
        });
        this.collectionCount = 0;
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => {
            if (event.other instanceof ex.Actor) {
                this.collect(event.other);
            }
        });
    }

    collect(player) {
        if (this.collectionCount < 3) {
            this.collectionCount++;
            console.log(`Paper collected ${this.collectionCount} time(s)`);

            if (this.collectionCount === 3) {
                this.kill();
            }
        }
    }
}
