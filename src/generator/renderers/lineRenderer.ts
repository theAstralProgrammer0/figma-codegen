// src/generator/renderers/lineRenderer.ts
import { ParsedNode } from "../../types";

export function renderLine(node: ParsedNode): string {
  const length = node.size?.width ?? 100;
  const thickness = node.strokeWeight ?? 1;
  const color =
    node.strokes?.[0]?.color
      ? `rgba(${Math.round(node.strokes[0].color.r * 255)}, ${Math.round(
          node.strokes[0].color.g * 255
        )}, ${Math.round(node.strokes[0].color.b * 255)}, ${
          node.strokes[0].color.a ?? 1
        })`
      : "black";

  const style = [
    `width: ${length}px`,
    `height: ${thickness}px`,
    `backgroundColor: '${color}'`,
  ].join("; ");

  return `<div style={{ ${style} }} />`;
}

