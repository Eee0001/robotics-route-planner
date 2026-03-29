//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class MissionManager {

  constructor () {
    this._currentMission = null;
    
    this._missions = [];
    this._trash = [];
  }

  //------------------------------------------------------------------------------

  get currentMission () { return this._currentMission }
  
  get missions () { return this._missions }

  //------------------------------------------------------------------------------

  createMission () {
    const mission = new Mission();
    this._missions.push(mission);

    this.selectMission(mission);

    return mission;
  }

  //------------------------------------------------------------------------------

  deleteMission (mission) {
    if (this._missions.length > 0) {
      const index = this._missions.indexOf(mission);
      this._missions.splice(index, 1);
      
      this._trash.push(mission);
      
      this.selectMission(this._missions[0]);
    }
  }

  //------------------------------------------------------------------------------

  restoreMission () {
    if (this._trash.length > 0) {
      this._missions.push(this._trash.pop());
      
      this.selectMission(this._missions[0]);
    }
  }

  //------------------------------------------------------------------------------

  reset () {
    this._currentMission = null;
    
    this._missions = [];
    this._trash = [];
  }

  //------------------------------------------------------------------------------

  selectMission (mission) {
    this._currentMission = mission;
  }
  
}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const missionManager = new MissionManager();
missionManager.createMission();

//--------------------------------------------------------------------------------