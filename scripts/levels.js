"use strict";

function Levels() {
  this.levels = [                 //X  Y   SIZE
    { levelTimer: 60, bubbles: [ [400, 200, 30]] },
    {
      levelTimer: 60,
      bubbles: [[300, 400, 60]]
    },
    {
      levelTimer: 60,
      bubbles: [[300, 400, 50], [400, 200, 50]]
    },
    {
      levelTimer: 60,
      bubbles: [[300, 400, 50], [600, 200, 50]]
    }
  ];
}

