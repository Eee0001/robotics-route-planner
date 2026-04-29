//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Tablist {

  #container; #tabs; #currentTab; #ids; #eventKeys; #events;
  
  constructor () {
    this.#container = document.getElementById("tablist");

    this.#tabs = [];

    this.#ids = ["tabElement", "nameElement", "deleteElement"];

    this.#eventKeys = {
      tabElement: { target: "selectMission", type: "onclick", after: "selectTab" },
      nameElement: { target: "changeMissionName", type: "ondblclick", after: "renameTab" },
      deleteElement: { target: "deleteMission", type: "onclick", after: "deleteTab" }
    };

    this.#events = {};
  }

  //--------------------------------------

  initEvents (missionManager) {
    for (let [id, eventKey] of Object.entries(this.#eventKeys)) {
      const targetAction = missionManager[eventKey.target].bind(missionManager);
      const afterAction = this[eventKey.after]?.bind(this);

      this.#events[id] = (mission)=>{
        event.stopPropagation();
        targetAction(mission);
        if (afterAction) afterAction(mission);
      }
    }

    document.getElementById("add-mission-btn").onclick = ()=>{ 
      const mission = missionManager.createMission();
      this.createTab(mission);
      this.selectTab(mission);
    };
  }

  //--------------------------------------

  createTab (mission) {
    const tab = new Tab(mission);

    for (let [id, eventKey] of Object.entries(this.#eventKeys)) {
      tab[id][eventKey.type] = (event)=>{ 
        this.#events[id](mission);
      };
    }

    this.#container.insertBefore(tab.tabElement, this.#container.lastElementChild);

    this.#tabs.push(tab);
  }

  //--------------------------------------

  deleteTab (mission) {
    const index = this.#tabs.findIndex((tab)=>{ return tab.mission === mission; });
    this.#tabs[index].tabElement.remove();
    
    this.#tabs.splice(index, 1);

    this.#currentTab = null;
  }

  //--------------------------------------

  selectTab (mission) {
    this.#currentTab?.tabElement.classList.remove("active");
    
    const tab = this.#tabs.find((tab)=>{ return tab.mission === mission; });
    tab?.tabElement.classList.add("active");
    
    if (tab) this.#currentTab = tab;
  }

  //--------------------------------------

  refresh (missionManager) {
    if (this.#tabs.length !== missionManager.missions.length) {
      for (let i = this.#tabs.length - 1; i >= 0; i--) {
        const tab = this.#tabs[i];
        if (missionManager.missions.includes(tab.mission)) continue;
        this.deleteTab(tab.mission);
      }
      
      for (let mission of missionManager.missions) {
        if (this.#tabs.find((tab)=>{ return tab.mission === mission; })) continue;
        this.createTab(mission);
      }
    }

    if (this.#currentTab?.mission !== missionManager.currentMission) {
      this.selectTab(missionManager.currentMission);
    }

    for (let tab of this.#tabs) {
      if (tab.nameElement.innerText !== tab.mission.name){ 
        tab.nameElement.innerText = tab.mission.name;
      }
    }
  }
  
}

//--------------------------------------------------------------------------------
// EXPORTS
//--------------------------------------------------------------------------------

const tablist = new Tablist();

//--------------------------------------------------------------------------------
