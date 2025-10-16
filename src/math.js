export function radToDeg (angle) {
  return angle * 180 / Math.PI;
}

export function degToRad (angle) {
  return angle * Math.PI / 180;
}

export function calculateDistance (p1, p2) {
  return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
}

export function calculateAngle (p1, p2) {
  return radToDeg(Math.atan2((p2.x - p1.x), (p1.y - p2.y)));
}

export function flipAngle (angle) {
  return -1 * Math.sign(angle) * (180 - Math.abs(angle))
}

export function calculateTurn (angle1, angle2) {
  return Math.sign((angle2 - angle1 + 540) % 360 - 180);
}