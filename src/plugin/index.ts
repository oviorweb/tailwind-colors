import plugin from "tailwindcss/plugin";
import { Theme, parseColors } from "../utils";

const themeConfig = plugin(({ addBase, theme, addVariant }) => {
  const customColors = theme("customColors", []) satisfies Theme[];
  const defaultTheme: string = theme("defaultTheme", "light");

  for (const theme of customColors.map((theme: Theme) => theme.name)) {
    addVariant(theme, `:root[data-theme="${theme}"] &`);
  }

  const themes = customColors.map((theme: Theme) => {
    const colorObjectRgb = Object.entries(theme.colors).reduce(
      (acc, [key, value]) => {
        if (typeof value === "undefined") {
          delete acc[key];
          return acc;
        }
        const rgb = parseColors(value);
        acc[key] = `${rgb.r} ${rgb.g} ${rgb.b}`;
        return acc;
      },
      {} as Record<string, string>
    );
    if (theme.name === defaultTheme) {
      return {
        ":root": {
          ...colorObjectRgb,
        },
      };
    }
    return {
      [`:root[data-theme="${theme.name}"]`]: {
        ...colorObjectRgb,
      },
    };
  });

  addBase(themes);
});

export default themeConfig;
