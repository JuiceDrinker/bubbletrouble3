# Bubble Trouble 3

## Description

Remake of classic Miniclip game, bubble trouble. (https://www.miniclip.com/games/bubble-trouble/en/). Bubbles bounce towards you and you need to safely pop them with you trusty weapon, the spiderweb gun. Bigger the bubbles more pops it takes to kill them. Collide or run out of time 3 times and game will be over. You advance through levels from 1 onwards for successfully accomplishing your mission.

## MVP (DOM - CANVAS)

_CANVAS_, 1 level, proper screen collisions and collision detection. Splash screen -> Game screen -> Endgame screen loop working, each screen working functionally.

## Backlog

- Bubble collision on side walls
- Loading screen
- Score
- Level 2 --> Level x
- Dark Mode
- Multiplayer
- Autopilot

## Data structure

### main.js

```
   function buildSplashScreen(){};
    function buildGameScreen(){};
    function buildEndgameScreen(){};
```

### game.js

```
function Game() {
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

Game.prototype.startLoop(){}

Game.prototype.checkCollision(){}

Game.prototype.updateLevel(){}

Game.prototype.clearCanvas(){}

Game.prototype.updateGame(){}


Game.prototype.updateCanvas(){}

Game.prototype.draw(){}

Game.prototype.goToGameOver(){}

Game.prototype.removePlayerLife();

Game.prototype.handleBubblePop();


```

### bullets.js

```
function Bullets() {
  //speed
  this.speed;
  //direction
  this.direction
  //collision
  //special effects (?)
}


```

### bubbles.js

```
function Bubbles {
    //Size/"Lives"
    this.size;
    // (x,y)
    // screenCollision()
    // movement()
}

Bubbles.prototype.changeDirection();

Bubbles.prototype.checkCollision();

```

## States y States Transitions

```
- splashScreen()
  - buildSplash()
  - addEventListener(startGame)


- startGame()
   function buildGameScreen(){};


- gameOver()
  -  function buildEndgameScreen(){};
  - addEventListener(startGame)
```

## Task

## Links

### Trello

[Link url](https://trello.com/b/zIsNK62L/bubble-trouble-3)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/JuiceDrinker/bubbletrouble3)
[Link Deploy]()

### Slides

URls for the project presentation (slides)
[Link Slides.com]()
