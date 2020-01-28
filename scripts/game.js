"use strict";

function Game() {
  this.canvas = null;
  this.ctx = null;
  //Bubbels
  this.bubbles = [];
  //Players
  this.player = null;
  //Bullets
  this.bullets = [];
  this.gameRunning = false;
  this.gameScreen = null;
  this.score = 0;
  this.levelTimeOut = false;
  // BACLLOG Levels
  this.bullet;
  this.keys = {};
  this.img = new Image();
  this.img.src = "./images/1920x1080.png";
}

Game.prototype.start = function() {
  this.canvasContainer = document.querySelector(".canvas-container");
  this.canvas = this.canvasContainer.querySelector("canvas");
  this.ctx = this.canvas.getContext("2d");

  //Get dimensins of container with margins/paddings included.
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.containerWidth = this.canvasContainer.offsetWidth;
  //Canvas to take up all of the parents width.
  this.canvas.setAttribute("width", this.containerWidth);
  this.canvas.setAttribute("height", this.containerHeight);
  this.gameRunning = !this.gameRunning;

  //Create new player
  this.player = new Player(this.canvas);
  //Draw bubbles
  //this.bubble = new Bubbles(this.canvas, 300, 400); //This should be loadlevel()
  this.loadLevel();
  console.log("loading");

  //Add event listener for right/left keys
  // this.handleKeyDown = function(event) {
  //   switch (event.keyCode) {
  //     case 37:
  //       this.player.move("left");
  //       break;
  //     case 39:
  //       this.player.move("right");
  //       break;
  //     default:
  //       break;
  //   }
  // };

  this.handleShoot = function(event) {
    if (event.keyCode === 32) {
      this.shoot();
    }
  };

  window.addEventListener(
    "keydown",
    function(event) {
      if (!this.keys[event.key]) this.keys[event.key] = true;
      // console.log("Pressed ", event.key);
    }.bind(this)
  );
  window.addEventListener(
    "keyup",
    function(event) {
      if (this.keys[event.key]) this.keys[event.key] = false;
      // console.log("Released ", event.key);
    }.bind(this)
  );
  // document.body.addEventListener("keydown", this.handleKeyDown.bind(this));
  document.body.addEventListener("keypress", this.handleShoot.bind(this));
  //Start game loop
  //this.loadLevel();
  this.startLoop();
};

Game.prototype.startLoop = function() {
  var loop = function() {
    if (this.gameRunning) {
      if (this.keys["ArrowLeft"]) this.player.move("left");
      if (this.keys["ArrowRight"]) this.player.move("right");
      this.printScore();
      this.printLives();
      this.updateStatus();
      requestAnimationFrame(loop);
    }
  }.bind(this);

  requestAnimationFrame(loop);
};

Game.prototype.checkPlayerCollision = function() {
  this.bubbles.forEach(function(bubble, index) {
    if (this.didCollide(this.player, bubble)) {
      this.player.removeLife();
      this.bubbles.splice(index, 1);
      this.bubbles.length = 0;
      this.player.x = this.containerWidth / 2;
      this.loadLevel();
      //TODO : should restart game
      if (this.player.lives <= 0) {
        this.goToGameOver();
      }
    }
  }, this);
};

Game.prototype.checkBulletCollision = function() {
  this.bubbles.forEach(function(bubble, index) {
    if (this.bullets.length > 0 && this.didCollide(bubble, this.bullets[0])) {
      this.handleBubblePop(bubble, index);
      this.score += 100;
    }
  }, this);
};

Game.prototype.updateLevel = function() {};

Game.prototype.clearCanvas = function() {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0, 0, this.containerWidth, this.containerHeight);
  this.ctx.drawImage(this.img, 0, 0, this.containerWidth, this.containerHeight);
};

Game.prototype.updateStatus = function() {
  this.bubbles.forEach(function(bubble) {
    bubble.update();
  }, this);
  this.updateBullets();
  this.checkPlayerCollision();
  this.checkBulletCollision();
  this.clearCanvas();
  this.drawBubble();
  this.drawBullet();
  this.player.draw();
};

