//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { missionManager } from "./manager.js"
import { menu } from "./menu.js"

//------------------------------------------------------------
// METHODS
//------------------------------------------------------------
export function loadPointsFromText (text) {
  let data = null;
  
  try {
    data = JSON.parse(text);
  }
  catch {
    console.error("BAD JSON IN TEXT OR FILE");
  }

  if (data !== null) {
    
    missionManager.route.points = data;

    missionManager.currentPoint = null;
    missionManager.holdingPoint = null;

    menu.refresh();
  }
}

//------------------------------------------------------------

export function loadPointsFromFile (file) {
  let fileReader = new FileReader();

  fileReader.onload = () => {
    loadPointsFromText(fileReader.result);
  };

  fileReader.readAsText(file);
}

//------------------------------------------------------------