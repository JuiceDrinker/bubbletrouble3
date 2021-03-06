"use strict";
var levelStartIntervalID;
var levels;
function Game() {
  this.canvas = null;
  this.counter = 4;
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
  this.levelTimeOut = true;
  this.bullet;
  this.keys = {};
  this.img = new Image();
  this.img.src = "./images/1920x1080.png";
  //Levels
  this.currentLevel = 0;
  this.loopTimer = 0;
  //Move this to levels.js perhaps?
  this.levelTimer = 60;
  this.timeLeft;
  this.collision = false;
}

// var levels = new Levels(currentLevel);

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
  //Load Level
  levels = new Levels(this.currentLevel);

  this.handleShoot = function(event) {
    if (event.keyCode === 32) {
      this.shoot();
    }
  };

  window.addEventListener(
    "keydown",
    function(event) {
      if (!this.keys[event.key]) this.keys[event.key] = true;
    }.bind(this)
  );
  window.addEventListener(
    "keyup",
    function(event) {
      if (this.keys[event.key]) this.keys[event.key] = false;
    }.bind(this)
  );
  document.body.addEventListener("keypress", this.handleShoot.bind(this));
  this.loadLevel(this.currentLevel);
  // levelStartIntervalID = setInterval(this.levelStartTimer.bind(this), 1000);
  this.startCounter();
  //Start game loop
  // setTimeout(this.startLoop(), 3000)
};

Game.prototype.startLoop = function() {
  var loop = async function() {
    if (this.gameRunning && !this.levelTimeOut) {
      if (this.keys["ArrowLeft"]) this.player.move("left");
      if (this.keys["ArrowRight"]) this.player.move("right");
      this.printScore();
      this.printLives();
      this.printAmmo();
      this.printTime();
      this.printLevel();
      this.updateStatus();
      this.countLevelTime();
      this.loopTimer++;
      await new Promise(r => setTimeout(r, 1));
      console.log("this.collision", this.collision);
      if (!this.collision) requestAnimationFrame(loop);
      else {
        this.startCounter();
      }
    }
  }.bind(this);

  requestAnimationFrame(loop);
};

Game.prototype.checkPlayerCollision = function() {
  this.bubbles.forEach(function(bubble, index) {
    if (this.didCollide(this.player, bubble)) {
      this.player.removeLife();
      this.collision = true;

      if (this.player.lives <= 0) {
        this.goToGameOver();
      } else {
        console.log("hola");
        this.collision = true;
        // levelStartIntervalID = setInterval(this.levelStartTimer.bind(this), 1000);
        // this.startCounter();
      }
      this.bubbles.length = 0;
      this.player.x = this.containerWidth / 2;
      this.loadLevel(this.currentLevel);
      //Restart game if no lives
    }
  }, this);
};

Game.prototype.checkBulletCollision = function() {
  this.bubbles.forEach(function(bubble, index) {
    if (this.bullets.length > 0 && this.didCollide(bubble, this.bullets[0])) {
      this.handleBubblePop(bubble, index);
      this.score += 100;
    }
  }, this);
};

Game.prototype.updateLevel = function() {};

Game.prototype.clearCanvas = function() {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0, 0, this.containerWidth, this.containerHeight);
  this.ctx.drawImage(this.img, 0, 0, this.containerWidth, this.containerHeight);
};

Game.prototype.updateStatus = function() {
  this.bubbles.forEach(function(bubble) {
    bubble.update();
  }, this);
  this.updateBullets();
  this.checkPlayerCollision();
  this.checkBulletCollision();
  this.clearCanvas();
  this.drawBubble();
  this.drawBullet();
  this.player.draw();
};

Game.prototype.updateCanvas = function() {}; // IDK WHY THIS IS HERE?

Game.prototype.goToGameOver = function() {
  this.gameRunning = false;
  this.onStartover();
  // this.removeGameScreen();
};

Game.prototype.removePlayerLife = function() {};

Game.prototype.handleBubblePop = function(bubble, index) {
  if (bubble.size >= 35) {
    bubble.size -= 15;
    let newBubble = new Bubbles(this.canvas, bubble.x, bubble.y);
    newBubble.size = bubble.size;
    newBubble.vx *= -1;
    this.bubbles.push(newBubble);
    this.bullets.splice(0, 1);
    this.player.ammo++;
  } else {
    this.bubbles.splice(index, 1);
    this.bullets.splice(0, 1);
    this.player.ammo++;
    this.loadNextLevel();
  }
};

Game.prototype.removeGameScreen = function() {
  this.gameScreen.remove();
};

Game.prototype.restartGame = function() {};

