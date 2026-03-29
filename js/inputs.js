//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// METHODS
//--------------------------------------------------------------------------------

function initInputEvents (mouse, keyboard, missionManager) {

  mouse.onMouseUp = (e) => {
    missionManager.currentRoute.holdingPoint = null;
  };

  //--------------------------------------

  mouse.onMouseDown = (e) => {
    const route = missionManager.currentRoute;
    
    if (route.grabPoint(mouse.position)) return;

    const point = route.createPoint(mouse.x, mouse.y);
    route.holdingPoint = point;
  };

  //--------------------------------------

  mouse.onMouseMove = (e) => {
    const route = missionManager.currentRoute;

    if (route.holdingPoint) {
      route.holdingPoint.x = mouse.x;
      route.holdingPoint.y = mouse.y;
    }
  };

  //--------------------------------------

  keyboard.setKeyEvent("up", "Backspace", (e) => {
    missionManager.currentRoute.deletePoint();
  });
  
  keyboard.setKeyEvent("up", "Enter", (e) => {
    missionManager.currentRoute.restorePoint();
  });
  
  keyboard.setKeyEvent("up", "-", (e) => {
    if (!missionManager.currentRoute?.currentPoint) return;
    missionManager.currentRoute.currentPoint.d = -1;
  });
  
  keyboard.setKeyEvent("up", "=", (e) => {
    if (!missionManager.currentRoute?.currentPoint) return;
    missionManager.currentRoute.currentPoint.d = 1;
  });
  
  keyboard.setKeyEvent("up", "o", (e) => {
    missionManager.currentSettings.toggleShowOverlay();
  });
  
  keyboard.setKeyEvent("up", "i", (e) => {
    missionManager.currentSettings.toggleShowInfo();
  });
  
  keyboard.setKeyEvent("up", "p", (e) => {
    missionManager.loadFromStorage();
  });
  
  keyboard.setKeyEvent("up", "q", (e) => {
    missionManager.currentRoute.reset();
  });

  keyboard.onKeyUp = (e) => {
    if (!isNaN(e.key) && missionManager.currentRoute?.currentPoint) {
      missionManager.currentRoute.currentPoint.a = Number(e.key);
    }
  };

  //--------------------------------------

  keyboard.setKeyEvent("down", "ArrowUp", (e) => {
    missionManager.currentRoute.movePoint("up");
  });
  
  keyboard.setKeyEvent("down", "ArrowDown", (e) => {
    missionManager.currentRoute.movePoint("down");
  });
  
  keyboard.setKeyEvent("down", "ArrowLeft", (e) => {
    missionManager.currentRoute.movePoint("left");
  });
  
  keyboard.setKeyEvent("down", "ArrowRight", (e) => {
    missionManager.currentRoute.movePoint("right");
  });
  
}

//-------------------------------------------------------------------------------- 