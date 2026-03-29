//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Canvas {

  #container; #element; #ctx; #scale; #width; #height;

  constructor () {
    this.#container = document.getElementById("viewport");
    this.#element = document.getElementById("canvas");
    
    this.#ctx = this.#element.getContext("2d");

    this.#scale = 1;

    this.#width = 2362;
    this.#height = 1143;
  }

  //--------------------------------------

  get scale () { return this.#scale; }

  //--------------------------------------

  setDimensions (width, height) {
    this.#width = width;
    this.#height = height;
    this.resize();
  }

  //--------------------------------------

  resize () {
    const widthRatio = this.#container.clientWidth / this.#width;
    const heightRatio = this.#container.clientHeight / this.#height;

    this.#scale = Math.min(widthRatio, heightRatio) * 0.9;

    this.#element.width = this.#width * this.#scale;
    this.#element.height = this.#height * this.#scale;

    this.#ctx.scale(this.#scale, this.#scale);

    this.#ctx.clearRect(0, 0, this.#width, this.#height);
  }

  //--------------------------------------

  drawPoint (x, y, r, color, type = "fill") {
    this.#ctx.beginPath();

    this.#ctx.strokeStyle = color;
    this.#ctx.lineWidth = 3;

    this.#ctx.fillStyle = color;

    this.#ctx.arc(x, y, r, 0, Math.PI * 2);

    if (type === "fill") this.#ctx.fill();
    if (type === "stroke") this.#ctx.stroke();
  }

  //--------------------------------------

  drawLine (points, color, lineWidth = 3) {
    this.#ctx.beginPath();

    this.#ctx.strokeStyle = color;
    this.#ctx.lineWidth = lineWidth;

    this.#ctx.lineCap = "round";
    this.#ctx.lineJoin = "round";

    for (let point of points) {
      this.#ctx.lineTo(point.x, point.y);
    }

    this.#ctx.stroke();
  }

  //--------------------------------------

  drawText (text, x, y, color) {
    this.#ctx.beginPath();
    
    this.#ctx.fillStyle = color;

    this.#ctx.font = "bold 30px sans-serif";
    this.#ctx.textAlign = "center";
    this.#ctx.textBaseline = "middle";

    this.#ctx.fillText(text, x, y);
  }

  //--------------------------------------

  drawImage (src, x, y, w, h) {
    this.#ctx.drawImage(src, x, y, w, h);
  }
  
}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const canvas = new Canvas();

//--------------------------------------------------------------------------------