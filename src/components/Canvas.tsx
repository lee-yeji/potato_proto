
import * as FileSaver from 'file-saver';
import Konva from 'konva';
import { Image as KonvaImage } from 'konva/types/shapes/Image';
import { Stage } from 'konva/types/Stage';
import { Layer } from 'konva/types/Layer';

class Canvas {
    stage: Stage;
    layer: Layer;

    constructor() {
        this.stage = new Konva.Stage({
            container: 'canvas',
            width: 400,
            height: 400
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
    }

    static loadImage(src: string) {
        return new Promise<KonvaImage>((resolve, reject) => {
            Konva.Image.fromURL(src, (image: KonvaImage) => {
                resolve(image);
            });
        });
    }

    drawImage(image: KonvaImage) {
        image.setAttrs({
            x: 0,
            y: 0,
            width: 400,
            height: 400
        });
        this.layer.add(image);
        this.layer.batchDraw();
    }

    downloadAsPng() {
        this.layer.toCanvas({}).toBlob(imageBlob => {
            if (imageBlob) {
                FileSaver.saveAs(imageBlob, 'my_potato.png');
            }
        });;
    }
}

export default Canvas;
