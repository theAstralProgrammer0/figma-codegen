// src/parser/index.ts
import { FigmaNode, ParsedNode } from "../types";
import { parseText } from "./parsers/textParser";
import { parseRectangle } from "./parsers/rectangleParser";
import { parseEllipse } from "./parsers/ellipseParser";
import { parseContainer } from "./parsers/containerParser";
import { parsePolygon } from "./parsers/polygonParser";

/**
 * Dispatch node parsing to specific parsers.
 * Returns ParsedNode or null.
 */
export function parseNode(node: FigmaNode): ParsedNode | null {
  if (!node) return null;

  switch (node.type) {
    case "TEXT":
      return parseText(node);
    case "RECTANGLE":
      return parseRectangle(node);
    case "ELLIPSE":
      return parseEllipse(node);
    case "POLYGON":
      return parsePolygon(node);
    case "FRAME":
    case "GROUP":
    case "CANVAS":
    case "COMPONENT":
      return parseContainer(node);
    default:
      return null;
  }
}

