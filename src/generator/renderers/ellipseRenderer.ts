// src/generator/renderers/ellipseRenderer.ts
import { ParsedNode } from "../../types";
import { rgbaFromPaint } from "../../utils/color";

export function renderEllipse(node: ParsedNode): string {
  const styleParts: string[] = [];

  // size
  if (node.size) {
    styleParts.push(`width: ${node.size.width}`);
    styleParts.push(`height: ${node.size.height}`);
  }

  // background / fills
  if (node.fills && node.fills.length > 0) {
    const bg = rgbaFromPaint(node.fills[0]);
    if (bg) styleParts.push(`backgroundColor: "${bg}"`);
  } else {
    styleParts.push(`background: "transparent"`);
  }

  // stroke / border
  if (node.strokes && node.strokes.length > 0) {
    const borderColor = rgbaFromPaint(node.strokes[0]);
    if (borderColor) styleParts.push(`border: "${node.strokeWeight ?? 1}px solid ${borderColor}"`);
  }

  // make it round
  styleParts.push(`borderRadius: "50%"`);

  // opacity
  if (typeof node.opacity === "number") styleParts.push(`opacity: ${node.opacity}`);

  const style = styleParts.length ? ` style={{ ${styleParts.join(", ")} }}` : "";
  return `<div${style}></div>`;
}

