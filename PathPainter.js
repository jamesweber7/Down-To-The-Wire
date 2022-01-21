class PathPainter {

    constructor() {
        this.xChunks = 8;
        this.yChunks = 40;
        this.bgHeight = 30000;
        this.bgWidth = 12945;

        this.chunkWidth = 1618;
        this.chunkHeight = 750;
        this.chunks = [];

        for (let i = 0; i < 308; i++) {
            let index = i;
                if (index < 10) {
                    index = "00" + index;
                } else if (index < 100) {
                    index = "0" + index;
                }
            this.chunks[this.chunks.length] = loadImage("assets/coloredPath/coloredPath" + index + ".png");
        }

        for (let i = 0; i < 6; i++) {
            this.chunks.splice(i + 9, 0, pureVoid);
        }
        for (let i = 0; i < 6; i++) {
            this.chunks.splice(i + 17, 0, pureVoid);
        }

    }

    loadFiles() {

        for (let i = this.startY; i < this.yChunks; i++) {
            for (let j = this.startX; j < this.xChunks; j++) {
                let index = (i*j + j);
                if (index < 10) {
                    index = "00" + index;
                } else if (index < 100) {
                    index = "0" + index;
                }
                this.chunks[this.chunks.length] = loadImage("assets/Background/LevelPath" + index + ".png");
            }
        }

    }

    draw() {

        let xOffset = 0;
        let cameraXOffset = 0;
        let cameraYOffset = 0;


        let xIndex = floor( (-cameraX + cameraXOffset) / this.chunkWidth);
        let yIndex = floor((-cameraY + cameraYOffset) / this.chunkHeight);
        
        let someWidth = this.chunkWidth;
        let someHeight = this.chunkHeight;
        
        
        image(this.chunks[constrain(this.xChunks*(yIndex + 1) + xIndex - 2, 0, this.chunks.length - 1)], cameraX % someWidth - someWidth + xOffset, cameraY % someHeight);
        image(this.chunks[constrain(this.xChunks*(yIndex + 1) + xIndex - 1, 0, this.chunks.length - 1)], cameraX % someWidth + xOffset, cameraY % someHeight);
        image(this.chunks[constrain(this.xChunks*(yIndex + 1) + xIndex, 0, this.chunks.length - 1)], cameraX % someWidth + someWidth + xOffset, cameraY % someHeight);
        image(this.chunks[constrain(this.xChunks*(yIndex + 1) + xIndex + 1, 0, this.chunks.length - 1)], cameraX % someWidth + 2*someWidth + xOffset, cameraY % someHeight);

        image(this.chunks[constrain(this.xChunks*(yIndex + 2) + xIndex - 2, 0, this.chunks.length - 1)], cameraX % someWidth - someWidth + xOffset, cameraY % someHeight + someHeight);
        image(this.chunks[constrain(this.xChunks*(yIndex + 2) + xIndex - 1, 0, this.chunks.length - 1)], cameraX % someWidth + xOffset, cameraY % someHeight + someHeight);
        image(this.chunks[constrain(this.xChunks*(yIndex + 2) + xIndex, 0, this.chunks.length - 1)], cameraX % someWidth + someWidth + xOffset, cameraY % someHeight + someHeight);
        image(this.chunks[constrain(this.xChunks*(yIndex + 2) + xIndex + 1, 0, this.chunks.length - 1)], cameraX % someWidth + 2*someWidth + xOffset, cameraY % someHeight + someHeight);

        image(this.chunks[constrain(this.xChunks*(yIndex + 3) + xIndex - 2, 0, this.chunks.length - 1)], cameraX % someWidth - someWidth + xOffset, cameraY % someHeight + 2*someHeight);
        image(this.chunks[constrain(this.xChunks*(yIndex + 3) + xIndex - 1, 0, this.chunks.length - 1)], cameraX % someWidth + xOffset, cameraY % someHeight + 2*someHeight);
        image(this.chunks[constrain(this.xChunks*(yIndex + 3) + xIndex, 0, this.chunks.length - 1)], cameraX % someWidth + someWidth + xOffset, cameraY % someHeight + 2*someHeight);
        image(this.chunks[constrain(this.xChunks*(yIndex + 3) + xIndex + 1, 0, this.chunks.length - 1)], cameraX % someWidth + 2*someWidth + xOffset, cameraY % someHeight + 2*someHeight);

    }

}