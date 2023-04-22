import { generateCombinedColors, Themes } from './themes';
import { OpacityConfig } from './opacity-value';
import { describe, it, expect } from '@jest/globals';
describe('generateCombinedColors', () => {
  it('should generate combined colors correctly', () => {
    const themes: Themes = {
      light: {
        primary: {
          100: '#e0e0e0',
          200: '#b3b3b3',
        },
        secondary: {
          300: '#f48fb1',
          400: '#f06292',
        },
      },
      dark: {
        primary: {
          100: '#616161',
          200: '#424242',
        },
        secondary: {
          300: '#ad1457',
          400: '#880e4f',
        },
      },
    };

    const combinedColors = generateCombinedColors(themes);

    // Test if the combined colors object has the correct structure and opacityValue functions
    expect(typeof combinedColors.primary[100]).toBe('function');
    expect(typeof combinedColors.secondary[300]).toBe('function');

    // Test if the opacityValue functions return the correct values
    const opacityConfig: OpacityConfig = { opacityValue: 0.5 };
    expect(combinedColors.primary[100](opacityConfig)).toBe('rgb(var(--color-primary-100) / 0.5)');
    expect(combinedColors.secondary[300](opacityConfig)).toBe('rgb(var(--color-secondary-300) / 0.5)');
  });
});
