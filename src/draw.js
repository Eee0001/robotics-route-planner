import { calculateAngle, flipAngle, calculateDistance, calculateTurn } from "./math.js"

//------------------------------------------------------------
// DRAW POINTS
//------------------------------------------------------------
export function drawPoints (route, canvas) {
  for (point of route.getPoints()) {
    canvas.drawPoint(point.x, point.y, 10, "rgb(0,0,0)");
  }

  if (route.getCurrentPoint() !== null) {
    canvas.drawPoint(route.getPointX(route.getCurrentPoint()), route.getPointY(route.getCurrentPoint()), 20, "rgb(0,0,0)", "stroke");
  }
}

//------------------------------------------------------------
// DRAW LINES
//------------------------------------------------------------
export function drawLines (route, canvas) {
  canvas.drawLine(route.getPoints(), "rgb(0,0,0)");
}

//------------------------------------------------------------
// DRAW OVERLAY
//------------------------------------------------------------
export function drawOverlay (settings, route, canvas) {
  if (settings.showOverlay) {
    canvas.drawLine(route.getPoints(), "rgb(0,0,0,0.5)", settings.robotWidth);
  }
}

//------------------------------------------------------------
// DRAW INFO
//------------------------------------------------------------
export function drawInfo (settings, route, canvas) {
  if (settings.showInfo) {
    const points = route.getPoints();
    
    for(let i = 0; i < points.length; i++) {
      
      if (i < (points.length - 1)) {
        let angle = calculateAngle(points[i], points[i+1]);
        angle = points[i].d === -1 ? flipAngle(angle) : angle;
        
        canvas.drawText(Math.round(angle), points[i].x, points[i].y - 24, "rgb(255,0,255)"); // angle
  
        let distance = calculateDistance(points[i], points[i+1]);
  
        let middle = {
          x: (points[i].x + points[i+1].x) / 2,
          y: (points[i].y + points[i+1].y) / 2,
        };

        canvas.drawText(Math.round(distance), middle.x, middle.y, "rgb(255,255,0)"); // distance
  
        let angle1 = i === 0 ? 0 : calculateAngle(points[i-1], points[i]);
        
        let angle2 = calculateAngle(points[i], points[i+1]);
        angle2 = points[i].d === -1 ? flipAngle(angle2) : angle2;
        
        let turn = calculateTurn(angle1, angle2);
        
        if (i > 0) {
          if (points[i-1].d === -1) {
            turn *= -1;
          }
        }
        
        canvas.drawText(turn, points[i].x + 36, points[i].y + 12, "rgb(0,0,255)"); // turn
      }
      
      canvas.drawText(points[i].d, points[i].x - 36, points[i].y + 12, "rgb(255,0,0)"); // direction
      canvas.drawText(points[i].f, points[i].x, points[i].y + 48, "rgb(0,255,0)"); // function
    }
  }
}