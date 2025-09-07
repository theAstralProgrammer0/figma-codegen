// src/generator/renderers/imageRenderer.ts
import { ParsedNode } from "../../types";

export function renderImage(node: ParsedNode): string {
  if (!node.fills || node.fills.length === 0) {
    return "<div />";
  }

  const fill = node.fills.find(f => f.type === "IMAGE");
  if (!fill) {
    return "<div />";
  }

  // ✅ Support both Figma (imageRef + size) and test convenience (imageUrl + width/height)
  const imageUrl = fill.imageRef || fill.imageUrl;
  const width = node.size?.width ?? node.width;
  const height = node.size?.height ?? node.height;

  if (!imageUrl || !width || !height) {
    return "<div />";
  }

  return `<div style={{
    width: ${width}px,
    height: ${height}px,
    backgroundImage: "url('${imageUrl}')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }} />`;
}

