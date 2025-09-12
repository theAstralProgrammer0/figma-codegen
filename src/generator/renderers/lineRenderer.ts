// src/generator/renderers/lineRenderer.ts
import { ParsedNode } from "../../types";
import { figmaColorToRgba } from "../../utils/color";

export function renderLine(node: ParsedNode): string {
  const length = node.size?.width ?? 100;
  const thickness = node.strokeWeight ?? 1;
  const stroke = node.strokes?.[0];

  const color =
    stroke?.type === "SOLID" && stroke.color
      ? figmaColorToRgba(stroke.color, stroke.opacity)
      : "black";

  const style = [
    `width: ${length}px`,
    `height: ${thickness}px`,
    `backgroundColor: "${color}"`,
  ].join(", ");

  return `<div style={{ ${style} }} />`;
}

