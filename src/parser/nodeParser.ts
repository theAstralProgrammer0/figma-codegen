export interface FigmaPaint {
  type: "SOLID" | "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "IMAGE" | string;
  color?: { r: number; g: number; b: number }; // Figma uses 0..1
  opacity?: number; // 0..1
}

export interface ParsedNode {
  id: string;
  type: string;
  name: string;
  content?: string;
  style?: any;
  size?: { width: number; height: number };
  children?: ParsedNode[];
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  strokeWeight?: number;
  cornerRadius?: number; // keeping simple for now
  opacity?: number; // node-level opacity 0..1
}

function boxSize(node: any) {
  return {
    width: node.absoluteBoundingBox?.width ?? 0,
    height: node.absoluteBoundingBox?.height ?? 0,
  };
}

export function parseNode(node: any): ParsedNode | null {
  switch (node.type) {
    case "TEXT":
      return {
        id: node.id,
        type: "TEXT",
        name: node.name,
        content: node.characters,
        style: {
          fontSize: node.style?.fontSize,
          fontWeight: node.style?.fontWeight,
        },
      };

    case "RECTANGLE":
      return {
        id: node.id,
        type: "RECTANGLE",
        name: node.name,
        size: boxSize(node),
        fills: node.fills,
        strokes: node.strokes,
        strokeWeight: node.strokeWeight,
        cornerRadius: node.cornerRadius,
        opacity: node.opacity,
      };

    case "FRAME":
    case "CANVAS":
    case "GROUP":
      return {
        id: node.id,
        type: node.type,
        name: node.name,
        children: (node.children || [])
          .map((child: any) => parseNode(child))
          .filter((n: any) => n !== null) as ParsedNode[],
        opacity: node.opacity,
      };

    default:
      return null;
  }
}

