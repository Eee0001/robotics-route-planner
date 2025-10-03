export function RadToDeg (angle) {
  return angle * 180 / Math.PI;
}

export function DegToRad (angle) {
  return angle * Math.PI / 180;
}

export function CalculateDistance (p1, p2) {
  return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
}

export function CalculateAngle (p1, p2) {
  return RadToDeg(Math.atan2((p2.x - p1.x), (p1.y - p2.y)));
}

export function FlipAngle (angle) {
  return -1 * Math.sign(angle) * (180 - Math.abs(angle))
}

export function CalculateTurn (angle1, angle2) {
  return Math.sign((angle2 - angle1 + 540) % 360 - 180);
}