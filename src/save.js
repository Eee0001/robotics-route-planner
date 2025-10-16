import { exportPoints } from "./export.js"
import { getCurrentRoute } from "./routes.js"

//------------------------------------------------------------
// SAVE
//------------------------------------------------------------
export function SavePoints (route) {
  localStorage.setItem("Save", exportPoints(route.getPoints()));
}

window.onbeforeunload = () => {
  SavePoints(getCurrentRoute());
}

//------------------------------------------------------------
// LOAD
//------------------------------------------------------------
export function LoadPreviousSavedPoints (route, menu) {

  try {
    json = JSON.parse(localStorage.getItem("Save"));

    route.setCurrentPoint(null);
    route.setHoldingPoint(null);
  }
  catch {
    json = null;
  }

  route.setPoints(json !== null ? json : route.getPoints());
  menu.selectRoute(route);
}