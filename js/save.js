//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { missionManager } from "./manager.js"
import { menu } from "./menu.js"

//------------------------------------------------------------
// METHODS
//------------------------------------------------------------

function savePoints () {
  localStorage.setItem("Save", JSON.stringify(missionManager.points));
}

window.onbeforeunload = savePoints;

//------------------------------------------------------------

export function loadPointsFromSave () {
  let data = null;
  
  try {
    data = JSON.parse(localStorage.getItem("Save"));
  }
  catch {
    console.error("BAD JSON IN SAVE DATA");
  }

  if (data !== null) {
    missionManager.route.points = data;

    missionManager.currentPoint = null;
    missionManager.holdingPoint = null;

    menu.refresh();
  }
  
}

//------------------------------------------------------------