Game.prototype.updateCanvas = function() {}; // IDK WHY THIS IS HERE?

Game.prototype.goToGameOver = function() {
  this.gameRunning = false;
  this.onStartover();
  // this.removeGameScreen();
};

Game.prototype.removePlayerLife = function() {};

Game.prototype.handleBubblePop = function(bubble, index) {
  if (bubble.size >= 45) {
    bubble.size -= 15;
    let newBubble = new Bubbles(this.canvas, bubble.x, bubble.y);
    newBubble.size = bubble.size;
    newBubble.vx *= -1;
    this.bubbles.push(newBubble);
    this.bullets.splice(0, 1);
    this.player.ammo++;
  } else {
    this.bubbles.splice(index, 1);
    this.bullets.splice(0, 1);
    this.player.ammo++;
  }
};

Game.prototype.removeGameScreen = function() {
  this.gameScreen.remove();
};

Game.prototype.restartGame = function() {};

Game.prototype.shoot = function() {
  if (this.player.ammo > 0) {
    let bullet = new Bullets(this.canvas);
    bullet.x = this.player.x + this.player.size / 2 - bullet.width / 2;
    bullet.y = this.player.y;
    this.bullets.push(bullet);
    this.player.ammo--;
  }
};
// Backlog
Game.prototype.loadLevel = function() {
  let bubble = new Bubbles(this.canvas, 300, 200);
  this.bubbles.push(bubble);
  let bubble2 = new Bubbles(this.canvas, 400, 200);
  this.bubbles.push(bubble2);
};

Game.prototype.countLevelTime = function() {};

Game.prototype.drawBullet = function() {
  if (this.bullets.length > 0) {
    this.bullets.forEach(function(bulletObject, index) {
      if (bulletObject.isMaxLength()) {
        this.bullets.splice(index, 1);
        this.player.ammo++;
      }
      this.ctx.fillStyle = "red";
      var img = new Image();
      img.src = "./images/ammo_machinegun.png";
      // fillRect(x, y, width, height)
      this.ctx.drawImage(
        img,
        bulletObject.x,
        bulletObject.y,
        bulletObject.width,
        bulletObject.height
      );
    }, this);
  }
};

Game.prototype.updateBullets = function() {
  this.bullets.forEach(function(bulletObject) {
    bulletObject.updateBullet();
  }, this);
};

Game.prototype.didCollide = function(firstTarget, secondTarget) {
  var firstTargetLeft = firstTarget.x;
  var firstTargetRight = firstTarget.x + firstTarget.size;
  var firstTargetTop = firstTarget.y;
  var firstTargetBottom = firstTarget.y + firstTarget.size;

  var secondTargetLeft = secondTarget.x;
  var secondTargetRight = secondTarget.x + secondTarget.width;
  var secondTargetTop = secondTarget.y;
  var secondTargetBottom = secondTarget.y + secondTarget.height;

  var crossRight =
    secondTargetLeft <= firstTargetRight && secondTargetLeft >= firstTargetLeft;
  var crossLeft =
    secondTargetRight >= firstTargetLeft &&
    secondTargetRight <= firstTargetRight;
  var crossTop =
    secondTargetBottom >= firstTargetTop &&
    secondTargetBottom <= firstTargetBottom;
  var crossBottom =
    secondTargetTop <= firstTargetBottom && secondTargetTop >= firstTargetTop;

  if ((crossRight || crossLeft) && (crossBottom || crossTop)) {
    return true;
  }
  return false;
};

Game.prototype.drawBubble = function() {
  this.bubbles.forEach(function(bubble) {
    bubble.draw();
  }, this);
};

Game.prototype.passGameOverCallback = function(callback) {
  this.onStartover = callback;
};

Game.prototype.printScore = function() {
  let scoreElement = document.querySelector("span#score");
  scoreElement.innerHTML = this.score;
};

Game.prototype.printLives = function() {
  let livesElement = document.querySelector("span#lives");
  if (this.player) livesElement.innerHTML = this.player.lives;
};
