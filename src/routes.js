//------------------------------------------------------------
// Route manipulation functions
//------------------------------------------------------------
let currentRoute = null;

export function setCurrentRoute (route) {
  currentRoute = route;
}

export function getCurrentRoute () {
  return currentRoute;
}

//------------------------------------------------------------
// Route class
//------------------------------------------------------------
export class Route {
  constructor (menu) {
    
    this.name = "Robot Route";

    this.points = [];
    this.trash = [];

    this.currentPoint = null;
    this.holdingPoint = null;

    setCurrentRoute(this);
  }

  createPoint (x, y, d = 1, f = 0) {
    this.points.push({
      x: x,
      y: y,
      d: d,
      f: f,
    });
    this.currentPoint = this.points.length - 1;
  }

  deletePoint () {
    if (this.points.length > 0) {
      this.trash.push(this.points.pop());
    }
  
    if (this.holdingPoint >= this.points.length) {
      this.holdingPoint = null;
    }
    if (this.currentPoint >= this.points.length) {
      this.currentPoint = null;
    }  
  }

  restorePoint () {
    if (this.trash.length > 0) {
      this.points.push(this.trash.pop());
    }
  }

  setPoints (points) {
    this.points = points;
    this.currentPoint = null;
    this.holdingPoint = null;    
  }

  wipePoints () {
    this.points = [];
    this.currentPoint = null;
    this.holdingPoint = null; 
  }

  movePoint (direction) {
    if (this.currentPoint != null) {
      if (direction === "up") {
        this.points[this.currentPoint].y -= 1;
      }
      if (direction === "down") {
        this.points[this.currentPoint].y += 1;
      }
      if (direction === "left") {
        this.points[this.currentPoint].x -= 1;
      }
      if (direction === "right") {
        this.points[this.currentPoint].x += 1;
      }
    }
  }

  // Setter functions for points
  setCurrentPoint (index) {
    this.currentPoint = index;
  }

  setHoldingPoint (index) {
    this.holdingPoint = index;
  }
  
  setPointX (index, x) {
    if (index !== null) {
      this.points[index].x = x;
    }
  }

  setPointY (index, y) {
    if (index !== null) {
      this.points[index].y = y;
    }
  }

  setPointD (index, d) {
    if (index !== null) {
      this.points[index].d = d;
    }
  }

  setPointF (index, f) {
    if (index !== null) {
      this.points[index].f = Number(f);
    }
  }

  // Getter functions for points
  getCurrentPoint () {
    return this.currentPoint;
  }

  getHoldingPoint () {
    return this.holdingPoint;
  }

  getPoints () {
    return this.points;
  }
  
  getPointX (index) {
    if (index !== null) {
      return this.points[index].x;
    }
    else {
      return null;
    }
  }

  getPointY (index) {
    if (index !== null) {
      return this.points[index].y;
    }
    else {
      return null;
    }
  }

  getPointD (index) {
    if (index !== null) {
      return this.points[index].d;
    }
    else {
      return null;
    }
  }

  getPointF (index) {
    if (index !== null) {
      return this.points[index].f;
    }
    else {
      return null;
    }
  }
}