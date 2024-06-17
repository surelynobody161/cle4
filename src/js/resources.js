import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Seagull: new ImageSource('images/gull.png'),
    Floor: new ImageSource('images/rock floor 2.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }