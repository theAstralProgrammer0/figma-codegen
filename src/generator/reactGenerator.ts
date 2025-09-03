interface ParsedNode {
  id: string;
  type: string;
  name: string;
  content?: string;
  style?: any;
  size?: { width: number; height: number };
}

export function generateReactCode(node: ParsedNode): string {
  switch (node.type) {
    case "TEXT":
      return `
        <h1 style={{
          fontSize: ${node.style?.fontSize || 16},
          fontWeight: ${node.style?.fontWeight || 400}
        }}>
          ${node.content}
        </h1>
      `;

    case "RECTANGLE":
      return `
        <div style={{
          width: ${node.size?.width || 0},
          height: ${node.size?.height || 0},
          backgroundColor: "#eee"
        }}></div>
      `;

    default:
      return "";
  }
}

