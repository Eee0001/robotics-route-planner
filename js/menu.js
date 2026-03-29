//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Menu {

  #elements; #ids; #dataKeys; #previousData;

  constructor () {
    this.#ids = [
      "menu", "button", "PointX", "PointY", "PointD", "PointA", "RobotA", 
      "RobotW", "ShowI", "ShowO","ExportR", "ExportM", "ImportM"
    ];

    this.#elements = {};

    for (let id of this.#ids) {
      this.#elements[id] = document.getElementById(id);
    }

    this.#dataKeys = {
      PointX: { target: "point", property: "x" },
      PointY: { target: "point", property: "y" },
      PointD: { target: "point", property: "d" },
      PointA: { target: "point", property: "a" },

      RobotA: { target: "config", property: "startingAngle" },
      RobotW: { target: "config", property: "robotWidth" },

      ShowI: { target: "settings", property: "showInfo" },
      ShowO: { target: "settings", property: "showOverlay" }
    };

    this.#previousData = {};
  }

  //--------------------------------------

  #getDataTargets (missionManager) {
    return {
      point: missionManager.currentRoute?.currentPoint,
      config: missionManager.currentConfig,
      settings: missionManager.currentSettings
    };
  }

  //--------------------------------------

  initEvents (missionManager) {
    for (let [id, dataKey] of Object.entries(this.#dataKeys)) {
      const element = this.#elements[id];
      
      element.onchange = (e) => {
        const dataTargets = this.#getDataTargets(missionManager);

        const dataTarget = dataTargets[dataKey.target];
        if (!dataTarget) return; 

        if (element.type === "number") {
          dataTarget[dataKey.property] = element.valueAsNumber;
        }

        if (element.type === "select-one") {
          dataTarget[dataKey.property] = Number(element.value);
        }

        if (element.type === "checkbox") {
          dataTarget[dataKey.property] = element.checked;
        }
      }
    }

    this.#elements.ExportR.onclick = ()=>{
      missionManager.downloadRoute();
    }
    
    this.#elements.ExportM.onclick = ()=>{
      missionManager.downloadMission();
    }

    this.#elements.ImportM.onclick = ()=>{
      loadFile(".json").then((file)=>{missionManager.uploadMission(file);});
    }

    this.#elements["button"].onclick = ()=>{ 
      this.#elements["menu"].classList.toggle("hidden"); 
    };
  }

  //--------------------------------------

  refresh (missionManager) {
    if (document.activeElement !== document.body) return;

    const dataTargets = this.#getDataTargets(missionManager);

    for (let [id, dataKey] of Object.entries(this.#dataKeys)) {
      const dataTarget = dataTargets[dataKey.target];
      if (!dataTarget) continue;
      
      const data = dataTarget[dataKey.property];

      if (this.#previousData[id] !== data) {
        this.#elements[id].value = this.#previousData[id] = data;
      }
      
    }
  }
  
}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const menu = new Menu();

//--------------------------------------------------------------------------------