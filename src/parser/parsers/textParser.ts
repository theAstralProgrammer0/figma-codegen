// src/parser/parsers/textParser.ts
import { FigmaNode, ParsedNode } from "../../types";

export function parseText(node: FigmaNode): ParsedNode | null {
  if (!node || node.type !== "TEXT") return null;
  // Figma TEXT nodes have 'characters' and 'style' usually
  return {
    id: node.id,
    name: node.name,
    type: "TEXT",
    content: node.characters ?? "",
    style: node.style ?? {},
    opacity: node.opacity,
  };
}

