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
        <button id="exit">Exit Game</button>
        <h3> &#9400 Made by Adi Subramanian</h3>
    </main>`
    );
    document.body.appendChild(splashScreen);
    let singlePlayer = document.querySelector("#single");
    singlePlayer.addEventListener("click", startGame);
    let exitGame = document.querySelector("#exit");
    exitGame.addEventListener("onclick", function() {
      window.close();
      return false;
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
    gameOverScreen = buildDom(
      `<main><h1>GAME OVER</h1> <button id ="restart-game"> Restart Game </button></main>`
    ); // FIX THIS
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
