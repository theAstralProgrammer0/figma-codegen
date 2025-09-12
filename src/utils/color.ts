// src/utils/color.ts
import { Paint } from "../types";

/**
 * Convert Figma color {r,g,b,a?} to rgba string.
 * Accepts optional global opacity (falls back to color.a if present).
 */
export function figmaColorToRgba(
  color: { r: number; g: number; b: number; a?: number },
  opacity: number = 1
): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? color.a : opacity;
  return `rgba(${r},${g},${b},${a})`;
}

/**
 * Extract fill color from Paint[] as rgba string.
 * Returns "none" if no fills or unsupported type.
 */
export function extractFill(
  fills?: Paint[],
  opacity: number = 1
): string {
  if (!fills || fills.length === 0) return "none";
  const fill = fills[0];
  if (fill.type === "SOLID" && fill.color) {
    return figmaColorToRgba(fill.color, fill.opacity ?? opacity);
  }
  return "none";
}

/**
 * Extract stroke color from Paint[] as rgba string.
 * Returns "none" if no strokes or unsupported type.
 */
export function extractStroke(
  strokes?: Paint[],
  opacity: number = 1
): string {
  if (!strokes || strokes.length === 0) return "none";
  const stroke = strokes[0];
  if (stroke.type === "SOLID" && stroke.color) {
    return figmaColorToRgba(stroke.color, stroke.opacity ?? opacity);
  }
  return "none";
}

