"use strict";

function main() {
  function buildLoadingScreen() {}

  function buildSplashScreen() {
    // <button id="multi">2 player</button>
    // <button id ="controls">Controls</button>
    // <button id = "exit">Exit Game</button>
    // let multiPlayer = document.querySelector("button #multi");
    // let editControls = document.querySelector("button #controls");
    // let exitGame = document.querySelector("button #exit");
    //multiPlayer.addEventListener('click',gameStart())

    editControls.addEventListener("click", showControls);

    htmlString = `    <main>
            <h1>Bubble Trouble 3</h1>
            <button id="single">1 player</button>
        </main>`;

    buildDom(htmlString);

    let singlePlayer = document.querySelector("button #single");

    singlePlayer.addEventListener("click", gameStart);

  }
  function buildGameScreen() {}
  function buildEndgameScreen() {}
}

function buildDom(htmlString) {
  var div = document.createElement("div");
  div.innerHTML += htmlString;
  return div.children[0];
}
