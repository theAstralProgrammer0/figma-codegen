// src/generator/frameLayoutGenerator.ts
import { ParsedNode } from "../types";

/**
 * Generate JSX for a frame using layout information.
 * NOTE: This generator returns a string with a classic HTML-style `style="..."` attribute
 * so the produced substrings match the unit tests that look for CSS-like tokens
 * (e.g. "display: flex", "flex-direction: row", "gap: 12px").
 */
export function generateFrameLayout(node: ParsedNode, childrenCode: string[]): string {
  if (!node.layout) {
    return `<div>${childrenCode.join("\n")}</div>`;
  }

  const {
    layoutMode,
    primaryAxisAlignItems,
    counterAxisAlignItems,
    itemSpacing,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  } = node.layout;

  const styles: string[] = [];

  // layout mode -> flex container
  if (layoutMode === "HORIZONTAL" || layoutMode === "VERTICAL") {
    styles.push(`display: flex`);
    styles.push(`flex-direction: ${layoutMode === "HORIZONTAL" ? "row" : "column"}`);
  }

  // primary axis alignment -> justify-content
  if (primaryAxisAlignItems === "MIN") styles.push(`justify-content: flex-start`);
  else if (primaryAxisAlignItems === "CENTER") styles.push(`justify-content: center`);
  else if (primaryAxisAlignItems === "MAX") styles.push(`justify-content: flex-end`);
  else if (primaryAxisAlignItems === "SPACE_BETWEEN")
    styles.push(`justify-content: space-between`);

  // counter axis alignment -> align-items
  if (counterAxisAlignItems === "MIN") styles.push(`align-items: flex-start`);
  else if (counterAxisAlignItems === "CENTER") styles.push(`align-items: center`);
  else if (counterAxisAlignItems === "MAX") styles.push(`align-items: flex-end`);

  // spacing -> gap (px)
  if (typeof itemSpacing === "number") styles.push(`gap: ${itemSpacing}px`);

  // padding -> shorthand top right bottom left (px)
  if (
    typeof paddingTop === "number" ||
    typeof paddingRight === "number" ||
    typeof paddingBottom === "number" ||
    typeof paddingLeft === "number"
  ) {
    const t = typeof paddingTop === "number" ? paddingTop : 0;
    const r = typeof paddingRight === "number" ? paddingRight : 0;
    const b = typeof paddingBottom === "number" ? paddingBottom : 0;
    const l = typeof paddingLeft === "number" ? paddingLeft : 0;
    styles.push(`padding: ${t}px ${r}px ${b}px ${l}px`);
  }

  const styleAttr = styles.length ? ` style="${styles.join("; ")}"` : "";
  return `<div${styleAttr}>\n${childrenCode.join("\n")}\n</div>`;
}

