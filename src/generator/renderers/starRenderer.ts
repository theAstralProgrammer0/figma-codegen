// src/generator/renderers/starRenderer.ts
import { ParsedNode } from "../../types";
import { figmaColorToRgba } from "../../utils/color";

/**
 * Render a STAR node as an SVG <polygon>.
 */
export function renderStar(node: ParsedNode): string {
  const size = node.size ?? { width: 100, height: 100 };
  const outerRadius = Math.min(size.width, size.height) / 2;
  const innerRadius = outerRadius * (node.starInnerRadius ?? 0.5);
  const points: string[] = [];
  const cx = size.width / 2;
  const cy = size.height / 2;
  const count = node.pointCount ?? 5;

  for (let i = 0; i < count * 2; i++) {
    const angle = (Math.PI / count) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  // fill color
  const fill =
    node.fills && node.fills.length > 0 && node.fills[0].type === "SOLID" && node.fills[0].color
      ? figmaColorToRgba(node.fills[0].color, node.fills[0].opacity)
      : "none";

  // stroke color
  const stroke =
    node.strokes && node.strokes.length > 0 && node.strokes[0].type === "SOLID" && node.strokes[0].color
      ? figmaColorToRgba(node.strokes[0].color, node.strokes[0].opacity)
      : "none";

  return `
<svg width="${size.width}" height="${size.height}">
  <polygon points="${points.join(" ")}"
    fill="${fill}"
    stroke="${stroke}"
    stroke-width="${node.strokeWeight ?? 1}"
  />
</svg>
`;
}

