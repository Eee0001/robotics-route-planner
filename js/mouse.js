//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Mouse {

  #x; #y; #onMouseUp; #onMouseDown; #onMouseMove; #scale;

  constructor () {
    this.#x = 0;
    this.#y = 0;

    this.#onMouseUp = null;
    this.#onMouseDown = null;
    this.#onMouseMove = null;

    this.#scale = 1;

    this.#initEvents();
  }

  //--------------------------------------

  get position () { return { x: this.#x, y: this.#y } }

  get x () { return this.#x; }
  get y () { return this.#y; }

  get onMouseUp () { return this.#onMouseUp; }
  set onMouseUp (func) { this.#onMouseUp = func; }

  get onMouseDown () { return this.#onMouseDown; }
  set onMouseDown (func) { this.#onMouseDown = func; }

  get onMouseMove () { return this.#onMouseMove; }
  set onMouseMove (func) { this.#onMouseMove = func; }

  get scale () { return this.#scale; }
  set scale (scale) { this.#scale = scale; }

  //--------------------------------------

  #initEvents () {
    document.body.onmouseup = (e) => { this.#upEvent(e); };

    const canvas = document.getElementById("canvas");

    canvas.onmousedown = (e) => { this.#downEvent(e); };
    
    canvas.onmousemove = (e) => { this.#moveEvent(e); };
  }

  //--------------------------------------

  #upEvent (event) {
    if (document.activeElement !== document.body) return;
    if (this.#onMouseUp) this.#onMouseUp(event);
  }

  //--------------------------------------

  #downEvent (event) {
    if (document.activeElement !== document.body) return;
    if (this.#onMouseDown) this.#onMouseDown(event);
  }

  //--------------------------------------

  #moveEvent (event) {
    if (document.activeElement !== document.body) return;
    
    this.#x = Math.round(event.offsetX / this.#scale);
    this.#y = Math.round(event.offsetY / this.#scale);

    if (this.#onMouseMove) this.#onMouseMove(event);
  }
  
}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const mouse = new Mouse();

//--------------------------------------------------------------------------------