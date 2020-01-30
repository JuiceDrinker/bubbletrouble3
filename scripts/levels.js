"use strict";

function Levels() {
  this.levels = [                 //X  Y   SIZE
    { levelTimer: 60, bubbles: [ [400, 200, 30]] },
    {
      levelTimer: 60,
      bubbles: [[300, 400, 40], [400, 200, 40]]
    },
    {
      levelTimer: 60,
      bubbles: [[300, 400, 50], [100, 200, 50], [600, 700, 50]]
    }
  ];
}

