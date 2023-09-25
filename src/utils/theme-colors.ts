type ThemeColors = {
  [color: string]:
    | {
        [key: string]: string;
      }
    | string;
};

type Theme = {
  name: string;
  colors: {
    [variable: string]: string;
  };
};

function generateThemeColorVariables(theme: ThemeColors): {
  [variable: string]: string;
} {
  const colorVariables: { [variable: string]: string } = {};

  Object.entries(theme).forEach(([colorName, colorKeys]) => {
    if (typeof colorKeys === "string") {
      colorVariables[`--color-${colorName}`] = colorKeys;
      return;
    }
    Object.entries(colorKeys).forEach(([key, value]) => {
      if (key === "DEFAULT") {
        colorVariables[`--color-${colorName}`] = value;
      } else {
        colorVariables[`--color-${colorName}-${key}`] = value;
      }
    });
  });

  return colorVariables;
}

export { ThemeColors, Theme, generateThemeColorVariables };
