class Collider extends LevelObject {

    constructor(image, x, y, width, height, mode, diagonal) {
        super(image, x, y, width, height, mode, diagonal);
    }

    collide(pl) {

        if (pl == null) {
            pl = player
        }
        if (validParameter(this.diagonal)) {
            if (this.isInteractingDiagonal(pl)) {
                this.collideDiagonal(pl);
                // this.adjustPlayer(pl);
            }
            return;
        }
        if (this.isInteracting(pl)) {
            this.collideRect(pl);
            // this.adjustPlayer(pl);
        }

        

    }

    collideRect(pl) {
            
        let thisLeft = this.left();
        let thisRight = this.right();    

        let plLeft = pl.left();
        let plRight = pl.right();

        let moveX = abs(this.moveX) + pl.maxHorizontalSpeed;

        let factor = 1.05;

        if (plRight == constrain(plRight, thisLeft - factor*abs(moveX), thisLeft + factor*abs(moveX))) {
            pl.x = thisLeft - pl.halfWidth();
        } else if (plLeft == constrain(plLeft, thisRight - factor*abs(moveX), thisRight + factor*abs(moveX))) {
            pl.x = thisRight + pl.halfWidth();
        }

        let thisTop = this.top();
        let thisBottom = this.bottom();    

        let plTop = pl.top();
        let plBottom = pl.bottom();

        let moveY = abs( this.x - this.previousX ) + abs( pl.y - pl.previousY );

        if (plBottom == constrain(plBottom, thisTop - factor*abs(moveY), thisTop + factor*abs(moveY))) {
            pl.y = thisTop - pl.halfHeight();
        } else if (plTop == constrain(plTop, thisBottom - factor*abs(moveY), thisBottom + factor*abs(moveY))) {
            pl.y = thisBottom + pl.halfHeight();
        }

    }

