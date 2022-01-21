/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

let windowIsFullscreen = false;

let bleeRunningLeft, bleeRunningRight, transitionToHover, transitionToIdle, bleeHover, bleeIdle;
const BLEE_RUNNING_FRAMES = 8, HOVER_TRANSITION_FRAMES = 12, BLEE_HOVER_FRAMES = 4, BLEE_IDLE_FRAMES = 8;

const BOTTOM_LEFT = "BOTTOM_LEFT", TOP_LEFT = "TOP_LEFT", TOP_RIGHT = "TOP_RIGHT", BOTTOM_RIGHT = "BOTTOM_RIGHT";
const ANIMATION = "ANIMATION", IMAGE = "IMAGE";

const GRID_SIZE = 50;

let pathPainter;
let pureVoid, topCloud;

let world;
let player;
let cameraX, cameraY;
let leftTranslateField = 200, rightTranslateField = 200;
let topTranslateField = 150, bottomTranslateField = 100;
let UNIT;

let displayedMouseCoordsBasedOnCamera = true;
let leftKeys = [];
let rightKeys = [];
let spaceKey;
let resetKey;
let fullscreenKey;

let pixelFont;

let controllingPlayerWithMouse = false;

let currentColor = [0, 0, 160], toColor = [0, 0, 160];

let instructionBubble, instructionBubble2, wireTextBubble, startButtonTextBubble, stopBubble;
let gbjPresents, dttwImage;

const OPENING_SCENE = "OPENING_SCENE", START_MENU = "START_MENU";

const LANDING = "LANDING", TEXT = "TEXT", CHECK_POINT = "CHECK_POINT";

let onCutScene = false;
let cutScene = null;
let cutSceneStartTime = 0;
let closedPizza, openPizza;
let bleeIdleImg, bleeArm, bleeReaction;
let outlet, wire;
let makHandOpen, makHandClosed, makFingersClosed, makHead, mak;
let hundredPizzas;

let music, hitSound, startFloat, typeSound, pizzaSound, gubsSounds, lugSounds;

let soundIsOn = true;

let glor, luk, gubs, glu, jug, brik, jor, rog, doj, lugs;

const GLOR = "GLOR", LUK = "LUK", JUG = "JUG", BRIK = "BRIK", MAK = "MAK";
let clickAction;

var scl;
const GAME_WIDTH = 1536, GAME_HEIGHT = 760;
const HALF_WIDTH = GAME_WIDTH*0.5;
const HALF_HEIGHT = GAME_HEIGHT*0.5;
var canvasWidth, canvasHeight;

function preload() {

  bleeRunningLeft = new Animation("assets/blee/BleeRunningLeft", BLEE_RUNNING_FRAMES, 4);
  bleeRunningRight = new Animation("assets/blee/BleeRunningRight", BLEE_RUNNING_FRAMES, 4);
  bleeIdle = new Animation("assets/blee/BleeIdle", BLEE_IDLE_FRAMES, 4);
  transitionToHover = new Animation("assets/blee/TransitionToHover", HOVER_TRANSITION_FRAMES, 4);
  transitionToIdle = new Animation("assets/blee/TransitionToIdle", HOVER_TRANSITION_FRAMES, 4);
  bleeHover = new Animation("assets/blee/BleeHover", BLEE_HOVER_FRAMES, 6);

  pureVoid = loadImage("assets/sprites/pureVoid.png");
  topCloud = loadImage("assets/sprites/topCloud.png");

  pixelFont = loadFont("assets/Minecraft.ttf");

  closedPizza = loadImage("assets/sprites/closedPizza.png");
  openPizza = loadImage("assets/sprites/RechargablePizza.png");
  bleeIdleImg = loadImage("assets/blee/BleeIdleImg.png");
  bleeArm = loadImage("assets/blee/bleeArm.png");
  bleeReaction = new Animation("assets/blee/bleeReaction", 8, 8);
  outlet = loadImage("assets/sprites/outlet.png"); 
  wire = loadImage("assets/sprites/wire.png");
  makHandOpen = loadImage("assets/sprites/makHandOpen.png"); 
  makHandClosed = loadImage("assets/sprites/makHandClosed1.png");
  makFingersClosed = loadImage("assets/sprites/makHandClosed2.png");
  makHead = loadImage("assets/sprites/makHead.png");
  mak = loadImage("assets/sprites/mak.png");
  hundredPizzas = loadImage("assets/sprites/hundredPizzas.png");

  gbjPresents = loadImage("assets/sprites/gamesByJamesPresents.png");
  dttwImage = loadImage("assets/sprites/dttwImage.png");

  glor = loadImage("assets/sprites/glor.png");
  luk = loadImage("assets/sprites/luk.png");
  brik = loadImage("assets/sprites/brik.png");
  jug = loadImage("assets/sprites/jug.png");
  jor = loadImage("assets/sprites/jor.png");
  rog = loadImage("assets/sprites/rog.png");
  glu = new Animation("assets/sprites/glu", 4, 8);
  gubs = new Animation("assets/sprites/gubs", 4, 8);
  doj = new Animation("assets/sprites/doj", 8, 8);
  lugs = new Animation("assets/sprites/lugs", 4, 8);

  pathPainter = new PathPainter();

  music = loadSound("assets/sounds/song2.wav");
  hitSound = loadSound("assets/sounds/hitSound.wav");
  hitSound.setVolume(0.5);
  startFloat = loadSound("assets/sounds/startFloat.wav");
  typeSound = loadSound("assets/sounds/typeSound.wav");
  typeSound.setVolume(0.3);
  pizzaSound = loadSound("assets/sounds/pizzaSound.wav");
  gubsSounds = loadSound("assets/sounds/gubsSounds.wav");
  lugSounds = loadSound("assets/sounds/lugSounds.wav");
}

