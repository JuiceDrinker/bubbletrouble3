"use strict"

function Player(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.lives = 5;
  this.size = 75;
  this.width = this.size;
  this.heieght = this.size
  this.speed = 3;
  this.x = this.canvas.width / 2;
  this.y = this.canvas.height - this.size;
  this.ammo = 1;
}

Player.prototype.move = function(moveString) {
  if (this.screenCollision(moveString)) {
    switch (moveString) {
      case "left":
        this.x -= this.speed;
        break;
      case "right":
        this.x += this.speed;
        break;
      default:
        break;
    }
  }
};

Player.prototype.screenCollision = function(moveString) {
  if (this.x <= 0 && moveString === "left") return false;
  else if (this.x + this.size > this.canvas.width && moveString === "right")
    return false;
  return true;
};

Player.prototype.draw = function() {
  var img = new Image();
  img.src = './images/panda.png'
  this.ctx.fillStyle = "#66D3FA";
  // fillRect(x, y, width, height)
  this.ctx.drawImage(img,this.x, this.y, this.size, this.size);
};

Player.prototype.removeLife = function(){
  this.lives--;
}