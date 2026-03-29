//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class MissionManager {

  #currentMission; #missions; #trash;

  constructor () {
    this.#currentMission = null;

    this.#missions = [];
    this.#trash = [];

    this.createMission();
  }

  //--------------------------------------

  get currentMission () { return this.#currentMission; }

  get missions () { return this.#missions; }

  //--------------------------------------

  get currentField () { 
    return this.#currentMission?.field; 
  }
  
  get currentRoute () { 
    return this.#currentMission?.route; 
  }
  
  get currentConfig () { 
    return this.#currentMission?.config; 
  }
  
  get currentSettings () { 
    return this.#currentMission?.settings; 
  }

  //--------------------------------------

  createMission () {
    const mission = new Mission();
    this.#missions.push(mission);

    this.#currentMission = mission;

    return mission;
  }

  //--------------------------------------

  deleteMission (mission) {
    if (this.#missions.length < 1) return;

    const index = this.#missions.indexOf(mission);
    this.#missions.splice(index, 1);

    this.#trash.push(mission);

    this.#currentMission = this.#missions[0];
  }

  //--------------------------------------

  restoreMission () {
    if (this.#trash.length < 1) return;

    this.#missions.push(this.#trash.pop());
  }

  //--------------------------------------

  downloadMission () {
    saveToFile(
      this.#currentMission.name, 
      "application/json", 
      JSON.stringify(this.#currentMission)
    );
  }

  //--------------------------------------

  uploadMission (file) {
    readFileContent(file).then((rawData) => {
      try {
        const data = JSON.parse(rawData);
        this.#currentMission.loadData(data);
      }
      catch {
        console.warn("Incomplete Mission data loaded");
      }
    });
  }
  //--------------------------------------

  downloadRoute () {
    const points = this.#currentMission?.route?.points;
    const angle = this.#currentMission?.config?.startingAngle;
    
    saveToFile(
      this.#currentMission.name,
      "text/plain",
      generateInstructions(points, angle)
    );
  }

  //--------------------------------------

  reset (createMission = false) {
    this.#currentMission = null;

    this.#missions = [];
    this.#trash = [];

    if (createMission) {
      this.createMission();
    }
  }

  //--------------------------------------

  saveToStorage () {
    saveToStorage("missions", JSON.stringify(this.#missions));
  }

  //--------------------------------------

  loadFromStorage () {
    const rawData = loadFromStorage("missions");

    try {
      const data = JSON.parse(rawData);
      this.loadData(data);
    }
    catch {
      console.warn("Incomplete missions data loaded");
    }
  }

  //--------------------------------------

  loadData (data) {
    if (!data) return;

    this.reset(false);

    for (let mission of data) {
      this.createMission().loadData(mission);
    }

    if (this.#missions.length < 1) {
      this.createMission();
    }
  }
  
}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const missionManager = new MissionManager();

//--------------------------------------------------------------------------------