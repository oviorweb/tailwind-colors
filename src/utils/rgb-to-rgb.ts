import { RGB } from "./hex-to-rgb";

function isPercent(num: string): boolean {
  return num.endsWith("%");
}

function parseRgb(rgb: string): RGB {
  const rgbRegex = /rgb\((\d{1,3}%?),?\s*(\d{1,3}%?),?\s*(\d{1,3}%?)\)/g;
  const res = rgbRegex.exec(rgb);
  if (!res) {
    throw new Error("Invalid rgb string");
  }
  const [, r, g, b] = res;

  if (parseInt(r) > 255 || parseInt(g) > 255 || parseInt(b) > 255) {
    throw new Error("Invalid rgb string");
  }

  const rCalculated = isPercent(r) ? (parseInt(r) / 100) * 255 : parseInt(r);
  const gCalculated = isPercent(g) ? (parseInt(g) / 100) * 255 : parseInt(g);
  const bCalculated = isPercent(b) ? (parseInt(b) / 100) * 255 : parseInt(b);

  return {
    r: Math.round(rCalculated),
    g: Math.round(gCalculated),
    b: Math.round(bCalculated),
  };
}
export function rgbToRgb(rgb: string): RGB {
  return parseRgb(rgb);
}
