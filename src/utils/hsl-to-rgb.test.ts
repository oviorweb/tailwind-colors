import { parseHslString, hslToRgb } from './hsl-to-rgb';
import {describe, it, expect} from "@jest/globals";

describe('parseHslString', () => {
  it('parses valid HSL strings', () => {
    expect(parseHslString('hsl(120, 50%, 50%)')).toEqual({ h: 120, s: 0.5, l: 0.5 });
    expect(parseHslString('hsl(240, 100%, 25%)')).toEqual({ h: 240, s: 1, l: 0.25 });
    expect(parseHslString('hsl(0, 0%, 75%)')).toEqual({ h: 0, s: 0, l: 0.75 });
  });

  it('throws an error for invalid HSL strings', () => {
    expect(() => parseHslString('hsl(120, 50, 50)')).toThrow('Invalid HSL string');
    expect(() => parseHslString('hsl(120, 50%, 50)')).toThrow('Invalid HSL string');
    expect(() => parseHslString('hsl(120, 50%)')).toThrow('Invalid HSL string');
  });
});

describe('hslToRgb', () => {
  it('converts HSL strings to RGB', () => {
    expect(hslToRgb('hsl(0, 100%, 50%)')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hslToRgb('hsl(120, 100%, 50%)')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hslToRgb('hsl(240, 100%, 50%)')).toEqual({ r: 0, g: 0, b: 255 });
    expect(hslToRgb('hsl(0, 0%, 50%)')).toEqual({ r: 128, g: 128, b: 128 });
  });

  it('throws an error for invalid HSL strings', () => {
    expect(() => hslToRgb('hsl(120, 50, 50)')).toThrow('Invalid HSL string');
    expect(() => hslToRgb('hsl(120, 50%, 50)')).toThrow('Invalid HSL string');
    expect(() => hslToRgb('hsl(120, 50%)')).toThrow('Invalid HSL string');
  });
});
