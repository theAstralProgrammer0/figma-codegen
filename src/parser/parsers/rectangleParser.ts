// src/parser/parsers/rectangleParser.ts
import { FigmaNode, ParsedNode } from "../../types";

function boxSize(node: FigmaNode) {
  return {
    width: node.absoluteBoundingBox?.width ?? 0,
    height: node.absoluteBoundingBox?.height ?? 0,
  };
}

export function parseRectangle(node: FigmaNode): ParsedNode | null {
  if (!node || node.type !== "RECTANGLE") return null;
  return {
    id: node.id,
    name: node.name,
    type: "RECTANGLE",
    size: boxSize(node),
    fills: node.fills,
    strokes: node.strokes,
    strokeWeight: node.strokeWeight,
    cornerRadius: node.cornerRadius,
    opacity: node.opacity,
  };
}

