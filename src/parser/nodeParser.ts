interface ParsedNode {
  id: string;
  type: string;
  name: string;
  content?: string;
  style?: any;
  size?: { width: number; height: number };
}

type FigmaNode = {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  characters?: string;
  fills?: { type: string; color: { r: number; g: number; b: number } }[];
};

function walkNodes(node: FigmaNode, callback: (n: FigmaNode) => void) {
  callback(node);
  if (node.children) {
    node.children.forEach((child) => walkNodes(child, callback));
  }
}

export function extractFrames(figmaJson: any) {
  const frames: { id: string; name: string; type: string }[] = [];
  walkNodes(figmaJson.document, (n) => {
    if (n.type === "FRAME") {
      frames.push({ id: n.id, name: n.name, type: n.type });
    }
  });
  return frames;
}

export function extractTextNodes(figmaJson: any) {
  const texts: { id: string; name: string; characters: string }[] = [];
  walkNodes(figmaJson.document, (n) => {
    if (n.type === "TEXT" && n.characters) {
      texts.push({ id: n.id, name: n.name, characters: n.characters });
    }
  });
  return texts;
}

export function extractColors(figmaJson: any) {
  const colors: { id: string; name: string; hex: string }[] = [];
  walkNodes(figmaJson.document, (n) => {
    if (n.fills && n.fills.length > 0 && n.fills[0].type === "SOLID") {
      const { r, g, b } = n.fills[0].color;
      const hex = rgbToHex(r, g, b);
      colors.push({ id: n.id, name: n.name, hex });
    }
  });
  return colors;
}

function rgbToHex(r: number, g: number, b: number): string {
  const to255 = (val: number) => Math.round(val * 255);
  return (
    "#" +
    [to255(r), to255(g), to255(b)]
      .map((x) => x.toString(16).padStart(2, "0").toUpperCase())
      .join("")
  );
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
        size: {
          width: node.absoluteBoundingBox?.width,
          height: node.absoluteBoundingBox?.height,
        },
      };

    default:
      return null; // unsupported node type
  }
}

