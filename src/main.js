//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { drawPoints, drawSelect, drawLines, drawAngles, drawTurns, drawDistances, drawDirections, drawFunctions, drawOverlay } from "./display.js"
import { missionManager } from "./manager.js"
import { canvas } from "./canvas.js"
import { mouse } from "./mouse.js"
import { menu } from "./menu.js"
import { keyboard } from "./keyboard.js"

//------------------------------------------------------------
// INIT
//------------------------------------------------------------
console.log(missionManager.createMission());
menu.initEvents();
mouse.initEvents();
keyboard.initEvents();

document.getElementById("button").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("hidden"); canvas.resize();
});

//------------------------------------------------------------
// LOOP
//------------------------------------------------------------
function loop () {
  canvas.resize();

  // console.log(missionManager);
  
  drawPoints();
  drawSelect();
  drawLines();
  drawAngles();
  drawTurns();
  drawDistances();
  drawDirections();
  drawFunctions();
  drawOverlay();
}

document.body.onload = () => {
  setInterval(loop, 1000/60);
}

//------------------------------------------------------------