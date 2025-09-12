// src/parser/parsers/regularPolygonParser.ts
import { FigmaNode, ParsedNode } from "../../types";

/**
 * Parse a REGULAR_POLYGON node into our canonical ParsedNode format.
 */
export function parseRegularPolygon(node: FigmaNode): ParsedNode {
  const { absoluteBoundingBox, width, height, pointCount, cornerRadius } = node;

  return {
    id: node.id,
    name: node.name,
    type: "REGULAR_POLYGON",

    // size
    size: absoluteBoundingBox
      ? {
          width: absoluteBoundingBox.width,
          height: absoluteBoundingBox.height,
        }
      : width && height
      ? { width, height }
      : undefined,

    // number of sides
    pointCount,

    // optional corner radius
    cornerRadius,

    // paints
    fills: node.fills,
    strokes: node.strokes,
    strokeWeight: node.strokeWeight,
    opacity: node.opacity,
  };
}

