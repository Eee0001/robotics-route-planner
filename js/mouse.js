//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Mouse {

  constructor () {
    this._scale = 1;
    
    this._x = 0;
    this._y = 0;

    this._onMouseMove = null;
    this._onMouseUp = null;
    this._onMouseDown = null;

    this.initEvents();
  }

  //------------------------------------------------------------------------------

  get position () { return { x: this._x, y: this._y }; }
  
  get x () { return this._x; }
  set x (x) { this._x = x / this._scale; }

  get y () { return this._y; }
  set y (y) { this._y = y / this._scale; }

  set scale (scale) { this._scale = scale; }
  
  set onMouseUp (func) { this._onMouseUp = func; }
  set onMouseDown (func) { this._onMouseDown = func; }
  set onMouseMove (func) { this._onMouseMove = func; }
  
  //------------------------------------------------------------------------------

  initEvents () {
    document.body.onmouseup = (e) => {
      this.mouseUp(e);
    };
    document.getElementById("canvas").onmousedown = (e) => {
      this.mouseDown(e);
    };
    document.getElementById("canvas").onmousemove = (e) => {
      this.mouseMove(e);
    };
    
  }

  //------------------------------------------------------------------------------

  mouseUp (event) {
    if (this._onMouseUp) { this._onMouseUp(event); }
  }

  //------------------------------------------------------------------------------

  mouseDown (event) {
    if (this._onMouseDown) { this._onMouseDown(event); }
  }

  //------------------------------------------------------------------------------

  mouseMove (event, route) {
    this.x = event.offsetX;
    this.y = event.offsetY;
    
    if (this._onMouseMove) { this._onMouseMove(event); }
  }
  
}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const mouse = new Mouse();

//--------------------------------------------------------------------------------