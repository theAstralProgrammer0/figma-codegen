// src/generator/reactGenerator.ts
import { ParsedNode } from "../types";
import { renderText } from "./renderers/textRenderer";
import { renderRectangle } from "./renderers/rectangleRenderer";
import { renderEllipse } from "./renderers/ellipseRenderer";
import { renderContainer } from "./renderers/containerRenderer";
import { renderImage } from "./renderers/imageRenderer";
import { renderLine } from "./renderers/lineRenderer";

/**
 * Render a single ParsedNode to JSX string.
 * Exported so renderers can call it for recursion.
 */
export function renderNode(node: ParsedNode): string {
  switch (node.type) {
    case "TEXT":
      return renderText(node);
    case "RECTANGLE":
      return renderRectangle(node);
    case "ELLIPSE":
      return renderEllipse(node);
    case "IMAGE": // ✅ Added support for images
      return renderImage(node);
    case "LINE":
      return renderLine(node);
    case "FRAME":
    case "GROUP":
    case "COMPONENT":
    case "CANVAS":
      return renderContainer(node);
    default:
      return "";
  }
}

/**
 * Top-level generator. Accept single node or array.
 */
export function generateReactCode(input: ParsedNode | ParsedNode[]): string {
  const nodes = Array.isArray(input) ? input : [input];
  return nodes.map((n) => renderNode(n)).join("\n");
}

