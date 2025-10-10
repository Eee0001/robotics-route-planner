(() => {
  // src/math.js
  function RadToDeg(angle) {
    return angle * 180 / Math.PI;
  }
  function CalculateDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }
  function CalculateAngle(p1, p2) {
    return RadToDeg(Math.atan2(p2.x - p1.x, p1.y - p2.y));
  }
  function FlipAngle(angle) {
    return -1 * Math.sign(angle) * (180 - Math.abs(angle));
  }
  function CalculateTurn(angle1, angle2) {
    return Math.sign((angle2 - angle1 + 540) % 360 - 180);
  }

  // src/canvas.js
  var Canvas = class {
    constructor(container2) {
      this.element = document.createElement("canvas");
      this.element.setAttribute("id", "canvas");
      this.ctx = this.element.getContext("2d");
      this.map = document.createElement("img");
      this.map.src = "mission.png";
      this.baseWidth = 2362;
      this.baseHeight = 1143;
      this.scale = 1;
      this.container = container2;
      this.container.appendChild(this.element);
    }
    resize() {
      let widthRatio = this.container.clientWidth / this.baseWidth;
      let heightRatio = this.container.clientHeight / this.baseHeight;
      this.scale = Math.min(widthRatio, heightRatio) * 0.9;
      this.element.width = this.baseWidth * this.scale;
      this.element.height = this.baseHeight * this.scale;
      this.ctx.scale(this.scale, this.scale);
      this.drawImage(this.map, 0, 0, this.baseWidth, this.baseHeight);
    }
    drawPoint(x, y, r, color, type = "fill") {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.strokeStyle = color;
      this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
      if (type === "fill") {
        this.ctx.fill();
      }
      if (type === "stroke") {
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
      }
    }
    drawtext(x, y, text, color) {
      this.ctx.beginPath();
      this.ctx.font = "bold 36px sans";
      this.ctx.textAlign = "center";
      this.ctx.fillText(text, x, y);
      this.ctx.fill();
    }
    drawLine(points2, color, lineWidth = 3) {
      this.ctx.beginPath();
      for (point of points2) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.lineTo(point.x, point.y);
      }
      this.ctx.stroke();
    }
    drawImage(src, x, y, w, h) {
      this.ctx.drawImage(src, x, y, w, h);
    }
  };

  // src/export.js
  function ExportRoute(points2) {
    let route2 = ``;
    for (let i = 0; i < points2.length - 1; i++) {
      const angle1 = i === 0 ? 0 : CalculateAngle(points2[i - 1], points2[i]);
      let angle2 = CalculateAngle(points2[i], points2[i + 1]);
      if (points2[i].d === -1) {
        angle2 = FlipAngle(angle2);
      }
      let turn = CalculateTurn(angle1, angle2);
      if (i > 0) {
        if (points2[i - 1].d === -1) {
          turn *= -1;
        }
      }
      const distance = CalculateDistance(points2[i], points2[i + 1]);
      const func = points2[i].f;
      const direction = points2[i].d;
      route2 += `` + turn + `
` + Math.round(angle2) + `
` + direction + `
` + Math.round(distance) + `
` + func + `
`;
    }
    return route2.trim();
  }
  function DownloadRoute(points2) {
    let data = ExportRoute(points2);
    let blob = new Blob([data], { type: "text.plain" });
    let url = URL.createObjectURL(blob);
    let element = document.createElement("a");
    element.setAttribute("download", "Robot-Route");
    element.href = url;
    element.click();
    element.remove();
  }
  function CopyRoute(points2) {
    navigator.clipboard.writeText(ExportRoute(points2));
  }
  function ExportPoints(points2) {
    return JSON.stringify(points2);
  }
  function DownloadPoints(points2) {
    let data = ExportPoints(points2);
    let blob = new Blob([data], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let element = document.createElement("a");
    element.setAttribute("download", "Points");
    element.href = url;
    element.click();
    element.remove();
  }
  function CopyPoints(points2) {
    navigator.clipboard.writeText(ExportPoints(points2));
  }

  // src/menu.js
  var Menu = class {
    constructor(route2) {
      this.elements = {
        formPoints: document.getElementById("point"),
        formSettings: document.getElementById("settings"),
        pointX: document.getElementById("PointX"),
        pointY: document.getElementById("PointY"),
        pointDF: document.getElementById("F"),
        pointDB: document.getElementById("B"),
        pointF: document.getElementById("PointF"),
        robotW: document.getElementById("RobotW"),
        overlay: document.getElementById("Overlay"),
        info: document.getElementById("Info"),
        routeD: document.getElementById("RouteD"),
        routeL: document.getElementById("RouteL"),
        routeC: document.getElementById("RouteC"),
        pointsD: document.getElementById("PointsD"),
        pointsL: document.getElementById("PointsL"),
        pointsC: document.getElementById("PointsC"),
        pointsT: document.getElementById("PointsT"),
        pointsI: document.getElementById("PointsI"),
        pointsF: document.getElementById("PointsF")
      };
      this.route = null;
      this.elements.formPoints.onsubmit = (e) => {
        e.preventDefault();
      };
      this.elements.formSettings.onsubmit = (e) => {
        e.preventDefault();
      };
    }
    updateEvents() {
      let this2 = this;
      this.elements.pointX.onchange = function() {
        if (this2.route.currentPoint != null) {
          this2.route.points[this2.route.currentPoint].x = this2.elements.pointX.valueAsNumber;
        }
      };
      this.elements.pointY.onchange = function() {
        if (this2.route.currentPoint != null) {
          this2.route.points[this2.route.currentPoint].y = this2.elements.pointY.valueAsNumber;
        }
      };
      this.elements.pointDF.onchange = function() {
        if (this2.route.currentPoint != null) {
          this2.route.points[this2.route.currentPoint].d = 1;
        }
      };
      this.elements.pointDB.onchange = function() {
        if (this2.route.currentPoint != null) {
          this2.route.points[this2.route.currentPoint].d = -1;
        }
      };
      this.elements.pointF.onchange = function() {
        if (this2.route.currentPoint != null) {
          this2.route.points[this2.route.currentPoint].f = this2.elements.pointF.valueAsNumber;
        }
      };
      this.elements.robotW.onchange = function() {
        window.robotWidth = this2.elements.robotW.valueAsNumber;
      };
      this.elements.overlay.onchange = function() {
        window.showOverlay = this2.elements.overlay.checked;
      };
      this.elements.info.onchange = function() {
        window.showInfo = this2.elements.info.checked;
      };
      this.elements.routeD.onclick = function() {
        DownloadRoute(this2.route.points);
      };
      this.elements.routeC.onclick = function() {
        CopyRoute(this2.route.points);
      };
      this.elements.pointsD.onclick = function() {
        DownloadPoints(this2.route.points);
      };
      this.elements.pointsC.onclick = function() {
        CopyPoints(this2.route.points);
      };
      this.elements.pointsT.onchange = function() {
        ImportPointsFromText();
      };
      this.elements.pointsI.onclick = function() {
        UploadPointsFile();
      };
      this.elements.pointsF.onchange = function() {
        ImportPointsFromFile();
      };
    }
    updatePoints(route2) {
      this.route = route2;
      this.updateEvents();
      if (this.route.currentPoint != null) {
        this.elements.pointX.value = this.route.points[this.route.currentPoint].x;
        this.elements.pointY.value = this.route.points[this.route.currentPoint].y;
        if (this.route.points[this.route.currentPoint].d === 1) {
          this.elements.pointDF.checked = true;
        }
        if (this.route.points[this.route.currentPoint].d === -1) {
          this.elements.pointDB.checked = true;
        }
        this.elements.pointF.value = this.route.points[this.route.currentPoint].f;
      } else if (this.route.currentPoint === null) {
        this.elements.pointX.value = "";
        this.elements.pointY.value = "";
        this.elements.pointDF.checked = false;
        this.elements.pointDB.checked = false;
        this.elements.pointF.value = "";
      }
    }
    updateSettings() {
      this.elements.robotW.value = robotWidth;
      this.elements.overlay.checked = showOverlay;
      this.elements.info.checked = showInfo;
    }
  };

  // src/routes.js
  var Route = class {
    constructor(menu2) {
      this.name = "Robot Route";
      this.points = [];
      this.trash = [];
      this.currentPoint = null;
      this.holdingPoint = null;
      this.menu = menu2;
      this.menu.updatePoints(this);
    }
    createPoint(x, y, d = 1, f = 0) {
      this.points.push({
        x,
        y,
        d,
        f
      });
      this.currentPoint = this.points.length - 1;
    }
    deletePoint() {
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
    restorePoint() {
      if (this.trash.length > 0) {
        this.points.push(this.trash.pop());
      }
    }
    wipePoints() {
      this.points = [];
      this.currentPoint = null;
      this.holdingPoint = null;
    }
    movePoint(direction) {
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
    setPointDirection(d) {
      if (this.currentPoint != null) {
        this.points[this.currentPoint].d = d;
        this.menu.updatePoints(this);
      }
    }
    setPointFunction(f) {
      if (this.currentPoint != null) {
        this.points[this.currentPoint].f = Number(f);
        this.menu.updatePoints(this);
      }
    }
  };

  // src/main.js
  window.robotWidth = 200;
  window.showOverlay = false;
  window.showInfo = true;
  var container = document.getElementById("viewport");
  var canvas = new Canvas(container);
  var menu = new Menu();
  var route = new Route(menu);
  function toggleShowOverlay() {
    window.showOverlay = !window.showOverlay;
    menu.updateSettings();
  }
  function toggleShowInfo() {
    window.showInfo = !window.showInfo;
    menu.updateSettings();
  }
  var mouse = {
    x: 0,
    y: 0
  };
  canvas.element.onmousemove = function(e) {
    mouse.x = Math.round(e.offsetX / canvas.scale);
    mouse.y = Math.round(e.offsetY / canvas.scale);
    if (route.holdingPoint !== null) {
      route.points[route.holdingPoint].x = mouse.x;
      route.points[route.holdingPoint].y = mouse.y;
      menu.updatePoints(route);
    }
  };
  canvas.element.onmousedown = function(e) {
    for (point of route.points) {
      if (CalculateDistance(point, mouse) <= 25) {
        route.holdingPoint = route.points.indexOf(point);
        route.currentPoint = route.points.indexOf(point);
        menu.updatePoints(route);
      }
    }
    if (route.holdingPoint === null) {
      route.createPoint(mouse.x, mouse.y);
      route.holdingPoint = route.points.length - 1;
      route.currentPoint = route.points.length - 1;
      menu.updatePoints(route);
    }
  };
  document.onmouseup = function(e) {
    route.holdingPoint = null;
  };
  container.onkeyup = function(e) {
    let key = e.key;
    if (key === "Backspace") {
      route.deletePoint();
    }
    if (key === "Enter") {
      route.restorePoint();
    }
    if (key === "-") {
      route.setPointDirection(-1);
    }
    if (key === "=") {
      route.setPointDirection(1);
    }
    if (!isNaN(key)) {
      route.setPointFunction(key);
    }
    if (key === "o") {
      toggleShowOverlay();
    }
    if (key === "i") {
      toggleShowInfo();
    }
    if (key === "p") {
      LoadPreviousSavedPoints();
    }
    if (key === "q") {
      route.wipePoints();
    }
  };
  container.onkeydown = function(e) {
    let key = e.key;
    if (key === "ArrowLeft") {
      route.movePoint("left");
    }
    if (key === "ArrowRight") {
      route.movePoint("right");
    }
    if (key === "ArrowUp") {
      route.movePoint("up");
    }
    if (key === "ArrowDown") {
      route.movePoint("down");
    }
  };
  function ImportPointsFromText() {
    try {
      json = JSON.parse(menu.elements.pointsT.value);
      route.currentPoint = null;
      route.holdingPoint = null;
    } catch {
      json = null;
    }
    route.points = json !== null ? json : route.points;
  }
  function UploadPointsFile() {
    menu.elements.pointsF.click();
  }
  function ImportPointsFromFile() {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        json = JSON.parse(fileReader.result);
        route.currentPoint = null;
        route.holdingPoint = null;
      } catch {
        json = null;
      }
      route.points = json !== null ? json : route.points;
    };
    fileReader.readAsText(menu.elements.pointsF.files[0]);
  }
  function SavePoints() {
    localStorage.setItem("Save", ExportPoints(route.points));
  }
  window.onbeforeunload = function() {
    SavePoints();
  };
  function LoadPreviousSavedPoints() {
    try {
      json = JSON.parse(localStorage.getItem("Save"));
      route.currentPoint = null;
      route.holdingPoint = null;
    } catch {
      json = null;
    }
    route.points = json !== null ? json : route.points;
  }
  function DrawPoints() {
    for (point of route.points) {
      canvas.drawPoint(point.x, point.y, 10, "rgb(0,0,0)");
    }
    if (route.currentPoint !== null) {
      let point2 = route.points[route.currentPoint];
      canvas.drawPoint(point2.x, point2.y, 20, "rgb(0,0,0)", "stroke");
    }
  }
  function DrawOverlay() {
    if (window.showOverlay) {
      canvas.drawLine(route.points, "rgb(0,0,0,0.5)", robotWidth);
    }
  }
  function DrawInfo() {
    if (window.showInfo) {
      ctx = canvas.ctx;
      points = route.points;
      for (let i = 0; i < points.length; i++) {
        ctx.beginPath();
        ctx.font = "bold 36px sans";
        ctx.textAlign = "center";
        if (i < points.length - 1) {
          let angle = CalculateAngle(points[i], points[i + 1]);
          if (points[i].d === -1) {
            angle = FlipAngle(angle);
          }
          ctx.fillStyle = "rgb(255,0,255)";
          ctx.fillText(Math.round(angle), points[i].x, points[i].y - 24);
          let distance = CalculateDistance(points[i], points[i + 1]);
          let middle = {
            x: (points[i].x + points[i + 1].x) / 2,
            y: (points[i].y + points[i + 1].y) / 2
          };
          ctx.fillStyle = "rgb(255,255,0)";
          ctx.fillText(Math.round(distance), middle.x, middle.y);
          let angle1 = i === 0 ? 0 : CalculateAngle(points[i - 1], points[i]);
          let angle2 = CalculateAngle(points[i], points[i + 1]);
          if (points[i].d === -1) {
            angle2 = FlipAngle(angle2);
          }
          let turn = CalculateTurn(angle1, angle2);
          if (i > 0) {
            if (points[i - 1].d === -1) {
              turn *= -1;
            }
          }
          ctx.fillStyle = "rgb(0,0,255)";
          ctx.fillText(turn, points[i].x + 36, points[i].y + 12);
        }
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillText(points[i].d, points[i].x - 36, points[i].y + 12);
        ctx.fillStyle = "rgb(0,255,0)";
        ctx.fillText(points[i].f, points[i].x, points[i].y + 48);
        ctx.fill();
      }
    }
  }
  function loop() {
    canvas.resize();
    DrawPoints();
    canvas.drawLine(route.points, "rgb(0,0,0)");
    DrawOverlay();
    DrawInfo();
  }
  document.body.onload = function() {
    menu.updateSettings();
    setInterval(loop, 1e3 / 60);
  };
})();
