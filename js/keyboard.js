//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Keyboard {

  #keyEventsUp; #keyEventsDown; #onKeyUp; #onKeyDown;

  constructor () {
    this.#keyEventsUp = {};
    this.#keyEventsDown = {};

    this.#onKeyUp = null;
    this.#onKeyDown = null;

    this.#initEvents();
  }

  //--------------------------------------

  get onKeyUp () { return this.#onKeyUp; }
  set onKeyUp (func) { this.#onKeyUp = func; }

  get onKeyDown () { return this.#onKeyDown; }
  set onKeyDown (func) { this.#onKeyDown = func; }

  //--------------------------------------

  setKeyEvent (type, key, func) {
    if (type === "up") this.#keyEventsUp[key] = func;
    if (type === "down") this.#keyEventsDown[key] = func;
  }

  //--------------------------------------

  #initEvents () {
    document.body.onkeyup = (e) => { this.#upEvent(e); };
    
    document.body.onkeydown = (e) => { this.#downEvent(e); };
  }

  //--------------------------------------

  #upEvent (event) {
    if (document.activeElement !== document.body) return;
    
    const key = event.key;

    if (Object.keys(this.#keyEventsUp).includes(key)) {
      this.#keyEventsUp[key](event);
    }

    if (this.#onKeyUp) this.#onKeyUp(event);
  }

  //--------------------------------------

  #downEvent (event) {
    if (document.activeElement !== document.body) return;
    
    const key = event.key;

    if (Object.keys(this.#keyEventsDown).includes(key)) {
      this.#keyEventsDown[key](event);
    }

    if (this.#onKeyDown) this.#onKeyDown(event);
  }

}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const keyboard = new Keyboard();

//--------------------------------------------------------------------------------