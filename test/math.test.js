import { RadToDeg } from '../src/math.js';

describe('RadToDeg', () => {
  test('converts radians to degrees', () => {
    expect(RadToDeg(Math.PI)).toBe(180);
    expect(RadToDeg(Math.PI / 2)).toBe(90);
    expect(RadToDeg(0)).toBe(0);
  });
});
