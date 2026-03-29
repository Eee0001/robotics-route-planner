//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { missionManager } from "./manager.js"
import { canvas } from "./canvas.js"
import { getDistance } from "./math.js"
import { menu } from "./menu.js"

//------------------------------------------------------------
// CLASS
//------------------------------------------------------------

class Mouse {

  constructor () {
    this._position = {x: 0, y: 0};
  }

  //----------------------------------------------------------

  initEvents () {
    canvas.element.onmousemove = (e)=>{this.mouseMove(e);};
    
    document.body.onmouseup = ()=>{this.mouseUp();};
    
    canvas.element.onmousedown = ()=>{this.mouseDown();};
  }

  //----------------------------------------------------------

  mouseMove (event) {
    this._position.x = Math.round(event.offsetX / canvas.scale);
    this._position.y = Math.round(event.offsetY / canvas.scale);

    if (missionManager.holdingPoint !== null) {
      missionManager.holdingPoint.x = this._position.x;
      missionManager.holdingPoint.y = this._position.y;
    }
  }

  //----------------------------------------------------------

  mouseUp () {
    if (missionManager.holdingPoint !== null) {
      missionManager.holdingPoint = null;
    }
  }

  //----------------------------------------------------------

  mouseDown () {
    for (let point of missionManager.points) {
      if (getDistance(point, this._position) <= 25) {
        missionManager.currentPoint = point;
        missionManager.holdingPoint = point;
      }
    }

    if (missionManager.holdingPoint === null) {
      let point = missionManager.route.createPoint(this._position.x, this._position.y);

      missionManager.currentPoint = point;
      missionManager.holdingPoint = point;
    }
    
    menu.refresh();
  }

  //----------------------------------------------------------

  get position () {
    return this._position;
  }

  //----------------------------------------------------------
  
  get x () {
    return this._position.x;
  }

  set x (x) {
    this._position.x = x;
  }

  //----------------------------------------------------------

  get y () {
    return this._y;
  }

  set y (y) {
    this._position.y = y / canvas.scale;
  }
  
}

//------------------------------------------------------------

export const mouse = new Mouse();

//------------------------------------------------------------