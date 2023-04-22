import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import presetFunction, { PresetOptions } from './index';
import { generateThemeColorVariables, generateCombinedColors, combineColorObjects } from './utils';

jest.mock('./utils', () => ({
  combineColorObjects: jest.fn(),
  generateCombinedColors: jest.fn(),
  generateThemeColorVariables: jest.fn(),
}));

describe('index.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should assemble and export a configuration object', () => {
    const themes = ['light', 'dark'] as const;
    const testOptions: PresetOptions<any> = {
      themes,
      colors: {
        light: { /* theme colors */ },
        dark: { /* theme colors */ },
      },
      defaultColorsTheme: 'light',
    };

    const testThemeColorVariables = {
      light: { /* generated variables */ },
      dark: { /* generated variables */ },
      defaultColorsTheme: 'light',
    };

    (generateThemeColorVariables as jest.Mock).mockImplementation((themeName) => testThemeColorVariables[themeName as keyof typeof testThemeColorVariables]);

    const testCombinedColors = { /* combined colors */ };
    (generateCombinedColors as jest.Mock).mockReturnValue(testCombinedColors);

    const testCombinedColorObjects = { /* combined color objects */ };
    (combineColorObjects as jest.Mock).mockReturnValue(testCombinedColorObjects);

    const expectedResult = {
      theme: {
        customColors: [
          { name: 'light', colors: testThemeColorVariables.light },
          { name: 'dark', colors: testThemeColorVariables.dark },
        ],
        defaultColorsTheme: 'light',
        extend: {
          colors: {
            ...testCombinedColorObjects,
            ...testCombinedColors,
          },
        },
      },
      plugins: [
        expect.anything(),
      ],
    };

    const result = presetFunction(testOptions);
    expect(result).toEqual(expectedResult);

    expect(generateThemeColorVariables).toHaveBeenCalledTimes(2);
    expect(generateCombinedColors).toHaveBeenCalledTimes(1);
    expect(combineColorObjects).toHaveBeenCalledTimes(1);
  });
});
