//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { Canvas } from "./canvas.js"
import { Menu } from "./menu.js"
import { Route } from "./routes.js"

import { drawPoints, drawLines, drawOverlay, drawInfo } from "./draw.js"

import { initMouse } from "./mouse.js"
import { initKeyboard } from "./keyboard.js"

//------------------------------------------------------------
// GLOBALS
//------------------------------------------------------------
const container = document.getElementById("viewport");
const canvas = new Canvas(container);

const menu = new Menu();

const route = new Route();
menu.selectRoute(route);

initMouse(canvas, menu);
initKeyboard(container, menu);

//------------------------------------------------------------
// LOOP
//------------------------------------------------------------
function loop () {
  canvas.resize();

  drawPoints(route, canvas);
  drawLines(route, canvas);
  drawOverlay(menu.settings, route, canvas);
  drawInfo(menu.settings, route, canvas);
}

document.body.onload = function () {
  setInterval(loop, 1000/60);
}
