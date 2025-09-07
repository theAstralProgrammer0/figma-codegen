// src/parser/parsers/containerParser.ts
import { FigmaNode, ParsedNode } from "../../types";
import { parseText } from "./textParser";
import { parseRectangle } from "./rectangleParser";
import { parseEllipse } from "./ellipseParser";

/**
 * Parse container-like nodes: FRAME, GROUP, CANVAS, COMPONENT
 * Return a ParsedNode whose children are recursively parsed
 */
export function parseContainer(node: FigmaNode): ParsedNode | null {
  if (!node) return null;
  if (!["FRAME", "GROUP", "CANVAS", "COMPONENT"].includes(node.type)) return null;

  const children = (node.children ?? [])
    .map((child) => {
      // dispatch inline here for simple recursion (parser/index will do general dispatch too)
      switch (child.type) {
        case "TEXT":
          return parseText(child);
        case "RECTANGLE":
          return parseRectangle(child);
        case "ELLIPSE":
          return parseEllipse(child);
        case "FRAME":
        case "GROUP":
        case "CANVAS":
        case "COMPONENT":
          // recursive call
          return parseContainer(child);
        default:
          return null;
      }
    })
    .filter((c): c is ParsedNode => c !== null);

  return {
    id: node.id,
    name: node.name,
    type: node.type,
    children,
    opacity: node.opacity,
  };
}

