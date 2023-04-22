import { OpacityConfig, withOpacityValue } from "./opacity-value";
import { ThemeColors } from './theme-colors';

type Themes = {
  [themeName: string]: ThemeColors;
};

type CombinedColors = {
  [colorName: string]: {
    [shade: string]: (config: OpacityConfig) => string;
  };
};

/**
 * Generates an object containing combined colors from multiple themes.
 *
 * @param themes An object with theme names as keys and ThemeColors as values.
 * @returns An object containing combined colors with opacityValue function.
 */
function generateCombinedColors(themes: Themes): CombinedColors {
  const combinedColors: CombinedColors = {};

  Object.values(themes).forEach((themeColors: ThemeColors) => {
    Object.entries(themeColors).forEach(([colorName, colorShades]) => {
      if (!combinedColors[colorName]) {
        combinedColors[colorName] = {};
      }

      if (typeof colorShades === "string") {
        combinedColors[colorName]["DEFAULT"] = withOpacityValue(`--color-${colorName}`);
        return;
      }
      Object.entries(colorShades).forEach(([shade, value]) => {
        combinedColors[colorName][shade] = withOpacityValue(`--color-${colorName}-${shade}`);
      });
    });
  });

  return combinedColors;
}

export { Themes, CombinedColors, generateCombinedColors };
