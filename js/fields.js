//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------

class Field {

  #image; #src; #width; #height; #loaded;

  constructor () {
    this.#image = new Image();
    this.#src = "mission.png";

    this.#image.src = this.#src;

    this.#width = 2362;
    this.#height = 1143;

    this.#loaded = false;

    this.#initEvents();
  }

  //--------------------------------------

  get image () { return this.#image; }

  get src () { return this.#src; }

  get width () { return this.#width; }

  get height () { return this.#height; }

  get loaded () { return this.#loaded; }

  //--------------------------------------

  #initEvents () {
    this.#image.onload = ()=>{ this.#loadEvent(); };
  }

  //--------------------------------------

  #loadEvent () { 
    this.#loaded = true;
  }

  //--------------------------------------

  toJSON () {
    return serializeObject(this, ["src","width","height"]);
  }

  //--------------------------------------

  loadData (data) {
    if (!data) return;
    
    if (!data.src || !data.width || !data.height) {
      console.warn("Incomplete Field data loaded");
      return;
    }

    this.#width = data.width;
    this.#height = data.height;

    this.#loaded = false;

    this.#src = data.src;
    this.#image.src = this.#src;
  }
  
}

//--------------------------------------------------------------------------------