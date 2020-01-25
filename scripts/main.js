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
      ` <main>
        <h1>Bubble Trouble 3</h1>
        <button id="single">1 player</button>
    </main>`
    );
    document.body.appendChild(splashScreen);
    let singlePlayer = document.querySelector("#single");
    singlePlayer.addEventListener("click", startGame);
  }

  function removeSplashScreen() {
    splashScreen.remove();
  }

  //Game
  function buildGameScreen() {
     let gameScreen = buildDom(`
      <main class="game">
      <span>Score: </span><span id="score">0</span>
      <section class="canvas-container">
        <canvas></canvas>
      </section>
    </main>`)

    document.body.appendChild(gameScreen)
    return gameScreen;
  }

  function removeGameScreen() {
      game.removeGameScreen()
  }

  //Endgame
  function buildEndgameScreen() {}
  function removeEndgameScreen() {}

  //Setting game states
  function startGame() {
    removeSplashScreen();
    game = new Game();
    game.gameScreen = buildGameScreen();
    game.start();
  }

  function endGame() {}

  buildSplashScreen();
}

function buildDom(htmlString) {
  var div = document.createElement("div");
  div.innerHTML += htmlString;
  return div.children[0];
}

window.onload = main;
