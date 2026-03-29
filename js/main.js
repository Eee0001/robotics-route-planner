//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// INIT
//--------------------------------------------------------------------------------

initInputEvents(mouse, keyboard, missionManager);

menu.initEvents(missionManager);


missionManager.loadFromLocalStorage();


window.onbeforeunload = () => {
  missionManager.saveToLocalStorage();
};

setInterval(() => {
  missionManager.saveToLocalStorage();
}, 5000);

//--------------------------------------------------------------------------------
// LOOP
//--------------------------------------------------------------------------------

function loop () {
  canvas.resize(); 
  mouse.scale = canvas.scale;
  
  drawMission(canvas, missionManager.currentMission);

  menu.refresh(missionManager);
  
  requestAnimationFrame(loop);
}

document.body.onload = ()=>{ requestAnimationFrame(loop); };