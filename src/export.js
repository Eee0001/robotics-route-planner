//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { missionManager } from "./manager.js"
import { getAngle, flipAngle, getTurn, getDistance } from "./math.js"

//------------------------------------------------------------
// METHODS
//------------------------------------------------------------

function exportRoute (points = missionManager.points) {
  let route = "";

  for (let i = 0; i < points.length - 1; i++) {

    let thisPoint = points[i];
    let nextPoint = points[i + 1];

    let thisAngle = getAngle(thisPoint, nextPoint);

    if (thisPoint.d === -1) {
      thisAngle = flipAngle(thisAngle);
    }

    let lastAngle  = missionManager.settings.startingAngle;

    if (i > 0) {
      let lastPoint = points[i - 1];
      lastAngle = getAngle(lastPoint, thisPoint);

      if (lastPoint.d === -1) {
        lastAngle = flipAngle(lastAngle);
      }
    }

    let angle = Math.round(lastAngle);
    let turn = getTurn(lastAngle, thisAngle);
    let distance = Math.round(getDistance(thisPoint, nextPoint));
    let func = thisPoint.f;
    let direction = thisPoint.d;

    route += ""+turn+"\n"+angle+"\n"+direction+"\n"+distance+"\n"+func+"\n";
    
  }

  return route.trim();
}

//------------------------------------------------------------

function downloadFile (name, type, data) {
  let blob = new Blob([data], {type});
  let url = URL.createObjectURL(blob);

  let element = document.createElement("a");
  element.setAttribute("download", name);
  
  element.href = url;
  
  element.click();
  element.remove();
}

//------------------------------------------------------------


export function copyPoints (points = missionManager.points) {
  navigator.clipboard.writeText(JSON.stringify(points));
}

//------------------------------------------------------------

export function copyRoute (route = exportRoute()) {
  navigator.clipboard.writeText(route);
}

//------------------------------------------------------------

export function downloadPoints (points = missionManager.points) {
  downloadFile("Points", "application/json", JSON.stringify(points));
}

//------------------------------------------------------------

export function downloadRoute (route = exportRoute()) {
  downloadFile("Robot-Route", "plain/text", route);
}

//------------------------------------------------------------