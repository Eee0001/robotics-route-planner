//------------------------------------------------------------
// IMPORTS
//------------------------------------------------------------
import { Field } from "./fields.js"
import { Settings } from "./settings.js"
import { Route } from "./routes.js"

//------------------------------------------------------------
// CLASS
//------------------------------------------------------------

export class Mission {

  constructor () {
    this._name = "Robot Mission";
    
    this._field = new Field();
    
    this._settings = new Settings();
    
    this._route = new Route();
  }

  //----------------------------------------------------------

  get name () {
    return this._name;
  }

  set name (name) {
    this._name = name;
  }

  //----------------------------------------------------------

  get field () {
    return this._field;
  }

  set field (field) {
    this._field = field;
  }

  //----------------------------------------------------------

  get settings () {
    return this._settings;
  }

  set settings (settings) {
    this._settings = settings;
  }

  //----------------------------------------------------------
  
  get route () {
    return this._route;
  }

  set route (route) {
    this._route = route;
  }
  
}

//------------------------------------------------------------