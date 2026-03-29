//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Keyboard {

  constructor () {
    this._keyEventsUp = {};
    this._keyEventsDown = {};
    
    this._onKeyUp = null;
    this._onKeyDown = null;

    this.initEvents();
  }

  //------------------------------------------------------------------------------

  set onKeyUp (func) { this._onKeyUp = func; }
  set onKeyDown (func) { this._onKeyDown = func; }

  //------------------------------------------------------------------------------

  setKeyEventUp (key, func) {
    this._keyEventsUp[key] = func;
  }

  setKeyEventDown (key, func) {
    this._keyEventsDown[key] = func;
  }

  //------------------------------------------------------------------------------

  initEvents () {
    document.body.onkeyup = (e)=>{ this.keyUp(e); }
    document.body.onkeydown = (e)=>{ this.keyDown(e); }
  }

  //------------------------------------------------------------------------------

  keyUp (event) {
    const key = event.key;

    if (Object.keys(this._keyEventsUp).includes(key)) {
      this._keyEventsUp[key](event);
    }

    if (this._onKeyUp) { this._onKeyUp(event); }
  }

  //------------------------------------------------------------------------------

  keyDown (event) {
    const key = event.key;

    if (Object.keys(this._keyEventsDown).includes(key)) {
      this._keyEventsDown[key](event);
    }

    if (this._onKeyUp) { this._onKeyUp(event); }
  }
  
}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const keyboard = new Keyboard();

//--------------------------------------------------------------------------------