function setup() {

  findScaleDimensions();
  createCanvas(canvasWidth, canvasHeight);

  imageMode(CENTER);
  rectMode(CENTER);
  textFont(pixelFont);

  assignKeys();

  bleeRunningLeft.setup();
  bleeRunningRight.setup();
  transitionToHover.setup();
  bleeHover.setup();

  world = new World();
  player = new Player();

  startButtonTextBubble = new TextBubble(GAME_WIDTH*0.85, GAME_HEIGHT*0.4, 320, 245, "   PLAY", 56);
  startButtonTextBubble.setTyped();
  wireTextBubble = new TextBubble(GAME_WIDTH*0.7, GAME_HEIGHT*0.7, 300, 140, "  MY WIRE!", 40);
  wireTextBubble.addTransitionIn(BOTTOM);
  wireTextBubble.addTransitionOut(BOTTOM, 95);
  instructionBubble = new TextBubble(5800, 1000, 400, 120, "");
  instructionBubble2 = new TextBubble(6000, 1200, 400, 120, "Press R To Reset To Recent \n            Check Point");
  instructionBubble2.setTyped();
  stopBubble = new TextBubble(GAME_WIDTH*0.2, GAME_HEIGHT*0.8, 300, 140, "GIVE IT\nBACK!", 40, bleeIdle.images[0]);
  stopBubble.addTransitionIn(BOTTOM);
  stopBubble.addTransitionOut(BOTTOM, 100);

  cameraX = HALF_WIDTH-player.x;
  cameraY = HALF_HEIGHT-player.y;

  // soundIsOn = false;
  setStartMenu();
  // controllingPlayerWithMouse = true;
  // startAt(3250, 4500);
  
}

function draw() {

  scale(scl);

  if (!onCutScene) {
    world.draw();
  } else {
    drawCutScene();
  }
  fill(0);
  textSize(10);
  noStroke();
  unTranslateWindow();

  if (soundIsOn) {
    manageAudio();
  }

}

function drawCutScene() {

  switch (cutScene) {

    case OPENING_SCENE :
      drawOpeningScene();
      break;
    case START_MENU :
      drawStartMenu();

  }

}

function windowResized() {
  findScaleDimensions();
  resizeCanvas(canvasWidth, canvasHeight);
}

function findScaleDimensions() {
  let dimensionRatio = GAME_WIDTH/GAME_HEIGHT;
  canvasWidth = min(windowWidth, windowHeight*dimensionRatio);
  canvasHeight = canvasWidth / dimensionRatio;
  scl = canvasWidth / GAME_WIDTH;
}

function drawStartMenu() {
  drawBleeWithPizza();
  startButtonTextBubble.draw();
  if (startButtonTextBubble.fadeOutDelay < -12) {
    startOpeningCutScene();
  }
}

function drawBleeWithPizza() {
  background(0, 128, 64);
  push();
  translate(GAME_WIDTH*0.3, GAME_HEIGHT*0.97, 0);
  rotate(PI*1.3);
  image(wire, 0, 0);
  pop();
  noStroke();
  fill(0, 128, 64);
  rect(GAME_WIDTH*0.3, GAME_HEIGHT*0.97, GAME_WIDTH*0.25, GAME_HEIGHT*0.1);
  image(bleeIdleImg, GAME_WIDTH*0.5, GAME_HEIGHT*0.8);
  image(closedPizza, GAME_WIDTH*0.5, GAME_HEIGHT*0.9);
  image(openPizza, GAME_WIDTH*0.5, GAME_HEIGHT*0.9-14-openPizza.height*0.5);
}

