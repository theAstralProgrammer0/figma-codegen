// src/generator/reactGenerator.ts
import { ParsedNode } from "../types";
import { renderText } from "./renderers/textRenderer";
import { renderRectangle } from "./renderers/rectangleRenderer";
import { renderContainer } from "./renderers/containerRenderer";

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
      // simple elliptical shape -> use div with borderRadius 50%
      const styleParts = [];
      if (node.size) {
        styleParts.push(`width: ${node.size.width}`);
        styleParts.push(`height: ${node.size.height}`);
      }
      if (node.fills && node.fills.length > 0) {
        const fromUtils = require("../utils/color").rgbaFromPaint;
        const bg = fromUtils(node.fills[0]);
        if (bg) styleParts.push(`backgroundColor: "${bg}"`);
      }
      styleParts.push(`borderRadius: "50%"`);
      return `<div style={{ ${styleParts.join(", ")} }}></div>`;
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

