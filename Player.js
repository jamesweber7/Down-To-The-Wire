class Player {

    constructor() {

        this.x = 5600;
        this.y = 1214;

        this.previousX = this.x;
        this.previousY = this.y;

        this.checkPointX = this.x;
        this.checkPointY = this.y;

        this.moveX = 0;
        this.moveY = 0;

        this.maxHorizontalSpeed = 8;
        this.acceleration = 0.2;

        this.maxHoverSpeed = 5;
        this.hoverAcceleration = 0.1;
        this.maxSinkSpeed = 8;
        this.sinkAcceleration = 0.3;

        this.theta = 0;
        this.previousTheta = 0;
        this.thetaSpeed = 0.3;

        this.anim = bleeIdle;
        this.isIdle = true;
        this.isHovering = false;
        this.canTransitionToHover = true;

    }

    draw() {
        
        this.animationStateMachine();
        if (this.isHovering) {
            this.drawHover();
        } else {
            this.anim.draw(this.x, this.y);
        }
    }

    drawShape() {
        fill(0,130,140);
        rect(this.x, this.y, this.width(), this.height());
    }

    animationStateMachine() {

        if (this.isHovering) {
            this.anim = bleeHover;
        } else if (this.isTransitioningToHover) {
            this.anim = transitionToHover;
            if (this.anim.index == this.anim.length - 1) {
                this.isHovering = true;
                this.isTransitioningToHover = false;
                this.anim = bleeHover;
            }
        } else if (this.isIdle) {
            this.anim = bleeIdle;
            if (world.startWireY == null && (keyIsPressed || mouseIsPressed) && this.canTransitionToHover) {
                this.isIdle = false;
                this.isTransitioningToHover = true;
                this.anim = transitionToHover;
                playSound(startFloat);
            }
        } else if (this.isTransitioningToIdle) {
            this.anim = transitionToIdle;
            if (this.anim.index == this.anim.length - 1) {
                this.isTransitioningToIdle = false;
                this.isIdle = true;
            }
        }
    }

    drawHover() {

        push();
        translate(this.x, this.y);
        
        rotate(this.theta);
        this.anim.draw(0,0);
        pop();
    }

    move() {
        if (this.isHovering) {
            this.moveHover();
        }
    }

    moveHover() {

        this.previousX = this.x;
        this.previousY = this.y;
        
        this.accelerateHover();
        
        this.x += this.moveX;
        this.y += this.moveY;
    }

    accelerateTheta() {

        this.previousTheta = this.theta;
        this.theta = atan(this.moveY/this.moveX) + PI*0.5;

        if (this.moveX < 0) {
            this.theta += PI;
        }

        let thetaChange = abs(this.theta - this.previousTheta);
        if (thetaChange > this.thetaSpeed) {

            if (thetaChange > PI) {
                if (this.theta > PI) {
                    this.theta = 2*PI-this.previousTheta - this.thetaSpeed;
                } else {
                    this.theta = this.previousTheta + this.thetaSpeed;
                }
                
                this.theta = this.theta % (2*PI);
                if (this.theta == constrain(this.theta, -this.thetaSpeed, this.thetaSpeed)) {
                    this.theta = 0;
                }

            } else {
                if (this.theta > this.previousTheta) {
                    this.theta = this.previousTheta + this.thetaSpeed;
                } else {
                    this.theta = this.previousTheta - this.thetaSpeed;
                }
            }

        } 

    }

    accelerateHover() {

        if (this.leftPressed && !this.rightPressed) {
            this.moveX = constrain(this.moveX + this.acceleration, -this.maxHorizontalSpeed, this.maxHorizontalSpeed);
        } else if (!this.leftPressed && this.rightPressed) {
            this.moveX = constrain(this.moveX - this.acceleration, -this.maxHorizontalSpeed, this.maxHorizontalSpeed);
        } else {
            if (this.moveX > 0) {
                this.moveX = max(this.moveX - this.acceleration, 0);
            } else {
                this.moveX = min(this.moveX + this.acceleration, 0);
            }
        }

        if (this.spacePressed) {
            this.moveY = constrain(this.moveY + this.sinkAcceleration, -this.maxSinkSpeed, this.maxSinkSpeed);
        } else {
            this.moveY = constrain(this.moveY - this.hoverAcceleration, -this.maxHoverSpeed, this.maxHoverSpeed);
        }
        
        this.accelerateTheta();

    }

    reset() {
        this.x = this.checkPointX;
        this.y = this.checkPointY;
    }

    moveLeft() {
        this.leftPressed = true;
    }

    unmoveLeft() {
        this.leftPressed = false;
    }

    moveRight() {
        this.rightPressed = true;
    }

    unmoveRight() {
        this.rightPressed = false;
    }

    pressSpace() {
        this.spacePressed = true;
    }

    unpressSpace() {
        this.spacePressed = false;
    }

    width() {
        return this.anim.width;
    }

    halfWidth() {
        return this.width() * 0.5;
    }

    height() {
        return this.anim.height;
    }

    halfHeight() {
        return this.height() * 0.5;
    }

    left() {
        return this.x - this.halfWidth();
    }

    right() {
        return this.x + this.halfWidth();
    }

    top() {
        return this.y - this.halfHeight();
    }

    bottom() {
        return this.y + this.halfHeight();
    }

}