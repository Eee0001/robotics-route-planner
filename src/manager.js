//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { Mission } from "./missions.js"

//------------------------------------------------------------
// CLASS
//------------------------------------------------------------

class MissionManager {

  constructor () {
    this._currentMission = null;
    this._missions = [];
  }

  //----------------------------------------------------------

  createMission () {
    const mission = new Mission();
    
    this._missions.push(mission);

    this._currentMission = mission;
    
    return mission;
  }

  //----------------------------------------------------------

  deleteMission (mission) {
    const index =  this._missions.indexOf(mission);
    this._missions.splice(index, 1);

    if (this._currentMission === mission) {
      this._currentMission = null;
    }
  }

  //----------------------------------------------------------

  selectMission (mission) {
    this.currentMission = mission;
  }

  //----------------------------------------------------------

  get missions () {
    return this._missions;
  }

  set missions (missions) {
    this._missions = missions;
  }
  
  //----------------------------------------------------------
  
  get currentMission () {
    return this._currentMission;
  }

  set currentMission (mission) {
    this._currentMission = mission;
  }

  //----------------------------------------------------------

  get settings () {
    return this.currentMission?.settings;
  }

  get route () {
    return this.currentMission?.route;
  }

  get field () {
    return this.currentMission?.field;
  }

  //----------------------------------------------------------

  get points () {
    return this.currentMission?.route?.points ?? [];
  }

  //----------------------------------------------------------

  get currentPoint () {
    return this.currentMission?.route?.currentPoint;
  }

  set currentPoint (point) {
    if (this.currentMission?.route !== null) {
      this.currentMission.route.currentPoint = point;
    }
  }

  //----------------------------------------------------------

  get holdingPoint () {
    return this.currentMission?.route?.holdingPoint;
  }

  set holdingPoint (point) {
    if (this.currentMission?.route !== null) {
      this.currentMission.route.holdingPoint = point;
    }
  }
  
}

//------------------------------------------------------------

export const missionManager = new MissionManager();

//------------------------------------------------------------