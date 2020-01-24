"use strict";

function Game() {
  this.canvas = null;
  this.ctx = null;
  this.bubbles = [];
  this.player = null;
  this.gameRunning = false;
  this.gameScreen = null;
  this.score = 0;
  //Players
  //Bubbels
  //Bullets
  //Structures
  //Levels
  //detectCollision();
  // updateScore();
  //updateState(); Bubbles, players, bullets, etc etc etc
  // restartGame();
}


Game.prototype.start = function(){
  this.gameRunning = !this.gameRunning
  this.startLoop();
}

Game.prototype.startLoop = function() {
  var loop = function() {
    if (this.gameRunning){
      console.log("game running");
      requestAnimationFrame(loop);
    } 
  }.bind(this);

  requestAnimationFrame(loop)
  // window.requestAnimationFrame(this.startLoop);
};

Game.prototype.checkCollision = function() {};

Game.prototype.updateLevel = function() {};

Game.prototype.clearCanvas = function() {};

Game.prototype.updateStatus = function() {};

Game.prototype.updateCanvas = function() {};

Game.prototype.draw = function() {};

Game.prototype.goToGameOver = function() {};

Game.prototype.removePlayerLife = function() {};

Game.prototype.handleBubblePop = function() {};
