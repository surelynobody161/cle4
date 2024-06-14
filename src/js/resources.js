import { ImageSource, Loader } from 'excalibur';

const Resources = {
    Seagull: new ImageSource('images/gull.png')
};

const ResourceLoader = new Loader([
    Resources.Seagull,
]);

export { Resources, ResourceLoader };
