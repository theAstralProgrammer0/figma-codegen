// src/parser/parsers/containerParser.ts
import { FigmaNode, ParsedNode, ParsedLayout } from "../../types";
import { parseText } from "./textParser";
import { parseRectangle } from "./rectangleParser";
import { parseEllipse } from "./ellipseParser";

/**
 * Parse container-like nodes: FRAME, GROUP, CANVAS, COMPONENT
 * Return a ParsedNode whose children are recursively parsed
 */

/**
 * Safely extract layout keys only if they are valid expected values.
 */
function extractLayout(node: FigmaNode): ParsedLayout | undefined {
  const maybeLayout: ParsedLayout = {};

  // Validate layoutMode
  const lm = node.layoutMode;
  if (lm === "HORIZONTAL" || lm === "VERTICAL" || lm === "NONE") {
    maybeLayout.layoutMode = lm;
  }

  // Validate primaryAxisAlignItems
  const pa = node.primaryAxisAlignItems;
  if (
    pa === "MIN" ||
    pa === "CENTER" ||
    pa === "MAX" ||
    pa === "SPACE_BETWEEN"
  ) {
    maybeLayout.primaryAxisAlignItems = pa;
  }

  // Validate counterAxisAlignItems
  const ca = node.counterAxisAlignItems;
  if (ca === "MIN" || ca === "CENTER" || ca === "MAX") {
    maybeLayout.counterAxisAlignItems = ca;
  }

  // Numeric optional fields
  if (typeof node.itemSpacing === "number") {
    maybeLayout.itemSpacing = node.itemSpacing;
  }
  if (typeof node.paddingTop === "number") maybeLayout.paddingTop = node.paddingTop;
  if (typeof node.paddingRight === "number") maybeLayout.paddingRight = node.paddingRight;
  if (typeof node.paddingBottom === "number") maybeLayout.paddingBottom = node.paddingBottom;
  if (typeof node.paddingLeft === "number") maybeLayout.paddingLeft = node.paddingLeft;

  // Return undefined when nothing meaningful was found
  if (Object.keys(maybeLayout).length === 0) return undefined;
  return maybeLayout;
}

export function parseContainer(node: FigmaNode): ParsedNode | null {
  if (!node) return null;
  if (!["FRAME", "GROUP", "CANVAS", "COMPONENT"].includes(node.type)) return null;

  const children = (node.children ?? [])
    .map((child) => {
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
          return parseContainer(child);
        default:
          return null;
      }
    })
    .filter((c): c is ParsedNode => c !== null);

  const parsed: ParsedNode = {
    id: node.id,
    name: node.name,
    type: node.type,
    children,
    opacity: node.opacity,
  };

  const layout = extractLayout(node);
  if (layout) parsed.layout = layout;

  return parsed;
}

