//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------

//------------------------------------------------------------
// CLASS
//------------------------------------------------------------

export class Route {

  constructor () {
    this._currentPoint = null;
    this._holdingPoint = null;
    
    this._points = [];
    this._trash = [];
  }

  //----------------------------------------------------------

  createPoint (x, y, d = 1, f = 0) {
    const point = { x, y, d, f};

    this._points.push(point);
    this._currentPoint = point;

    return point;
  }

  //----------------------------------------------------------
  
  deletePoint () {
    if (this._points.length > 0) {
      this._trash.push(this._points.pop());
      
      this._currentPoint = null;
      this._holdingPoint = null;
    }
  }

  //----------------------------------------------------------
  
  restorePoint () {
    if (this._trash.length > 0) {
      this._points.push(this._trash.pop());
      
      this._currentPoint = null;
      this._holdingPoint = null;
    }
  }

  //----------------------------------------------------------

  wipePoints () {
    this._points = [];
    this._trash = [];

    this._currentPoint = null;
    this._holdingPoint = null;
  }

  //----------------------------------------------------------

  moveCurrentPoint (direction) {
    if (this.currentPoint !== null) {
      if (direction === "up") {
        this.currentPoint.y -= 1;
      }
      if (direction === "down") {
        this.currentPoint.y += 1;
      }
      if (direction === "left") {
        this.currentPoint.x -= 1;
      }
      if (direction === "right") {
        this.currentPoint.x += 1;
      }
    }
  }

  //----------------------------------------------------------

  get points () {
    return this._points;
  }

  set points (points) {
    this._points = points;
  }

  //----------------------------------------------------------
  
  get currentPoint () {
    return this._currentPoint;
  }

  set currentPoint (point) {
    this._currentPoint = point;
  }

  //----------------------------------------------------------
  
  get holdingPoint () {
    return this._holdingPoint;
  }

  set holdingPoint (point) {
    this._holdingPoint = point;
  }
  
}

//------------------------------------------------------------