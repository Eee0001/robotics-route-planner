export class Canvas {
  constructor (container) {
    
    this.element = document.createElement("canvas");
    this.element.setAttribute("id", "canvas");
    
    this.ctx = this.element.getContext("2d");

    this.map = document.createElement("img");
    this.map.src = "mission.png";
    
    // Scale is 1mm per px
    this.baseWidth = 2362;
    this.baseHeight = 1143;
    
    this.scale = 1;

    this.container = container;
    this.container.appendChild(this.element);
  }
  
  resize () {
    let widthRatio = this.container.clientWidth / this.baseWidth;
    let heightRatio = this.container.clientHeight / this.baseHeight;

    this.scale = Math.min(widthRatio, heightRatio) * 0.9;

    this.element.width = this.baseWidth * this.scale;
    this.element.height = this.baseHeight * this.scale;

    this.ctx.scale(this.scale, this.scale);
    
    this.drawImage(this.map, 0, 0, this.baseWidth, this.baseHeight);
  }

  drawPoint (x, y, r, color, type = "fill") {
    this.ctx.beginPath();
    
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = color;
    
    this.ctx.arc(x, y, 10, 0, 2*Math.PI);
    
    if (type === "fill") {
      this.ctx.fill();
    }
    if (type === "stroke") {
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
  }

  drawtext (x, y, text, color) {
    this.ctx.beginPath();
    
    this.ctx.font = "bold 36px sans";
    this.ctx.textAlign = "center";
    
    this.ctx.fillText(text, x, y);
    
    this.ctx.fill();
  }

  drawLine (points, color, lineWidth = 3) {
    this.ctx.beginPath();
  
    for (point of points) {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;
      
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      
      this.ctx.lineTo(point.x, point.y);
    }
    
    this.ctx.stroke();
  }

  drawImage (src, x, y, w, h) {
    this.ctx.drawImage(src, x, y, w, h);
  }
}