export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB {
  const cleanedHex = hex.replace("#", "");

  if (
    (cleanedHex.length !== 3 && cleanedHex.length !== 6) ||
    !/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(cleanedHex)
  )
    throw new Error("Invalid hex color format.");

  const expandedHex =
    cleanedHex.length === 3
      ? cleanedHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanedHex;

  const r = parseInt(expandedHex.substring(0, 2), 16);
  const g = parseInt(expandedHex.substring(2, 4), 16);
  const b = parseInt(expandedHex.substring(4, 6), 16);

  return { r, g, b };
}
