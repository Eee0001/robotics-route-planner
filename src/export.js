//------------------------------------------------------------
// EXPORTS
//------------------------------------------------------------
import { calculateDistance, calculateAngle, flipAngle, calculateTurn } from "./math.js"

// Export route
//------------------------------------------------------------
function exportRoute (points) {
  let route = ``;
  
  for(let i = 0; i < (points.length - 1); i++) {
    let angle1 = i === 0 ? 0 : calculateAngle(points[i-1], points[i]);
    let angle2 = calculateAngle(points[i], points[i+1]);
    if (points[i].d === -1) { angle2 = flipAngle(angle2); }
    let turn = calculateTurn(angle1, angle2);
    if (i > 0) {
      if (points[i-1].d === -1) {
        turn *= -1;
      }
    }
    const distance = calculateDistance(points[i], points[i+1]);
    const func = points[i].f;
    const direction = points[i].d;

    route += ``+turn+`\n`+Math.round(angle2)+`\n`+direction+`\n`+Math.round(distance)+`\n`+func+`\n`; 
    // turn, angle, direction, distance, function /////////////////////////////////////////////////
  }

  return route.trim();
}

export function downloadRoute (points) {
  let data = exportRoute(points);
  let blob = new Blob([data], { type: 'text.plain' });
  let url = URL.createObjectURL(blob);

  let element = document.createElement("a");
  element.setAttribute("download", "Robot-Route");
  
  element.href = url;

  element.click();

  element.remove();
}

export function copyRoute (points) {
  navigator.clipboard.writeText(exportRoute(points));
}

// Export points
//------------------------------------------------------------
export function exportPoints (points) {
  return JSON.stringify(points);
}

export function downloadPoints (points) {
  let data = exportPoints(points);
  let blob = new Blob([data], { type: 'application/json' });
  let url = URL.createObjectURL(blob);

  let element = document.createElement("a");
  element.setAttribute("download", "Points");
  
  element.href = url;

  element.click();

  element.remove();
}

export function copyPoints (points) {
  navigator.clipboard.writeText(exportPoints(points));
}