//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Settings {

  #showInfo; #showOverlay;

  constructor () {
    this.#showInfo = true;
    this.#showOverlay = false;
  }

  //--------------------------------------

  get showInfo () { return this.#showInfo; }
  set showInfo (value) { this.#showInfo = value; }

  get showOverlay () { return this.#showOverlay; }
  set showOverlay (value) { this.#showOverlay = value; }

  //--------------------------------------

  toggleShowInfo () {
    this.#showInfo = !this.#showInfo;
  }

  //--------------------------------------

  toggleShowOverlay () {
    this.#showOverlay = !this.#showOverlay;
  }

  //--------------------------------------

  toJSON () {
    return serializeObject(this, ["showInfo","showOverlay"]);
  }

  //--------------------------------------

  loadData (data) {
    if (!data) return;

    if (data.showInfo) {
      this.#showInfo = data.showInfo;
    }
    if (data.showOverlay) {
      this.#showOverlay = data.showOverlay;
    }
  }
  
}

//--------------------------------------------------------------------------------