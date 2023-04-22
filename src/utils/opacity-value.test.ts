import { describe, it, expect } from "@jest/globals";
import { withOpacityValue, OpacityConfig } from "./opacity-value";

describe("withOpacityValue", () => {
  it("should return a function that returns the correct rgb string without opacity", () => {
    const variable = "--color-test";
    const config: OpacityConfig = {};

    const withOpacity = withOpacityValue(variable);
    const expectedResult = "rgb(var(--color-test))";

    expect(withOpacity(config)).toEqual(expectedResult);
  });

  it("should return a function that returns the correct rgb string with opacity", () => {
    const variable = "--color-test";
    const config: OpacityConfig = {
      opacityValue: 0.5,
    };

    const withOpacity = withOpacityValue(variable);
    const expectedResult = "rgb(var(--color-test) / 0.5)";

    expect(withOpacity(config)).toEqual(expectedResult);
  });
});
