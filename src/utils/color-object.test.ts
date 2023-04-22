import { describe, it, expect } from "@jest/globals";
import { combineColorObjects, ColorObject } from "./color-object";

describe("combineColorObjects", () => {
  it("should combine multiple color objects into a single object", () => {
    const colorObjects: ColorObject[] = [
      { color1: "#ff0000", color2: "#00ff00" },
      { color3: "#0000ff", color4: "#ffff00" },
      { color5: "#ff00ff", color6: "#00ffff" },
    ];

    const expectedResult: ColorObject = {
      color1: "#ff0000",
      color2: "#00ff00",
      color3: "#0000ff",
      color4: "#ffff00",
      color5: "#ff00ff",
      color6: "#00ffff",
    };

    expect(combineColorObjects(colorObjects)).toEqual(expectedResult);
  });

  it("should handle an empty array of color objects", () => {
    const colorObjects: ColorObject[] = [];

    const expectedResult: ColorObject = {};

    expect(combineColorObjects(colorObjects)).toEqual(expectedResult);
  });

  it("should override duplicate color keys with the value from the last object", () => {
    const colorObjects: ColorObject[] = [
      { color1: "#ff0000", color2: "#00ff00" },
      { color1: "#0000ff", color4: "#ffff00" },
      { color2: "#ff00ff", color6: "#00ffff" },
    ];

    const expectedResult: ColorObject = {
      color1: "#0000ff",
      color2: "#ff00ff",
      color4: "#ffff00",
      color6: "#00ffff",
    };

    expect(combineColorObjects(colorObjects)).toEqual(expectedResult);
  });
});
