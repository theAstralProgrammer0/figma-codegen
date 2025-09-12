// src/generator/renderers/polygonRenderer.ts
import { ParsedNode } from "../../types";
import { figmaColorToRgba } from "../../utils/color";

export function renderPolygon(node: ParsedNode): string {
  if (!node.size) return "<div />";

  const width = node.size.width;
  const height = node.size.height;

  // Approximate polygon points (e.g. triangle, pentagon, etc.)
  const points: string[] = [];
  const sides = node.pointCount ?? 3;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2;

  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  const fill = node.fills?.[0]?.color
    ? figmaColorToRgba(node.fills[0].color, node.opacity ?? 1)
    : "none";
  const stroke = node.strokes?.[0]?.color
    ? figmaColorToRgba(node.strokes[0].color, node.opacity ?? 1)
    : "none";

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <polygon points="${points.join(" ")}"
        fill="${fill}"
        stroke="${stroke}"
        stroke-width="${node.strokeWeight ?? 0}"
      />
    </svg>
  `.trim();
}

