import { withDefault, DefaultableObject } from "./with-default";

describe("withDefault", () => {
  it("should add a DEFAULT key with the specified value to the object", () => {
    const input: Record<string, string> = {
      50: "#f00",
      100: "#ff0",
    };

    const defaultValue = "#fff";
    const expectedOutput: DefaultableObject<Record<string, string>> = {
      DEFAULT: "#fff",
      50: "#f00",
      100: "#ff0",
    };

    const result = withDefault(input, defaultValue);
    expect(result).toEqual(expectedOutput);
  });
});
