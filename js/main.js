//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// INIT
//--------------------------------------------------------------------------------
const BUTTON = document.getElementById("button");
const MENU = document.getElementById("menu");

BUTTON.onclick = ()=>{ MENU.classList.toggle("hidden"); };

//--------------------------------------------------------------------------------

mouse.onMouseUp = (event) => {
  const route = missionManager.currentMission.route;
  route.holdingPoint = null;
}

//--------------------------------------------------------------------------------

mouse.onMouseDown = (event) => {
  const route = missionManager.currentMission.route;
  
  for (let point of route.points) {
    if (getDistance(point, mouse.position) <= 25) {
      route.currentPoint = point;
      route.holdingPoint = point;
    }
  }
  if (!route.holdingPoint) {
    const point = route.createPoint(mouse.x, mouse.y);

    route.currentPoint = point;
    route.holdingPoint = point;
  }
}

//--------------------------------------------------------------------------------

mouse.onMouseMove = (event) => {
  const route = missionManager.currentMission.route;
  
  if (route.holdingPoint) {
    route.holdingPoint.x = mouse.x;
    route.holdingPoint.y = mouse.y;
  }
}

//--------------------------------------------------------------------------------

keyboard.onKeyUp = (event)=>{
  
}

//--------------------------------------------------------------------------------

// keyboard.setKeyEventUp("w", (e)=>{});
// keyboard.setKeyEventDown("ArrowLeft", (e)=>{});

//--------------------------------------------------------------------------------
// LOOP
//--------------------------------------------------------------------------------
function loop () {
  canvas.resize(); 
  mouse.scale = canvas.scale;

  const currentMission = missionManager.currentMission;
  
  drawField(canvas, currentMission.field);

  drawPoints(canvas, currentMission.route);
  drawLines(canvas, currentMission.route);
  drawSelect(canvas, currentMission.route);

  drawInfo(canvas, currentMission.route, currentMission.settings);
  drawOverlay(canvas, currentMission.route, currentMission.settings);
}

document.body.onload = ()=>{ setInterval(loop, 20); };