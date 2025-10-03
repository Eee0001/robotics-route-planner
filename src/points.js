//------------------------------------------------------------
// POINTS
//------------------------------------------------------------
export function CreatePoint (x, y, d = 1, f = 0) {
  points.push({
    x: x,
    y: y,
    d: d,
    f: f,
  });
  currentPoint = points.length - 1;
}

export function DeletePoint () {
  if (points.length > 0) {
    trash.push(points.pop());
  }

  if (holdingPoint >= points.length) {
    holdingPoint = null;
  }
  if (currentPoint >= points.length) {
    currentPoint = null;
  }

  UpdatePointMenu();
}

export function WipePoints () {
  points = [];
  currentPoint = null;
  holdingPoint = null;
}

export function RestorePoint () {
  if (trash.length > 0) {
    points.push(trash.pop());
  }
}

export function MovePointLeft () {
  if (currentPoint != null) {
    points[currentPoint].x -= 1;
    UpdatePointMenu();
  }
}

export function MovePointRight () {
  if (currentPoint != null) {
    points[currentPoint].x += 1;
    UpdatePointMenu();
  }
}

export function MovePointUp () {
  if (currentPoint != null) {
    points[currentPoint].y -= 1;
    UpdatePointMenu();
  }
}

export function MovePointDown () {
  if (currentPoint != null) {
    points[currentPoint].y += 1;
    UpdatePointMenu();
  }
}

export function SetPointForwards () {
  if (currentPoint != null) {
    points[currentPoint].d = 1;
    UpdatePointMenu();
  }
}

export function SetPointBackwards () {
  if (currentPoint != null) {
    points[currentPoint].d = -1;
    UpdatePointMenu();
  }
}

export function SetPointFunction (key) {
  if (currentPoint != null) {
    points[currentPoint].f = Number(key);
    UpdatePointMenu();
  }
}