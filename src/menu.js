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
      pointX: document.getElementById("PointX"),
      pointY: document.getElementById("PointY"),
      pointD: document.getElementById("PointD"),
      pointF: document.getElementById("PointF"),

      robotW: document.getElementById("RobotW"),

      showO: document.getElementById("ShowO"),
      showI: document.getElementById("ShowI"),

      exportR: document.getElementById("ExportR"),
      exportP: document.getElementById("ExportP"),

      importP: document.getElementById("ImportP"),

      fileI: document.getElementById("FileI")
    };
  }

  //----------------------------------------------------------

  initEvents () {
    for (let id of ["pointX", "pointY", "pointD", "pointF"]) {
      this.elements[id].onchange = ()=>{this.updateCurrentPoint();};
    }

    for (let id of ["robotW", "showO", "showI"]) {
      this.elements[id].onchange = ()=>{this.updateSettings();};
    }

    this.elements.exportR.onclick = ()=>{downloadRoute();}
    this.elements.exportP.onclick = ()=>{downloadPoints();}

    this.elements.importP.onclick = ()=>{this.elements.fileI.click();}

    this.elements.fileI.onchange = ()=>{this.importPointsFromFile();}
  }

  //----------------------------------------------------------

  refresh () {
    const point = missionManager.currentPoint;

    if (point !== null) {
      this.elements.pointX.value = point.x;
      this.elements.pointY.value = point.y;
      
      this.elements.pointD.checked = point.d === 1;
      // this.elements.pointDB.checked = point.d === -1;
      
      this.elements.pointF.value = point.f;
    }

    const settings = missionManager.settings;

    if (settings !== null) {
      this.elements.robotW.value = settings.robotWidth;
      this.elements.showO.checked = settings.showOverlay;
      this.elements.showI.checked = settings.showInfo;
      // this.elements.robotW.value = settings.robotWidth;
      // this.elements.info.checked = settings.showInfo;
      // this.elements.overlay.checked = settings.showOverlay;
    }
  }

  //----------------------------------------------------------

  updateCurrentPoint () {
    const point = missionManager.currentPoint;

    if (point) {
      point.x = this.elements.pointX.valueAsNumber;
      point.y = this.elements.pointY.valueAsNumber;
  
      point.d = this.elements.pointD.checked ? 1 : -1;
  
      point.f = this.elements.pointF.valueAsNumber;
    }
  }

  //----------------------------------------------------------

  updateSettings () {
    const settings = missionManager.settings;

    if (settings) {
      settings.robotWidth = this.elements.robotW.valueAsNumber;
      settings.showInfo = this.elements.showI.checked;
      settings.showOverlay = this.elements.showO.checked;
    }
  }

  //----------------------------------------------------------

  importPointsFromFile () {
    loadPointsFromFile(this.elements.fileI.files[0]);
  }
  
}

//------------------------------------------------------------

export const menu = new Menu();

//------------------------------------------------------------