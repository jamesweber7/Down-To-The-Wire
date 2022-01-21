class TextTrigger extends ActionTrigger {

    constructor(index, x, y, width, height, mode, textBubbles) {
        super(index, x, y, width, height, mode, TEXT);
        this.textBubbles = textBubbles;
    }

    executeAction() {
        for (let i = 0; i < this.textBubbles.length; i++) {
            this.textBubbles[i].draw();
        }
    }

    exit() {
        this.remove();
    }
    
    
}