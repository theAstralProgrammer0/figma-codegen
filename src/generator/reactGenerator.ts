import { ParsedNode, FigmaPaint } from "../parser/nodeParser";

function to255(x?: number) {
  if (typeof x !== "number") return 0;
  const v = Math.round(x * 255);
  return Math.max(0, Math.min(255, v));
}

function rgbaFromPaint(paint?: FigmaPaint): string | null {
  if (!paint || paint.type !== "SOLID" || !paint.color) return null;
  const r = to255(paint.color.r);
  const g = to255(paint.color.g);
  const b = to255(paint.color.b);
  const a = typeof paint.opacity === "number" ? paint.opacity : 1;
  return `rgba(${r},${g},${b},${a})`;
}

function firstSolid(paints?: FigmaPaint[]): FigmaPaint | undefined {
  return paints?.find((p) => p.type === "SOLID");
}

export function generateReactCode(node: ParsedNode): string {
  switch (node.type) {
    case "TEXT":
      return `
        <h1 style={{
          fontSize: ${node.style?.fontSize ?? 16},
          fontWeight: ${node.style?.fontWeight ?? 400},
          ${typeof node.opacity === "number" ? `opacity: ${node.opacity},` : ""}
        }}>
          ${node.content ?? ""}
        </h1>
      `;

    case "RECTANGLE": {
      const fill = firstSolid(node.fills);
      const stroke = firstSolid(node.strokes);
      const bg = rgbaFromPaint(fill);
      const borderColor = rgbaFromPaint(stroke);

      const styleLines: string[] = [];
      styleLines.push(`width: ${node.size?.width ?? 0}`);
      styleLines.push(`height: ${node.size?.height ?? 0}`);
      if (bg) styleLines.push(`backgroundColor: "${bg}"`);
      if (borderColor && node.strokeWeight)
        styleLines.push(`border: "${node.strokeWeight}px solid ${borderColor}"`);
      if (typeof node.cornerRadius === "number")
        styleLines.push(`borderRadius: ${node.cornerRadius}`);
      if (typeof node.opacity === "number")
        styleLines.push(`opacity: ${node.opacity}`);

      return `
        <div style={{ ${styleLines.join(", ")} }}></div>
      `;
    }

    case "FRAME":
    case "CANVAS":
    case "GROUP": {
      const children = (node.children ?? [])
        .map((child: ParsedNode) => generateReactCode(child))
        .join("\n");
      const opacityLine =
        typeof node.opacity === "number" ? ` style={{ opacity: ${node.opacity} }}` : "";
      return `<div className="frame"${opacityLine}>\n${children}\n</div>`;
    }

    default:
      return "";
  }
}

