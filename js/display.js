//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// METHODS
//--------------------------------------------------------------------------------

function drawPoints (canvas, points) {
  for (let point of points) {
    canvas.drawPoint(point.x, point.y, 10, "#000000", "fill");
  }
}

//--------------------------------------

function drawLines (canvas, points) {
  canvas.drawLine(points, "#000000", 3);
}

//--------------------------------------

function drawSelect (canvas, point) {
  if (!point) return;
  canvas.drawPoint(point.x, point.y, 20, "#000000", "stroke");
}

//--------------------------------------

function drawInfo (canvas, points, startingAngle) {
  for (let i = 0; i < points.length - 1; i++) {

    const lastPoint = points[i - 1];
    const thisPoint = points[i];
    const nextPoint = points[i + 1];

    const middleX = (thisPoint.x + nextPoint.x) / 2;
    const middleY = (thisPoint.y + nextPoint.y) / 2;

    let lastAngle = startingAngle;

    if (lastPoint) {
      lastAngle = getAngle(lastPoint, thisPoint);

      if (lastPoint.d === -1) {
        lastAngle = flipAngle(lastAngle);
      }
    }

    let thisAngle = getAngle(thisPoint, nextPoint);

    if (thisPoint.d === -1) {
      thisAngle = flipAngle(thisAngle);
    }

    const angle = Math.round(thisAngle);
    canvas.drawText(angle, thisPoint.x, thisPoint.y - 30, "#ff00ff");

    const turn = getTurn(lastAngle, thisAngle);
    canvas.drawText(turn, thisPoint.x + 30, thisPoint.y, "#0000ff");

    const distance = Math.round(getDistance(thisPoint, nextPoint));
    canvas.drawText(distance, middleX, middleY, "#ffff00");

    const direction = thisPoint.d;
    canvas.drawText(direction, thisPoint.x - 30, thisPoint.y, "#ff0000");

    const action = thisPoint.a;
    canvas.drawText(action, thisPoint.x, thisPoint.y + 30, "#00ff00");

  }
}

//--------------------------------------

function drawOverlay (canvas, points, robotWidth) {
  canvas.drawLine(points, "#00000088", robotWidth);
}

//--------------------------------------

function drawField (canvas, field) {
  canvas.drawImage(field.image, 0, 0, field.width, field.height);
}

//--------------------------------------

function drawMission (canvas, mission) {
  if (!mission) return;
  
  drawField(canvas, mission.field);

  drawPoints(canvas, mission.route.points);
  drawLines(canvas, mission.route.points);
  drawSelect(canvas, mission.route.currentPoint);

  if (mission.settings.showInfo) {
    drawInfo(canvas, mission.route.points, mission.config.startingAngle);
  }
  if (mission.settings.showOverlay) {
    drawOverlay(canvas, mission.route.points, mission.config.robotWidth);
  }
}

//--------------------------------------------------------------------------------