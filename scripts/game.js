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
  this.bubble = new Bubbles(this.canvas, 300, 400); //This should be loadlevel()

  //Add event listener for right/left keys
  this.handleKeyDown = function(event) {
    if (event.key === "ArrowLeft") {
      this.player.move("left");
    } else if (event.key === "ArrowRight") {
      this.player.move("right");
    } else if (event.key === " ") {
      this.shoot();
    }
  };
  document.body.addEventListener("keydown", this.handleKeyDown.bind(this));
  //Start game loop
  //this.loadLevel();
  this.startLoop();
};

Game.prototype.startLoop = function() {
  var loop = function() {
    if (this.gameRunning) {
      this.updateStatus();
      requestAnimationFrame(loop);
    }
  }.bind(this);

  requestAnimationFrame(loop);
};

Game.prototype.checkCollision = function() {
  if(this.bullets.length > 0 && this.didCollide(this.bubble,this.bullets[0])){
    this.bubble.size = 0;
  }
  
};

Game.prototype.updateLevel = function() {};

Game.prototype.clearCanvas = function() {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0, 0, this.containerWidth, this.containerHeight);
};

Game.prototype.updateStatus = function() {
  this.clearCanvas();
  this.bubble.update();
  this.bubble.draw();
  this.updateBullets();
  this.drawBullet();
  this.checkCollision();
  this.player.draw();
};

Game.prototype.updateCanvas = function() {}; // IDK WHY THIS IS HERE?

Game.prototype.goToGameOver = function() {};

Game.prototype.removePlayerLife = function() {};

Game.prototype.handleBubblePop = function() {};

Game.prototype.removeGameScreen = function() {};

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
//Backlog
// Game.prototype.loadLevel = function() {
//   let bubble = new Bubbles(this.canvas,300,200);
//   this.bubbles.push(bubble);
// };

Game.prototype.countLevelTime = function() {};

Game.prototype.drawBullet = function() {
  if (this.bullets.length > 0) {
    this.bullets.forEach(function(bulletObject, index) {
      if (bulletObject.isMaxLength()) {
        this.bullets.splice(index, 1);
        this.player.ammo++;
      }
      this.ctx.fillStyle = "red";
      // fillRect(x, y, width, height)
      this.ctx.fillRect(
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

Game.prototype.didCollide = function(bubble, bullet) {
  var bubbleLeft = bubble.x;
  var bubbleRight = bubble.x + bubble.size;
  var bubbleTop = bubble.y;
  var bubbleBottom = bubble.y + bubble.size;

  var bulletLeft = bullet.x;
  var bulletRight = bullet.x + bullet.width;
  var bulletTop = bullet.y;
  var bulletBottom = bullet.y + bullet.height;

  var crossRight = bulletLeft <= bubbleRight && bulletLeft >= bubbleLeft;
  var crossLeft = bulletRight >= bubbleLeft && bulletRight <= bubbleRight;
  var crossTop = bulletBottom >= bubbleTop && bulletBottom <= bubbleBottom;
  var crossBottom = bulletTop <= bubbleBottom && bulletTop >= bubbleTop;

  if ((crossRight || crossLeft) && (crossBottom || crossTop)) {
    console.log("collided");
    return true;
  }
  return false;
};