    collideDiagonal(pl) {

        let plTop = pl.top();
        let plBottom = pl.bottom();
        let plLeft = pl.left();
        let plRight = pl.right();

        let plMoveX = pl.maxHorizontalSpeed;
        let plMoveY = pl.maxSinkSpeed;

        let factor = 1.2;
        switch (this.diagonal) {
            
            case BOTTOM_LEFT :

                if (plTop > this.top() - factor*abs(plMoveY) && plTop < this.bottom() + factor*abs(plMoveY) && plRight == constrain(plRight, this.diagonalXFor(plTop - factor*abs(plMoveY)) - factor*abs(plMoveX), this.diagonalXFor(plTop + factor*abs(plMoveY)) + factor*abs(plMoveX))) {
                    let newPlRight = ( plRight + this.diagonalXFor(plTop) ) / 2;
                    let newPlTop = this.diagonalYFor(newPlRight);
                    pl.x = newPlRight - pl.halfWidth();
                    pl.y = newPlTop + pl.halfHeight();
                } else {
                    if (plLeft == constrain(plLeft, this.right() - factor*abs(plMoveX), this.right() + factor*abs(plMoveX))) {
                        pl.x = this.right() + pl.halfWidth();
                    } else if (plRight == constrain(plRight, this.left() - factor*abs(plMoveX), this.left() + factor*abs(plMoveX))) {
                        pl.x = this.left() - pl.halfWidth();
                    }

                    if (plBottom == constrain(plBottom, this.top() - factor*abs(plMoveY), this.top() + factor*abs(plMoveY))) {
                        pl.y = this.top() - pl.halfHeight();
                    } else if (plTop == constrain(plTop, this.bottom() - factor*abs(plMoveY), this.bottom() + factor*abs(plMoveY))) {
                        pl.y = this.bottom() + pl.halfHeight();
                    }
                }

                break;

            case TOP_LEFT :

                if (plBottom > this.top() - factor*abs(plMoveY) && plBottom < this.bottom() + factor*abs(plMoveY) && plRight == constrain(plRight, this.diagonalXFor(plBottom + factor*abs(plMoveY)) - factor*abs(plMoveX), this.diagonalXFor(plBottom - factor*abs(plMoveY)) + factor*abs(plMoveX))) {
                    let newPlRight = ( plRight + this.diagonalXFor(plBottom) ) / 2;
                    let newPlBottom = this.diagonalYFor(newPlRight);
                    pl.x = newPlRight - pl.halfWidth();
                    pl.y = newPlBottom - pl.halfHeight();
                } else {
                    if (plLeft == constrain(plLeft, this.right() - factor*abs(plMoveX), this.right() + factor*abs(plMoveX))) {
                        pl.x = this.right() + pl.halfWidth();
                    } else if (plRight == constrain(plRight, this.left() - factor*abs(plMoveX), this.left() + factor*abs(plMoveX))) {
                        pl.x = this.left() - pl.halfWidth();
                    }

                    if (plBottom == constrain(plBottom, this.top() - factor*abs(plMoveY), this.top() + factor*abs(plMoveY))) {
                        pl.y = this.top() - pl.halfHeight();
                    } else if (plTop == constrain(plTop, this.bottom() - factor*abs(plMoveY), this.bottom() + factor*abs(plMoveY))) {
                        pl.y = this.bottom() + pl.halfHeight();
                    }
                }

                break;

            case TOP_RIGHT :

                if (plBottom > this.top() - factor*abs(plMoveY) && plBottom < this.bottom() + factor*abs(plMoveY) && plLeft == constrain(plLeft, this.diagonalXFor(plBottom - factor*abs(plMoveY)) - factor*abs(plMoveX), this.diagonalXFor(plBottom + factor*abs(plMoveY)) + factor*abs(plMoveX))) {
                    let newPlLeft = ( plLeft + this.diagonalXFor(plBottom) ) / 2;
                    let newPlBottom = this.diagonalYFor(newPlLeft);
                    pl.x = newPlLeft + pl.halfWidth();
                    pl.y = newPlBottom - pl.halfHeight();
                } else {
                    if (plLeft == constrain(plLeft, this.right() - factor*abs(plMoveX), this.right() + factor*abs(plMoveX))) {
                        pl.x = this.right() + pl.halfWidth();
                    } else if (plRight == constrain(plRight, this.left() - factor*abs(plMoveX), this.left() + factor*abs(plMoveX))) {
                        pl.x = this.left() - pl.halfWidth();
                    }

                    if (plBottom == constrain(plBottom, this.top() - factor*abs(plMoveY), this.top() + factor*abs(plMoveY))) {
                        pl.y = this.top() - pl.halfHeight();
                    } else if (plTop == constrain(plTop, this.bottom() - factor*abs(plMoveY), this.bottom() + factor*abs(plMoveY))) {
                        pl.y = this.bottom() + pl.halfHeight();
                    }
                }

                break;

            case BOTTOM_RIGHT :

                if (plTop > this.top() - factor*abs(plMoveY) && plTop < this.bottom() + factor*abs(plMoveY) && plLeft == constrain(plLeft, this.diagonalXFor(plTop + factor*abs(plMoveY)) - factor*abs(plMoveX), this.diagonalXFor(plTop - factor*abs(plMoveY)) + factor*abs(plMoveX))) {
                    let newPlLeft = ( plLeft + this.diagonalXFor(plTop) ) / 2;
                    let newPlTop = this.diagonalYFor(newPlLeft);
                    pl.x = newPlLeft + pl.halfWidth();
                    pl.y = newPlTop + pl.halfHeight();
                } else {
                    if (plLeft == constrain(plLeft, this.right() - factor*abs(plMoveX), this.right() + factor*abs(plMoveX))) {
                        pl.x = this.right() + pl.halfWidth();
                    } else if (plRight == constrain(plRight, this.left() - factor*abs(plMoveX), this.left() + factor*abs(plMoveX))) {
                        pl.x = this.left() - pl.halfWidth();
                    }

                    if (plBottom == constrain(plBottom, this.top() - factor*abs(plMoveY), this.top() + factor*abs(plMoveY))) {
                        pl.y = this.top() - pl.halfHeight();
                    } else if (plTop == constrain(plTop, this.bottom() - factor*abs(plMoveY), this.bottom() + factor*abs(plMoveY))) {
                        pl.y = this.bottom() + pl.halfHeight();
                    }
                }

                break;

        }

    }

    adjustPlayer(pl) {

        let factor = pl.maxHorizontalSpeed;
        if (pl.right() == constrain(pl.right(), this.left() - factor, this.left() + factor)) {
            pl.x -= factor;
        } else if (pl.left() == constrain(pl.left(), this.right() - factor, this.right() + factor)) {
            pl.x += factor;
        }
        if (pl.top() == constrain(pl.top(), this.bottom() - factor, this.bottom() + factor)) {
            pl.y += factor;
        } else if (pl.bottom() == constrain(pl.bottom(), this.top() - factor, this.top() + factor)) {
            pl.y -= factor;
        }

    }

}