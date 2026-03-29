//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { missionManager } from "./manager.js"

//------------------------------------------------------------
// CLASS
//------------------------------------------------------------

class Canvas {

  constructor () {
    this._element = document.getElementById("canvas");

    this._ctx = this._element.getContext("2d");

    this._scale = 1;

    this._container = document.getElementById("viewport");
  }

  //----------------------------------------------------------

  resize (field = missionManager.field) {
    const widthRatio = this._container.clientWidth / field.width;
    const heightRatio = this._container.clientHeight / field.height;

    this._scale = Math.min(widthRatio, heightRatio) * 0.9;

    this._element.width = field.width * this._scale;
    this._element.height = field.height * this._scale;

    this._ctx.scale(this._scale, this._scale);

    this.drawImage(field.image, 0, 0, field.width, field.height);
  }

  //----------------------------------------------------------

  drawImage (src, x, y, w, h) {
    this._ctx.drawImage(src, x, y, w, h);
  }

  //----------------------------------------------------------

  drawPoint (x, y, r, color, type = "fill") {
    this._ctx.beginPath();
    
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 3;

    this._ctx.fillStyle = color;

    this._ctx.arc(x, y, r, 0, Math.PI * 2);

    if (type === "fill") {
      this._ctx.fill();
    }
    
    if (type === "stroke") {
      this._ctx.stroke();
    }
  }

  //----------------------------------------------------------

  drawLine (points, color, lineWidth = 3) {
    this._ctx.beginPath();

    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = lineWidth;

    this._ctx.lineCap = "round";
    this._ctx.lineJoin = "round";

    for (let point of points) {
      this._ctx.lineTo(point.x, point.y);
    }

    this._ctx.stroke();
  }

  //----------------------------------------------------------

  drawText (text, x, y, color) {
    this._ctx.beginPath();

    this._ctx.fillStyle = color;

    this._ctx.font = "bold 36px sans";
    this._ctx.textAlign = "center";

    this._ctx.fillText(text, x, y);

    this._ctx.fill();
  }

  //----------------------------------------------------------

  get scale () {
    return this._scale;
  }

  //----------------------------------------------------------

  get element () {
    return this._element;
  }

  //----------------------------------------------------------

  get container () {
    return this._container;
  }
  
}

//------------------------------------------------------------

export const canvas = new Canvas();

//------------------------------------------------------------