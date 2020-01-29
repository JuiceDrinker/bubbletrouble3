"use strict";

function main() {
  var game; //Game instance
  var splashScreen; // Splash screen
  var gameOverScreen; //Game Over screen

  // BACKLOG Loading Screen

  //   function buildLoadingScreen() {}

  //Splash
  function buildSplashScreen() {
    splashScreen = buildDom(
      ` <main class ="splash">
        <h1>Bubble Trouble 3</h1>
        <button id="single">1 player</button>
        <button id="multiplayer">2 player</button>
        <button id="exit">Exit Game</button>
        <h3> &#9400 2020 Adi Subramanian</h3>
    </main>`
    );
    document.body.appendChild(splashScreen);
    let singlePlayer = document.querySelector("#single");
    singlePlayer.addEventListener("click", startGame);
    let exitGame = document.querySelector("#exit");
    exitGame.addEventListener("click", function() {
      window.close();
    });
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }

  //Game
  function buildGameScreen() {
    let gameScreen = buildDom(`
      <main class="game">
      <span>Score: </span><span id="score">0</span>
      <span>Lives: </span><span id="lives">0</span>
      <span>Ammo: </span><span id="ammo">0</span>
      <span>Time Left: </span><span id="time">0</span>
      <span>Level: </span><span id="level"></span>
      <section class="canvas-container">
        <canvas></canvas>
      </section>
    </main>`);

    document.body.appendChild(gameScreen);
    return gameScreen;
  }

  function removeGameScreen() {
    game.removeGameScreen();
  }

  //Endgame
  function buildEndgameScreen() {
    // ADD THIS TO THE DOM <h2>Your Score : ${score} </h2>
    gameOverScreen = buildDom(
      `<main id ="game-over">
      <h1>Game Over</h1> 
      <button id ="restart-game">Try again</button></main>`
    );
    document.body.appendChild(gameOverScreen);
  }
  function removeEndgameScreen() {
    if (gameOverScreen) {
      gameOverScreen.remove();
    }
  }

  //Setting game states
  function startGame() {
    removeSplashScreen();
    removeEndgameScreen();
    game = new Game();
    game.gameScreen = buildGameScreen();
    game.start();
    game.passGameOverCallback(function() {
      endGame();
    });
  }

  function endGame() {
    removeGameScreen();
    buildEndgameScreen();
    let restartGameButton = document.querySelector("#restart-game");
    restartGameButton.addEventListener("click", startGame);
  }

  buildSplashScreen();
}

function buildDom(htmlString) {
  var div = document.createElement("div");
  div.innerHTML += htmlString;
  return div.children[0];
}

window.onload = main;
