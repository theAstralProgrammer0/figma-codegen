// src/generator/renderers/rectangleRenderer.ts
import { ParsedNode } from "../../types";
import { rgbaFromPaint } from "../../utils/color";

export function renderRectangle(node: ParsedNode): string {
  const styleParts: string[] = [];
  if (node.size) {
    styleParts.push(`width: ${node.size.width}`);
    styleParts.push(`height: ${node.size.height}`);
  }
  if (node.fills && node.fills.length > 0) {
    const bg = rgbaFromPaint(node.fills[0]);
    if (bg) styleParts.push(`backgroundColor: "${bg}"`);
  } else {
    styleParts.push(`background: "transparent"`);
  }
  if (node.strokes && node.strokes.length > 0) {
    const border = rgbaFromPaint(node.strokes[0]);
    if (border) styleParts.push(`border: "${node.strokeWeight ?? 1}px solid ${border}"`);
  }
  if (typeof node.cornerRadius === "number") {
    styleParts.push(`borderRadius: ${node.cornerRadius}`);
  }
  if (typeof node.opacity === "number") {
    styleParts.push(`opacity: ${node.opacity}`);
  }

  const style = styleParts.length ? ` style={{ ${styleParts.join(", ")} }}` : "";
  return `<div${style}></div>`;
}

