type ColorShades = {
  [shade: string]: string;
};

function reverseShades(shades: ColorShades): ColorShades {
  const reversedShades: ColorShades = {
    DEFAULT: shades.DEFAULT,
  };

  const shadeKeys = Object.keys(shades).filter((key) => key !== "DEFAULT");

  const shadeValues = shadeKeys.map((key) => shades[key]).reverse();

  shadeKeys.forEach((key, index) => {
    reversedShades[key] = shadeValues[index];
  });

  return reversedShades;
}

export { reverseShades };
