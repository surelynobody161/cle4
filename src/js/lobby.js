import { Actor, Scene, Vector, Sprite, Color, Circle, Input, Buttons } from 'excalibur';
import { Resources } from './resources';

const triggerPositions = [
    { x: 139*1.5, y: 695*1.5, radius: 28, sceneKey: 'cafe' },
    { x: 1237*1.5, y: 633*1.5, radius: 28, sceneKey: 'haven' },
    { x: 900*1.5, y: 780*1.5, radius: 28, sceneKey: 'voedbalveld' },
    { x: 543*1.5, y: 664*1.5, radius: 28, sceneKey: 'appartement' },
];

const locationsOrder = ['haven', 'voedbalveld', 'appartement', 'cafe'];

export class Lobby extends Scene {
    constructor(engine) {
        super();
        this.engine = engine;
        this.currentLocationIndex = 2;
        this.lastInputTime = 0;
        this.isFace1Pressed = false; // Track if Face1 button is pressed
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
                color: Color.Transparent,
                strokeColor: Color.Chartreuse,
                lineWidth: 10
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
        let yAxis = gamepad.getAxes(Input.Axes.LeftStickY); // Get Y-axis input

        const now = Date.now();
        const cooldown = 400; // Cooldown period in milliseconds

        // Check if Face1 button is pressed and cooldown time has passed and button is not already pressed
        if (gamepad.isButtonPressed(Input.Buttons.Face1) && now > this.lastInputTime + cooldown && !this.isFace1Pressed) {
            // Perform action based on current location index
            const currentLocation = triggerPositions[this.currentLocationIndex];
            console.log(`Pressed Face1 at location ${currentLocation.sceneKey}`);

            if (currentLocation.sceneKey === 'haven') {
                this.engine.showlevel1();
            } else {
                this.engine.goToScene(currentLocation.sceneKey);
            }
            if (currentLocation.sceneKey === 'appartement') {
                this.engine.showlevel2();
            } else {
                this.engine.goToScene(currentLocation.sceneKey);
            }
            if (currentLocation.sceneKey === 'voedbalveld') {
                this.engine.showlevel3();
            } else {
                this.engine.goToScene(currentLocation.sceneKey);
            }
            if (currentLocation.sceneKey === 'cafe') {
                this.engine.showlevel4();
            } else {
                this.engine.goToScene(currentLocation.sceneKey);
            }

            this.lastInputTime = now;
            this.isFace1Pressed = true; // Set button pressed state
        }

        // Reset button states when buttons are released
        if (!gamepad.isButtonPressed(Input.Buttons.Face1)) {
            this.isFace1Pressed = false;
        }

        // Handle left stick movement to update current location index
        if (now > this.lastInputTime + cooldown) {
            if (xAxis < -0.5) { // Left stick left movement
                this.currentLocationIndex = Math.min(this.currentLocationIndex + 1, locationsOrder.length - 1);
                this.lastInputTime = now;
            } else if (xAxis > 0.5) { // Left stick right movement
                this.currentLocationIndex = Math.max(this.currentLocationIndex - 1, 0);
                this.lastInputTime = now;
            }

            // Update gull position based on new location index
            const newLocation = triggerPositions.find(pos => pos.sceneKey === locationsOrder[this.currentLocationIndex]);
            if (newLocation) {
                this.gull.pos = new Vector(newLocation.x, newLocation.y);
                console.log(`Gull moved to ${newLocation.sceneKey}`);
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