function drawOpeningScene() {
  let time = frameCount - cutSceneStartTime;
  let sceneOneTime = 240;
  let sceneTwoTime = sceneOneTime + 140;
  let sceneThreeTime = sceneTwoTime + 150;
  let sceneFourTime = sceneThreeTime + 200;
  if (time < sceneOneTime) {
    drawBleeWithPizza();
    if (time == 120) {
      pizzaSound.play();
    }
    if (time > 120) {
      openPizza.resize(openPizza.width, max(openPizza.height-20, 24));
    }
  } else if (time < sceneTwoTime) {
    background(0, 100, 45);
    image(outlet, GAME_WIDTH*0.7, GAME_HEIGHT*0.45);

    let theta, speed;
    let slapTime = sceneOneTime + 80;
    if (time < slapTime) {
      theta = 0.14*PI;
      speed = time*0.3;
    } else {
      theta = 0.135*PI;
      speed = 96;
    }
   
    stroke(146, 30, 30);
    strokeWeight(40);
    line(650, 600, GAME_WIDTH*.22, GAME_HEIGHT*1.1);
    image(wire, GAME_WIDTH*0.5+speed*cos(theta-PI*0.5), GAME_HEIGHT*0.8+speed*sin(theta-PI*0.5));
    push();

    translate(GAME_WIDTH*0.4+speed*cos(theta-PI*0.5), GAME_HEIGHT+speed*sin(theta-PI*0.5),0);
    rotate(theta);
    image(bleeArm, 0, 0);
    pop();

    theta = -0.2*PI;
    if (time < slapTime) {
      speed = time*20 - 6330;
    } else {
      if (time == slapTime) {
        hitSound.play();
      }
      speed = 70;
    }
    push();
    translate(GAME_WIDTH*0.6+speed*cos(theta-PI*0.5), GAME_HEIGHT+speed*sin(theta-PI*0.5),0);
    rotate(theta);
    image(makHandOpen, 0, 0);
    pop();
    
  } else {
    background(0, 128, 64);
    if (time < sceneThreeTime) {
      if (bleeReaction.playThrough(GAME_WIDTH*0.5, GAME_HEIGHT*0.8)) {
        image(bleeReaction.images[bleeReaction.length-1], GAME_WIDTH*0.5, GAME_HEIGHT*0.8);
      }
    } else {
      
      let timeOffset = 150;
      let xOffset = (time > sceneThreeTime+timeOffset) ? (time - (sceneThreeTime+timeOffset))*30 : 0;
      image(makHead, GAME_WIDTH*0.5 + xOffset, GAME_HEIGHT*0.7);
      image(makHandClosed, GAME_WIDTH*0.25 + xOffset, GAME_HEIGHT*0.75);
      image(wire, GAME_WIDTH*0.19 + xOffset, GAME_HEIGHT*0.58);
      image(makFingersClosed, GAME_WIDTH*0.25 + xOffset, GAME_HEIGHT*0.75);
      stroke(146, 30, 30);
      strokeWeight(40);
      line(GAME_WIDTH*0.19 + xOffset-220, GAME_HEIGHT*0.58+120, GAME_WIDTH*0.19 + xOffset-280, GAME_HEIGHT);
      if (time > sceneFourTime) {
        closeCutScene();
      }
    }
  }
  if (time == constrain(time, sceneThreeTime - 150, sceneThreeTime+20)) {
    wireTextBubble.draw();
  } else if (time == constrain(time, sceneThreeTime+40, sceneThreeTime+200)) {
    stopBubble.draw();
  }
  
}

// checks if parameter is null or undefined
function validParameter(parameter) {
  if (parameter == null) {
    return false;
  }
  if (parameter == undefined) {
    return false;
  }
  return true;
}

function keyPressed() {
  for (let i = 0; i < leftKeys.length; i++) {
    if (keyCode == leftKeys[i]) {
      return player.moveLeft();
    }
  }
  for (let i = 0; i < rightKeys.length; i++) {
    if (keyCode == rightKeys[i]) {
      return player.moveRight();
    }
  }
  if (keyCode == spaceKey) {
    return player.pressSpace();
  }
  if (keyCode == resetKey) {
    return player.reset();
  }
  if (keyCode == fullscreenKey) {
    return toggleFullscreen();
  }
}

function keyReleased() {
  for (let i = 0; i < leftKeys.length; i++) {
    if (keyCode == leftKeys[i]) {
      player.unmoveLeft();
    }
  }
  for (let i = 0; i < rightKeys.length; i++) {
    if (keyCode == rightKeys[i]) {
      player.unmoveRight();
    }
  }
  if (keyCode == spaceKey) {
    player.unpressSpace();
  }
}

