//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class RobotConfig {

  #startingAngle; #robotWidth;
  
  constructor () {
    this.#startingAngle = 0;
    this.#robotWidth = 200;
  }

  //--------------------------------------

  get startingAngle () { return this.#startingAngle; }
  set startingAngle (angle) { this.#startingAngle = angle; }

  get robotWidth () { return this.#robotWidth; }
  set robotWidth (width) { this.#robotWidth = width; }

  //--------------------------------------

  toJSON () {
    const keys = ["startingAngle","robotWidth"];

    const serialisedData = {};

    for (let key of keys) { 
      serialisedData[key] = this[key]; 
    }
    
    return serialisedData;
  }

  //--------------------------------------

  loadData (data) {
    if (!data) return;

    if (data.startingAngle) {
      this.#startingAngle = data.startingAngle;
    } 
    if (data.robotWidth) {
      this.#robotWidth = data.robotWidth;
    }
  }
  
}

//--------------------------------------------------------------------------------