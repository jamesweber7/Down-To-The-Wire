class World {

    constructor() {
        this.colliders = [];
        this.assignColliders();
        this.readColliders();

        this.colorTriggers = [];
        this.assignColorTriggers();

        this.actionTriggers = [];
        this.assignActionTriggers();

        this.backgroundArt = [];
        this.assignBackgroundArt();

        this.frontBackgroundArt = [];
        this.assignFrontBackgroundArt();

        this.foregroundArt = [];
        this.assignForegroundArt();

        this.startWireY = 1014 - 1.2*GAME_HEIGHT;
    }

    draw() {

        translateWindow();
        background(backgroundColor());
        for (let i = 0; i < this.backgroundArt.length; i++) {
            this.backgroundArt[i].draw();
        }
        drawTexture();
        instructionBubble.draw();
        instructionBubble2.draw();
        for (let i = 0; i < this.frontBackgroundArt.length; i++) {
            this.frontBackgroundArt[i].draw();
        }

        for (let i = 0; i < this.actionTriggers.length; i++) {
            this.actionTriggers[i].manageTrigger();
        }

        for (let i = 0; i < this.colorTriggers.length; i++) {
            this.colorTriggers[i].manageColor();
        }
        
        player.move();
        for (let i = 0; i < this.colliders.length; i++) {
            this.colliders[i].collide();
        }
        
        player.draw();

        if (controllingPlayerWithMouse) {
            let cnvPressX = mouseX / scl;
            let cnvPressY = mouseY / scl;

            player.x = -cameraX + cnvPressX;
            player.y = -cameraY + cnvPressY;
        }
        
        unTranslateWindow();        
        pathPainter.draw();
        
        this.animateMakOnStartup();

        translateWindow();

        for (let i = 0; i < this.foregroundArt.length; i++) {
            this.foregroundArt[i].draw();
        }

        // rect covering bottom of map
        fill(79, 0, 73);
        noStroke();
        rect(7720, 29990, 5000, 2250);

    }

    addCollider(image, x, y, width, height, mode, diagonal) {
        this.colliders[this.colliders.length] = new Collider(image, x, y, width, height, mode, diagonal);
    }

    assignColliders() {
        this.addCollider(null, 0, -4000, 18000, 280, CORNERS);
        this.addCollider(null, -1000, -1000, 1275, 60000, CORNERS);
        this.addCollider(null, 13280, -1000, 14500, 60000, CORNERS);
    }

    addActionTrigger(x, y, width, height, mode, action) {
        let index = this.actionTriggers.length;
        this.actionTriggers[index] = new ActionTrigger(index, x, y, width, height, mode, action);
    }

    addLandingTrigger(x, y, width, height, mode, landX, landY, textBubbles, clickAction) {
        let index = this.actionTriggers.length;
        this.actionTriggers[index] = new LandingTrigger(index, x, y, width, height, mode, landX, landY, textBubbles, clickAction);
    }

    addTextTrigger(x, y, width, height, mode, textBubbles) {
        let index = this.actionTriggers.length;
        this.actionTriggers[index] = new TextTrigger(index, x, y, width, height, mode, textBubbles);
    }

    assignActionTriggers() {
        this.assignCheckPointTriggers();
        let textBubs;
        // MAK
        textBubs = [new TextBubble(7840, 28420, 490, 140, "THANKS FOR LETTING ME USE YOUR CHARGER!                 \nI USED IT TO CHARGE 100 PIZZAS! HELP YOURSELF!", 15)];
        this.addLandingTrigger(7160, 28000, 8385, 28700, CORNERS, 8182 , 28508, textBubs, GLOR);
        // jor
        textBubs = [new TextBubble(3225, 10970, 250, 140, "Welcome to the coolest\ntunnel in the galaxy!", 15)];
        this.addTextTrigger(2980, 10685, 3520, 11160, CORNERS, textBubs);
        // luk
        textBubs = [new TextBubble(2665, 4400, 320, 100, "I'm the best gambler in the galaxy!", 15)];
        this.addTextTrigger(2306, 4082, 3050, 4836, CORNERS,  textBubs);
        // glor
        textBubs = [new TextBubble(5640, 9410, 755, 150, "Never seen a quadropus before?    That's because I'm one of a kind!           \nMy mother was a septopus, my father was a hexipus, and my quther was a monopus.   \nAdd the legs up and divide by vyxl and you get the galaxy's first and only quadropus!", 15)];
        this.addTextTrigger(5270, 9306, 6112, 9770, CORNERS,  textBubs);
    }

    addCheckPoint(x, y, width, height, mode, checkPointX, checkPointY) {
        let index = this.actionTriggers.length;
        this.actionTriggers[index] = new CheckPointTrigger(index, x, y, width, height, mode, checkPointX, checkPointY);
    }

    assignCheckPointTriggers() {
        
        this.addCheckPoint(5400, 4910, 6900, 6300, CORNERS, 6180, 5600)
        this.addCheckPoint(4060, 9225, 4735, 9740, CORNERS, 4385, 9450)
        this.addCheckPoint(7585, 10300, 8310, 10765, CORNERS, 7910, 10550)
        this.addCheckPoint(4060, 15225, 4810, 15450, CORNERS, 4410, 15350)
        this.addCheckPoint(10760, 16700, 11310, 17100, CORNERS, 11060, 16925)
        this.addCheckPoint(7260, 18550, 7810, 19150, CORNERS, 7410, 18875)
        this.addCheckPoint(4560, 23600, 5060, 23800, CORNERS, 4810, 23700)
        this.addCheckPoint(8060, 24650, 9060, 6725, CORNERS, 8660, 24600)
        this.addCheckPoint(7335, 26950, 7860, 27225, CORNERS, 7610, 27075)

    }

    removeActionTrigger(index) {
    
        this.actionTriggers.splice(index, 1);
        for (let i = index; i < this.actionTriggers.length; i++) {
            this.actionTriggers[i].index = i;
        }

    }

    exitActionTrigger(index) {
        this.actionTriggers[index].exit();
    }

    addBackgroundArt(art, x, y, mode, translateXOffset, translateYOffset, sound) {
        this.backgroundArt[this.backgroundArt.length] = new SmartArt(art, x, y, mode, translateXOffset, translateYOffset, sound);   
    }

    assignBackgroundArt() {
        this.addBackgroundArt(dttwImage, 6690, 6095, IMAGE, 0.1, 0.1);
    }

    addFrontBackgroundArt(art, x, y, mode, translateXOffset, translateYOffset, sound) {
        this.frontBackgroundArt[this.frontBackgroundArt.length] = new SmartArt(art, x, y, mode, translateXOffset, translateYOffset, sound);   
    }

    assignFrontBackgroundArt() {
        this.addFrontBackgroundArt(luk, 2665, 4575);
        this.addFrontBackgroundArt(glor, 5699, 9587);
        this.addFrontBackgroundArt(brik, 11810, 21655);
        this.addFrontBackgroundArt(jug, 5335, 17550);
        this.addFrontBackgroundArt(glu, 9370, 6455, ANIMATION);
        this.addFrontBackgroundArt(hundredPizzas, 7734 , 28627);
        this.addFrontBackgroundArt(mak, 7734 , 28577);
        this.addFrontBackgroundArt(jor, 3225 , 11230);
        this.addFrontBackgroundArt(rog, 3285 , 20180);
        this.addFrontBackgroundArt(doj, 10650 , 13525, ANIMATION);
    }

    addForegroundArt(art, x, y, mode, translateXOffset, translateYOffset, sound, playTime) {
        this.foregroundArt[this.foregroundArt.length] = new SmartArt(art, x, y, mode, translateXOffset, translateYOffset, sound, playTime);   
    }

    assignForegroundArt() {
        this.addForegroundArt(topCloud, 7000, 150);
        this.addForegroundArt(gbjPresents, 6175, 3250, IMAGE, 0, -0.15);
        this.addForegroundArt(gubs, 8485, 10645, ANIMATION, null, null, gubsSounds, 15);
        this.addForegroundArt(lugs, 4360, 23850, ANIMATION, null, null, lugSounds, 100);
    }

    addColorTrigger(left, top, right, bottom, red, green, blue) {
        this.colorTriggers[this.colorTriggers.length] = new ColorTrigger(left, top, right, bottom, red, green, blue);
    }

    assignColorTriggers() {

        // blue
        this.addColorTrigger(0, 2500, 14000, 2775, 0, 0, 100);

        // dark blue
        this.addColorTrigger(4310, 3000, 7810, 3100, 0, 0, 65);
        this.addColorTrigger(5110, 5100, 5310, 6100, 0, 0, 65);
        this.addColorTrigger(8110, 5100, 8285, 6100, 0, 0, 65);

        // magenta
        this.addColorTrigger(4810, 5100, 4935, 6100, 65, 0, 125);
        this.addColorTrigger(3735, 8200, 4910, 8325, 65, 0, 125);

        // yellow
        this.addColorTrigger(8410, 5100, 8560, 6100, 200, 205, 0);
        this.addColorTrigger(7510, 8200, 8260, 8325, 200, 205, 0);

        // light green
        this.addColorTrigger(0, 8550, 14000, 8750, 0, 205, 95);
        this.addColorTrigger(0, 10750, 14000, 11025, 0, 205, 95);

        // dark green
        this.addColorTrigger(0, 11350, 14000, 11600, 0, 140, 35);
        this.addColorTrigger(0, 14850, 14000, 15200, 0, 140, 35);

        // tealish-blue
        this.addColorTrigger(0, 15400, 14000, 15600, 0, 140, 155);
        this.addColorTrigger(0, 20950, 14000, 21200, 0, 140, 155);

        // pink
        this.addColorTrigger(0, 21500, 14000, 21750, 200, 12, 193);
        this.addColorTrigger(0, 26850, 14000, 27000, 200, 12, 193);

        // purple
        this.addColorTrigger(0, 27175, 14000, 27350, 42, 7, 97);


    }

    animateMakOnStartup() {
        if (this.startWireY != null) {
            push();
            translateWindow();
            stroke(146, 30, 30);
            strokeWeight(17);
            line(6000, max(this.startWireY,700+this.startWireY*0.05), 6000, this.startWireY+GAME_WIDTH*2);
            image(mak, 6100, max(this.startWireY + 150, 1610));
            this.startWireY += 8;
            noStroke();
            fill(0, 128, 64);
            rect(5800, this.startWireY + 1.8*GAME_HEIGHT, GAME_WIDTH*1.3, 2*GAME_HEIGHT);
            if (this.startWireY > 1800) {
                this.startWireY = null;
                instructionBubble = new TextBubble(5800, 1000, 400, 120, "Press Any Key To Begin Moving \n          Press Space To Sink");
            }
            pop();
        }
    }

    readColliders() {

        let colliderText = [


"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccc4444        3333ccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccc4444        3333ccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccc4444            ccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccc4                ccccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc4                 33ccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc4                 33ccccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc4                      3ccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc                              3333ccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc                              3333ccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc                              3333ccccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc                                  3cccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc                                  3cccccccccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc                 2ccccc111         3333333ccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc1               2cccccc111         3333333ccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc1               2cccccc111         3333333ccccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccc1          22222cccccccccc11              33ccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccc111       22222cccccccccc11              33ccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccc111       22222cccccccccccc1             33ccccccccccccccccccccccccccccc             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111          33ccccccccccccccccccccccccccccc             333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11          33ccccccccccccccccccccc444444             333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11        33ccccccccccccccccccccc444444             333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11        33ccccccccccccccccccccc444444             333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        33ccccccccccccccccccccc444444             333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1         ccccccccccccccccccc44                   333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1         ccccccccccccccccccc44                         33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         33ccccccccccccccccc44                         33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         33ccccccccc44444444                           33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                       33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                                                        33333333333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                                                                                                      333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11                                                                                                       3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11                                                                                                        3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                                                        3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                                                                                                         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                                                                                                         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                                                                                                           ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                                                                                                           ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                   2ccccccccc                                                                              ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             22ccccccccccccccc                         2ccccccccccccccccccccccc1                            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             22ccccccccccccccc                         2cccccccccccccccccccccccccccccccccccccccccc1         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             ccccccccccccccccc                    22222cccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            2ccccccccccccccccc111                 22222cccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccc111                 22222cccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccc111                 22222cccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccc1111111 222222222ccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccc1111111 222222222ccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccc1111111 222222222ccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444   333ccccccc        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc444              33cc        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                   3c        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                               3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44            3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                                ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc               333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                 ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4               333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                 ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       222c1                     ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4       222ccccc1111111           ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                    3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        222ccccc1111111     222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                    3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccc1111111     222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                    3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccc1111111     222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                    3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccc1111111     222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                     3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                     2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                    2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc               22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc               22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111          22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111          22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111          22222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccccccccccccccccccc44    333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccc444         33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        333cccccccccccccccccc444           333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       333cccccccccccccccccc444           333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       333cccccccccc44444444              333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1           3cccccccc44444444                 3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1           333333cc44444444                 3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1           333333cc44444444                  3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                                          3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                                          3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                                          3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                                       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                 22222c111             ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111           22222c111             ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111           22222c111             ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccc444           3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           3cccccccccc444           3333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                    3333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1           ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                        3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1          2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                        3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                        2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                        2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           2cccccccc11              2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4         22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccc11      2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4         22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc444          22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc444          22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44          2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44          2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444    33cccccccccccccc4               2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444              33cc4                 2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                                     2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                                     2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                     22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                     22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                               222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                               222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          22c111               222222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccc444cccccc333cccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          22c111         22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccc444      333cccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccc444         3ccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc44             ccccccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc44             333cccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc44             333cccccccc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc44                333333cc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc44                333333cc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc44                333333cc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc                  333333cc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc                  333333cc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc                  333333cc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc                        33           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc11                      33           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc11                      33           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc11                                   cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccc11                                   cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccc11                                 cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccc11        222c1111                 cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccc1    222c1111                 cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                 cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                 cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                 cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111             ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111             ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4          333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111             ccccccccccccccccccccccccccccccccccccccccccccccccc4444444444           333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             ccccccccccccccccccccccccccccccccccccccccccccccccc4444444444           333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11           ccccccccccccccccccccccccccccccccccccccccccccccccc4444444444              3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11           ccccccccccccccccccccccccccccccccccccccccccccccccc4444444444              3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccccccccccccccccccc4444444444                    33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccc4444                                                    33ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccc4444                                                           33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccc4444                                                           33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccccccc4444                                                           33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1          cccccccccccccccccccccccccccccccccccccccccccc4444                                                           33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1          cccccccccccccccccccccccccccccccccccccccccccc4444              22cc111                                        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccc4           2222cccccccccccc111                                   cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccc44            2222cccccccccccccccccccccccccccccccccccccccc1         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4          ccccccccccccccccccccccccccccccccccccccccc44        2222ccccccccccccccccccccccccccccccccccccccccccccc1        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4          ccccccccccccccccccccccccccccccccccccccccc44        2222cccccccccccccccccccccccccccccccccccccccccccccc1       cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccccccccccc44        2222cccccccccccccccccccccccccccccccccccccccccccccc1       cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccccc4          2222ccccccccccccccccccccccccccccccccccccccccccccccc       3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccccccccc4      22222ccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccccccccc4      22222ccccccccccccccccccccccccccccccccccccccccccccccccccc1       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccccc4       22222ccccccccccccccccccccccccccccccccccccccccccccccccccc1       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccccccc4        22222cccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccccccc4        22222cccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccc4         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccccc4       22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccc44        22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccccccc44        22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccc4          22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccccc4      2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccc44          3ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccc44       2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       cc444             3cccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccccccc44       2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4       cc444             3cccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccc4         2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccc44        3c444              3ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccccccc4         2222ccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                              ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccc444          2222ccccccccccccccccccccccccccccccccccccccccccccccccccc4444                               ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccccccc4442222222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444                               ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccccccc4   2222222222cccccccccccccccccccccccccccccccccccccccccccccccccccccc4                                  2ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccc444    2222222222cccccccccccccccccccccccccccccccccccccccccccccccc444444                                   2ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccccccc444    2222222222cccccccccccccccccccccccccccccccccccccccccccccccc444444                                   2ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccccccc4       2222222222cccccccccccccccccccccccccccccccccccccccccccccccc444444                111               2cccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccc444        2222222222ccccccccccccccccccccccccccccccccccccccccccccccc4            222       111               2cccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccccccccccccc444        2222222222ccccccccccccccccccccccccccccccccccccccccccccc44             222       111           222cccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccccc4           2222222222cccccccccccccccccccccccccccccccccccccccc44444               222      2ccccc1        222cccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccc44            2222222222cccccccccccccccccccccccccccccccccccccccc44444           2222cc4      cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           cccccccccccccccc44            2222222222cccccccccccccccccccccccccccccccccccccccc44444           2222cc4      cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",

"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           3cccccccccccc44             22cccccccccccccccccccccccccccccccccccccccccccccccccc44444          2cccccc4      cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           3cccccccc4444               22cccccccccccccccccccccccccccccccccccccccccccccccccc44444         2cccccc4       cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           3cccccc44                 22cccccccccccccccccccccccccccccccccccccccccccccccccc44              2ccccc44       cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           3ccc4               222222cccccccccccccccccccccccccccccccccccccccccccccccccccc             222ccccc4         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           34                  222222cccccccccccccccccccccccccccccccccccccccccccccccccccc             cccccccc4         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                               222222cccccccccccccccccccccccccccccccccccccccccccccccccccc           22ccccccc4          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                              2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           2cccccccc4         22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                           222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccccc4         22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                         22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           ccccccc44          22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                      222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4          2cccccc4            22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc              22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           33333cc           22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc              22222222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1          33333cc           22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          33333cc           22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          33333cc           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          33333cc           3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111            33            3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                          3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                           33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11                           33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                              33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11                               3333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                            3333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11                               333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                               33333cccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111                        33333cccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                    33333cccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                    33333cccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                 33333cccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111               3ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11             3ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11           3ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1           3cccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11          cccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1          cccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11        3ccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11        3ccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccccc4444   3333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11         ccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccccc44             33333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11         ccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccc44               33333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         3333ccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccccccc44                       333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         3333ccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccc4444                         333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc             33ccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            cccccccccccccccccccccc4444                         333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                     33ccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            ccccccccccccccccccccc4                                     333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                          3ccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            3cccccccccccccccccc44                                         333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                          33ccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1           3ccccccccccccccc4              22cccccc111111                 333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                            ccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1            333cccccccccc44              2cccccccc111111                    33cccccccccccccccccccccccccccccccccccccccccccccccccccccccc11                          3cccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            333ccccccc444              22cccccccccccccccc111111               3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11                        3cccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc            333ccccc44                2cccccccccccccccccc111111               3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111       2c1            3ccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                34                  22ccccccccccccccccccccccccccc11            333333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1         3ccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                                   2ccccccccccccccccccccccccccccc11            333333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1         ccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                               2222ccccccccccccccccccccccccccccccccc11         333333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1         ccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                               2222ccccccccccccccccccccccccccccccccc11         333333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1        ccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                                2cccccccccccccccccccccccccccccccccccccccc11      333333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4        ccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44                              22ccccccccccccccccccccccccccccccccccccccccc11      333333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4         ccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                               2cccccccccccccccccccccccccccccccccccccccccccccc1    333333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444          ccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                         222222ccccccccccccccccccccccccccccccccccccccccccccccccc111333333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444              ccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                          222222ccccccccccccccccccccccccccccccccccccccccccccccccc111333333333cccccccccccccccccccccccccccccccccccccccccccccccc44444444                  22ccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4           21             222222ccccccccccccccccccccccccccccccccccccccccccccccccc111333333333cccccccccccccccccccccccccccccccccccccccccccccccc44444444                  22ccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4            2cc11    22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         cccccccccccccccccccccccccccccccccccccccccccccc44                          22ccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444            2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4         cccccccccccccccccccccccccccccccccccccccccccc44                            22ccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444           2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc444                   cccccccccccccccccccccccccccccccccccccccccccc44                      222222ccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444           2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc444                   ccccccccccccccccccccccccccccccccccccccccc444                        222222ccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444         22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                      ccccccccccccccccccccccccccccccccccccccccc444                        222222ccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444         22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                      ccccccccccccccccccccccccccccccccccccccccc444           22cccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444       222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                       ccccccccccccccccccccccccccccccccccccccccc444         2ccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444       222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                       ccccccccccccccccccccccccccccccccccccccccc444         2ccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444       222cccccccccccccccc444            333cccccccccccccccccccccccccccc1                    22ccccccccccccccccccccccccccccccccccccccccc444        2cccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccc4           ccccccccccccccccccc444            333cccccccccccccccccccccccccccc1                    22ccccccccccccccccc444   333cccccccccccccc4         22ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccc4           cccccccccccccccc444                  3cccccccccccccccccccccccccccc                  22cccccccccccccc44                 3333ccccc4         22ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccc4          2cccccccccccccccc444                  3cccccccccccccccccccccccccccc         2ccccccccccccccccccccccc4                       3cccc4         22ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccc4           2cccccccccccccccc444                   cccccccccccccccccccccccccccc         cccccccccccccccccccc4444                         33cc          22ccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccc4           2ccccccccccccccc4                      cccccccccccccccccccccccccccc         3333cccccccccccccccc4444                           3c         2ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc4           2cccccccccccccccc4                      cccccccccccccccccccccccccccc         3333cccccccccccc4444                                        22cccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc4           2cccccccccccccccc                      2cccccccccccccccccccccccccccc11       3333ccc444444                                               22cccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc4           2cccccccccccccccc                      33ccccccccccccccccccccccccccc11       3333ccc444444          222222cccccccccc111111               22cccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc            2cccccccccccccccc11                    33ccccccccccccccccccccccccccc11                              222222cccccccccc111111               22cccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc           2ccccccccccccccccc11                      33ccccccccccccccccccccccccc11                              222222ccccccccccccccccc1111        22cccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc           2ccccccccccccccccccc11                      33333cccccccccccccccccccccc11                         222ccccccccccccccccccccccc1111        22cccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc           2ccccccccccccccccccccc111                   33333cccccccccccccccccccccccc1                      22cccccccccccccccccccccccccc1111        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccc4           2cccccccccccccccccccccccccccccc11           33333ccccccccccccccccccccccccc1111               222cccccccccccccccccccccccccccc1111        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccc            2cccccccccccccccccccccccccccccccc11         33333ccccccccccccccccccccccccc1111           2222ccccccccccccccccccccccccccccccccccc111111  3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccc1          2ccccccccccccccccccccccccccccccccc11         33333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111  3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc          2ccccccccccccccccccccccccccccccccccc11            33ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111   ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc          2ccccccccccccccccccccccccccccccccccccc1             333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111   ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc          2cccccccccccccccccccccccccccccccccccccc1111         333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111   33ccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc          2cccccccccccccccccccccccccccccccccccccc1111         333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111   33ccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccc1           33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111     33ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccc1            3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111     33ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc          333cccccccccccccccccccccccccccccccccccccccccc11          3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111     33ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc          333cccccccccccccccccccccccccccccccccccccccccccc111111    3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111     33ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc1         333cccccccccccccccccccccccccccccccccccccccccccc111111        33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111     33ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc1             333333333cccccccccccccccccccccccccccccccccc111111        33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111     33ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccc111          333333333cccccccccccccccccccccccccccccccccc111111          33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccc111          333333333cccccccccccccccccccccccccccccccccc111111            33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                                                333cc111111            33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11                                                                          3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111                                                                  33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1     ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111                                                                  33cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1     ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111                                                                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4     ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111                                                                    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                                                          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111             cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11           cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44       333ccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4            33ccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4              3333ccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccc44        33cccccccccccccccccccc4               3333ccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4      ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccc4             33cccccccccccccccc4                3333ccccccccccccccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc4              33cccccccccccccccc4                3333ccccccccccccccccccccccccccccccc         2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc4                cccccccccccccc44                     333cccccccccccccccccccccccccccc         2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc                 ccccccccccc444                       333ccccccccccccccccccccccccccc4         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc                 ccccccccccc444                       333ccccccccccccccccccccccccc44          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc                 cccccccc444                             3333ccccccccccccccccccccc44          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc                 cccccccc444                             3333ccccccccccccccccccccc44          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc                 ccccccc4                                    3cccccccccccccccccccc44          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc1                ccccccc4                                     3333333333cccccccccc44         2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc1             222cccc444                                      3333333333cccccccccc44         2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccc1             222cccc444          2cc1                        3333333333cccccccc44           2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccc1            222cc44           22cccc11                      3333333333cccccccc44          2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccc1           33ccc44      2222ccccccccc111                   3333333333cccccc44            2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccc111  2     334          2222cccccccccccc1                            3cc44              2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccc2                  2222ccccccccccccc        c111111                                ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc2                 2222ccccccccccccc        c111111                                ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccc2           222222ccccccccccccccccc        c111111                                ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccc22         222222ccccccccccccccccc        ccccccc1                               ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc222      222222ccccccccccccccccc        cccccccc11                             3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       2cccccccccc111                           333333333333cccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       2ccccccccccccc11                         333333333333cccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4       cccccccccccccccc111                      333333333333cccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4       ccccccccccccccccccc11                    333333333333cccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4        ccccccccccccccccccccc111111                          3333cccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",

"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4       2ccccccccccccccccccccc111111                          3333cccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       2ccccccccccccccccccccccccccc111111111111                  33cccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       cccccccccccccccccccccccccccc111111111111                    3ccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       cccccccccccccccccccccccccccc111111111111                     33333333ccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4       cccccccccccccccccccccccccccccccccccccccc11                   33333333ccccccccccccccccccccccccccccccccccc       ccccc444      3333ccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4       cccccccccccccccccccccccccccccccccccccccccc111111             33333333ccccccccccccccccccccccccccccccccccc       cccc4         3333ccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccccccccccccccccccccccccccccccccccccc111111             33333333ccccccccccccccccccccccccccccccccccc       cc44              333cccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccccccccccccccccccccccccccccccccccccccccccc1111                         3333ccccccccccccccccccccccc       cc44              333cccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccccccccccccccccccccccccccccccccccccccccccc1111                             33ccccccccccccccccccccc       cc44              333cccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccccccccccccccccccccccccccccccccccccccccccccccc111                            333ccccccccccccccc444       cc44                 cccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                            333ccccccccccc444       34                   3ccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1        cccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                                333ccccccc444                             ccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         222cccc111111                                                    ccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       22ccccccc111111                                                   2ccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       22ccccccccccccccc111                                              cccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       cccccccccccccccccccccc111111               2ccc1                  cccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1      ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       cccccccccccccccccccccc111111             22ccccc                22cccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       cccccccccccccccccccccccccccccccccccccccccccccccc11              22cccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       ccccccccccccccccccccccccccccccccccccccccccccccccccc11        22ccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        33ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1         33ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc      33ccccccccccccccccccccccccccccccccccccccccccccccccccccccc1         33ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444      33cccccccccccccccccccccccccccccccccccccccccccccccccccccccc1          33ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44     33ccccccccccccc4444         3333ccccccccccccccc44          33ccccccccccccccccccccccc11          333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44             3333ccccc4444         3333ccccccccccccccc44            333cccccccccccccccccccccc1            3333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44             3333ccccc4444              33ccccccccccc4              333ccccccccccccccccccccccc1111            333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                    34                           33cccc4              333ccccccccccccccccccccccc1111               33ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",


"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                               221                                        ccccccccccccccccccccccccccc11               33ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4       22ccc1                  22cc1                                      ccccccccccccccccccccccccccccc111            33ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        22cccc111111        2222cccccc11                                   ccccccccccccccccccccccccccccccccc1111         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccc111111        2222ccccccccc11                                33ccccccccccccccccccccccccccccccccccc         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccccccccccccccccccccccccccccccccc1                               33333333ccccccccccccccccccccccccc4         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccc1111                       33333333ccccccccccccccccccccccccc4         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       ccccccccccccccccccccccccccccccccccccccccccc1111                               33333cccccccccccccccccccc          ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       ccccccccccccccccccccccccccccccccccccccccccccccc1                                   33cccccccccccccccccc         2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       3ccccccccccccccccccccccccccccccccccccccccccccccc11                                   333ccccccccccccccc         2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       3ccccccccccccccccccccccccccccccccccccccccccccccccc1                                     333333ccccccccc        2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccc111        22ccc11                  333333ccccccccc        2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11      3ccccccccccccccccccccccccccccccccccccccccccccccccccccc11      3cccccccc11              333333cccccccc4        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11      3ccccccccccccccccccccccccccccccccccccccccccccccccccccccc111    3cccccccccc1111               333ccccc4        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11       33ccccccccccccccccccccccccccccccccccccccccccccccccccccc111    3cccccccccc1111                  33334        2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11         3cccccccccccccccccccccccccccccccccccccccccccccccccccc111     3cccccccccccccc11               33334        2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11          3ccccccccccccccccccccccccccccccccccccccccccccccccccc111      3ccccccccccccccccc11                        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11          3ccccccccccccccccccccccccccccccccccccccccccccccccccc111      3ccccccccccccccccccccc111111               2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc           33ccccccccccccccccccccccccccccccccccccccccccccccccc111       3ccccccccccccccccccccc111111              2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111          3ccccccccccccccccccccccccccccccccccccccccccccccccccc11      333ccccccccccccccccccccccccc11           ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111           33ccccccccccccccccccccccccccccccccccccccccccccccccc11      333cccccccccccccccccc444444444          2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111             333cccccccccccccccccccccccccccccccccccccccccccccccc      333cccccccccccccccccc444444444          2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111111     333cccccccccccccccccccccccccccccccccccccccccccccccc1     333cccccccccccccccccc444444444          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111111     333cccccccccccccccccccccccccccccccccccccccccccccccc1     333cccccccccccccccccc444444444         2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111111        3cccccccccccccccccccccccccccccccccccccccccccccccc     333cccccccccccccccccc444444444         2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111111        3cccccccccccccccccccccccccccccccccccccccccccccccc1       3333cccccccccccccc444444444        2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1        cccccccccccccccccccccccccccccccccccccccccccccccc1       3333cccccccccccccc444444444        2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       3cccccccccccccccccccccccccccccccccccccccccccccccc111    3333cccccccccccccc444444444       2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       3cccccccccccccccccccccccccccccccccccccccccccccccc111    3333cccccccccccccc444444444       2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc       3cccccccccccccccccccccccccccccccccccccccccccccccc111    3333cccccccccccccc444444444    222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccc        33cccccccccccc444444444    222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccc1111111 33cccccccccccc444444444    222ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccc1111111 33cccccccccccc444444444    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44       2ccccccccccccccccccccccccccccccccccccccccccccccccccc1111111   33333ccccccc444444444  22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44       2ccccccccccccccccccccccccccccccccccccccccccccccccccc1111111   33333ccccccc444444444  22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4444    222cccccccccccccccccccccccccccccccccccccccccccccccccccc1111111   33333ccccccc444444444  22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc444        222cccccccccccccccccccccccccccccccccccccccccccccccccccc1111111   33333ccccccc444444444  22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc444        222cccccccccccccccccccccccccccccccccccccccccccccccccccc1111111   33333ccccccc44444444422cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc444      22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        3cccccc         22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       3ccccc4         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       3333c4        2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       3333c         2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11     3333c         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11     33334         ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc        3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                 2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1       3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                 2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11               cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1        333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11               cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11      333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1              cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11      333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1              cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4             2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11         33333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4             2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111     33333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4             2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111     33333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44          2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111     33333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44          2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111     33333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44      2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11   33333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44      2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc   33333333cccccccccccccccccccccccccccccccccccccccccccccccccccccccc4        2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111      3ccccccccccccccccccccccccccccccccccccccccccccccccccccccc4        2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111       3333ccccccccccccccccccccccccccccccccccccccccccccccccccc4        2222cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111       3333cccccccccccccccccccccccccccccccccccccccccccccccccc4       22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111           333ccccccccccccccccccccccccccccccccccccccccccccccc4       22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111              3333ccccccccccccccccccccccccccccccccccccccccccc4       22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111  3333ccccccccccccccccccccccccccccccccccccccccccc4       22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111      333333ccccccccccccccccccccccccccccccccccccc4       22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111      333333cccccccccccccccccccccccccccccccccccc4        22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111            33ccccccccccccccccccccccccccccccccc4        2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111              3ccccccccccccccccccccccccccccccc4       22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111111111               33ccccccccccccccccccccccccccccc4       22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111111         3ccccccccccccccccccccccccccc4        22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11111111          3333ccccccccccccccccccccccc4        22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111       3333ccccccccccccccccccccccc4       2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111          333cccccccccccccccccccc4       2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111111111   3ccccccccccccccccccc4       2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111111111    3333cccccccccccccc4      22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111111111    3333cccccccccccccc4      22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111111111        333333cccccccc4      22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111111111        333333ccccccc4       22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1             3cccccc4      2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                       2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                   2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                   cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111                cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11             2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111          2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4         2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4         2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc          cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11        ccccc44      333333ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444444    33333333ccccc11        3ccc4        333333c44       3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444444    333333334444444                     3333334         3cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444444                                                         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444444                                                         cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444444                                                        2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444444                                                        2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444444                                                        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc44444444                                                        ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                                                                333cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc4                                                                   3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                    3ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                     ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                     ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                     ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                     ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                   22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                   22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                   22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                                                                  22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                                                                22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc                                                                22ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1                                                              2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                                                          2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc1111                                                         2cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc11   22ccccccc111111                                2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111        222ccccc111111          2ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc111111        22cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
"ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",

            
        ]

        let characters = ["c", "1", "2", "3", "4"];
        for (let ch = 0; ch < characters.length; ch++) {

            let colliderLeft = [];
            let colliderTop = [];
            let colliderRight = [];
            let colliderBottom = [];

            for (let i = 0; i < colliderText.length; i++) {
                for (let j = 0; j < colliderText[i].length; j++) {
                    if (colliderText[i].charAt(j) == characters[ch]) {
                        colliderLeft[colliderLeft.length] = j;
                        colliderTop[colliderTop.length] = i;
                        while (colliderText[i].charAt(j) == characters[ch]) {
                            j++;
                        }
                        colliderRight[colliderRight.length] = j;
                        colliderBottom[colliderBottom.length] = (i + 1);
                        let joined = false;
                        let index = colliderLeft.length - 1;
                        for (let k = 0; k < index && !joined; k++) {
                            if (colliderLeft[index] == colliderLeft[k]) {

                                if (colliderRight[index] == colliderRight[k]) {
                                    
                                    if (colliderTop[index] == colliderBottom[k]) {

                                        joined = true;
                                        colliderBottom[k] = colliderBottom[index];
                                        colliderLeft.splice(index, 1);
                                        colliderRight.splice(index, 1);
                                        colliderTop.splice(index, 1);
                                        colliderBottom.splice(index, 1);
                                        
                                    }

                                }

                            }
                        }
                    }
                }
            }
            // let xOffset = -3000;
            // let yOffset = 1320;
            let xOffset = 750;
            let yOffset = 1300;
            // let xOffset = 0;
            // let yOffset = 0;
            for (let i = 0; i < colliderLeft.length; i++) {
                switch (ch) {
                    case 0 :
                        this.addCollider(null, GRID_SIZE * colliderLeft[i] + xOffset, GRID_SIZE * colliderTop[i] + yOffset, GRID_SIZE * colliderRight[i] + xOffset, GRID_SIZE * colliderBottom[i] + yOffset, CORNERS);
                        break;
                    case 1 :
                        this.addCollider(null, GRID_SIZE * colliderLeft[i] + xOffset, GRID_SIZE * colliderTop[i] + yOffset, GRID_SIZE * colliderRight[i] + xOffset, GRID_SIZE * colliderBottom[i] + yOffset, CORNERS, TOP_RIGHT);
                        break;
                    case 2 :
                        this.addCollider(null, GRID_SIZE * colliderLeft[i] + xOffset, GRID_SIZE * colliderTop[i] + yOffset, GRID_SIZE * colliderRight[i] + xOffset, GRID_SIZE * colliderBottom[i] + yOffset, CORNERS, TOP_LEFT);
                        break;
                    case 3 :
                        this.addCollider(null, GRID_SIZE * colliderLeft[i] + xOffset, GRID_SIZE * colliderTop[i] + yOffset, GRID_SIZE * colliderRight[i] + xOffset, GRID_SIZE * colliderBottom[i] + yOffset, CORNERS, BOTTOM_LEFT);
                        break;
                    case 4 :
                        this.addCollider(null, GRID_SIZE * colliderLeft[i] + xOffset, GRID_SIZE * colliderTop[i] + yOffset, GRID_SIZE * colliderRight[i] + xOffset, GRID_SIZE * colliderBottom[i] + yOffset, CORNERS, BOTTOM_RIGHT);
                        break;
                }
            }
        }
    }

}