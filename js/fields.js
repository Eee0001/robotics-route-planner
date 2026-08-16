//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// CLASS
//--------------------------------------------------------------------------------



class Field {

  static defaultFields = [
    { src: "mission1.png", width: 2362, height: 1143 },
    { src: "mission2.png", width: 2362, height: 1143 }
  ];

  #image; #src; #width; #height; #loaded;

  constructor () {
    this.#image = new Image();
    this.#src = Field.defaultFields[0].src;

    this.#image.src = this.#src;

    this.#width = Field.defaultFields[0].width;
    this.#height = Field.defaultFields[0].height;

    this.#loaded = false;

    this.#initEvents();
  }

  //--------------------------------------

  get image () { return this.#image; }

  get src () { return this.#src; }

  get width () { return this.#width; }
  set width (width) { this.#width = width; }

  get height () { return this.#height; }
  set height (height) { this.#height = height; }

  get loaded () { return this.#loaded; }

  //--------------------------------------

  #initEvents () {
    this.#image.onload = ()=>{ this.#loadEvent(); };
  }

  //--------------------------------------

  #loadEvent () { 
    this.#width ??= this.#image.naturalWidth;
    this.#height ??= this.#image.naturalHeight;
    
    this.#loaded = true;
  }

  //--------------------------------------

  toJSON () {
    return serializeObject(this, ["src","width","height"]);
  }

  //--------------------------------------
  
  loadRaw (dataURL) {
    if (!dataURL) return;
    
    this.#width = null;
    this.#height = null;
    
    this.#loaded = false;
    
    this.#src = dataURL;
    
    this.#image.src = this.#src;
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
