class LandingTrigger extends ActionTrigger {

    constructor(index, x, y, width, height, mode, landX, landY, textBubbles, clickAction) {
        super(index, x, y, width, height, mode, LANDING);
        this.landX = landX;
        this.landY = landY;
        this.textBubbles = textBubbles;
        this.clickAction = clickAction;
        this.startLandTime = -1;
    }

    executeAction() {
        if (player.x < this.landX) {
            player.x = min(player.x + 9, this.landX);
        } else if (player.x > this.landx) {
            player.x = max(player.x - 9, this.landX);
        }
        if (player.y < this.landY) {
            player.y = min(player.y + 9, this.landY);
        } else if (player.y > this.landY) {
            player.y = max(player.y - 9, this.landY);
        }
        if (player.x == this.landX && player.y == this.landY) {
            if (this.startLandTime == -1) {
                this.startLandTime = frameCount;
            }
            player.isHovering = false;
            player.isTransitioningToIdle = true;
            player.canTransitionToHover = false;
            for (let i = 0; i < this.textBubbles.length; i++) {
                this.textBubbles[i].draw();
            }
            clickAction = this.clickAction;
        }
        if (frameCount - this.startLandTime == 450) {
            this.thankYouIndex = this.textBubbles.length;
            this.textBubbles[this.thankYouIndex] = new TextBubble(8580, 28450, 406, 120, "THANKS FOR PLAYING!      \nPRESS R TO PLAY AGAIN");
            this.textBubbles[this.thankYouIndex].addTransitionIn(BOTTOM);
            player.checkPointX = 5600;
            player.checkPointY = 1214;
        }
        if (keyIsDown(resetKey) && frameCount - this.startLandTime > 470) {
                this.textBubbles.splice(this.textBubbles[this.thankYouIndex], 1);
                this.thankYouIndex = -1;
                this.startLandTime = -1;
                this.isActing = false;
                player.canTransitionToHover = true;
                player.reset();
                music.stop();
                music.play();
        }
    }

    exit() {
        player.canTransitionToHover = true;
        clickAction = null;
        this.remove();
    }

}