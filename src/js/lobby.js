import { Actor, Scene, Vector, Sprite, Color } from 'excalibur';
import { Resources } from './resources';

const triggerPositions = [
    { x: 100, y: 100, width: 200, height: 200, sceneKey: 'level1' },
    { x: 500, y: 300, width: 150, height: 150, sceneKey: 'level2' },
    { x: 800, y: 500, width: 180, height: 180, sceneKey: 'level3' },
    { x: 300, y: 600, width: 220, height: 220, sceneKey: 'level4' },
];

export class Lobby extends Scene {
    constructor(engine) {
        super();
        this.engine = engine;
    }

    onInitialize(engine) {
        const lobbyTexture = Resources.LobbyBackground;

        const lobbySprite = new Sprite({
            image: lobbyTexture,
            destSize: {
                width: engine.drawWidth,
                height: engine.drawHeight,
            }
        });

        const lobbyBackground = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            anchor: new Vector(0.5, 0.5)
        });

        lobbyBackground.graphics.use(lobbySprite);
        this.add(lobbyBackground);

        triggerPositions.forEach((triggerPos) => {
            const trigger = new Actor({
                pos: new Vector(triggerPos.x, triggerPos.y),
                width: triggerPos.width,
                height: triggerPos.height,
                color: Color.fromRGB(1, 0, 0, 0.5)
            });

            this.add(trigger);

            trigger.on('pointerup', () => {
                console.log(`Clicked on ${triggerPos.sceneKey}`);
                if (triggerPos.sceneKey === 'level1') {
                    this.engine.showlevel1();
                } else {
                    this.engine.goToScene(triggerPos.sceneKey);
                }
            });
        });
    }

    onActivate() {
        console.log("Lobby scene is now active");
    }

    onDeactivate() {
        console.log("Lobby scene is now inactive");
    }
}
