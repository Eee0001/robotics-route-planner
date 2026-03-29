//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Mission {

  #name; #field; #route; #config; #settings;

  constructor () {
    this.#name = "Robot Mission";

    this.#field = new Field();

    this.#route = new Route();

    this.#config = new RobotConfig();

    this.#settings = new Settings();
  }

  //--------------------------------------

  get name () { return this.#name; }
  set name (name) { this.#name = name; }

  get field () { return this.#field; }

  get route () { return this.#route; }

  get config () { return this.#config; }

  get settings () { return this.#settings; }

  //--------------------------------------

  toJSON () {
    const keys = ["name","field","route","config","settings"];

    const serialisedData = {};

    for (let key of keys) { 
      serialisedData[key] = this[key]; 
    }
    
    return serialisedData;
  }

  //--------------------------------------

  loadData (data) {
    if (!data) return;

    if (data.name) this.#name = data.name;

    if (data.field) {
      this.#field.loadData(data.field);
    }
    if (data.route) {
      this.#route.loadData(data.route);
    }
    if (data.config) {
      this.#config.loadData(data.config);
    }
    if (data.settings) {
      this.#settings.loadData(data.settings);
    }
  }
  
}

//--------------------------------------------------------------------------------