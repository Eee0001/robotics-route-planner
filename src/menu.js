//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { missionManager } from "./manager.js"
import { loadPointsFromText, loadPointsFromFile } from "./import.js"
import { downloadRoute, copyRoute, downloadPoints, copyPoints } from "./export.js"

//------------------------------------------------------------
// CLASS
//------------------------------------------------------------

class Menu {

  constructor () {
    this.elements = {
      formPoints : document.getElementById("point"),
      formSettings : document.getElementById("settings"),
      
      pointX : document.getElementById("PointX"),
      pointY : document.getElementById("PointY"),
      
      pointDF : document.getElementById("F"),
      pointDB : document.getElementById("B"),
      
      pointF : document.getElementById("PointF"),
    
      robotW : document.getElementById("RobotW"),
      overlay : document.getElementById("Overlay"),
      info : document.getElementById("Info"),
    
      routeD : document.getElementById("RouteD"),
      routeL : document.getElementById("RouteL"),
      routeC : document.getElementById("RouteC"),
    
      pointsD : document.getElementById("PointsD"),
      pointsL : document.getElementById("PointsL"),
      pointsC : document.getElementById("PointsC"),
      pointsT : document.getElementById("PointsT"),
      pointsI : document.getElementById("PointsI"),
      pointsF : document.getElementById("PointsF")
    };

    this.elements.formPoints.onsubmit = (e) => {e.preventDefault();};
    this.elements.formSettings.onsubmit = (e) => {e.preventDefault();};
  }

  //----------------------------------------------------------

  initEvents () {
    for (let id of ["pointX", "pointY", "pointDF", "pointDB", "pointF"]) {
      this.elements[id].onchange = ()=>{this.updateCurrentPoint();};
    }

    for (let id of ["robotW", "overlay", "info"]) {
      this.elements[id].onchange = ()=>{this.updateSettings();};
    }

    this.elements.routeD.onclick = ()=>{downloadRoute();};
    this.elements.routeC.onclick = ()=>{copyRoute();};
    
    this.elements.pointsD.onclick = ()=>{downloadPoints();};
    this.elements.pointsC.onclick = ()=>{copyPoints();};
    
    this.elements.pointsT.onchange = ()=>{this.importPointsFromText();};
    
    this.elements.pointsI.onclick = () => {
      this.elements.pointsF.click();
    }
    
    this.elements.pointsF.onchange = ()=>{this.importPointsFromFile();};
  }

  //----------------------------------------------------------

  refresh () {
    const point = missionManager.currentPoint;

    if (point !== null) {
      this.elements.pointX.value = point.x;
      this.elements.pointY.value = point.y;
      
      this.elements.pointDF.checked = point.d === 1;
      this.elements.pointDB.checked = point.d === -1;
      
      this.elements.pointF.value = point.f;
    }

    const settings = missionManager.settings;

    if (settings !== null) {
      this.elements.robotW.value = settings.robotWidth;
      this.elements.info.checked = settings.showInfo;
      this.elements.overlay.checked = settings.showOverlay;
    }
  }

  //----------------------------------------------------------

  updateCurrentPoint () {
    const point = missionManager.currentPoint;

    if (point) {
      point.x = this.elements.pointX.valueAsNumber;
      point.y = this.elements.pointY.valueAsNumber;
  
      point.d = this.elements.pointDF.checked ? 1 : -1;
  
      point.f = this.elements.pointF.valueAsNumber;
    }
  }

  //----------------------------------------------------------

  updateSettings () {
    const settings = missionManager.settings;

    if (settings) {
      settings.robotWidth = this.elements.robotW.valueAsNumber;
      settings.showInfo = this.elements.info.checked;
      settings.showOverlay = this.elements.overlay.checked;
    }
  }

  //----------------------------------------------------------

  importPointsFromFile () {
    loadPointsFromFile(this.elements.pointsF.files[0]);
  }

  //----------------------------------------------------------

  importPointsFromText () {
    loadPointsFromText(this.elements.pointsT.value);
  }
  
}

//------------------------------------------------------------

export const menu = new Menu();

//------------------------------------------------------------