import { getCurrentRoute } from "./routes.js"
import { LoadPreviousSavedPoints } from "./save.js"

export function initKeyboard (container, menu) {
  container.onkeyup = function (e) {
    let key = e.key;

    const route = getCurrentRoute();
  
    if (key === "Backspace") { route.deletePoint(); }
    if (key === "Enter") { route.restorePoint(); }
    
    if (key === "-") { route.setPointD(route.getCurrentPoint(), -1); }
    if (key === "=") { route.setPointD(route.getCurrentPoint(), 1); }
    
    if (!isNaN(key)) { route.setPointF(route.getCurrentPoint(), key); }
    
    if (key === "o") { menu.toggleOverlay(); }
    if (key === "i") { menu.toggleInfo(); }
    
    if (key === "p") { LoadPreviousSavedPoints(route, menu); }
    if (key === "q") { route.wipePoints(); }

    menu.updatePoints(route);
  }
  
  container.onkeydown = function (e) {
    let key = e.key;

    const route = getCurrentRoute();
  
    if (key === "ArrowLeft") { route.movePoint("left"); }
    if (key === "ArrowRight") { route.movePoint("right"); }
    if (key === "ArrowUp") { route.movePoint("up"); }
    if (key === "ArrowDown") { route.movePoint("down"); }

    menu.updatePoints(route);
  }
}