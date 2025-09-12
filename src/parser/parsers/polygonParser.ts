// src/parser/parsers/polygonParser.ts
import { FigmaNode, ParsedNode } from "../../types";

export function parsePolygon(node: FigmaNode): ParsedNode {
  const { absoluteBoundingBox, cornerRadius, pointCount } = node;

  return {
    id: node.id,
    name: node.name,
    type: "POLYGON",
    size: absoluteBoundingBox
      ? {
          width: absoluteBoundingBox.width,
          height: absoluteBoundingBox.height,
        }
      : undefined,
    cornerRadius,
    pointCount,
    fills: node.fills,
    strokes: node.strokes,
    strokeWeight: node.strokeWeight,
    opacity: node.opacity,
  };
}

