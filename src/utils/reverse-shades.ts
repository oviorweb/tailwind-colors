type ColorShades = {
  [shade: string]: string;
};

function reverseShades(shades: ColorShades): ColorShades {
  const reversedShades: ColorShades = {};

  const shadeKeys = Object.keys(shades);
  const shadeValues = Object.values(shades).reverse();

  shadeKeys.forEach((key, index) => {
    reversedShades[key] = shadeValues[index];
  });

  return reversedShades;
}

export { reverseShades };
