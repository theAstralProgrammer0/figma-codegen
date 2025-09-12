// src/generator/renderers/rectangleRenderer.ts
import { ParsedNode } from "../../types";
import { figmaColorToRgba } from "../../utils/color";

export function renderRectangle(node: ParsedNode): string {
  const styleParts: string[] = [];

  // size
  if (node.size) {
    styleParts.push(`width: ${node.size.width}`);
    styleParts.push(`height: ${node.size.height}`);
  }

  // fill
  if (node.fills && node.fills.length > 0) {
    const fill = node.fills[0];
    if (fill.type === "SOLID" && fill.color) {
      styleParts.push(`backgroundColor: "${figmaColorToRgba(fill.color, fill.opacity)}"`);
    }
  } else {
    styleParts.push(`background: "transparent"`);
  }

  // stroke
  if (node.strokes && node.strokes.length > 0) {
    const stroke = node.strokes[0];
    if (stroke.type === "SOLID" && stroke.color) {
      styleParts.push(
        `border: "${node.strokeWeight ?? 1}px solid ${figmaColorToRgba(
          stroke.color,
          stroke.opacity
        )}"`
      );
    }
  }

  // corner radius
  if (typeof node.cornerRadius === "number") {
    styleParts.push(`borderRadius: ${node.cornerRadius}`);
  }

  // opacity
  if (typeof node.opacity === "number") {
    styleParts.push(`opacity: ${node.opacity}`);
  }

  const style = styleParts.length ? ` style={{ ${styleParts.join(", ")} }}` : "";
  return `<div${style}></div>`;
}

