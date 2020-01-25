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
  this.canvas.setAttribute('width', this.containerWidth);
  this.canvas.setAttribute('height', this.containerHeight);

  this.gameRunning = !this.gameRunning;

  //Create new player
  this.player = new Player(this.canvas);
  //Draw bubbles
  this.bubble = new Bubbles(this.canvas);

  //Add event listener for right/left keys
  document.body.addEventListener('keydown', this.player.move)
  //Start game loop
  this.player.draw()
  this.bubble.draw();


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

Game.prototype.clearCanvas = function() {};

Game.prototype.updateStatus = function() {
  this.bubble.update()
  this.bubble.draw();
};

Game.prototype.updateCanvas = function() {}; // IDK WHY THIS IS HERE?

Game.prototype.draw = function() {
  this.player.draw();
};

Game.prototype.goToGameOver = function() {};

Game.prototype.removePlayerLife = function() {};

Game.prototype.handleBubblePop = function() {};

Game.prototype.removeGameScreen = function() {};

Game.prototype.restartGame = function() {};

Game.prototype.loadLevel = function(){
  bubble = new Bubbles;
  this.bubbles.push(bubble)

}