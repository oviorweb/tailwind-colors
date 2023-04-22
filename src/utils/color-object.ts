type ColorObject = {
  [colorName: string]: string;
};

function combineColorObjects(colorObjects: ColorObject[]): ColorObject {
  return colorObjects.reduce<ColorObject>((acc, colorObject) => {
    Object.entries(colorObject).forEach(([colorName, value]) => {
      acc[colorName] = value;
    });
    return acc;
  }, {});
}

export { ColorObject, combineColorObjects };
