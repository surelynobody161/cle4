import { Actor, Scene, Vector, Sprite, Color, Circle, Input } from 'excalibur';
import { Resources } from './resources';

const triggerPositions = [
    { x: 139, y: 695, radius: 28, sceneKey: 'cafe' },
    { x: 1237, y: 633, radius: 28, sceneKey: 'haven' },
    { x: 900, y: 780, radius: 28, sceneKey: 'voedbalveld' },
    { x: 543, y: 664, radius: 28, sceneKey: 'appartement' },
];

const locationsOrder = ['haven', 'voedbalveld', 'appartement', 'cafe'];

export class Lobby extends Scene {
    constructor(engine) {
        super();
        this.engine = engine;
        this.currentLocationIndex = 1; // Start at 'haven'
        this.lastInputTime = 0;
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

        // Add the gull character
        this.gull = new Actor({
            pos: new Vector(triggerPositions[this.currentLocationIndex].x, triggerPositions[this.currentLocationIndex].y),
            anchor: new Vector(0.5, 0.5)
        });

        const gullSprite = new Sprite({
            image: Resources.Seagull, // Assuming gull image is added to Resources
            destSize: {
                width: 50, // Adjust as needed
                height: 50  // Adjust as needed
            }
        });

        this.gull.graphics.use(gullSprite);
        this.add(this.gull);
    }

    onPreUpdate(engine) {
        if (!engine.mygamepad) {
            console.log("No gamepad connected");
            return;
        }

        let gamepad = engine.mygamepad;
        let xAxis = gamepad.getAxes(Input.Axes.LeftStickX);

        const now = Date.now();
        const cooldown = 400; // Cooldown period in milliseconds

        if (now > this.lastInputTime + cooldown) {
            if (xAxis < -0.5) { // Left stick movement
                this.currentLocationIndex = Math.min(this.currentLocationIndex + 1, locationsOrder.length - 1);
                this.lastInputTime = now;
            } else if (xAxis > 0.5) { // Right stick movement
                this.currentLocationIndex = Math.max(this.currentLocationIndex - 1, 0);
                this.lastInputTime = now;
            }

            const newLocation = triggerPositions.find(pos => pos.sceneKey === locationsOrder[this.currentLocationIndex]);
            if (newLocation) {
                this.gull.pos = new Vector(newLocation.x, newLocation.y);
            }
        }
    }

    onActivate() {
        console.log("Lobby scene is now active");
    }

    onDeactivate() {
        console.log("Lobby scene is now inactive");
    }
}
