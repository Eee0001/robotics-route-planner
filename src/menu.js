import { downloadRoute, copyRoute, downloadPoints, copyPoints } from "./export.js"
import { getCurrentRoute } from "./routes.js"

export class Menu {
  constructor (route) {
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

    this.settings = {
      robotWidth : 200,
      showOverlay : false,
      showInfo : true
    };

    this.elements.overlay.checked = this.settings.showOverlay;
    this.elements.info.checked = this.settings.showInfo;

    this.elements.formPoints.onsubmit = (e) => {e.preventDefault();};
    this.elements.formSettings.onsubmit = (e) => {e.preventDefault();};
  }

  getPointX () {
    return this.elements.pointX.valueAsNumber;
  }

  getPointY () {
    return this.elements.pointX.valueAsNumber;
  }

  getPointD () {
    return this.elements.pointDF.checked === true ? 1 : -1;
  }

  getPointF () {
    return this.elements.pointF.valueAsNumber;
  }

  getRobotW () {
    return this.elements.robotW.valueAsNumber;
  }

  getOverlay () {
    return this.elements.overlay.checked;
  }

  toggleOverlay () {
    this.settings.showOverlay = !this.settings.showOverlay;
    
    this.elements.overlay.checked = this.settings.showOverlay;
  }

  getInfo () {
    return this.elements.info.checked;
  }

  toggleInfo () {
    this.settings.showInfo = !this.settings.showInfo;
    
    this.elements.info.checked = this.settings.showInfo;
  }

  getPointsFromText (route) {
    let json = null;
    
    try {
      json = JSON.parse(this.elements.pointsT.value);
  
      route.setCurrentPoint(null);
      route.setHoldingPoint(null);
    }
    catch {
      json = null;
    }
  
    route.setPoints(json !== null ? json : route.getPoints());

    this.updatePoints(route);
  }

  getPointsFromFile (route) {
    let fileReader = new FileReader();
    
    const this2 = this;
    
    fileReader.onload = () => {

      let json = null;
  
      try {
        json = JSON.parse(fileReader.result);
  
        route.setCurrentPoint(null);
        route.setHoldingPoint(null);
      }
      catch {
        json = null;
      }
  
      route.setPoints(json !== null ? json : route.getPoints());

      this2.updatePoints(route);
    };
  
    fileReader.readAsText(this.elements.pointsF.files[0]);
  }

  updateSettings () {
    this.settings.robotWidth = this.getRobotW();
    this.settings.showOverlay = this.getOverlay();
    this.settings.showInfo = this.getInfo();
  }

  updatePoints (route) {
    this.elements.pointX.value = route.getPointX(route.getCurrentPoint());
    this.elements.pointY.value = route.getPointY(route.getCurrentPoint());

    if (route.getPointD(route.getCurrentPoint()) === 1) {
      this.elements.pointDF.checked = true;
    }
    else if (route.getPointD(route.getCurrentPoint()) === -1) {
      this.elements.pointDB.checked = true;
    }
    else {
      this.elements.pointDF.checked = false;
      this.elements.pointDB.checked = false;
    }

    this.elements.pointF.value = route.getPointF(route.getCurrentPoint());
  }

  updateEvents (route) {    
    const this2 = this;

    this.elements.pointX.onchange = () => {
      route.setPointX(route.getCurrentPoint(), this2.getPointX());
    };

    this.elements.pointY.onchange = () => {
      route.setPointY(route.getCurrentPoint(), this2.getPointY());
    };
    
    this.elements.pointDF.onchange = () => {
      route.setPointD(route.getCurrentPoint(), this2.getPointD());
    };

    this.elements.pointDB.onchange = () => {
      route.setPointD(route.getCurrentPoint(), this2.getPointD());
    };

    this.elements.pointF.onchange = () => {
      route.setPointF(route.getCurrentPoint(), this2.getPointF());
    };

    this.elements.robotW.onchange = () => {
      this2.settings.robotWidth = this2.getRobotW();
    };

    this.elements.overlay.onchange = () => {
      this2.settings.showOverlay = this2.getOverlay();
    };
    
    this.elements.info.onchange = () => {
      this2.settings.showInfo = this2.getInfo();
    };

    // exports and imports
    this.elements.routeD.onclick = () => {
      downloadRoute(route.getPoints());
    }
    this.elements.routeC.onclick = () => {
      copyRoute(route.getPoints());
    }
    
    this.elements.pointsD.onclick = () => {
      downloadPoints(route.getPoints());
    }
    this.elements.pointsC.onclick = () => {
      copyPoints(route.getPoints());
    }
    
    this.elements.pointsT.onchange = () => {
      this2.getPointsFromText(getCurrentRoute());
    }
    this.elements.pointsI.onclick = () => {
      this.elements.pointsF.click();
    }
    this.elements.pointsF.onchange = () => {
      this2.getPointsFromFile(getCurrentRoute());
    }
  }

  selectRoute (route) {
    this.updatePoints(route);
    this.updateEvents(route);
  }
}