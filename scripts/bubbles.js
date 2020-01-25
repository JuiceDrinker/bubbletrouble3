function Bubbles(canvas) {
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
  this.x = 300;
  this.y = 200;
  // change speed of bubbles with this constant;
  this.t = 0.3;
  // screenCollision()
  // movement()
}

Bubbles.prototype.changeDirection = function() {};

Bubbles.prototype.checkBounce = function() {
  if (this.y > this.containerHeight) {
    this.vy *= -1;
  }
};

Bubbles.prototype.move = function() {
  this.x += this.vx * this.t;
  this.y += this.vy * this.t;
  this.vy += 0.9;
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
