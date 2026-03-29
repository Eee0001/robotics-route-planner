//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// METHODS
//--------------------------------------------------------------------------------

function drawPoints (canvas, route) {
  for (let point of route.points) {
    canvas.drawPoint(point.x, point.y, 10, "#000000", "fill");
  }
}

//--------------------------------------------------------------------------------

function drawLines (canvas, route) {
  canvas.drawLine(route.points, "#000000", 3);
}

//--------------------------------------------------------------------------------

function drawSelect (canvas, route) {
  const point = route.currentPoint;

  if (point) {
    canvas.drawPoint(point.x, point.y, 20, "#000000", "stroke");
  }
}

//--------------------------------------------------------------------------------

function drawInfo (canvas, route, settings) {
  if (settings.showInfo) {
    for (let i = 0; i < route.points.length - 1; i++) {

      const lastPoint = route.points[i - 1];
      const thisPoint = route.points[i];
      const nextPoint = route.points[i + 1];

      const middleX = (thisPoint.x + nextPoint.x) / 2;
      const middleY = (thisPoint.y + nextPoint.y) / 2;

      let lastAngle = route.startingAngle;

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
}

//--------------------------------------------------------------------------------

function drawOverlay (canvas, route, settings) {
  if (settings.showOverlay) {
    canvas.drawLine(route.points, "#00000088", settings.robotWidth);
  }
}

//--------------------------------------------------------------------------------

function drawField (canvas, field) {
  canvas.drawImage(field.image, 0, 0, field.width, field.height);
}

//--------------------------------------------------------------------------------