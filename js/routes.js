//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Route {

  constructor () {
    this._currentPoint = null;
    this._holdingPoint = null;
    
    this._points = [];
    this._trash = [];

    this._startingAngle = 0;
  }

  //------------------------------------------------------------------------------

  get currentPoint () { return this._currentPoint; }
  set currentPoint (point) { this._currentPoint = point; }

  get holdingPoint () { return this._holdingPoint; }
  set holdingPoint (point) { this._holdingPoint = point; }

  get points () { return this._points; }
  set points (points) { this._points = points; }

  get startingAngle () { return this._startingAngle; }
  set startingAngle (angle) { this._startingAngle = angle; }
  
  //------------------------------------------------------------------------------
  
  createPoint (x, y, d = 1, a = 0) {
    const point = {x, y, d, a};
    this._points.push(point);

    this._currentPoint = point;

    return point;
  }

  //------------------------------------------------------------------------------

  deletePoint () {
    if (this._points.length > 0) {
      this._trash.push(this._points.pop());
      
      this._currentPoint = null;
      this._holdingPoint = null;
    }
  }

  //------------------------------------------------------------------------------

  restorePoint () {
    if (this._trash.length > 0) {
      this._points.push(this._trash.pop());
  
      this._currentPoint = null;
      this._holdingPoint = null;
    }
  }

  //------------------------------------------------------------------------------

  reset () {
    this._points = [];
    this._trash = [];

    this._currentPoint = null;
    this._holdingPoint = null;
  }

  //------------------------------------------------------------------------------

  movePoints (direction) {
    if (!this._currentPoint) return;

    if (direction === "up") {
      this._currentPoint.y -= 10;
    }
    if (direction === "down") {
      this._currentPoint.y += 10;
    }
    if (direction === "left") {
      this._currentPoint.x -= 10;
    }
    if (direction === "right") {
      this._currentPoint.x += 10;
    }
  }
  
}

//--------------------------------------------------------------------------------