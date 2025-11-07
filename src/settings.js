//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------

//------------------------------------------------------------
// CLASS
//------------------------------------------------------------

export class Settings {

  constructor () {
    this._robotWidth = 200;
    
    this._startingAngle = 0;
    
    this._showInfo = true;
    this._showOverlay = false;
  }

  //----------------------------------------------------------

  get robotWidth () {
    return this._robotWidth;
  }

  set robotWidth (width) {
    this._robotWidth = width;
  }

  //----------------------------------------------------------

  get startingAngle () {
    return this._startingAngle;
  }

  set startingAngle (angle) {
    this._startingAngle = angle;
  }

  //----------------------------------------------------------

  get showInfo () {
    return this._showInfo;
  }

  set showInfo (value) {
    this._showInfo = value;
  }

  toggleShowInfo () {
    this._showInfo = !this._showInfo;
  }

  //----------------------------------------------------------

  get showOverlay () {
    return this._showOverlay;
  }

  set showOverlay (value) {
    this._showOverlay = value;
  }

  toggleShowOverlay () {
    this._showOverlay = !this._showOverlay;
  }
  
}

//------------------------------------------------------------