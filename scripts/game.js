'use strict'

function Game() {
  let gameRunning = false;
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

Game.prototype.startLoop(){
  var loop = function(){
    console.log('IN LOOP YO');
  }

  if (gameRunning) requestAnimationFrame(loop).bind(this);
}

Game.prototype.checkCollision(){}

Game.prototype.updateLevel(){}

Game.prototype.clearCanvas(){}

Game.prototype.updateStatus(){}

Game.prototype.updateCanvas(){}

Game.prototype.draw(){}

Game.prototype.goToGameOver(){}

Game.prototype.removePlayerLife();

Game.prototype.handleBubblePop();
