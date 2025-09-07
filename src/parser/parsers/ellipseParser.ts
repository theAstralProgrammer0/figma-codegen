// src/parser/parsers/ellipseParser.ts
import { FigmaNode, ParsedNode } from "../../types";

export function parseEllipse(node: FigmaNode): ParsedNode | null {
  if (!node || node.type !== "ELLIPSE") return null;
  // Ellipse uses absoluteBoundingBox for size
  return {
    id: node.id,
    name: node.name,
    type: "ELLIPSE",
    size: {
      width: node.absoluteBoundingBox?.width ?? 0,
      height: node.absoluteBoundingBox?.height ?? 0,
    },
    fills: node.fills,
    strokes: node.strokes,
    strokeWeight: node.strokeWeight,
    opacity: node.opacity,
  };
}

