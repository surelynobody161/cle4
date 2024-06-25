import { ImageSource, Loader, Sound } from 'excalibur';

const Resources = {
    Intro: new ImageSource('images/introScene.png'),
    Outro: new ImageSource('images/outroScene.png'),

    Appartment: new ImageSource('images/appartment.png'),
    Line: new ImageSource('images/line.png'),

    Seagull: new ImageSource('images/gull.png'),
    SeagullIdle: new ImageSource('images/seagullIdle (1).png'),
    LeftWing: new ImageSource('images/seagullFlap1.png'),
    RightWing: new ImageSource('images/seagullFlap2.png'),
    BothWings: new ImageSource('images/seagullFlapBoth.png'),
    Footballfield: new ImageSource('images/level1.png'),
    Haven: new ImageSource('images/level4.png'),

    Cafe: new ImageSource('images/level2.png'),
    Tv: new ImageSource('images/tv.png'),


    Turbinehal: new ImageSource('images/level3scene1.png'),
    Elevator: new ImageSource('images/level3scene2.png'),


    HavenBlank: new ImageSource('images/level4blank.png'),
    Floor: new ImageSource('images/rock floor 2.png'),
    LobbyBackground: new ImageSource('images/schiecentralebeter.png'),
    Fries: new ImageSource('images/powerup.png'),
    Ball: new ImageSource('images/ball.png'),
    Kid: new ImageSource('images/Kid1Stand.png'),
    KidBall: new ImageSource('images/Kid1.png'),

    Poop: new ImageSource('images/poop.png'),
    Gull: new ImageSource('images/gull.png'),
    Killer: new ImageSource('images/eliza-sheet.png'),
    Knife: new ImageSource('images/knife.png'),

    Gaurd: new ImageSource('images/Gaurd.png'),
    GaurdWP: new ImageSource('images/GaurdWP.png'),

    bgm1: new Sound('sounds/bill-evans.mp3'),
    TECHNO: new Sound('sounds/DO YOU WANT MORE_.mp3')


}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res);
}

// Add error handling for resource loading
ResourceLoader.on('error', (e) => {
    console.error('Error loading resource:', e);
});

export { Resources, ResourceLoader };
