class ColorTrigger extends LevelObject {
    
    constructor(left, top, right, bottom, red, green, blue) {
        super(null, left, top, right, bottom, CORNERS);
        this.toColors = [red, green, blue];
    }

    manageColor() {
        if (this.isInteracting(player)) {
            setColor(this.toColors);
        }
    }

}