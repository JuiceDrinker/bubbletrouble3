"use strict";

function main() {
    var game;
  //Loading Screen
  function buildLoadingScreen() {}

  //Splash
  function buildSplashScreen() {
    // <button id="multi">2 player</button>
    // <button id ="controls">Controls</button>
    // <button id = "exit">Exit Game</button>
    // let multiPlayer = document.querySelector("button #multi");
    // let editControls = document.querySelector("button #controls");
    // let exitGame = document.querySelector("button #exit");
    //multiPlayer.addEventListener('click',gameStart())
    // editControls.addEventListener("click", showControls);

    let htmlString = ` <main>
            <h1>Bubble Trouble 3</h1>
            <button id="single">1 player</button>
        </main>`;

    let splashScreen = buildDom(htmlString);
    document.body.appendChild(splashScreen);
    let singlePlayer = document.querySelector("#single");
    singlePlayer.addEventListener("click", startGame);
  }

  function removeSplashScreen(){
      document.body.innerHTML = "";
  } 

  //Game
  function buildGameScreen() {

  }

  function removeGameScreen(){}

  //Endgame
  function buildEndgameScreen() {}
  function removeEndgameScreen(){}

  //Setting game states
  function startGame(){
      removeSplashScreen();
      game = new Game();
      game.gameScreen = buildGameScreen();
      game.start()
  }

  function endGame(){}

  buildSplashScreen();
}

function buildDom(htmlString) {
  var div = document.createElement("div");
  div.innerHTML += htmlString;
  return div.children[0];
}

window.onload = main;
