import { generateThemeColorVariables, ThemeColors } from "./theme-colors";
import { describe, it, expect } from "@jest/globals";

describe("generateThemeColorVariables", () => {
  it("should generate theme color variables correctly", () => {
    const themeColors: ThemeColors = {
      primary: {
        100: "#e0e0e0",
        200: "#b3b3b3",
      },
      secondary: {
        300: "#f48fb1",
        400: "#f06292",
      },
    };

    const expectedResult = {
      "--color-primary-100": "#e0e0e0",
      "--color-primary-200": "#b3b3b3",
      "--color-secondary-300": "#f48fb1",
      "--color-secondary-400": "#f06292",
    };

    expect(generateThemeColorVariables(themeColors)).toEqual(expectedResult);
  });

  it("should generate color and accept strings", () => {
    const themeColors = {
      primary: {
        "100": "#f1f5f9",
        "200": "#e2e8f0",
      },
      secondary: "#64748b",
    };

    const expectedResult = {
      "--color-primary-100": "#f1f5f9",
      "--color-primary-200": "#e2e8f0",
      "--color-secondary": "#64748b",
    };

    expect(generateThemeColorVariables(themeColors)).toEqual(expectedResult);
  });
});
