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

async function loadFile (type) {
  let element = document.createElement("input");
  element.setAttribute("type", "file");
  element.setAttribute("accept", type);

  const file = await new Promise((resolve) => {
    element.onchange = () => {
      resolve(element.files[0]);
      element.remove();
    };

    element.click();
  });
    
  return file;
}

//--------------------------------------

async function readFileContent (file) {
  let fileReader = new FileReader();

  const data = await new Promise((resolve) => {
    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.readAsText(file);
  });

  return data;
}

//--------------------------------------

function serializeObject (object, keys) {
  const serializedData = {};

  for (let key of keys) { 
    serializedData[key] = object[key]; 
  }

  return serializedData;
}

//--------------------------------------------------------------------------------
