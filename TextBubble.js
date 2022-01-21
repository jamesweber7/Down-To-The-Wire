class TextBubble {

    constructor(x, y, width, height, message, fontSize, image) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.halfWidth = this.width*0.5;
        this.height = height;
        this.halfHeight = this.height*0.5;
        this.message = message;
        if (validParameter(fontSize)) {
            this.fontSize = fontSize;
        } else {
            this.fontSize = 20;
        }
        this.printedMessage = "";
        if (validParameter(image)) {
            this.image = image;
        }

    }

    draw() {

        let speed = 40;
        // horizontal transition in
        if (validParameter(this.toX) && (this.x != this.toX)) {
            if (this.x > this.toX) {
                this.x = max(this.x - speed, this.toX);
            } else {
                this.x = min(this.x + speed, this.toX);
            }
            if (this.x == this.toX) {
                this.toX = null;
            }
        } 
        // vertical transition in
        else if (validParameter(this.toY) && (this.y != this.toY)) {
            if (this.y > this.toY) {
                this.y = max(this.y - speed, this.toY);
            } else {
                this.y = min(this.y + speed, this.toY);
            }
            if (this.y == this.toY) {
                this.toY = null;
            }
        } 
        // type message
        else if (frameCount % 3 == 0 && this.message.length > 0) {
            let character = this.message.charAt(0);
            this.printedMessage += character;
            this.message = this.message.substring(1, this.message.length);
            if (character != " ") {
                playSound(typeSound);
            }
        }
        // horizontal transition out
        else if (this.fadeOutDelay <= 0 && validParameter(this.endX) && (this.x != this.endX)) {
            if (this.x > this.endX) {
                this.x = max(this.x - speed, this.endX);
            } else {
                this.x = min(this.x + speed, this.endX);
            }
            if (this.x == this.endX) {
                this.endX = null;
            }
        } 
        // vertical transition out
        else if (this.fadeOutDelay <= 0 && validParameter(this.endY) && (this.y != this.endY)) {
            if (this.y > this.endY) {
                this.y = max(this.y - speed, this.endY);
            } else {
                this.y = min(this.y + speed, this.endY);
            }
            if (this.y == this.endY) {
                this.endY = null;
            }
        }
        if (!validParameter(this.toX) && !validParameter(this.toY)) {
            this.fadeOutDelay --;
        }

        if (validParameter(this.image)) {
            image(this.image, this.x, this.y - this.halfHeight);
        }
        textSize(this.fontSize);
        stroke(0);
        strokeWeight(20);
        fill(255);
        rect(this.x, this.y, this.width, this.height,20);
        noStroke();
        fill(0);
        text(this.printedMessage, this.x - this.halfWidth*0.8, this.y);
    }

    addTransitionIn(fromDirection) {

        switch (fromDirection) {

            case LEFT :
                this.toX = this.x;
                this.x = this.toX - GAME_WIDTH*1.1 - this.width;
                break;
            case TOP :
                this.toY = this.y;
                this.y = this.toY - GAME_HEIGHT*1.1 - this.height;
                break;
            case RIGHT :
                this.toX = this.x;
                this.x = this.toX + GAME_WIDTH*1.1 + this.width;
                break;
            case BOTTOM :
                this.toY = this.y;
                this.y = this.toY + GAME_HEIGHT*1.1 + this.height;
                break;

        }
    }

    addTransitionOut(toDirection, delay) {

        this.fadeOutDelay = delay;
        switch (toDirection) {

            case LEFT :
                this.endX = validParameter(this.toX) ? this.toX : this.x;
                this.endX -= (GAME_WIDTH*1.1 + this.width);
                break;
            case TOP :
                this.endY = validParameter(this.toY) ? this.toY : this.y;
                this.endY -= (GAME_HEIGHT*1.1 + this.height);
                break;
            case RIGHT :
                this.endX = validParameter(this.toX) ? this.toX : this.x;
                this.endX += (GAME_WIDTH*1.1 + this.width);
                break;
            case BOTTOM :
                this.endY = validParameter(this.toY) ? this.toY : this.y;
                this.endY += (GAME_HEIGHT*1.1 + this.height);
                break;

        }
    }

    onButton(x, y) {

        let tolerance = 10;
        if (x == constrain(x, this.x - this.halfWidth - tolerance, this.x + this.halfWidth + tolerance)) {
            if (y == constrain(y, this.y - this.halfHeight - tolerance, this.y + this.halfHeight + tolerance)) {
                return true;
            }
        }
        return false;
    }

    setTyped() {
        while (this.message.length > 0) {
            let character = this.message.charAt(0);
            this.printedMessage += character;
            this.message = this.message.substring(1, this.message.length);
        }
    }
}