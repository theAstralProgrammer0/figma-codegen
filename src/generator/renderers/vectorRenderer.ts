// src/generator/renderers/vectorRenderer.ts
import { ParsedNode } from "../../types";
import { figmaColorToRgba } from "../../utils/color";

export function renderVector(node: ParsedNode): string {
  if (!node.vectorPaths || node.vectorPaths.length === 0) {
    return "<svg />";
  }

  const width = node.size?.width ?? 100;
  const height = node.size?.height ?? 100;

  const fill =
    node.fills && node.fills.length > 0 && node.fills[0].type === "SOLID" && node.fills[0].color
      ? figmaColorToRgba(node.fills[0].color, node.fills[0].opacity)
      : "black";

  const stroke =
    node.strokes && node.strokes.length > 0 && node.strokes[0].type === "SOLID" && node.strokes[0].color
      ? figmaColorToRgba(node.strokes[0].color, node.strokes[0].opacity)
      : "none";

  const paths = node.vectorPaths
    .map(
      (p) =>
        `<path d="${p.data}" fill="${fill}" stroke="${stroke}" stroke-width="${
          node.strokeWeight ?? 0
        }" fillRule="${p.windingRule ?? "NONZERO"}" />`
    )
    .join("\n");

  return `
    <svg
      key="${node.id}"
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${paths}
    </svg>
  `;
}

