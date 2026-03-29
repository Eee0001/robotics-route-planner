//--------------------------------------------------------------------------------
// IMPORTS
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
// METHODS
//--------------------------------------------------------------------------------

function generateInstructions (points, startingAngle) {
  let path = "";

  for (let i = 0; i < points.length - 1; i++) {

    const lastPoint = points[i - 1];
    const thisPoint = points[i];
    const nextPoint = points[i + 1];

    let lastAngle = startingAngle;

    if (lastPoint) {
      lastAngle = getAngle(lastPoint, thisPoint);

      if (lastPoint.d === -1) {
        lastAngle = flipAngle(lastAngle);
      }
    }

    let thisAngle = getAngle(thisPoint, nextPoint);

    if (thisPoint.d === -1) {
      thisAngle = flipAngle(thisAngle);
    }

    const turn = getTurn(lastAngle, thisAngle);
    path += ""+turn+"\n";
    
    const angle = Math.round(rotateAngle(thisAngle, -startingAngle));
    path += ""+angle+"\n";
    
    const direction = thisPoint.d;
    path += ""+direction+"\n";
    
    const distance = Math.round(getDistance(thisPoint, nextPoint));
    path += ""+distance+"\n";
    
    const action = thisPoint.a;
    path += ""+action+"\n";
  }

  return path.trim();
}

//--------------------------------------------------------------------------------