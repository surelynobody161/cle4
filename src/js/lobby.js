import { Actor, Scene, Vector, Sprite, Color, Circle } from 'excalibur';
import { Resources } from './resources';

const triggerPositions = [
    { x: 139, y: 695, radius: 28, sceneKey: 'cafe' },
    { x: 1237, y: 633, radius: 28, sceneKey: 'haven' },
    { x: 900, y: 780, radius: 28, sceneKey: 'voedbalveld' },
    { x: 543, y: 664, radius: 28, sceneKey: 'appartement' },
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
                radius: triggerPos.radius,
                color: Color.Red
            });

            const circleGraphic = new Circle({
                radius: triggerPos.radius,
                color: Color.Red,
                strokeColor: Color.Transparent,
                lineWidth: 0
            });

            trigger.graphics.use(circleGraphic);

            this.add(trigger);

            trigger.on('pointerup', () => {
                console.log(`Clicked on ${triggerPos.sceneKey}`);
                if (triggerPos.sceneKey === 'cafe') {
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
