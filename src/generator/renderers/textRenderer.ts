// src/generator/renderers/textRenderer.ts
import { ParsedNode } from "../../types";

export function renderText(node: ParsedNode): string {
  const fontSize = node.style?.fontSize ?? 16;
  const fontWeight = node.style?.fontWeight ?? 400;
  // choose h1/h2 etc heuristically if needed — keep simple
  const tag = fontSize >= 24 ? "h1" : "p";
  return `<${tag} style={{ fontSize: ${fontSize}, fontWeight: ${fontWeight} }}>${(node.content ?? "").replace(/</g, "&lt;")}</${tag}>`;
}

