"use strict";
function Bubbles(canvas, x, y, size) {
  //Not sure if we need to put canvas here
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  //Size/"Lives"
  this.size = size;
  this.width = this.size;
  this.height = this.size;
  // (x,y)
  this.x = x;
  this.y = y;
  // change speed of bubbles with this constant;
  this.t = 0.4;

  this.initialize();
}

Bubbles.prototype.initialize = function() {
  // not sure if these are the correct properties that need to be resetted, just guessing
  // moved it into a dedicated function so you don't get duplicate code inside resetAfterCollision()
  // you could also omit resetAfterCollision() and just call this function from game.js, but I guess it's a little more self-explaining that way

  this.vx = 10;
  this.vxmax = 20;
  this.vxmin = 3;
  this.vy = 10;
  this.vymin = 20;
  this.vymax = 50;
}

Bubbles.prototype.resetAfterCollision = function() {
  this.initialize();
}

Bubbles.prototype.checkWall = function() {
  if (this.x + this.size > this.canvas.width && this.vx > 0) {
    //Check leftmos
    this.vx *= -1;
  }
  if (this.x < 0 && this.vx < 0) {
    this.vx *= -1;
  }
};

Bubbles.prototype.checkBounce = function() {
  if (this.y >= this.canvas.height - this.size * 1.4 && this.vy > 0) {
    if (this.vy < this.vymax) {
      this.vy *= -1;
    } else {
      this.vy *= -0.9;
    }
    if (Math.abs(this.vx) > this.vxmax) this.vx *= 0.8 + 0.2 * Math.random();
    else if (Math.abs(this.vx) < this.vxmin) this.vx *= 1 + 0.2 * Math.random();
    else this.vx *= 0.9 + 0.2 * Math.random();
  }
};

Bubbles.prototype.move = function() {
  this.checkWall();
  this.checkBounce();
  this.x += this.vx * this.t;
  this.y += this.vy * this.t;
  this.vy += 1;
};

Bubbles.prototype.draw = function() {
  this.ctx.fillStyle = "green";
  var img = new Image();
  img.src = "./images/ball_volley2.png";
  // fillRect(x, y, width, height)
  this.ctx.drawImage(img, this.x, this.y, this.size, this.size);
};

Bubbles.prototype.returnBubble = function() {
  return this.returnBubble;
};

Bubbles.prototype.update = function() {
  this.move();
  this.draw();
  this.returnBubble();
};


