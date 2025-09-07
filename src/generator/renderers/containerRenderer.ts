// src/generator/renderers/containerRenderer.ts
import { ParsedNode } from "../../types";
import { renderNode } from "../reactGenerator";

/**
 * Map Figma layout semantics to CSS inline style parts.
 * This is a pragmatic, best-effort mapping:
 * - layoutMode -> display:flex + flexDirection
 * - primaryAxisAlignItems -> justifyContent / space-between mapping
 * - counterAxisAlignItems -> alignItems mapping
 * - itemSpacing -> gap
 * - padding -> paddingTop/right/bottom/left
 */
function layoutToStyleParts(layout?: ParsedNode["layout"]): string[] {
  const parts: string[] = [];
  if (!layout) return parts;

  // layoutMode => flex container
  if (layout.layoutMode === "HORIZONTAL" || layout.layoutMode === "VERTICAL") {
    parts.push(`display: "flex"`);
    parts.push(`flexDirection: "${layout.layoutMode === "HORIZONTAL" ? "row" : "column"}"`);
  }

  // primary axis -> justifyContent
  if (layout.primaryAxisAlignItems) {
    switch (layout.primaryAxisAlignItems) {
      case "MIN":
        parts.push(`justifyContent: "flex-start"`);
        break;
      case "CENTER":
        parts.push(`justifyContent: "center"`);
        break;
      case "MAX":
        parts.push(`justifyContent: "flex-end"`);
        break;
      case "SPACE_BETWEEN":
        parts.push(`justifyContent: "space-between"`);
        break;
      default:
        // fallback: do nothing
        break;
    }
  }

  // counter axis -> alignItems
  if (layout.counterAxisAlignItems) {
    switch (layout.counterAxisAlignItems) {
      case "MIN":
        parts.push(`alignItems: "flex-start"`);
        break;
      case "CENTER":
        parts.push(`alignItems: "center"`);
        break;
      case "MAX":
        parts.push(`alignItems: "flex-end"`);
        break;
      default:
        break;
    }
  }

  // spacing -> gap
  if (typeof layout.itemSpacing === "number") {
    parts.push(`gap: ${layout.itemSpacing}`);
  }

  // padding -> paddingTop/right/bottom/left
  const pads: string[] = [];
  if (typeof layout.paddingTop === "number") pads.push(`${layout.paddingTop}px`);
  else pads.push("0px");
  if (typeof layout.paddingRight === "number") pads.push(`${layout.paddingRight}px`);
  else pads.push("0px");
  if (typeof layout.paddingBottom === "number") pads.push(`${layout.paddingBottom}px`);
  else pads.push("0px");
  if (typeof layout.paddingLeft === "number") pads.push(`${layout.paddingLeft}px`);
  else pads.push("0px");
  // if any padding non-zero, add a padding rule
  if (pads.some((v) => v !== "0px")) {
    parts.push(`padding: "${pads.join(" ")}"`);
  }

  return parts;
}

/**
 * Container renderer: renders children inside a div with layout styles when present
 */
export function renderContainer(node: ParsedNode): string {
  const children = (node.children ?? []).map((c) => renderNode(c)).join("\n");

  // Build style parts from layout first; then include opacity if present
  const styleParts = layoutToStyleParts(node.layout);
  if (typeof node.opacity === "number") {
    styleParts.push(`opacity: ${node.opacity}`);
  }

  const styleAttr = styleParts.length ? ` style={{ ${styleParts.join(", ")} }}` : "";

  return `<div${styleAttr}>\n${children}\n</div>`;
}

