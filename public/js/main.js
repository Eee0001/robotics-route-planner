(() => {
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
    getScale() {
      return this.scale;
    }
    drawPoint(x, y, r, color, type = "fill") {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.strokeStyle = color;
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      if (type === "fill") {
        this.ctx.fill();
      }
      if (type === "stroke") {
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
      }
    }
    drawText(text, x, y, color = "rgb(0,0,0)") {
      this.ctx.beginPath();
      this.ctx.font = "bold 36px sans";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = color;
      this.ctx.fillText(text, x, y);
      this.ctx.fill();
    }
    drawLine(points, color, lineWidth = 3) {
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
    drawImage(src, x, y, w, h) {
      this.ctx.drawImage(src, x, y, w, h);
    }
  };

  // src/math.js
  function radToDeg(angle) {
    return angle * 180 / Math.PI;
  }
  function calculateDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }
  function calculateAngle(p1, p2) {
    return radToDeg(Math.atan2(p2.x - p1.x, p1.y - p2.y));
  }
  function flipAngle(angle) {
    return -1 * Math.sign(angle) * (180 - Math.abs(angle));
  }
  function calculateTurn(angle1, angle2) {
    return Math.sign((angle2 - angle1 + 540) % 360 - 180);
  }

  // src/export.js
  function exportRoute(points) {
    let route2 = ``;
    for (let i = 0; i < points.length - 1; i++) {
      let angle1 = i === 0 ? 0 : calculateAngle(points[i - 1], points[i]);
      let angle2 = calculateAngle(points[i], points[i + 1]);
      if (points[i].d === -1) {
        angle2 = flipAngle(angle2);
      }
      let turn = calculateTurn(angle1, angle2);
      if (i > 0) {
        if (points[i - 1].d === -1) {
          turn *= -1;
        }
      }
      const distance = calculateDistance(points[i], points[i + 1]);
      const func = points[i].f;
      const direction = points[i].d;
      route2 += `` + turn + `
` + Math.round(angle2) + `
` + direction + `
` + Math.round(distance) + `
` + func + `
`;
    }
    return route2.trim();
  }
  function downloadRoute(points) {
    let data = exportRoute(points);
    let blob = new Blob([data], { type: "text.plain" });
    let url = URL.createObjectURL(blob);
    let element = document.createElement("a");
    element.setAttribute("download", "Robot-Route");
    element.href = url;
    element.click();
    element.remove();
  }
  function copyRoute(points) {
    navigator.clipboard.writeText(exportRoute(points));
  }
  function exportPoints(points) {
    return JSON.stringify(points);
  }
  function downloadPoints(points) {
    let data = exportPoints(points);
    let blob = new Blob([data], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let element = document.createElement("a");
    element.setAttribute("download", "Points");
    element.href = url;
    element.click();
    element.remove();
  }
  function copyPoints(points) {
    navigator.clipboard.writeText(exportPoints(points));
  }

  // src/routes.js
  var currentRoute = null;
  function setCurrentRoute(route2) {
    currentRoute = route2;
  }
  function getCurrentRoute() {
    return currentRoute;
  }
  var Route = class {
    constructor(menu2) {
      this.name = "Robot Route";
      this.points = [];
      this.trash = [];
      this.currentPoint = null;
      this.holdingPoint = null;
      setCurrentRoute(this);
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
    }
    restorePoint() {
      if (this.trash.length > 0) {
        this.points.push(this.trash.pop());
      }
    }
    setPoints(points) {
      this.points = points;
      this.currentPoint = null;
      this.holdingPoint = null;
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
      }
    }
    // Setter functions for points
    setCurrentPoint(index) {
      this.currentPoint = index;
    }
    setHoldingPoint(index) {
      this.holdingPoint = index;
    }
    setPointX(index, x) {
      if (index !== null) {
        this.points[index].x = x;
      }
    }
    setPointY(index, y) {
      if (index !== null) {
        this.points[index].y = y;
      }
    }
    setPointD(index, d) {
      if (index !== null) {
        this.points[index].d = d;
      }
    }
    setPointF(index, f) {
      if (index !== null) {
        this.points[index].f = Number(f);
      }
    }
    // Getter functions for points
    getCurrentPoint() {
      return this.currentPoint;
    }
    getHoldingPoint() {
      return this.holdingPoint;
    }
    getPoints() {
      return this.points;
    }
    getPointX(index) {
      if (index !== null) {
        return this.points[index].x;
      } else {
        return null;
      }
    }
    getPointY(index) {
      if (index !== null) {
        return this.points[index].y;
      } else {
        return null;
      }
    }
    getPointD(index) {
      if (index !== null) {
        return this.points[index].d;
      } else {
        return null;
      }
    }
    getPointF(index) {
      if (index !== null) {
        return this.points[index].f;
      } else {
        return null;
      }
    }
  };

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
      this.settings = {
        robotWidth: 200,
        showOverlay: false,
        showInfo: true
      };
      this.elements.overlay.checked = this.settings.showOverlay;
      this.elements.info.checked = this.settings.showInfo;
      this.elements.formPoints.onsubmit = (e) => {
        e.preventDefault();
      };
      this.elements.formSettings.onsubmit = (e) => {
        e.preventDefault();
      };
    }
    getPointX() {
      return this.elements.pointX.valueAsNumber;
    }
    getPointY() {
      return this.elements.pointX.valueAsNumber;
    }
    getPointD() {
      return this.elements.pointDF.checked === true ? 1 : -1;
    }
    getPointF() {
      return this.elements.pointF.valueAsNumber;
    }
    getRobotW() {
      return this.elements.robotW.valueAsNumber;
    }
    getOverlay() {
      return this.elements.overlay.checked;
    }
    toggleOverlay() {
      this.settings.showOverlay = !this.settings.showOverlay;
      this.elements.overlay.checked = this.settings.showOverlay;
    }
    getInfo() {
      return this.elements.info.checked;
    }
    toggleInfo() {
      this.settings.showInfo = !this.settings.showInfo;
      this.elements.info.checked = this.settings.showInfo;
    }
    getPointsFromText(route2) {
      let json2 = null;
      try {
        json2 = JSON.parse(this.elements.pointsT.value);
        route2.setCurrentPoint(null);
        route2.setHoldingPoint(null);
      } catch {
        json2 = null;
      }
      route2.setPoints(json2 !== null ? json2 : route2.getPoints());
      this.updatePoints(route2);
    }
    getPointsFromFile(route2) {
      let fileReader = new FileReader();
      const this2 = this;
      fileReader.onload = () => {
        let json2 = null;
        try {
          json2 = JSON.parse(fileReader.result);
          route2.setCurrentPoint(null);
          route2.setHoldingPoint(null);
        } catch {
          json2 = null;
        }
        route2.setPoints(json2 !== null ? json2 : route2.getPoints());
        this2.updatePoints(route2);
      };
      fileReader.readAsText(this.elements.pointsF.files[0]);
    }
    updateSettings() {
      this.settings.robotWidth = this.getRobotW();
      this.settings.showOverlay = this.getOverlay();
      this.settings.showInfo = this.getInfo();
    }
    updatePoints(route2) {
      this.elements.pointX.value = route2.getPointX(route2.getCurrentPoint());
      this.elements.pointY.value = route2.getPointY(route2.getCurrentPoint());
      if (route2.getPointD(route2.getCurrentPoint()) === 1) {
        this.elements.pointDF.checked = true;
      } else if (route2.getPointD(route2.getCurrentPoint()) === -1) {
        this.elements.pointDB.checked = true;
      } else {
        this.elements.pointDF.checked = false;
        this.elements.pointDB.checked = false;
      }
      this.elements.pointF.value = route2.getPointF(route2.getCurrentPoint());
    }
    updateEvents(route2) {
      const this2 = this;
      this.elements.pointX.onchange = () => {
        route2.setPointX(route2.getCurrentPoint(), this2.getPointX());
      };
      this.elements.pointY.onchange = () => {
        route2.setPointY(route2.getCurrentPoint(), this2.getPointY());
      };
      this.elements.pointDF.onchange = () => {
        route2.setPointD(route2.getCurrentPoint(), this2.getPointD());
      };
      this.elements.pointDB.onchange = () => {
        route2.setPointD(route2.getCurrentPoint(), this2.getPointD());
      };
      this.elements.pointF.onchange = () => {
        route2.setPointF(route2.getCurrentPoint(), this2.getPointF());
      };
      this.elements.robotW.onchange = () => {
        this2.settings.robotWidth = this2.getRobotW();
      };
      this.elements.overlay.onchange = () => {
        this2.settings.showOverlay = this2.getOverlay();
      };
      this.elements.info.onchange = () => {
        this2.settings.showInfo = this2.getInfo();
      };
      this.elements.routeD.onclick = () => {
        downloadRoute(route2.getPoints());
      };
      this.elements.routeC.onclick = () => {
        copyRoute(route2.getPoints());
      };
      this.elements.pointsD.onclick = () => {
        downloadPoints(route2.getPoints());
      };
      this.elements.pointsC.onclick = () => {
        copyPoints(route2.getPoints());
      };
      this.elements.pointsT.onchange = () => {
        this2.getPointsFromText(getCurrentRoute());
      };
      this.elements.pointsI.onclick = () => {
        this.elements.pointsF.click();
      };
      this.elements.pointsF.onchange = () => {
        this2.getPointsFromFile(getCurrentRoute());
      };
    }
    selectRoute(route2) {
      this.updatePoints(route2);
      this.updateEvents(route2);
    }
  };

  // src/draw.js
  function drawPoints(route2, canvas2) {
    for (point of route2.getPoints()) {
      canvas2.drawPoint(point.x, point.y, 10, "rgb(0,0,0)");
    }
    if (route2.getCurrentPoint() !== null) {
      canvas2.drawPoint(route2.getPointX(route2.getCurrentPoint()), route2.getPointY(route2.getCurrentPoint()), 20, "rgb(0,0,0)", "stroke");
    }
  }
  function drawLines(route2, canvas2) {
    canvas2.drawLine(route2.getPoints(), "rgb(0,0,0)");
  }
  function drawOverlay(settings, route2, canvas2) {
    if (settings.showOverlay) {
      canvas2.drawLine(route2.getPoints(), "rgb(0,0,0,0.5)", settings.robotWidth);
    }
  }
  function drawInfo(settings, route2, canvas2) {
    if (settings.showInfo) {
      const points = route2.getPoints();
      for (let i = 0; i < points.length; i++) {
        if (i < points.length - 1) {
          let angle = calculateAngle(points[i], points[i + 1]);
          angle = points[i].d === -1 ? flipAngle(angle) : angle;
          canvas2.drawText(Math.round(angle), points[i].x, points[i].y - 24, "rgb(255,0,255)");
          let distance = calculateDistance(points[i], points[i + 1]);
          let middle = {
            x: (points[i].x + points[i + 1].x) / 2,
            y: (points[i].y + points[i + 1].y) / 2
          };
          canvas2.drawText(Math.round(distance), middle.x, middle.y, "rgb(255,255,0)");
          let angle1 = i === 0 ? 0 : calculateAngle(points[i - 1], points[i]);
          let angle2 = calculateAngle(points[i], points[i + 1]);
          angle2 = points[i].d === -1 ? flipAngle(angle2) : angle2;
          let turn = calculateTurn(angle1, angle2);
          if (i > 0) {
            if (points[i - 1].d === -1) {
              turn *= -1;
            }
          }
          canvas2.drawText(turn, points[i].x + 36, points[i].y + 12, "rgb(0,0,255)");
        }
        canvas2.drawText(points[i].d, points[i].x - 36, points[i].y + 12, "rgb(255,0,0)");
        canvas2.drawText(points[i].f, points[i].x, points[i].y + 48, "rgb(0,255,0)");
      }
    }
  }

  // src/mouse.js
  var mouse = {
    x: 0,
    y: 0
  };
  function getMouse() {
    return mouse;
  }
  function getMouseX() {
    return mouse.x;
  }
  function setMouseX(x) {
    mouse.x = x;
  }
  function getMouseY() {
    return mouse.y;
  }
  function setMouseY(y) {
    mouse.y = y;
  }
  function initMouse(canvas2, menu2) {
    canvas2.element.onmousemove = (e) => {
      const route2 = getCurrentRoute();
      setMouseX(Math.round(e.offsetX / canvas2.getScale()));
      setMouseY(Math.round(e.offsetY / canvas2.getScale()));
      if (route2.getHoldingPoint() !== null) {
        route2.setPointX(route2.getHoldingPoint(), getMouseX());
        route2.setPointY(route2.getHoldingPoint(), getMouseY());
      }
      menu2.updatePoints(route2);
    };
    canvas2.element.onmousedown = (e) => {
      const route2 = getCurrentRoute();
      for (point of route2.getPoints()) {
        if (calculateDistance(point, getMouse()) <= 25) {
          route2.setCurrentPoint(route2.getPoints().indexOf(point));
          route2.setHoldingPoint(route2.getPoints().indexOf(point));
          menu2.updatePoints(route2);
        }
      }
      if (route2.getHoldingPoint() === null) {
        route2.createPoint(getMouseX(), getMouseY());
        route2.setCurrentPoint(route2.getPoints().length - 1);
        route2.setHoldingPoint(route2.getPoints().length - 1);
        menu2.updatePoints(route2);
      }
    };
    document.onmouseup = () => {
      const route2 = getCurrentRoute();
      route2.setHoldingPoint(null);
    };
  }

  // src/save.js
  function SavePoints(route2) {
    localStorage.setItem("Save", exportPoints(route2.getPoints()));
  }
  window.onbeforeunload = () => {
    SavePoints(getCurrentRoute());
  };
  function LoadPreviousSavedPoints(route2, menu2) {
    try {
      json = JSON.parse(localStorage.getItem("Save"));
      route2.setCurrentPoint(null);
      route2.setHoldingPoint(null);
    } catch {
      json = null;
    }
    route2.setPoints(json !== null ? json : route2.getPoints());
    menu2.selectRoute(route2);
  }

  // src/keyboard.js
  function initKeyboard(container2, menu2) {
    container2.onkeyup = function(e) {
      let key = e.key;
      const route2 = getCurrentRoute();
      if (key === "Backspace") {
        route2.deletePoint();
      }
      if (key === "Enter") {
        route2.restorePoint();
      }
      if (key === "-") {
        route2.setPointD(route2.getCurrentPoint(), -1);
      }
      if (key === "=") {
        route2.setPointD(route2.getCurrentPoint(), 1);
      }
      if (!isNaN(key)) {
        route2.setPointF(route2.getCurrentPoint(), key);
      }
      if (key === "o") {
        menu2.toggleOverlay();
      }
      if (key === "i") {
        menu2.toggleInfo();
      }
      if (key === "p") {
        LoadPreviousSavedPoints(route2, menu2);
      }
      if (key === "q") {
        route2.wipePoints();
      }
      menu2.updatePoints(route2);
    };
    container2.onkeydown = function(e) {
      let key = e.key;
      const route2 = getCurrentRoute();
      if (key === "ArrowLeft") {
        route2.movePoint("left");
      }
      if (key === "ArrowRight") {
        route2.movePoint("right");
      }
      if (key === "ArrowUp") {
        route2.movePoint("up");
      }
      if (key === "ArrowDown") {
        route2.movePoint("down");
      }
      menu2.updatePoints(route2);
    };
  }

  // src/main.js
  var container = document.getElementById("viewport");
  var canvas = new Canvas(container);
  var menu = new Menu();
  var route = new Route();
  menu.selectRoute(route);
  initMouse(canvas, menu);
  initKeyboard(container, menu);
  function loop() {
    canvas.resize();
    drawPoints(route, canvas);
    drawLines(route, canvas);
    drawOverlay(menu.settings, route, canvas);
    drawInfo(menu.settings, route, canvas);
  }
  document.body.onload = function() {
    setInterval(loop, 1e3 / 60);
  };
})();
