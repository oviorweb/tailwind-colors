import { RGB } from "./hex-to-rgb";

export function parseHslString(hslString: string): {
  h: number;
  s: number;
  l: number;
} {
  const regex = /hsl\((\d+)(?:deg)?\s*,\s*(\d+)%\s*,\s*(\d+)%\)/i;
  const match = hslString.match(regex);

  if (!match) {
    throw new Error("Invalid HSL string");
  }

  const [, hStr, sStr, lStr] = match;
  return {
    h: parseFloat(hStr),
    s: parseFloat(sStr) / 100,
    l: parseFloat(lStr) / 100,
  };
}

export function hslToRgb(hsl: string): RGB {
  const { h, s, l } = parseHslString(hsl);

  const hueToRgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  if (s === 0) {
    // achromatic
    return {
      r: Math.round(l * 255),
      g: Math.round(l * 255),
      b: Math.round(l * 255),
    };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const hNormalized = h / 360; // Normalize the hue value
  const r = hueToRgb(p, q, hNormalized + 1 / 3);
  const g = hueToRgb(p, q, hNormalized);
  const b = hueToRgb(p, q, hNormalized - 1 / 3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
