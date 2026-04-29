//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Tab {

  #mission; #tabElement; #nameElement; #deleteElement;

  constructor (mission) {
    this.#mission = mission;
    
    this.#tabElement = document.createElement("div");
    this.#tabElement.classList.add("tab");
    
    this.#nameElement = document.createElement("span");
    this.#nameElement.classList.add("tab-name");
    this.#nameElement.innerText = this.#mission.name;

    this.#tabElement.appendChild(this.#nameElement);

    this.#deleteElement = document.createElement("div");
    this.#deleteElement.classList.add("tab-action-btn");
    this.#deleteElement.innerText = "X";
    
    this.#tabElement.appendChild(this.#deleteElement);
  }

  //--------------------------------------

  get mission () { return this.#mission; }

  get tabElement () { return this.#tabElement; }

  get nameElement () { return this.#nameElement; }

  get deleteElement () { return this.#deleteElement; }
  
}

//--------------------------------------------------------------------------------
