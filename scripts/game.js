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
    }
    if (event.key === " ") {
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
      console.log("game running");
      this.updateStatus();
      requestAnimationFrame(loop);
    }
  }.bind(this);

  requestAnimationFrame(loop);
};

Game.prototype.checkCollision = function() {};

Game.prototype.updateLevel = function() {};

Game.prototype.clearCanvas = function() {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0, 0, this.containerWidth, this.containerHeight);
};

Game.prototype.updateStatus = function() {
  this.clearCanvas();
  this.bubble.update();
  this.bubble.draw();
  this.drawBullet();
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
    let bullet = new Bullets();
    bullet.x = 400;
    bullet.y = 300;
    this.bullets.push(bullet);
  }
};
//Backlog
// Game.prototype.loadLevel = function() {
//   let bubble = new Bubbles(this.canvas,300,200);
//   this.bubbles.push(bubble);
// };

Game.prototype.countLevelTime = function() {};

Game.prototype.drawBullet = function() {
  this.bullets.forEach(function(bulletObject) {
    console.log('bulletObject :', bulletObject);

    this.ctx.fillStyle = "red";
    // fillRect(x, y, width, height)
    this.ctx.fillRect(
      bulletObject.x,
      bulletObject.y,
      bulletObject.width,
      bulletObject.height
    );
  }, this);
};
