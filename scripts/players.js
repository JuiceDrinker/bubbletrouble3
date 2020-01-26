function Player(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.lives = 5;
  this.size = 100;
  this.x = this.canvas.width / 2;
  this.y = this.canvas.height - this.size;
}

Player.prototype.move = function(moveString) {
  switch (moveString) {
    case "left":
      this.x -= 6;
      break;
    case "right":
      this.x += 6;
      break;
  }
};

Player.prototype.shoot = function() {};

Player.prototype.screenCollision = function() {};

Player.prototype.draw = function() {
  this.ctx.fillStyle = "#66D3FA";
  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};
