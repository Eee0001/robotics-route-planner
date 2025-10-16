import { getCurrentRoute } from "./routes.js"
import { calculateDistance } from "./math.js"

const mouse = {
  x: 0,
  y: 0
};

function getMouse () {
  return mouse;
}

function getMouseX () {
  return mouse.x;
}

function setMouseX (x) {
  mouse.x = x;
}

function getMouseY () {
  return mouse.y;
}

function setMouseY (y) {
  mouse.y = y;
}

export function initMouse (canvas, menu) {
  canvas.element.onmousemove = (e) => {
    const route = getCurrentRoute();
    
    setMouseX(Math.round(e.offsetX / canvas.getScale()));
    setMouseY(Math.round(e.offsetY / canvas.getScale()));

    if (route.getHoldingPoint() !== null) {
      route.setPointX(route.getHoldingPoint(), getMouseX());
      route.setPointY(route.getHoldingPoint(), getMouseY());
    }

    menu.updatePoints(route);
  }

  canvas.element.onmousedown = (e) => {
    const route = getCurrentRoute();

    for (point of route.getPoints()) {
      if (calculateDistance(point, getMouse()) <= 25) {
        route.setCurrentPoint(route.getPoints().indexOf(point));
        route.setHoldingPoint(route.getPoints().indexOf(point));

        menu.updatePoints(route);
      }
    }

    if (route.getHoldingPoint() === null) {
      route.createPoint(getMouseX(), getMouseY());

      route.setCurrentPoint(route.getPoints().length - 1);
      route.setHoldingPoint(route.getPoints().length - 1);

      menu.updatePoints(route);
    }
  }

  document.onmouseup = () => {
    const route = getCurrentRoute();
    route.setHoldingPoint(null);
  }
}