// src/utils/color.ts
import { Paint } from "../types";

export function to255(x?: number) {
  if (typeof x !== "number") return 0;
  const v = Math.round(x * 255);
  return Math.max(0, Math.min(255, v));
}

export function rgbaFromPaint(paint?: Paint): string | null {
  if (!paint) return null;
  if (paint.type !== "SOLID") return null;
  const c = paint.color;
  if (!c) return null;
  const r = to255(c.r);
  const g = to255(c.g);
  const b = to255(c.b);
  const a = typeof paint.opacity === "number" ? paint.opacity : (typeof c.a === "number" ? c.a : 1);
  return `rgba(${r},${g},${b},${a})`;
}

