//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { missionManager } from "./manager.js"
import { canvas } from "./canvas.js"
import { getAngle, flipAngle, getTurn, getDistance } from "./math.js"

//------------------------------------------------------------
// METHODS
//------------------------------------------------------------

export function drawPoints (points = missionManager.points, canvas2 = canvas) {  
  for (let point of points) {
    canvas2.drawPoint(point.x, point.y, 10, "#000000");
  }
}

//------------------------------------------------------------

export function drawSelect (point = missionManager.currentPoint, canvas2 = canvas) {  
  if (point !== null) {
    canvas2.drawPoint(point.x, point.y, 20, "#000000", "stroke");
  }
}

//------------------------------------------------------------

export function drawLines (points = missionManager.points, canvas2 = canvas) {
  canvas2.drawLine(points, "#000000");
}

//------------------------------------------------------------

export function drawAngles (settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
  if (settings.showInfo) {
    for (let i = 0; i < points.length - 1; i++) {

      let thisPoint = points[i];
      let nextPoint = points[i + 1];

      let angle = getAngle(thisPoint, nextPoint);

      if (thisPoint.d === -1) {
        angle = flipAngle(angle);
      }
      
      angle = Math.round(angle);

      let x = thisPoint.x;
      let y = thisPoint.y - 24;

      canvas2.drawText(angle, x, y, "#ff00ff");
      
    }
  }
}

//------------------------------------------------------------

export function drawTurns (settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
  if (settings.showInfo) {
    for (let i = 0; i < points.length - 1; i++) {

      let thisPoint = points[i];
      let nextPoint = points[i + 1];

      let thisAngle = getAngle(thisPoint, nextPoint);

      if (thisPoint.d === -1) {
        thisAngle = flipAngle(thisAngle);
      }

      let lastAngle = settings.startingAngle;

      if (i > 0) {
        let lastPoint = points[i - 1];
        lastAngle = getAngle(lastPoint, thisPoint);

        if (lastPoint.d === -1) {
          lastAngle = flipAngle(lastAngle);
        }
      }

      let turn = getTurn(lastAngle, thisAngle);

      let x = thisPoint.x + 36;
      let y = thisPoint.y + 12;
      
      canvas2.drawText(turn, x, y, "#0000ff");
      
    }
  }
}

//------------------------------------------------------------

export function drawDistances (settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
  if (settings.showInfo) {
    for (let i = 0; i < points.length - 1; i++) {

      let thisPoint = points[i];
      let nextPoint = points[i + 1];

      let distance = Math.round(getDistance(thisPoint, nextPoint));

      let x = (thisPoint.x + nextPoint.x) / 2;
      let y = (thisPoint.y + nextPoint.y) / 2;

      canvas2.drawText(distance, x, y, "#ffff00");
      
    }
  }
}

//------------------------------------------------------------

export function drawDirections (settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
  if (settings.showInfo) {
    for (let point of points) {

      let x = point.x - 36;
      let y = point.y + 12;

      canvas2.drawText(point.d, x, y, "#ff0000");
      
    }
  }
}

//------------------------------------------------------------

export function drawFunctions (settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
  if (settings.showInfo) {
    for (let point of points) {

      let x = point.x;
      let y = point.y + 48;

      canvas2.drawText(point.f, x, y, "#00ff00");
      
    }
  }
}

//------------------------------------------------------------

export function drawOverlay (settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
  if (settings.showOverlay) {
    canvas2.drawLine(points, "#00000080", settings.robotWidth);
  }
}

//------------------------------------------------------------