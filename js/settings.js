//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Settings {

  constructor () {
    this._robotWidth = 200;

    this._showInfo = true;

    this._showOverlay = false;
  }

  //------------------------------------------------------------------------------

  get robotWidth () { return this._robotWidth; }
  set robotWidth (width) { this._robotWidth = width; }

  get showInfo () { return this._showInfo; }
  set showInfo (value) { this._showInfo = value; }

  get showOverlay () { return this._showOverlay; }
  set showOverlay (value) { this._showOverlay = value; }

  //------------------------------------------------------------------------------

  toggleShowInfo () {
    this._showInfo = !this._showInfo;
  }

  //------------------------------------------------------------------------------

  toggleShowOverlay () {
    this._showOverlay = !this._showOverlay;
  }
  
}

//--------------------------------------------------------------------------------