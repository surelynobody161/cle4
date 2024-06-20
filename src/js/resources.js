import { TiledResource } from '@excaliburjs/plugin-tiled'
import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Seagull: new ImageSource('images/gull.png'),
    Floor: new ImageSource('images/rock floor 2.png'),
    LobbyBackground: new ImageSource('images/schiecentralebeter.png'),
    TestBackground: new ImageSource('images/testing.jpg'),
    Footballfield: new TiledResource('images/football-bg (1).tmx'),
    Haven: new TiledResource('images/haven (1).tmx'),
    Fries: new ImageSource('images/powerup.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }