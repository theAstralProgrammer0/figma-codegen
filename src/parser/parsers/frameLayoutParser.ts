// src/parser/parsers/frameLayoutParser.ts
import { FigmaNode, ParsedNode } from "../../types";

/**
 * Parse a FRAME node and extract layout-related properties into ParsedNode.layout.
 * Defensive: only assigns values when they exist and match expectations.
 */
export function parseFrameLayout(node: FigmaNode): ParsedNode {
  const parsed: ParsedNode = {
    id: node.id,
    type: "FRAME",
    children: [],
  };

  // Only add layout when there's a recognized layoutMode or layout-like fields
  const hasLayoutMode =
    typeof node.layoutMode === "string" &&
    (node.layoutMode === "HORIZONTAL" || node.layoutMode === "VERTICAL" || node.layoutMode === "NONE");
  const hasLayoutFields =
    typeof node.primaryAxisAlignItems === "string" ||
    typeof node.counterAxisAlignItems === "string" ||
    typeof node.itemSpacing === "number" ||
    typeof node.paddingTop === "number" ||
    typeof node.paddingRight === "number" ||
    typeof node.paddingBottom === "number" ||
    typeof node.paddingLeft === "number";

  if (hasLayoutMode || hasLayoutFields) {
    parsed.layout = {
      // assign only expected keys (names match src/types ParsedLayout)
      layoutMode: hasLayoutMode ? (node.layoutMode as any) : undefined,
      primaryAxisAlignItems: typeof node.primaryAxisAlignItems === "string" ? node.primaryAxisAlignItems : undefined,
      counterAxisAlignItems: typeof node.counterAxisAlignItems === "string" ? node.counterAxisAlignItems : undefined,
      itemSpacing: typeof node.itemSpacing === "number" ? node.itemSpacing : undefined,
      paddingTop: typeof node.paddingTop === "number" ? node.paddingTop : undefined,
      paddingRight: typeof node.paddingRight === "number" ? node.paddingRight : undefined,
      paddingBottom: typeof node.paddingBottom === "number" ? node.paddingBottom : undefined,
      paddingLeft: typeof node.paddingLeft === "number" ? node.paddingLeft : undefined,
    };
  }

  return parsed;
}

