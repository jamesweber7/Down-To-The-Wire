class CheckPointTrigger extends ActionTrigger {

    constructor(index, x, y, width, height, mode, checkPointX, checkPointY) {
        super(index, x, y, width, height, mode, CHECK_POINT);
        this.checkPointX = checkPointX;
        this.checkPointY = checkPointY;
    }

}