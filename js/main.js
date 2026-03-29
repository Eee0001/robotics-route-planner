//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// INIT
//--------------------------------------------------------------------------------

initInputEvents(mouse, keyboard, missionManager);

menu.initEvents(missionManager);
tablist.initEvents(missionManager);

//--------------------------------------

missionManager.loadFromStorage();

//--------------------------------------

window.onbeforeunload = () => {
  missionManager.saveToStorage();
};

setInterval(() => {
  missionManager.saveToStorage();
}, 5000);

//--------------------------------------------------------------------------------
// LOOP
//--------------------------------------------------------------------------------

function loop () {
  canvas.resize(); 
  mouse.scale = canvas.scale;
  
  drawMission(canvas, missionManager.currentMission);

  menu.refresh(missionManager);
  tablist.refresh(missionManager);
  
  requestAnimationFrame(loop);
}

document.body.onload = () => { requestAnimationFrame(loop); };