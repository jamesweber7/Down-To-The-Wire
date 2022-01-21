class SmartArt {

    constructor(art, x, y, mode, translateXOffset, translateYOffset, sound, playTime) {
        this.art = art;
        this.mode = mode;
        this.x = x;
        this.y = y;
        if (validParameter(translateXOffset)) {
            this.translateXOffset = translateXOffset;
            this.translateYOffset = translateYOffset;
        }
        if (validParameter(sound)) {
            this.sound = sound;
            this.playTime = playTime;
        }
    }

    draw() {

        push();
        if (validParameter(this.translateXOffset)) {
            translate(cameraX*this.translateXOffset, cameraY*this.translateYOffset, 0);
        }
        if (this.mode == ANIMATION) {
            this.drawAnimation();
        } else {
            this.drawImage();
        }
        pop();
        
        if (validParameter(this.sound)) {
            let distanceFactor = GAME_WIDTH;
            let playerDistance = dist(player.x, player.y, this.x, this.y);
            if ( playerDistance < distanceFactor) {
                this.sound.setVolume(1-constrain(playerDistance/distanceFactor, 0, 1));
                if (frameCount % this.playTime == 0) {
                    this.sound.play();
                }
            }
        }
        
    }

    drawAnimation() {
        this.art.draw(this.x, this.y);
    }

    drawImage() {
        image(this.art, this.x, this.y);
    }



}