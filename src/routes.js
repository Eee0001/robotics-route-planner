export class Route {
  constructor (menu) {
    
    this.name = "Robot Route";

    this.points = [];
    this.trash = [];

    this.currentPoint = null;
    this.holdingPoint = null;

    this.menu = menu;
    this.menu.updatePoints(this);
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
  
    this.menu.updatePoints(this);
  }

  restorePoint () {
    if (this.trash.length > 0) {
      this.points.push(this.trash.pop());
    }
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
      this.menu.updatePoints(this);
    }
  }

  setPointDirection (d) {
    if (this.currentPoint != null) {
      this.points[this.currentPoint].d = d;
      this.menu.updatePoints(this);
    }
  }

  setPointFunction (f) {
    if (this.currentPoint != null) {
      this.points[this.currentPoint].f = Number(f);
      this.menu.updatePoints(this);
    }
  }
}