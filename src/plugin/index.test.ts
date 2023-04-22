import {describe, jest, expect, it, beforeEach} from "@jest/globals";
import { hexToRgb, parseColors, Theme } from '../utils';
import pluginFunction from './index';
import plugin from "tailwindcss/types/config";

jest.mock('../utils', () => {
  return {
    parseColors: jest.fn(),
  };
});

jest.mock('tailwindcss/plugin', () => {
  return jest.fn((pluginFn) => pluginFn);
});

const addBase = jest.fn();
const addVariant = jest.fn();
const theme = jest.fn();

const customColors: Theme[] = [
  {
    name: 'light',
    colors: {
      '--color-primary': '#ffffff',
      '--color-secondary': '#cccccc',
    },
  },
  {
    name: 'dark',
    colors: {
      '--color-primary': '#000000',
      '--color-secondary': '#333333',
    },
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('plugin', () => {
  it('should call the plugin with the correct arguments and functions', () => {
    (parseColors as jest.Mock<typeof parseColors>).mockImplementation((value: string) => {
      switch (value) {
        case '#ffffff':
          return { r: 255, g: 255, b: 255 };
        case '#cccccc':
          return { r: 204, g: 204, b: 204 };
        case '#000000':
          return { r: 0, g: 0, b: 0 };
        case '#333333':
          return { r: 51, g: 51, b: 51 };
        default:
          throw new Error(`Invalid color value: ${value}`);
      }
    });

    (theme as jest.MockedFunction<(key: string, defaultValue: any) => any>).mockImplementation((key: string, defaultValue: any) => {
      if (key === 'customColors') {
        return customColors;
      } else if (key === 'defaultColorsTheme') {
        return 'light';
      }
      return defaultValue;
    });

    const mockPluginFunction = pluginFunction as jest.MockedFunction<any>;
    mockPluginFunction({ addBase, theme, addVariant });

    expect(addVariant).toHaveBeenCalledTimes(2);
    expect(addVariant).toHaveBeenCalledWith('light', ':root[data-theme="light"] &');
    expect(addVariant).toHaveBeenCalledWith('dark', ':root[data-theme="dark"] &');

    expect(addBase).toHaveBeenCalledTimes(1);
    expect(addBase).toHaveBeenCalledWith([
      {
        ':root': {
          '--color-primary': '255 255 255',
          '--color-secondary': '204 204 204', // Update the expected value
        },
      },
      {
        ':root[data-theme="dark"]': {
          '--color-primary': '0 0 0', // Update the expected value
          '--color-secondary': '51 51 51',
        },
      },
    ]);
  });
});
