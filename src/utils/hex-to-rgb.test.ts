import { hexToRgb } from './hex-to-rgb';
import {describe, it, expect} from "@jest/globals";

describe('hexToRgb', () => {
  it('should convert a valid 6-character hex color to its RGB equivalent', () => {
    const hexColor = '#3a86ff';
    const expectedRgb = { r: 58, g: 134, b: 255 };
    expect(hexToRgb(hexColor)).toEqual(expectedRgb);
  });

  it('should convert a valid 6-character hex color without the "#" prefix', () => {
    const hexColor = '3a86ff';
    const expectedRgb = { r: 58, g: 134, b: 255 };
    expect(hexToRgb(hexColor)).toEqual(expectedRgb);
  });

  it('should throw an error when provided an invalid hex color format of character', () => {
    const invalidHexColor = 'b124';
    expect(() => hexToRgb(invalidHexColor)).toThrowError('Invalid hex color format.');
  });

  it('should throw an error when provided invalid hex number', function () {
    const invalidHexColor = '#3a86fg';
    expect(() => hexToRgb(invalidHexColor)).toThrowError('Invalid hex color format.');
  });

  it('should convert a valid 3 character hex color', () => {
    const invalidHexColor = '#3a8';
    const expectedRgb = { r: 51, g: 170, b: 136 }
    expect(hexToRgb(invalidHexColor)).toEqual(expectedRgb);
  });

  it('should convert a valid 3-character hex color without the "#" prefix', () => {
    const invalidHexColor = '3a8';
    const expectedRgb = { r: 51, g: 170, b: 136 }
    expect(hexToRgb(invalidHexColor)).toEqual(expectedRgb);
  });
});
