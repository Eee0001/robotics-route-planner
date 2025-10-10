//------------------------------------------------------------
// EXPORTS
//------------------------------------------------------------
import { CalculateDistance, CalculateAngle, FlipAngle, CalculateTurn } from "./math.js"

// Export route
//------------------------------------------------------------
function ExportRoute (points) {
  let route = ``;
  
  for(let i = 0; i < (points.length - 1); i++) {
    const angle1 = i === 0 ? 0 : CalculateAngle(points[i-1], points[i]);
    let angle2 = CalculateAngle(points[i], points[i+1]);
    if (points[i].d === -1) { angle2 = FlipAngle(angle2); }
    let turn = CalculateTurn(angle1, angle2);
    if (i > 0) {
      if (points[i-1].d === -1) {
        turn *= -1;
      }
    }
    const distance = CalculateDistance(points[i], points[i+1]);
    const func = points[i].f;
    const direction = points[i].d;

    route += ``+turn+`\n`+Math.round(angle2)+`\n`+direction+`\n`+Math.round(distance)+`\n`+func+`\n`; 
    // turn, angle, direction, distance, function /////////////////////////////////////////////////
  }

  return route.trim();
}

export function DownloadRoute (points) {
  let data = ExportRoute(points);
  let blob = new Blob([data], { type: 'text.plain' });
  let url = URL.createObjectURL(blob);

  let element = document.createElement("a");
  element.setAttribute("download", "Robot-Route");
  
  element.href = url;

  element.click();

  element.remove();
}

export function CopyRoute (points) {
  navigator.clipboard.writeText(ExportRoute(points));
}

// Export points
//------------------------------------------------------------
export function ExportPoints (points) {
  return JSON.stringify(points);
}

export function DownloadPoints (points) {
  let data = ExportPoints(points);
  let blob = new Blob([data], { type: 'application/json' });
  let url = URL.createObjectURL(blob);

  let element = document.createElement("a");
  element.setAttribute("download", "Points");
  
  element.href = url;

  element.click();

  element.remove();
}

export function CopyPoints (points) {
  navigator.clipboard.writeText(ExportPoints(points));
}