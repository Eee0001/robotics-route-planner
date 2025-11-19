(() => {
  // src/fields.js
  var Field = class {
    constructor() {
      this._image = new Image();
      this._image.src = "mission.png";
      this._width = 3657 / 2;
      this._height = 3657 / 2;
    }
    //----------------------------------------------------------
    get image() {
      return this._image;
    }
    get width() {
      return this._width;
    }
    get height() {
      return this._height;
    }
  };

  // src/settings.js
  var Settings = class {
    constructor() {
      this._robotWidth = 200;
      this._startingAngle = 0;
      this._showInfo = true;
      this._showOverlay = false;
    }
    //----------------------------------------------------------
    get robotWidth() {
      return this._robotWidth;
    }
    set robotWidth(width) {
      this._robotWidth = width;
    }
    //----------------------------------------------------------
    get startingAngle() {
      return this._startingAngle;
    }
    set startingAngle(angle) {
      this._startingAngle = angle;
    }
    //----------------------------------------------------------
    get showInfo() {
      return this._showInfo;
    }
    set showInfo(value) {
      this._showInfo = value;
    }
    toggleShowInfo() {
      this._showInfo = !this._showInfo;
    }
    //----------------------------------------------------------
    get showOverlay() {
      return this._showOverlay;
    }
    set showOverlay(value) {
      this._showOverlay = value;
    }
    toggleShowOverlay() {
      this._showOverlay = !this._showOverlay;
    }
  };

  // src/routes.js
  var Route = class {
    constructor() {
      this._currentPoint = null;
      this._holdingPoint = null;
      this._points = [];
      this._trash = [];
    }
    //----------------------------------------------------------
    createPoint(x, y, d = 1, f = 0) {
      const point = { x, y, d, f };
      this._points.push(point);
      this._currentPoint = point;
      return point;
    }
    //----------------------------------------------------------
    deletePoint() {
      if (this._points.length > 0) {
        this._trash.push(this._points.pop());
        this._currentPoint = null;
        this._holdingPoint = null;
      }
    }
    //----------------------------------------------------------
    restorePoint() {
      if (this._trash.length > 0) {
        this._points.push(this._trash.pop());
        this._currentPoint = null;
        this._holdingPoint = null;
      }
    }
    //----------------------------------------------------------
    wipePoints() {
      this._points = [];
      this._trash = [];
      this._currentPoint = null;
      this._holdingPoint = null;
    }
    //----------------------------------------------------------
    moveCurrentPoint(direction) {
      if (this.currentPoint !== null) {
        if (direction === "up") {
          this.currentPoint.y -= 1;
        }
        if (direction === "down") {
          this.currentPoint.y += 1;
        }
        if (direction === "left") {
          this.currentPoint.x -= 1;
        }
        if (direction === "right") {
          this.currentPoint.x += 1;
        }
      }
    }
    //----------------------------------------------------------
    get points() {
      return this._points;
    }
    set points(points) {
      this._points = points;
    }
    //----------------------------------------------------------
    get currentPoint() {
      return this._currentPoint;
    }
    set currentPoint(point) {
      this._currentPoint = point;
    }
    //----------------------------------------------------------
    get holdingPoint() {
      return this._holdingPoint;
    }
    set holdingPoint(point) {
      this._holdingPoint = point;
    }
  };

  // src/missions.js
  var Mission = class {
    constructor() {
      this._name = "Robot Mission";
      this._field = new Field();
      this._settings = new Settings();
      this._route = new Route();
    }
    //----------------------------------------------------------
    get name() {
      return this._name;
    }
    set name(name) {
      this._name = name;
    }
    //----------------------------------------------------------
    get field() {
      return this._field;
    }
    set field(field) {
      this._field = field;
    }
    //----------------------------------------------------------
    get settings() {
      return this._settings;
    }
    set settings(settings) {
      this._settings = settings;
    }
    //----------------------------------------------------------
    get route() {
      return this._route;
    }
    set route(route) {
      this._route = route;
    }
  };

  // src/manager.js
  var MissionManager = class {
    constructor() {
      this._currentMission = null;
      this._missions = [];
    }
    //----------------------------------------------------------
    createMission() {
      const mission = new Mission();
      this._missions.push(mission);
      this._currentMission = mission;
      return mission;
    }
    //----------------------------------------------------------
    deleteMission(mission) {
      const index = this._missions.indexOf(mission);
      this._missions.splice(index, 1);
      if (this._currentMission === mission) {
        this._currentMission = null;
      }
    }
    //----------------------------------------------------------
    selectMission(mission) {
      this.currentMission = mission;
    }
    //----------------------------------------------------------
    get missions() {
      return this._missions;
    }
    set missions(missions) {
      this._missions = missions;
    }
    //----------------------------------------------------------
    get currentMission() {
      return this._currentMission;
    }
    set currentMission(mission) {
      this._currentMission = mission;
    }
    //----------------------------------------------------------
    get settings() {
      return this.currentMission?.settings;
    }
    get route() {
      return this.currentMission?.route;
    }
    get field() {
      return this.currentMission?.field;
    }
    //----------------------------------------------------------
    get points() {
      return this.currentMission?.route?.points ?? [];
    }
    //----------------------------------------------------------
    get currentPoint() {
      return this.currentMission?.route?.currentPoint;
    }
    set currentPoint(point) {
      if (this.currentMission?.route !== null) {
        this.currentMission.route.currentPoint = point;
      }
    }
    //----------------------------------------------------------
    get holdingPoint() {
      return this.currentMission?.route?.holdingPoint;
    }
    set holdingPoint(point) {
      if (this.currentMission?.route !== null) {
        this.currentMission.route.holdingPoint = point;
      }
    }
  };
  var missionManager = new MissionManager();

  // src/canvas.js
  var Canvas = class {
    constructor() {
      this._element = document.getElementById("canvas");
      this._ctx = this._element.getContext("2d");
      this._scale = 1;
      this._container = document.getElementById("viewport");
    }
    //----------------------------------------------------------
    resize(field = missionManager.field) {
      const widthRatio = this._container.clientWidth / field.width;
      const heightRatio = this._container.clientHeight / field.height;
      this._scale = Math.min(widthRatio, heightRatio) * 0.9;
      this._element.width = field.width * this._scale;
      this._element.height = field.height * this._scale;
      this._ctx.scale(this._scale, this._scale);
      this.drawImage(field.image, 0, 0, field.width, field.height);
    }
    //----------------------------------------------------------
    drawImage(src, x, y, w, h) {
      this._ctx.drawImage(src, x, y, w, h);
    }
    //----------------------------------------------------------
    drawPoint(x, y, r, color, type = "fill") {
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
    drawLine(points, color, lineWidth = 3) {
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
    drawText(text, x, y, color) {
      this._ctx.beginPath();
      this._ctx.fillStyle = color;
      this._ctx.font = "bold 36px sans";
      this._ctx.textAlign = "center";
      this._ctx.fillText(text, x, y);
      this._ctx.fill();
    }
    //----------------------------------------------------------
    get scale() {
      return this._scale;
    }
    //----------------------------------------------------------
    get element() {
      return this._element;
    }
    //----------------------------------------------------------
    get container() {
      return this._container;
    }
  };
  var canvas = new Canvas();

  // src/math.js
  function radToDeg(angle) {
    return angle * 180 / Math.PI;
  }
  function getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }
  function getAngle(p1, p2) {
    return radToDeg(Math.atan2(p2.x - p1.x, p1.y - p2.y));
  }
  function flipAngle(angle) {
    return -1 * Math.sign(angle) * (180 - Math.abs(angle));
  }
  function getTurn(a1, a2) {
    return Math.sign((a2 - a1 + 540) % 360 - 180);
  }

  // src/display.js
  function drawPoints(points = missionManager.points, canvas2 = canvas) {
    for (let point of points) {
      canvas2.drawPoint(point.x, point.y, 10, "#000000");
    }
  }
  function drawSelect(point = missionManager.currentPoint, canvas2 = canvas) {
    if (point !== null) {
      canvas2.drawPoint(point.x, point.y, 20, "#000000", "stroke");
    }
  }
  function drawLines(points = missionManager.points, canvas2 = canvas) {
    canvas2.drawLine(points, "#000000");
  }
  function drawAngles(settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
    if (settings.showInfo) {
      for (let i = 0; i < points.length - 1; i++) {
        let thisPoint = points[i];
        let nextPoint = points[i + 1];
        let angle = getAngle(thisPoint, nextPoint);
        if (thisPoint.d === -1) {
          angle = flipAngle(angle);
        }
        angle = Math.round(angle);
        let x = thisPoint.x;
        let y = thisPoint.y - 24;
        canvas2.drawText(angle, x, y, "#ff00ff");
      }
    }
  }
  function drawTurns(settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
    if (settings.showInfo) {
      for (let i = 0; i < points.length - 1; i++) {
        let thisPoint = points[i];
        let nextPoint = points[i + 1];
        let thisAngle = getAngle(thisPoint, nextPoint);
        if (thisPoint.d === -1) {
          thisAngle = flipAngle(thisAngle);
        }
        let lastAngle = settings.startingAngle;
        if (i > 0) {
          let lastPoint = points[i - 1];
          lastAngle = getAngle(lastPoint, thisPoint);
          if (lastPoint.d === -1) {
            lastAngle = flipAngle(lastAngle);
          }
        }
        let turn = getTurn(lastAngle, thisAngle);
        let x = thisPoint.x + 36;
        let y = thisPoint.y + 12;
        canvas2.drawText(turn, x, y, "#0000ff");
      }
    }
  }
  function drawDistances(settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
    if (settings.showInfo) {
      for (let i = 0; i < points.length - 1; i++) {
        let thisPoint = points[i];
        let nextPoint = points[i + 1];
        let distance = Math.round(getDistance(thisPoint, nextPoint));
        let x = (thisPoint.x + nextPoint.x) / 2;
        let y = (thisPoint.y + nextPoint.y) / 2;
        canvas2.drawText(distance, x, y, "#ffff00");
      }
    }
  }
  function drawDirections(settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
    if (settings.showInfo) {
      for (let point of points) {
        let x = point.x - 36;
        let y = point.y + 12;
        canvas2.drawText(point.d, x, y, "#ff0000");
      }
    }
  }
  function drawFunctions(settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
    if (settings.showInfo) {
      for (let point of points) {
        let x = point.x;
        let y = point.y + 48;
        canvas2.drawText(point.f, x, y, "#00ff00");
      }
    }
  }
  function drawOverlay(settings = missionManager.settings, points = missionManager.points, canvas2 = canvas) {
    if (settings.showOverlay) {
      canvas2.drawLine(points, "#00000080", settings.robotWidth);
    }
  }

  // src/import.js
  function loadPointsFromText(text) {
    let data = null;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("BAD JSON IN TEXT OR FILE");
    }
    if (data !== null) {
      missionManager.route.points = data;
      missionManager.currentPoint = null;
      missionManager.holdingPoint = null;
      menu.refresh();
    }
  }
  function loadPointsFromFile(file) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      loadPointsFromText(fileReader.result);
    };
    fileReader.readAsText(file);
  }

  // src/export.js
  function exportRoute(points = missionManager.points) {
    let route = "";
    for (let i = 0; i < points.length - 1; i++) {
      let thisPoint = points[i];
      let nextPoint = points[i + 1];
      let thisAngle = getAngle(thisPoint, nextPoint);
      if (thisPoint.d === -1) {
        thisAngle = flipAngle(thisAngle);
      }
      let lastAngle = missionManager.settings.startingAngle;
      if (i > 0) {
        let lastPoint = points[i - 1];
        lastAngle = getAngle(lastPoint, thisPoint);
        if (lastPoint.d === -1) {
          lastAngle = flipAngle(lastAngle);
        }
      }
      let angle = Math.round(lastAngle);
      let turn = getTurn(lastAngle, thisAngle);
      let distance = Math.round(getDistance(thisPoint, nextPoint));
      let func = thisPoint.f;
      let direction = thisPoint.d;
      route += "" + turn + "\n" + angle + "\n" + direction + "\n" + distance + "\n" + func + "\n";
    }
    return route.trim();
  }
  function downloadFile(name, type, data) {
    let blob = new Blob([data], { type });
    let url = URL.createObjectURL(blob);
    let element = document.createElement("a");
    element.setAttribute("download", name);
    element.href = url;
    element.click();
    element.remove();
  }
  function downloadPoints(points = missionManager.points) {
    downloadFile("Points", "application/json", JSON.stringify(points));
  }
  function downloadRoute(route = exportRoute()) {
    downloadFile("Robot-Route", "plain/text", route);
  }

  // src/menu.js
  var Menu = class {
    constructor() {
      this.elements = {
        pointX: document.getElementById("PointX"),
        pointY: document.getElementById("PointY"),
        pointD: document.getElementById("PointD"),
        pointF: document.getElementById("PointF"),
        robotW: document.getElementById("RobotW"),
        showO: document.getElementById("ShowO"),
        showI: document.getElementById("ShowI"),
        exportR: document.getElementById("ExportR"),
        exportP: document.getElementById("ExportP"),
        importP: document.getElementById("ImportP"),
        fileI: document.getElementById("FileI")
      };
    }
    //----------------------------------------------------------
    initEvents() {
      for (let id of ["pointX", "pointY", "pointD", "pointF"]) {
        this.elements[id].onchange = () => {
          this.updateCurrentPoint();
        };
      }
      for (let id of ["robotW", "showO", "showI"]) {
        this.elements[id].onchange = () => {
          this.updateSettings();
        };
      }
      this.elements.exportR.onclick = () => {
        downloadRoute();
      };
      this.elements.exportP.onclick = () => {
        downloadPoints();
      };
      this.elements.importP.onclick = () => {
        this.elements.fileI.click();
      };
      this.elements.fileI.onchange = () => {
        this.importPointsFromFile();
      };
    }
    //----------------------------------------------------------
    refresh() {
      const point = missionManager.currentPoint;
      if (point !== null) {
        this.elements.pointX.value = point.x;
        this.elements.pointY.value = point.y;
        this.elements.pointD.checked = point.d === 1;
        this.elements.pointF.value = point.f;
      }
      const settings = missionManager.settings;
      if (settings !== null) {
        this.elements.robotW.value = settings.robotWidth;
        this.elements.showO.checked = settings.showOverlay;
        this.elements.showI.checked = settings.showInfo;
      }
    }
    //----------------------------------------------------------
    updateCurrentPoint() {
      const point = missionManager.currentPoint;
      if (point) {
        point.x = this.elements.pointX.valueAsNumber;
        point.y = this.elements.pointY.valueAsNumber;
        point.d = this.elements.pointD.checked ? 1 : -1;
        point.f = this.elements.pointF.valueAsNumber;
      }
    }
    //----------------------------------------------------------
    updateSettings() {
      const settings = missionManager.settings;
      if (settings) {
        settings.robotWidth = this.elements.robotW.valueAsNumber;
        settings.showInfo = this.elements.showI.checked;
        settings.showOverlay = this.elements.showO.checked;
      }
    }
    //----------------------------------------------------------
    importPointsFromFile() {
      loadPointsFromFile(this.elements.fileI.files[0]);
    }
  };
  var menu = new Menu();

  // src/mouse.js
  var Mouse = class {
    constructor() {
      this._position = { x: 0, y: 0 };
    }
    //----------------------------------------------------------
    initEvents() {
      canvas.element.onmousemove = (e) => {
        this.mouseMove(e);
      };
      document.body.onmouseup = () => {
        this.mouseUp();
      };
      canvas.element.onmousedown = () => {
        this.mouseDown();
      };
    }
    //----------------------------------------------------------
    mouseMove(event) {
      this._position.x = Math.round(event.offsetX / canvas.scale);
      this._position.y = Math.round(event.offsetY / canvas.scale);
      if (missionManager.holdingPoint !== null) {
        missionManager.holdingPoint.x = this._position.x;
        missionManager.holdingPoint.y = this._position.y;
      }
    }
    //----------------------------------------------------------
    mouseUp() {
      if (missionManager.holdingPoint !== null) {
        missionManager.holdingPoint = null;
      }
    }
    //----------------------------------------------------------
    mouseDown() {
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
    get position() {
      return this._position;
    }
    //----------------------------------------------------------
    get x() {
      return this._position.x;
    }
    set x(x) {
      this._position.x = x;
    }
    //----------------------------------------------------------
    get y() {
      return this._y;
    }
    set y(y) {
      this._position.y = y / canvas.scale;
    }
  };
  var mouse = new Mouse();

  // src/save.js
  function savePoints() {
    localStorage.setItem("Save", JSON.stringify(missionManager.points));
  }
  window.onbeforeunload = savePoints;
  function loadPointsFromSave() {
    let data = null;
    try {
      data = JSON.parse(localStorage.getItem("Save"));
    } catch {
      console.error("BAD JSON IN SAVE DATA");
    }
    if (data !== null) {
      missionManager.route.points = data;
      missionManager.currentPoint = null;
      missionManager.holdingPoint = null;
      menu.refresh();
    }
  }

  // src/keyboard.js
  var Keyboard = class {
    constructor() {
    }
    //----------------------------------------------------------
    initEvents() {
      document.body.onkeyup = (e) => {
        if (e.target === document.body) {
          this.keyUp(e);
        }
      };
      document.body.onkeydown = (e) => {
        if (e.target === document.body) {
          this.keyDown(e);
        }
      };
    }
    //----------------------------------------------------------
    keyUp(event) {
      const key = event.key;
      if (key === "Backspace") {
        missionManager.route.deletePoint();
      }
      if (key === "Enter") {
        missionManager.route.restorePoint();
      }
      if (key === "-") {
        missionManager.route.currentPoint.d = -1;
      }
      if (key === "=") {
        missionManager.route.currentPoint.d = 1;
      }
      if (!isNaN(key)) {
        missionManager.route.currentPoint.f = key;
      }
      if (key === "o") {
        missionManager.settings.toggleShowOverlay();
      }
      if (key === "i") {
        missionManager.settings.toggleShowInfo();
      }
      if (key === "p") {
        loadPointsFromSave();
      }
      if (key === "q") {
        missionManager.route.wipePoints();
      }
      console.log(key);
      console.log(event.target);
      menu.refresh();
    }
    //----------------------------------------------------------
    keyDown(event) {
      const key = event.key;
      if (key === "ArrowUp") {
        missionManager.route.moveCurrentPoint("up");
      }
      if (key === "ArrowDown") {
        missionManager.route.moveCurrentPoint("down");
      }
      if (key === "ArrowLeft") {
        missionManager.route.moveCurrentPoint("left");
      }
      if (key === "ArrowRight") {
        missionManager.route.moveCurrentPoint("right");
      }
      menu.refresh();
    }
  };
  var keyboard = new Keyboard();

  // src/main.js
  console.log(missionManager.createMission());
  menu.initEvents();
  mouse.initEvents();
  keyboard.initEvents();
  document.getElementById("button").addEventListener("click", () => {
    document.getElementById("menu").classList.toggle("hidden");
    canvas.resize();
  });
  function loop() {
    canvas.resize();
    drawPoints();
    drawSelect();
    drawLines();
    drawAngles();
    drawTurns();
    drawDistances();
    drawDirections();
    drawFunctions();
    drawOverlay();
  }
  document.body.onload = () => {
    setInterval(loop, 1e3 / 60);
  };
})();
