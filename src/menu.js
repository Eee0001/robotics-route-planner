import { DownloadRoute, CopyRoute, DownloadPoints, CopyPoints } from "./export.js"
import { ImportPointsFromText, UploadPointsFile, ImportPointsFromFile } from "./main.js"

export class Menu {
  constructor (route) {
    this.elements = {
      formPoints: document.getElementById("point"),
      formSettings: document.getElementById("settings"),
      
      pointX : document.getElementById("PointX"),
      pointY : document.getElementById("PointY"),
      
      pointDF : document.getElementById("F"),
      pointDB : document.getElementById("B"),
      
      pointF : document.getElementById("PointF"),
    
      robotW : document.getElementById("RobotW"),
      overlay : document.getElementById("Overlay"),
      info: document.getElementById("Info"),
    
      routeD: document.getElementById("RouteD"),
      routeL: document.getElementById("RouteL"),
      routeC: document.getElementById("RouteC"),
    
      pointsD: document.getElementById("PointsD"),
      pointsL: document.getElementById("PointsL"),
      pointsC: document.getElementById("PointsC"),
      pointsT: document.getElementById("PointsT"),
      pointsI: document.getElementById("PointsI"),
      pointsF: document.getElementById("PointsF"),
    };

    this.route = null;

    this.elements.formPoints.onsubmit = (e) => {e.preventDefault();};
    this.elements.formSettings.onsubmit = (e) => {e.preventDefault();};
  }

  updateEvents () {    
    let this2 = this;
    
    this.elements.pointX.onchange = function () {
      if (this2.route.currentPoint != null) {
        this2.route.points[this2.route.currentPoint].x = this2.elements.pointX.valueAsNumber;
      }
    }
    this.elements.pointY.onchange = function () {
      if (this2.route.currentPoint != null) {
        this2.route.points[this2.route.currentPoint].y = this2.elements.pointY.valueAsNumber;
      }
    }
    this.elements.pointDF.onchange = function () {
      if (this2.route.currentPoint != null) {
        this2.route.points[this2.route.currentPoint].d = 1;
      }
    }
    this.elements.pointDB.onchange = function () {
      if (this2.route.currentPoint != null) {
        this2.route.points[this2.route.currentPoint].d = -1;
      }
    }
    this.elements.pointF.onchange = function () {
      if (this2.route.currentPoint != null) {
        this2.route.points[this2.route.currentPoint].f = this2.elements.pointF.valueAsNumber;
      }
    }

    this.elements.robotW.onchange = function () {
      window.robotWidth = this2.elements.robotW.valueAsNumber;
    }
    
    this.elements.overlay.onchange = function () {
      window.showOverlay = this2.elements.overlay.checked;
    }
    
    this.elements.info.onchange = function () {
      window.showInfo = this2.elements.info.checked;
    }

    this.elements.routeD.onclick = function () {
      DownloadRoute(this2.route.points);
    }
    this.elements.routeC.onclick = function () {
      CopyRoute(this2.route.points);
    }
    
    this.elements.pointsD.onclick = function () {
      DownloadPoints(this2.route.points);
    }
    this.elements.pointsC.onclick = function () {
      CopyPoints(this2.route.points);
    }
    
    this.elements.pointsT.onchange = function () {
      ImportPointsFromText();
    }
    this.elements.pointsI.onclick = function () {
      UploadPointsFile();
    }
    this.elements.pointsF.onchange = function () {
      ImportPointsFromFile();
    }
  }

  updatePoints (route) {
    this.route = route;
    this.updateEvents();
    
    if (this.route.currentPoint != null) {
      this.elements.pointX.value = this.route.points[this.route.currentPoint].x;
      this.elements.pointY.value = this.route.points[this.route.currentPoint].y;
  
      if (this.route.points[this.route.currentPoint].d === 1) {
        this.elements.pointDF.checked = true;
      }
      if (this.route.points[this.route.currentPoint].d === -1) {
        this.elements.pointDB.checked = true;
      }
  
      this.elements.pointF.value = this.route.points[this.route.currentPoint].f;
    }
    else if (this.route.currentPoint === null) {
      this.elements.pointX.value = "";
      this.elements.pointY.value = "";
      
      this.elements.pointDF.checked = false;
      this.elements.pointDB.checked = false;
      
      this.elements.pointF.value = "";
    }
  }

  updateSettings () {
    this.elements.robotW.value = robotWidth;
    this.elements.overlay.checked = showOverlay;
    this.elements.info.checked = showInfo;
  }
  
}