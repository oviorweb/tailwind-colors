import { reverseShades } from "./reverse-shades";
import { describe, expect, it } from "@jest/globals";

describe("reverseShades", () => {
  it("should reverse the shades", () => {
    const shades = {
      "50": "#f8fafc",
      "100": "#f1f5f9",
      "200": "#e2e8f0",
      "300": "#cbd5e1",
      "400": "#94a3b8",
      "500": "#64748b",
      "600": "#475569",
      "700": "#334155",
      "800": "#1e293b",
      "900": "#0f172a",
      "950": "#020617",
    };

    const expectedResult = {
      "50": "#020617",
      "100": "#0f172a",
      "200": "#1e293b",
      "300": "#334155",
      "400": "#475569",
      "500": "#64748b",
      "600": "#94a3b8",
      "700": "#cbd5e1",
      "800": "#e2e8f0",
      "900": "#f1f5f9",
      "950": "#f8fafc",
    };

    expect(reverseShades(shades)).toEqual(expectedResult);
  });
});
