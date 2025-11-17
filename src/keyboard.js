//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { missionManager } from "./manager.js"
import { canvas } from "./canvas.js"
import { loadPointsFromSave } from "./save.js"
import { menu } from "./menu.js"

//------------------------------------------------------------
// CLASS
//------------------------------------------------------------

class Keyboard {

  constructor () {
    
  }
  
  //----------------------------------------------------------

  initEvents () {
    // canvas.container.onkeyup = (e)=>{this.keyUp(e);};
    // canvas.container.onkeydown = (e)=>{this.keyDown(e);};

    document.body.onkeyup = (e)=>{
      if (e.target === document.body) { this.keyUp(e); }
    };
    document.body.onkeydown = (e)=>{
      if (e.target === document.body) { this.keyDown(e); }
    };
  }

  //----------------------------------------------------------

  keyUp (event) {
    const key = event.key;

    if (key === "Backspace") {missionManager.route.deletePoint();}
    if (key === "Enter") {missionManager.route.restorePoint();}

    if (key === "-") {missionManager.route.currentPoint.d = -1;}
    if (key === "=") {missionManager.route.currentPoint.d = 1;}

    if (!isNaN(key)) {missionManager.route.currentPoint.f = key;}

    if (key === "o") {missionManager.settings.toggleShowOverlay();}
    if (key === "i") {missionManager.settings.toggleShowInfo();}

    if (key === "p") {loadPointsFromSave();}
    if (key === "q") {missionManager.route.wipePoints();}

    menu.refresh();
  }

  //----------------------------------------------------------

  keyDown (event) {
    const key = event.key;

    if (key === "ArrowUp") {missionManager.route.moveCurrentPoint("up");}
    if (key === "ArrowDown") {missionManager.route.moveCurrentPoint("down");}
    if (key === "ArrowLeft") {missionManager.route.moveCurrentPoint("left");}
    if (key === "ArrowRight") {missionManager.route.moveCurrentPoint("right");}

    menu.refresh();
  }
  
}

//------------------------------------------------------------

export const keyboard = new Keyboard();

//------------------------------------------------------------