//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Canvas {

  constructor () {
    this._container = document.getElementById("viewport");
    this._element = document.getElementById("canvas");

    this._ctx = this._element.getContext("2d");
    
    this._scale = 1;
    
    this._baseWidth = 2362;
    this._baseHeight = 1143;
  }

  //------------------------------------------------------------------------------

  get container () { return this._container; }

  get element () { return this._element; }

  get scale () { return this._scale; }

  get baseWidth () { return this._baseWidth; }

  get baseHeight () { return this._baseHeight; }

  //------------------------------------------------------------------------------

  setDimensions (width, height) {
    this._baseWidth = width;
    this._baseHeight = height;

    this.resize();
  }

  //------------------------------------------------------------------------------

  resize () {
    const widthRatio = this._container.clientWidth / this._baseWidth;
    const heightRatio = this._container.clientHeight / this._baseHeight;

    this._scale = Math.min(widthRatio, heightRatio) * 0.9;

    this._element.width = this._baseWidth * this._scale;
    this._element.height = this._baseHeight * this._scale;

    this._ctx.scale(this._scale, this._scale);

    this._ctx.clearRect(0, 0, this._baseWidth, this._baseHeight);
  }

  //------------------------------------------------------------------------------

  drawPoint (x, y, r, color, type = "fill") {
    this._ctx.beginPath();

    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 3;

    this._ctx.fillStyle = color;

    this._ctx.arc(x, y, r, 0, Math.PI * 2);

    if (type === "fill") this._ctx.fill();
    if (type === "stroke") this._ctx.stroke();
  }

  //------------------------------------------------------------------------------

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

  //------------------------------------------------------------------------------

  drawText (text, x, y, color) {
    this._ctx.beginPath();

    this._ctx.fillStyle = color;

    this._ctx.font = "bold 30px sans-serif";
    this._ctx.textAlign = "center";
    this._ctx.textBaseline = "middle";

    this._ctx.fillText(text, x, y);
  }

  //------------------------------------------------------------------------------
  
  drawImage (src, x, y, w, h) {
    this._ctx.imageSmoothingEnabled = false;
    this._ctx.drawImage(src, x, y, w, h);
  }
  
}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const canvas = new Canvas();

//--------------------------------------------------------------------------------