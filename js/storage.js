//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// METHODS
//--------------------------------------------------------------------------------

function saveToStorage (key, data) {
  localStorage.setItem(key, data);
}

//--------------------------------------

function loadFromStorage (key) {
  return localStorage.getItem(key);
}

//--------------------------------------

const fileTypes = {
  text: "plain/text",
  json: "application/json"
};

//--------------------------------------

function saveToFile (name, type, data) {
  let blob = new Blob([data], {type});
  let url = URL.createObjectURL(blob);

  let element = document.createElement("a");
  element.setAttribute("download", name);
  
  element.href = url;
  
  element.click();
  element.remove();
}

//--------------------------------------

function loadFromFile (file) {
  
}

//--------------------------------------------------------------------------------