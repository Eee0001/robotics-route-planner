//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { CalculateDistance, CalculateAngle, FlipAngle, CalculateTurn } from "./math.js"
import { Canvas } from "./canvas.js"
import { Menu } from "./menu.js"
import { Route } from "./routes.js"
import { ExportPoints } from "./export.js"

//------------------------------------------------------------
// GLOBALS
//------------------------------------------------------------
window.robotWidth = 200;
window.showOverlay = false;
window.showInfo = true;

const container = document.getElementById("viewport");
const canvas = new Canvas(container);
const menu = new Menu();
const route = new Route(menu);

function toggleShowOverlay () {
  window.showOverlay = !window.showOverlay;
  menu.updateSettings();
}

function toggleShowInfo () {
  window.showInfo = !window.showInfo;
  menu.updateSettings();
}

//------------------------------------------------------------
// MOUSE
//------------------------------------------------------------
const mouse = {
  x: 0,
  y: 0,
}

canvas.element.onmousemove = function (e) {
  mouse.x = Math.round(e.offsetX / canvas.scale);
  mouse.y = Math.round(e.offsetY / canvas.scale);

  if (route.holdingPoint !== null) {
    route.points[route.holdingPoint].x = mouse.x;
    route.points[route.holdingPoint].y = mouse.y;
    
    menu.updatePoints(route);
  }
}

canvas.element.onmousedown = function (e) {
  for (point of route.points) {
    if (CalculateDistance(point,mouse) <= 25) {
      route.holdingPoint = route.points.indexOf(point);
      route.currentPoint = route.points.indexOf(point);

      menu.updatePoints(route);
    }
  }

  if (route.holdingPoint === null) {
    route.createPoint(mouse.x, mouse.y);
    
    route.holdingPoint = route.points.length - 1;
    route.currentPoint = route.points.length - 1;

    menu.updatePoints(route);
  }
}

document.onmouseup = function (e) {
  route.holdingPoint = null;
}

//------------------------------------------------------------
// KEYBOARD
//------------------------------------------------------------
container.onkeyup = function (e) {
  let key = e.key;

  if (key === "Backspace") { route.deletePoint(); }
  if (key === "Enter") { route.restorePoint(); }
  if (key === "-") { route.setPointDirection(-1); }
  if (key === "=") { route.setPointDirection(1); }
  if (!isNaN(key)) { route.setPointFunction(key); }
  if (key === "o") { toggleShowOverlay(); }
  if (key === "i") { toggleShowInfo(); }
  if (key === "p") { LoadPreviousSavedPoints(); }
  if (key === "q") { route.wipePoints(); }
}

container.onkeydown = function (e) {
  let key = e.key;

  if (key === "ArrowLeft") { route.movePoint("left"); }
  if (key === "ArrowRight") { route.movePoint("right"); }
  if (key === "ArrowUp") { route.movePoint("up"); }
  if (key === "ArrowDown") { route.movePoint("down"); }
}

//------------------------------------------------------------
// IMPORT
//------------------------------------------------------------
export function ImportPointsFromText () {

  try {
    json = JSON.parse(menu.elements.pointsT.value);

    route.currentPoint = null;
    route.holdingPoint = null;
  }
  catch {
    json = null;
  }

  route.points = json !== null ? json : route.points;
  
}

export function UploadPointsFile () {
  menu.elements.pointsF.click();
}

export function ImportPointsFromFile () {
  let fileReader = new FileReader();
  
  fileReader.onload = () => {

    try {
      json = JSON.parse(fileReader.result);

      route.currentPoint = null;
      route.holdingPoint = null;
    }
    catch {
      json = null;
    }

    route.points = json !== null ? json : route.points;
    
  };

  fileReader.readAsText(menu.elements.pointsF.files[0]);
}

//------------------------------------------------------------
// SAVE
//------------------------------------------------------------
function SavePoints () {
  localStorage.setItem("Save",ExportPoints(route.points));
}

window.onbeforeunload = function () {
  SavePoints();
}

function LoadPreviousSavedPoints () {

  try {
    json = JSON.parse(localStorage.getItem("Save"));

    route.currentPoint = null;
    route.holdingPoint = null;
  }
  catch {
    json = null;
  }

  route.points = json !== null ? json : route.points;
}

//------------------------------------------------------------
// DRAW
//------------------------------------------------------------
function DrawPoints () {
  for (point of route.points) {
    canvas.drawPoint(point.x, point.y, 10, "rgb(0,0,0)");
  }

  if (route.currentPoint !== null) {
    let point = route.points[route.currentPoint];
    canvas.drawPoint(point.x, point.y, 20, "rgb(0,0,0)", "stroke");
  }
}

function DrawOverlay () {
  if (window.showOverlay) {
    canvas.drawLine(route.points, "rgb(0,0,0,0.5)", robotWidth);
  }
}

function DrawInfo () {
  if (window.showInfo) {
    ctx = canvas.ctx;
    points = route.points;
    
    for(let i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.font = "bold 36px sans";
      ctx.textAlign = "center";
      
      if (i < (points.length - 1)) {
        let angle = CalculateAngle(points[i], points[i+1]);
        if (points[i].d === -1) { angle = FlipAngle(angle); }
        ctx.fillStyle = "rgb(255,0,255)";
        ctx.fillText(Math.round(angle), points[i].x, points[i].y - 24); // angle
  
        let distance = CalculateDistance(points[i], points[i+1]);
  
        let middle = {
          x: (points[i].x + points[i+1].x) / 2,
          y: (points[i].y + points[i+1].y) / 2,
        };
        
        ctx.fillStyle = "rgb(255,255,0)";
        ctx.fillText(Math.round(distance), middle.x, middle.y); // distance
  
        let angle1 = i === 0 ? 0 : CalculateAngle(points[i-1], points[i]);
        let angle2 = CalculateAngle(points[i], points[i+1]);
        if (points[i].d === -1) { angle2 = FlipAngle(angle2); }
        let turn = CalculateTurn(angle1, angle2);
        if (i > 0) {
          if (points[i-1].d === -1) {
            turn *= -1;
          }
        }
        ctx.fillStyle = "rgb(0,0,255)";
        ctx.fillText(turn, points[i].x + 36, points[i].y + 12); // turn
      }

      ctx.fillStyle = "rgb(255,0,0)";
      ctx.fillText(points[i].d, points[i].x - 36, points[i].y + 12); // direction
      
      ctx.fillStyle = "rgb(0,255,0)";
      ctx.fillText(points[i].f, points[i].x, points[i].y + 48); // function
      
      ctx.fill();
    }
  }
}
//------------------------------------------------------------
// LOOP
//------------------------------------------------------------
function loop () {
  canvas.resize();

  DrawPoints();
  canvas.drawLine(route.points, "rgb(0,0,0)");
  DrawOverlay();
  DrawInfo();
}

document.body.onload = function () {
  menu.updateSettings();
  setInterval(loop, 1000/60);
}