Game.prototype.shoot = function() {
  if (this.player.ammo > 0) {
    let bullet = new Bullets(this.canvas);
    bullet.x = this.player.x + this.player.size / 2 - bullet.width / 2;
    bullet.y = this.player.y;
    this.bullets.push(bullet);
    this.player.ammo--;
  }
};
// Backlog
Game.prototype.loadLevel = function(currentLevel) {
  //Access correct array element
  this.player.x = this.containerWidth / 2;
  this.clearCanvas();
  let cLevel = levels.levels[currentLevel];
  cLevel.bubbles.forEach(function(bubble) {
    let x = bubble[0];
    let y = bubble[1];
    let size = bubble[2];
    this.bubbles.push(new Bubbles(this.canvas, x, y, size));
  }, this);
  this.timeLeft = cLevel.levelTimer;
  this.levelTimeOut = false;
};

Game.prototype.countLevelTime = function() {
  if (this.loopTimer % 60 === 0) {
    this.timeLeft--;
  }
  if (this.timeLeft <= 0) this.levelTimeOut = true;
};

Game.prototype.drawBullet = function() {
  if (this.bullets.length > 0) {
    this.bullets.forEach(function(bulletObject, index) {
      if (bulletObject.isMaxLength()) {
        this.bullets.splice(index, 1);
        this.player.ammo++;
      }
      this.ctx.fillStyle = "red";
      var img = new Image();
      img.src = "./images/ammo_machinegun.png";
      // fillRect(x, y, width, height)
      this.ctx.drawImage(
        img,
        bulletObject.x,
        bulletObject.y,
        bulletObject.width,
        bulletObject.height
      );
    }, this);
  }
};

Game.prototype.updateBullets = function() {
  this.bullets.forEach(function(bulletObject) {
    bulletObject.updateBullet();
  }, this);
};

Game.prototype.didCollide = function(firstTarget, secondTarget) {
  var firstTargetLeft = firstTarget.x;
  var firstTargetRight = firstTarget.x + firstTarget.size;
  var firstTargetTop = firstTarget.y;
  var firstTargetBottom = firstTarget.y + firstTarget.size;

  var secondTargetLeft = secondTarget.x;
  var secondTargetRight = secondTarget.x + secondTarget.width;
  var secondTargetTop = secondTarget.y;
  var secondTargetBottom = secondTarget.y + secondTarget.height;

  var crossRight =
    secondTargetLeft <= firstTargetRight && secondTargetLeft >= firstTargetLeft;
  var crossLeft =
    secondTargetRight >= firstTargetLeft &&
    secondTargetRight <= firstTargetRight;
  var crossTop =
    secondTargetBottom >= firstTargetTop &&
    secondTargetBottom <= firstTargetBottom;
  var crossBottom =
    secondTargetTop <= firstTargetBottom && secondTargetTop >= firstTargetTop;

  if ((crossRight || crossLeft) && (crossBottom || crossTop)) {
    return true;
  }
  return false;
};

Game.prototype.drawBubble = function() {
  this.bubbles.forEach(function(bubble) {
    bubble.draw();
  }, this);
};

Game.prototype.passGameOverCallback = function(callback) {
  this.onStartover = callback;
};

Game.prototype.printScore = function() {
  let scoreElement = document.querySelector("span#score");
  scoreElement.innerHTML = this.score;
};

Game.prototype.printLives = function() {
  let livesElement = document.querySelector("span#lives");
  livesElement.innerHTML = this.player.lives;
};

Game.prototype.printAmmo = function() {
  let ammoElement = document.querySelector("span#ammo");
  ammoElement.innerHTML = this.player.ammo;
};

Game.prototype.printTime = function() {
  let timeElement = document.querySelector("span#time");
  timeElement.innerHTML = this.timeLeft;
};

Game.prototype.printLevel = function() {
  let levelsElement = document.querySelector("span#level");
  var onLevel = this.currentLevel + 1;
  levelsElement.innerHTML = onLevel;
};

Game.prototype.loadNextLevel = function() {
  if (!this.levelTimeOut && this.bubbles.length === 0) {
    this.currentLevel++;
    this.loadLevel(this.currentLevel);
  }
};

Game.prototype.startCounter = function() {
  // this.levelStartIntervalID = setInterval(
  // function() {
  console.log("coucou");
  this.counter--;
  this.levelStartTimer();
  // }
  // .bind(this),
  // 1000
  // );
};

Game.prototype.levelStartTimer = function() {
  // this.ctx.fillStyle = "white";
  // this.ctx.fillRect(0, 0, this.containerWidth, this.containerHeight);
  // levelStartIntervalID = setInterval(
  // function() {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0, 0, this.containerWidth, this.containerHeight);
  this.ctx.font = "30px Arial";
  this.ctx.fillStyle = "#ff00ff";
  this.ctx.fillText(
    this.counter,
    this.containerWidth / 2,
    this.containerHeight / 2
  );
  // counter--;
  console.log(this.counter);

  if (this.counter === 0) {
    console.log("start again");
    // clearInterval(this.levelStartIntervalID);
    this.startLoop();
    this.collision = false;
    this.counter = 4;
  } else {
    setTimeout(
      function() {
        console.log("holaaaaa");
        this.startCounter();
        // this.levelStartTimer()
      }.bind(this),
      1000
    );
    // this.startCounter();
  }
  // }.bind(this),
  // 1000
  // );
};
