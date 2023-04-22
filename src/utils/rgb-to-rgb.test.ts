import { rgbToRgb } from './rgb-to-rgb';
import {describe, it, expect} from "@jest/globals";

describe('rgbToRgb', () => {
  it('parses valid RGB strings', () => {
    expect(rgbToRgb('rgb(255, 0, 0)')).toEqual({ r: 255, g: 0, b: 0 });
    expect(rgbToRgb('rgb(0, 255, 0)')).toEqual({ r: 0, g: 255, b: 0 });
    expect(rgbToRgb('rgb(0, 0, 255)')).toEqual({ r: 0, g: 0, b: 255 });

    expect(rgbToRgb('rgb(255 0 0)')).toEqual({ r: 255, g: 0, b: 0 });
    expect(rgbToRgb('rgb(0 255 0)')).toEqual({ r: 0, g: 255, b: 0 });
    expect(rgbToRgb('rgb(0 0 255)')).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('parses valid RGB strings with percentage values', () => {
    expect(rgbToRgb('rgb(100%, 0%, 0%)')).toEqual({ r: 255, g: 0, b: 0 });
    expect(rgbToRgb('rgb(0%, 100%, 0%)')).toEqual({ r: 0, g: 255, b: 0 });
    expect(rgbToRgb('rgb(0%, 0%, 100%)')).toEqual({ r: 0, g: 0, b: 255 });
  });

  it('throws an error for invalid RGB strings', () => {
    expect(() => rgbToRgb('rgb(256, 0, 0)')).toThrow('Invalid rgb string');
    expect(() => rgbToRgb('rgb(-1, 255, 0)')).toThrow('Invalid rgb string');
    expect(() => rgbToRgb('rgb(0, 0, 300)')).toThrow('Invalid rgb string');
    expect(() => rgbToRgb('rgb(0, 0, 0')).toThrow('Invalid rgb string');
  });
});
