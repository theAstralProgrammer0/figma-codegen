// src/generator/renderers/imageRenderer.ts
import { ParsedNode } from "../../types";

/**
 * Render an IMAGE node as a div with background image.
 */
export function renderImage(node: ParsedNode): string {
  if (!node.fills || node.fills.length === 0) {
    return `<div />`;
  }

  // For now, assume first paint is the image
  const imageFill = node.fills.find((f) => f.type === "IMAGE");

  if (!imageFill) {
    return `<div />`;
  }

  const url = imageFill.imageUrl || "placeholder.png";

  const styles: string[] = [];
  styles.push(`backgroundImage: "url('${url}')"`);
  styles.push("backgroundSize: 'cover'");
  styles.push("backgroundRepeat: 'no-repeat'");
  styles.push("backgroundPosition: 'center'");
  if (node.width) styles.push(`width: ${node.width}px`);
  if (node.height) styles.push(`height: ${node.height}px`);

  return `<img src="${url}" style={{ ${styles.join(", ")} }} alt="${node.name ?? ""}" />`;
}

