// src/generator/renderers/regularPolygonRenderer.ts
import { ParsedNode } from "../../types";
import { figmaColorToRgba } from "../../utils/color";

export function renderRegularPolygon(node: ParsedNode): string {
  if (!node.size || !node.pointCount) return "";

  const { width, height } = node.size;
  const sides = node.pointCount;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;

  const angleStep = (2 * Math.PI) / sides;
  const points: string[] = [];

  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  // fill
  let fillAttr = `fill="none"`;
  if (node.fills && node.fills.length > 0) {
    const fill = node.fills[0];
    if (fill.type === "SOLID" && fill.color) {
      fillAttr = `fill="${figmaColorToRgba(fill.color, fill.opacity)}"`;
    }
  }

  // stroke
  let strokeAttr = `stroke="none" stroke-width="0"`;
  if (node.strokes && node.strokes.length > 0) {
    const stroke = node.strokes[0];
    if (stroke.type === "SOLID" && stroke.color) {
      strokeAttr = `stroke="${figmaColorToRgba(stroke.color, stroke.opacity)}" stroke-width="${node.strokeWeight ?? 1}"`;
    }
  }

  // opacity
  const opacityValue = node.opacity !== undefined ? node.opacity : 1;
  const opacityAttr = `opacity="${opacityValue}"`;

  return `<svg width="${width}" height="${height}">
    <polygon points="${points.join(" ")}"
      ${fillAttr}
      ${strokeAttr}
      ${opacityAttr}
    />
  </svg>`;
}

