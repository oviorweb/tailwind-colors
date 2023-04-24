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

  it("should reverse the shades and keep the DEFAULT value if provided", function () {
    const shades = {
      DEFAULT: "#64748b",
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
      DEFAULT: "#64748b",
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

  it("should reverse the shades, even given a non pair number of shades", function () {
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
    };

    const expectedResult = {
      "50": "#0f172a",
      "100": "#1e293b",
      "200": "#334155",
      "300": "#475569",
      "400": "#64748b",
      "500": "#94a3b8",
      "600": "#cbd5e1",
      "700": "#e2e8f0",
      "800": "#f1f5f9",
      "900": "#f8fafc",
    };

    expect(reverseShades(shades)).toEqual(expectedResult);
  });
});
