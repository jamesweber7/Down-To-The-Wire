class Animation {

    constructor(image, length, timeDilation, speedIsFluid) {

        this.images = [];
        this.length = length;

        for (let i = 0; i < this.length; i++) {
            this.images[i] = loadImage(image + (i+1) + ".png");
        }

        if (validParameter(timeDilation)) {
            this.timeDilation = timeDilation;
        } else {
            this.timeDilation = 1;
        }

        this.index = 0;

        this.speedIsFluid = speedIsFluid;
        this.assignDimension();

    }

    draw(x, y) {

        this.incrementIndex();
        let index = floor(this.index);

        image(this.images[index], x, y);

    }

    playThrough(x, y) {

        this.index += 1/this.timeDilation;
        if (this.index >= this.images.length) {
            this.playedThrough = true;
        }
        if (this.playedThrough) {
            return true;
        }
        let index = floor(this.index);

        image(this.images[index], x, y);
    }

    incrementIndex() {
        this.index += 1/this.timeDilation;
        if (this.index >= this.length) {
            this.index = 0;
        }
    }

    // width and height don't load correctly when called in preload function
    setup() {
        this.assignDimension();
    }

    assignDimension() {

        this.width = this.images[0].width;

        this.height = this.images[0].height;

    }

    setDilation(timeDilation) {
        this.timeDilation = timeDilation;
    }

}