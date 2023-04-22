import { hexToRgb, RGB } from "./hex-to-rgb";
import { hslToRgb } from "./hsl-to-rgb";
import { rgbToRgb } from "./rgb-to-rgb";

function isHex(colorString: string): boolean {
  return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(colorString);
}

function isHsl(colorString: string): boolean {
  return /^hsl\(\d{1,3}(?:deg)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\)$/i.test(
    colorString
  );
}

export function parseColors(color: string): RGB {
  if (isHex(color)) return hexToRgb(color);
  if (isHsl(color)) return hslToRgb(color);
  if (color.startsWith("rgb")) return rgbToRgb(color);
  throw new Error("Invalid color format.");
}
