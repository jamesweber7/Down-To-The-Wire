class ActionTrigger extends LevelObject {


    constructor(index, x, y, width, height, mode, action) {
        super(null, x, y, width, height, mode);
        this.index = index;
        this.action = action;
    }

    manageTrigger() {

        if (this.isInteracting(player)) {

            switch (this.action) {

                case LANDING :
                    this.isActing = true;
                    break;

                case TEXT :
                    this.isActing = true;
                    break;

                case CHECK_POINT :
                    player.checkPointX = this.checkPointX;
                    player.checkPointY = this.checkPointY;
            }

        }
        if (this.isActing) {
            this.executeAction();
        }

    }

    executeAction() {

        switch (this.action) {
            
        }

    }

    remove() {
        clickAction = null;
        world.removeActionTrigger(this.index);
    }

    exit() {
        this.remove();
    }

}