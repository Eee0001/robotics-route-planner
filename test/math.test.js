import { radToDeg, degToRad, calculateDistance, calculateAngle, flipAngle, calculateTurn } from '../src/math.js';

describe('Math Functions', () => {
  test('radToDeg: converts radians to degrees', () => {
    expect(radToDeg(Math.PI)).toBe(180);
    expect(radToDeg(Math.PI / 2)).toBe(90);
    expect(radToDeg(0)).toBe(0);
  });

  test('degToRad: converts degrees to radians', () => {
    expect(degToRad(180)).toBe(Math.PI);
    expect(degToRad(90)).toBe(Math.PI / 2);
    expect(degToRad(0)).toBe(0);
  });

  test('calculateDistance: calculates distance between two points', () => {
    expect(calculateDistance({x:0, y:0}, {x:0, y:0})).toBe(0);

    expect(calculateDistance({x:0, y:0}, {x:4, y:3})).toBe(5);
    expect(calculateDistance({x:4, y:3}, {x:0, y:0})).toBe(5);
    
    expect(calculateDistance({x:5, y:0}, {x:0, y:12})).toBe(13);
    expect(calculateDistance({x:-4, y:-11}, {x:1, y:1})).toBe(13);
  });

  test('calculateAngle: calculates angle between two points', () => {
    expect(calculateAngle({x:0, y:0}, {x:0, y:-1})).toBe(0);
    expect(calculateAngle({x:0, y:0}, {x:0, y:1})).toBe(180);

    expect(calculateAngle({x:1, y:1}, {x:2, y:0})).toBe(45);
    expect(calculateAngle({x:1, y:1}, {x:-1, y:-1})).toBe(-45);
  });

  test('flipAngle: calculates opposite angle', () => {
    expect(flipAngle(0)).toBe(-0);

    expect(flipAngle(45)).toBe(-135);
    expect(flipAngle(-135)).toBe(45);

    expect(flipAngle(90)).toBe(-90);
    expect(flipAngle(-90)).toBe(90);
  });

  test('calculateTurn: calculates turn direction between two angles', () => {
    expect(calculateTurn(0, 45)).toBe(1);
    expect(calculateTurn(0, -45)).toBe(-1);

    expect(calculateTurn(0, 135)).toBe(1);
    expect(calculateTurn(0, -135)).toBe(-1);

    expect(calculateTurn(135, -135)).toBe(1);
    expect(calculateTurn(-135, 135)).toBe(-1);
  });
});

