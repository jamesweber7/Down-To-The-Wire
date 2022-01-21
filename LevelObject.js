class LevelObject {

    constructor(image, x, y, width, height, mode, diagonal) {

        if (validParameter(image)) {
            this.image = image;
        } else {
            this.image = pureVoid;
        }

        if (mode == CORNER) {

            let left = x;
            this.width = width;
            let top = y;
            this.height = height;

            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;

            this.x = left + this.halfWidth;
            this.previousX = this.x;

            this.y = top + this.halfHeight;
            this.previousY = this.y;

            this.moveX = 0;
            this.moveY = 0;

        } else if (mode == CORNERS) {

            let left = x;
            let right = width;
            let top = y;
            let bottom = height;

            this.width = right - left;
            this.height = bottom - top;

            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;

            this.x = left + this.halfWidth;
            this.previousX = this.x;

            this.y = top + this.halfHeight;
            this.previousY = this.y;

            this.moveX = 0;
            this.moveY = 0;
        } else {
            this.x = x;
            this.previousX = this.x;
    
            this.y = y;
            this.previousY = this.y;

            this.moveX = 0;
            this.moveY = 0;
    
            if (validParameter(width)) {
                this.width = width;
                this.height = height;
            } else {
                this.width = image.width;
                this.height = image.height;
            }
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
        }

        if (validParameter(diagonal)) {

            this.diagonal = diagonal;
            
            switch (this.diagonal) {
            
                case BOTTOM_LEFT :
    
                    this.x1 = this.left();
                    this.y1 = this.top();
                    this.x2 = this.right();
                    this.y2 = this.bottom();
                    this.x3 = this.right();
                    this.y3 = this.top();
                    break;
    
                case TOP_LEFT :
    
                    this.x1 = this.left();
                    this.y1 = this.bottom();
                    this.x2 = this.right();
                    this.y2 = this.top();
                    this.x3 = this.right();
                    this.y3 = this.bottom();
                    break;
    
                case TOP_RIGHT :

                    this.x1 = this.left();
                    this.y1 = this.top();
                    this.x2 = this.right();
                    this.y2 = this.bottom();
                    this.x3 = this.left();
                    this.y3 = this.bottom();
                    break;
    
                case BOTTOM_RIGHT :
    
                    this.x1 = this.left();
                    this.y1 = this.bottom();
                    this.x2 = this.right();
                    this.y2 = this.top();
                    this.x3 = this.left();
                    this.y3 = this.top();
                    break;
    
            }

        }

    }

    draw() {
        image(this.image, this.x, this.y);
    }

    drawShape() {
        
        if (!validParameter(this.diagonal)) {
            if (!this.isInteracting(player)) {
                fill(255, 100);
            } else {
                fill(0, 100);
            }
            rect(this.x, this.y, this.width, this.height);
        } else {
            if (!this.isInteractingDiagonal(player)) {
                fill(255, 100);
            } else {
                fill(0, 100);
            }
            triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
        }

    }

    isInteractingDiagonal(pl, factor) {

        switch (this.diagonal) {
            
            case BOTTOM_LEFT :
                if (pl.right() > this.diagonalXFor(pl.top())) {
                    return this.isInteracting(pl);
                }

                break;

            case TOP_LEFT :

                if (pl.right() > this.diagonalXFor(pl.bottom())) {
                    return this.isInteracting(pl);
                }

                break;

            case TOP_RIGHT :

                if (pl.left() < this.diagonalXFor(pl.bottom())) {
                    return this.isInteracting(pl);
                }

                break;

            case BOTTOM_RIGHT :

                if (pl.left() < this.diagonalXFor(pl.top())) {
                    return this.isInteracting(pl);
                }

                break;

        }

    }

    isInteracting(pl) {
        let left = pl.left();
        let top = pl.top();
        let right = pl.right();
        let bottom = pl.bottom();
        return this.isInteractingBounds(left, top, right, bottom);
    }

    isInteractingBounds(left, top, right, bottom) {
        return ( this.isInteractingHorizontal(left, right) && this.isInteractingVertical(top, bottom) );
    }

    isInteractingHorizontal(left, right) {

        if (!this.isInteractingRight(left)) {
            return false;
        }
        if (!this.isInteractingLeft(right)) {
            return false;
        }
        return true;

    }

    wasInteractingHorizontal(left, right) {
        if (this.wasInteractingRight(left)) {
            return false;
        }
        if (this.wasInteractingLeft(right)) {
            return false;
        }
        return true;
    }

    isInteractingRight(left) {
        if (left > this.right()) {
            return false;
        }
        return true;
    }
    
    isInteractingLeft(right) {
        if (right < this.left()) {
            return false;
        }
        return true;
    }

    wasInteractingRight(left) {
        if (left > this.previousX + this.halfWidth) {
            return true;
        }
        return false;
    }

    wasInteractingLeft(right) {
        if (right < this.previousX - this.halfWidth) {
            return true;
        }
        return false;
    }

    isInteractingVertical(top, bottom) {

        if (!this.isInteractingBottom(top)) {
            return false;
        }
        if (!this.isInteractingTop(bottom)) {
            return false;
        }
        return true;

    }

    wasInteractingVertical(top, bottom) {

        if (this.wasInteractingBottom(top)) {
            return false;
        }
        if (this.wasInteractingTop(bottom)) {
            return false;
        }
        return true;

    }

    isInteractingBottom(top) {
        if (top > this.bottom()) {
            return false;
        }
        return true;
    }

    isInteractingTop(bottom) {
        if (bottom < this.top()) {
            return false;
        }
        return true;
    }

    wasInteractingBottom(top) {
        if (top > this.previousY + this.halfHeight) {
            return true;
        }
        return false;
    }

    wasInteractingTop(bottom) {
        if (bottom < this.previousY - this.halfHeight) {
            return true;
        }
        return false;
    }

    left() {
        return this.x - this.halfWidth;
    }

    right() {
        return this.x + this.halfWidth;
    }

    top() {
        return this.y - this.halfHeight;
    }

    bottom() {
        return this.y + this.halfHeight;
    }

    updatePrevXY() {
        this.previousX = this.x;
        this.previousY = this.y;
    }

    diagonalXFor(y) {

        let m = this.slope();

        let b = this.y1 - m*this.x1;

        return (y-b) / m;

    }

    diagonalYFor(x) {

        let m = this.slope();

        let b = this.y1 - m*this.x1;

        return m*x + b;

    }

    slope() {

        let rise = this.y2 - this.y1;
        let run = this.x2 - this.x1;

        return rise/run;

    }

}