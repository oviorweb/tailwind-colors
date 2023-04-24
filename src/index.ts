import {
  combineColorObjects,
  generateCombinedColors,
  generateThemeColorVariables,
  ThemeColors,
  Themes,
} from "./utils";
import plugin from "./plugin";
import type { Config } from "tailwindcss";
import { RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";

export * from "./utils";

type ColorObject = {
  [color: string]:
    | {
        [key: string]:
          | string
          | {
              [shade: string]: string;
            };
      }
    | string;
};

export type PresetOptions<T extends ColorObject> = {
  defaultTheme: keyof T;
  colors: T;
  themes: ReadonlyArray<keyof T> | readonly (keyof T)[];
  extend?: boolean;
};

export default <T extends ColorObject>(obj: PresetOptions<T>) => {
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

  const otherObjectThemes = Object.keys(obj.colors)
    .filter((key) => {
      if (key === "themes" || key === "defaultTheme") return false;
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
  } as unknown as ResolvableTo<RecursiveKeyValuePair>;

  const extendable =
    obj.extend ?? true
      ? {
          extend: {
            colors,
          },
        }
      : {
          colors,
        };

  return {
    theme: {
      customColors: themeKeys ?? [],
      defaultTheme: obj.defaultTheme ?? "light",
      ...extendable,
    },
    content: [],
    plugins: [plugin],
  } satisfies Config;
};
