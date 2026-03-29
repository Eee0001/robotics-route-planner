//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Route {

  #currentPoint; #holdingPoint; #points; #trash;

  constructor () {
    this.#currentPoint = null;
    this.#holdingPoint = null;

    this.#points = [];
    this.#trash = [];
  }

  //--------------------------------------

  get currentPoint () { return this.#currentPoint; }
  set currentPoint (point) { this.#currentPoint = point; }

  get holdingPoint () { return this.#holdingPoint; }
  set holdingPoint (point) { this.#holdingPoint = point; }

  get points () { return this.#points; }

  //--------------------------------------

  createPoint (x, y, d = 1, a = 0) {
    const point = {x, y, d, a};
    this.#points.push(point);

    this.#currentPoint = point;

    return point;
  }

  //--------------------------------------

  deletePoint () {
    if (this.#points.length < 1) return;

    this.#trash.push(this.#points.pop());

    this.#currentPoint = null;
    this.#holdingPoint = null;
  }

  //--------------------------------------

  restorePoint () {
    if (this.#trash.length < 1) return;

    this.#points.push(this.#trash.pop());
  }

  //--------------------------------------

  movePoint (direction) {
    if (!this.#currentPoint) return;

    if (direction === "up") {
      this.#currentPoint.y -= 10;
    }
    if (direction === "down") {
      this.#currentPoint.y += 10;
    }
    if (direction === "left") {
      this.#currentPoint.x -= 10;
    }
    if (direction === "right") {
      this.#currentPoint.x += 10;
    }
  }

  //--------------------------------------

  grabPoint (position) {
    const point = this.#points.find((p)=>{ 
      return getDistance(p, position) <= 25; 
    });

    if (point) {
      this.#currentPoint = point;
      this.#holdingPoint = point;
      
      return point;
    }
  }

  //--------------------------------------

  reset () {
    this.#currentPoint = null;
    this.#holdingPoint = null;

    this.#points = [];
    this.#trash = [];
  }

  //--------------------------------------

  toJSON () {
    return serializeObject(this, ["points"]);
  }

  //--------------------------------------

  loadData (data) {
    if (!data) return;

    this.reset();

    if (data.points) this.#points = data.points;
  }
  
}

//--------------------------------------------------------------------------------