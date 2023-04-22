import { combineColorObjects, generateCombinedColors, generateThemeColorVariables, Themes } from "./utils";

export type PresetOptions = {
  themes: string[];
  [key: string]: any;
  defaultColorsTheme: string;
}

module.exports = (obj: PresetOptions) => {
  const themes = obj.themes;
  const themeKeys = themes.map((theme: string) => {
    const themeColors = obj[theme];
    return {
      name: theme,
      colors: generateThemeColorVariables(themeColors) ?? {}
    }
  });

  const validObjectThemes = themes.map((theme: string) => {
    return obj[theme];
  }) as unknown as Themes;

  const otherObjectThemes = Object.keys(obj).filter((key) => {
    if (key === 'themes' || key === 'defaultColorTheme') return false;
    return !themes.includes(key);
  }).map((key) => {
    return {
      name: key,
      colors: obj[key]
    };
  });

  const themeColors = generateCombinedColors(validObjectThemes);
  const colors = {
    ...combineColorObjects(otherObjectThemes.map((theme) => {
      return {
        [theme.name]: theme.colors
      }
    })),
    ...themeColors
  };

  return {
    theme: {
      customColors: themeKeys ?? [],
      defaultColorsTheme: obj.defaultColorTheme ?? 'light',

      extend: {
        colors
      }
    },
    plugins: [
      require('./plugin')
    ]
  }
};
