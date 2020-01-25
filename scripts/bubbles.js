function Bubbles(canvas,x,y) {
  //Not sure if we need to put canvas here
  this.canvasContainer = document.querySelector(".canvas-container");
  this.canvas = this.canvasContainer.querySelector("canvas");
  this.ctx = this.canvas.getContext("2d");

  //Get dimensins of container with margins/paddings included.
  this.containerHeight = this.canvasContainer.offsetHeight;
  this.containerWidth = this.canvasContainer.offsetWidth;
  //Size/"Lives"
  this.size = 50;
  this.vx = 10;
  this.vy = 10;
  // (x,y)
  this.x = x;
  this.y = y;
  // change speed of bubbles with this constant;
  this.t = 0.5;
  // screenCollision()
  // movement()
}

Bubbles.prototype.checkWall = function() {
  if (this.x + this.size > this.containerWidth || this.x < this.size) {
    this.vx *= -1;
  }
};

Bubbles.prototype.checkBounce = function() {
  if (this.y >= this.containerHeight - this.size / 2 - 30 && this.vy > 0) {
    if (this.vy < 50) {
      this.vy *= -1;
      this.vx *= 0.5 + Math.random();
    } else {
      this.vy *= -0.9;
      if(Math.abs(this.vx) < 200){
        let randomNumber = Math.random()
        if(randomNumber < 0.6)
        this.vx *= 0.7 + randomNumber;
      }else this.vx *= 0.3 + randomNumber;
    }
  }
};

Bubbles.prototype.move = function() {
  this.x += this.vx * this.t;
  this.y += this.vy * this.t;
  this.vy += 1;
  this.checkWall();
  this.checkBounce();
};

Bubbles.prototype.draw = function() {
  this.ctx.fillStyle = "#66D3FA";
  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};

Bubbles.prototype.returnBubble = function() {
  return this.returnBubble;
};

Bubbles.prototype.update = function() {
  this.move();
  this.draw();
  this.returnBubble();
};
