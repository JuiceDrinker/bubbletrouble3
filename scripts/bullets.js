"use strict"
function Bullets(canvas) {
  this.canvas = canvas;
  //speed
  this.speed = 10;
  //direction
  this.x = -200;
  this.y = -100;
  this.width = 20;
  this.height = 40;
  //collision
  //special effects (?)
}

Bullets.prototype.updateBullet = function(){
  if(!this.maxLength) {
    this.y -= this.speed
  }
}

Bullets.prototype.isMaxLength = function(){
  if(this.y < 0){
    return true;
  }
  return false;
}