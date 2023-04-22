import {
  combineColorObjects,
  generateCombinedColors,
  generateThemeColorVariables,
  ThemeColors,
  Themes,
} from "./utils";
export * from "./utils";

export type PresetOptions<T extends ThemeColors> = {
  defaultColorsTheme: keyof T;
  colors: T;
  themes: ReadonlyArray<keyof T> | readonly (keyof T)[];
};

export default <T extends ThemeColors>(obj: PresetOptions<T>) => {
  const themes = obj.themes;
  const themeKeys = themes.map((theme) => {
    const themeColors = obj.colors[theme] as ThemeColors;
    return {
      name: theme,
      colors: generateThemeColorVariables(themeColors) ?? {},
    };
  });

  const validObjectThemes = themes.map((theme) => {
    return obj.colors[theme];
  }) as unknown as Themes;

  const otherObjectThemes = Object.keys(obj)
    .filter((key) => {
      if (key === "themes" || key === "defaultColorTheme") return false;
      return !themes.includes(key);
    })
    .map((key) => {
      return {
        name: key,
        colors: obj.colors[key],
      };
    }) as { name: string; colors: string }[];

  const themeColors = generateCombinedColors(validObjectThemes);
  const colors = {
    ...combineColorObjects(
      otherObjectThemes.map((theme) => {
        return {
          [theme.name]: theme.colors,
        };
      })
    ),
    ...themeColors,
  };

  return {
    theme: {
      customColors: themeKeys ?? [],
      defaultColorsTheme: obj.defaultColorsTheme ?? "light",

      extend: {
        colors,
      },
    },
    plugins: [require("./plugin")],
  };
};
