import { ImageSource, Sound, Resource, Loader} from 'excalibur'


const Resources = {
    Background: new ImageSource('images/background1.png'),

    Enemy: new ImageSource('images/SimpleEnemies Bat_Idle_0.png'),
    EnemyAnim: new ImageSource('images/SimpleEnemies Bat_Idle Spritesheet.png'),

    Player: new ImageSource('images/Kid2.png'),
    PlayerIdle: new ImageSource('images/Kid2.png'),
    PlayerRun: new ImageSource('images/Kid2.png'),
    PlayerJump: new ImageSource('images/Kid2.png'),

    Flashlight: new ImageSource('images/flashlight.png'),
    Flashlight2: new ImageSource('images/flashlight.png'),
    Coin: new ImageSource("images/skull-coin.png"),
    Powerup: new ImageSource("images/powerup.png"),
    
    IntroBanner: new ImageSource("images/introbanner (1).png"),
    GameOverBanner: new ImageSource("images/gameoverbanner (1).png"),
    FinishBanner: new ImageSource("images/finishbanner.png"),
    
    BlackRocks: new ImageSource("images/black rocks.png"),
    Door: new ImageSource('images/cave door.png'),
    Door2: new ImageSource('images/cave door.png'),

    DoubleRockPlatform: new ImageSource("images/doublesided rock platform.png"),
    RockFloor: new ImageSource("images/rockplatform.png"),
    RockFloor2: new ImageSource("images/rockplatform2.png"),
    RockRoof: new ImageSource("images/rock roof.png"),
    RockRoof2: new ImageSource("images/rock roof 2.png"),
    RockPlatformLeft: new ImageSource("images/rock platform left.png"),
    RockPlatformRight: new ImageSource("images/rock platform right.png"),

    WoodenPlatform: new ImageSource("images/wooden platform.png"),
    WoodenScaffolding: new ImageSource("images/wooden scaffolding.png"),

    CaveMusic: new Sound("images/cave music.mp3"),
    CoinSound: new Sound("images/coin-sound.wav"),
}


const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}


export { Resources, ResourceLoader }