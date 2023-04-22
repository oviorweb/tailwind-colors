import { hslToRgb } from "./hsl-to-rgb";
import { describe, it, expect } from "@jest/globals";
import { parseColors } from "./parse-colors";

describe("hslToRgb", () => {
  it("converts HSL strings to RGB", () => {
    expect(parseColors("hsl(0, 100%, 50%)")).toEqual({ r: 255, g: 0, b: 0 });
    expect(parseColors("hsl(120, 100%, 50%)")).toEqual({ r: 0, g: 255, b: 0 });
    expect(parseColors("hsl(240, 100%, 50%)")).toEqual({ r: 0, g: 0, b: 255 });
    expect(parseColors("hsl(0, 0%, 50%)")).toEqual({ r: 128, g: 128, b: 128 });
    expect(parseColors("#3a86ff")).toEqual({ r: 58, g: 134, b: 255 });
    expect(parseColors("3a86ff")).toEqual({ r: 58, g: 134, b: 255 });
    expect(parseColors("rgb(0 0 0)")).toEqual({ r: 0, g: 0, b: 0 });
    expect(parseColors("rgb(255, 0, 0)")).toEqual({ r: 255, g: 0, b: 0 });
    expect(parseColors("rgb(30% 20% 50%)")).toEqual({ r: 77, g: 51, b: 128 });
  });

  it("throws an error for invalid HSL strings", () => {
    expect(() => parseColors("hsl(120, 50, 50)")).toThrow(
      "Invalid color format."
    );
    expect(() => parseColors("hsl(120, 50%, 50)")).toThrow(
      "Invalid color format."
    );
    expect(() => parseColors("hsl(120, 50%)")).toThrow("Invalid color format.");
    expect(() => parseColors("b124")).toThrowError("Invalid color format.");
    expect(() => parseColors("#0sads")).toThrowError("Invalid color format.");
    expect(() => parseColors("#zzz")).toThrowError("Invalid color format.");
  });
});
