import { TiledResource } from '@excaliburjs/plugin-tiled'
import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Seagull: new ImageSource('images/gull.png'),
    SeagullIdle: new ImageSource('images/seagullIdle (1).png'),
    LeftWing: new ImageSource('images/seagullFlap1.png'),
    BothWings: new ImageSource('images/seagullFlapBoth.png'),

    Footballfield: new TiledResource('images/football-bg (1).tmx'),
    Haven: new ImageSource('images/level4.png'),

    Cafe: new ImageSource('images/level2.png'),
    Turbinehal: new ImageSource('images/level3scene1.png'),
    Elevator: new ImageSource('images/level3scene2.png'),
    
    
    Floor: new ImageSource('images/rock floor 2.png'),
    LobbyBackground: new ImageSource('images/schiecentralebeter.png'),
    Fries: new ImageSource('images/powerup.png'),
    Ball: new ImageSource('images/ball.png'),
    Kid: new ImageSource('images/Kid1Stand.png'),
    KidBall: new ImageSource('images/Kid1.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }