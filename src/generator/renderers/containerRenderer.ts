// src/generator/renderers/containerRenderer.ts
import { ParsedNode } from "../../types";
import { renderNode } from "../reactGenerator";

/**
 * Container renderer: renders children inside a div
 */
export function renderContainer(node: ParsedNode): string {
  const children = (node.children ?? []).map((c) => renderNode(c)).join("\n");
  const opacity = typeof node.opacity === "number" ? ` style={{ opacity: ${node.opacity} }}` : "";
  return `<div${opacity}>\n${children}\n</div>`;
}