function mousePressed() {

  let cnvPressX = mouseX / scl;
  let cnvPressY = mouseY / scl;

  if (onCutScene) {
    switch (cutScene) {
      case START_MENU :
        if (cutSceneStartTime == -1) {
          if (startButtonTextBubble.onButton(cnvPressX, cnvPressY)) {
            startButtonTextBubble.addTransitionOut(RIGHT, 0);
          }
        }
        break;
    }
  }

  // print (round(cnvPressX - cameraX) + " , " + round(cnvPressY - cameraY));
  if (mouseButton == CENTER) {
    displayedMouseCoordsBasedOnCamera = displayedMouseCoordsBasedOnCamera ? false : true;
  }

}

function assignKeys() {

  rightKeys[0] = 37;
  rightKeys[1] = 65;

  leftKeys[0] = 39;
  leftKeys[1] = 68;

  spaceKey = 32;
  resetKey = 82;
  fullscreenKey = 70;

}

function closestTwoPiFactor(theta) {
  let factor = round(theta/(2*PI));
  factor = 2*PI*factor;
  return factor;
}

function translateWindow() {
  if (controllingPlayerWithMouse) {
    let cnvPressX = mouseX / scl;
    let cnvPressY = mouseY / scl;

    let speed = 30;
    if (mouseIsPressed) {
      speed = 3;
    }
    if (cnvPressX > HALF_WIDTH + rightTranslateField) {
      cameraX -= speed;
    } else if (cnvPressX < HALF_WIDTH - leftTranslateField) {
      cameraX += speed;
    } 
    if (cnvPressY > HALF_HEIGHT + bottomTranslateField) {
      cameraY -= speed;
    } else if (cnvPressY < HALF_HEIGHT - topTranslateField) {
      cameraY += speed;
    } 
  } else {
    cameraX = constrain(cameraX, HALF_WIDTH-player.x-leftTranslateField, HALF_WIDTH-player.x+rightTranslateField);
    cameraY = constrain(cameraY, HALF_HEIGHT-player.y-topTranslateField, HALF_HEIGHT-player.y+bottomTranslateField);
  }
  translate(cameraX, cameraY);
}

function unTranslateWindow() {
  translate(-cameraX, -cameraY);
}

function drawGrid() {
  let gridSize = GRID_SIZE;
  stroke(0);
  strokeWeight(2);
  for (let i = -cameraY; i < -cameraY + GAME_HEIGHT; i += gridSize) {
    line(-cameraX, cameraY % gridSize + i, -cameraX + GAME_WIDTH, cameraY % gridSize + i);
  }
  for (let i = -cameraX; i < -cameraX + GAME_WIDTH; i += gridSize) {
    line(cameraX % gridSize + i, -cameraY, cameraX % gridSize + i, -cameraY + GAME_HEIGHT);
  }

}

function startAt(x, y) {
  player.x = x;
  player.y = y;
}

function drawTexture() {
  let gridSize = 300;
  stroke(0);
  strokeWeight(20);
  fill(0, 100);
  for (let i = -cameraY; i < -cameraY + 2*GAME_HEIGHT; i += gridSize) {
    for (let j = -cameraX; j < -cameraX + 2*GAME_WIDTH; j += gridSize) {
      let xVal = cameraX % gridSize + j;
      let yVal = cameraY % gridSize + i;
      xVal += gridSize*noise(xVal);
      yVal += gridSize*noise(yVal);
      if (noise(xVal*256 + yVal*512) > 0.65) {
        ellipse(xVal, yVal, 100+100*noise(yVal*xVal*40), 130-50*noise(xVal*yVal*120));
      }
    }
  }
  
}

function setColor(newToColors) {
  toColor = newToColors;
}

function backgroundColor() {  

  let changeSpeed = 1;
  for (let i = 0; i < 3; i++) {
    currentColor[i] = constrain(toColor[i], currentColor[i] - changeSpeed, currentColor[i] + changeSpeed);
  }
  return color(currentColor[0], currentColor[1], currentColor[2]);
}

function setStartMenu() {
  onCutScene = true;
  cutScene = START_MENU;
  cutSceneStartTime = -1;
}

function startOpeningCutScene() {
  onCutScene = true;
  cutScene = OPENING_SCENE;
  cutSceneStartTime = frameCount;
}

function closeCutScene() {
  onCutScene = false;
  cutScene = null;
}

function playSound(sound) {
  if (soundIsOn) {
    sound.play();
  }
}

function playOnce(sound) {
  if (!sound.isPlaying) {
    playSound(sound);
  }
}

function manageAudio() {

  if (!music.isPlaying() && cutSceneStartTime != -1) {
    playSound(music);
  }

}

function mute() {
  soundIsOn = false;
  music.stop();
}

function toggleFullscreen() {

  if (windowIsFullscreen) {
    closeFullscreen();
  } else {
    openFullscreen();
  }

}
      
/* View in fullscreen */
function openFullscreen() {
  windowIsFullscreen = true;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  windowIsFullscreen = false;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}