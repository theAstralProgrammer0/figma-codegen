import { parseNode, ParsedNode } from "../../src/parser/nodeParser";

describe("nodeParser - RECTANGLE", () => {
  it("parses size, fills, strokes, cornerRadius, opacity", () => {
    const mockRect = {
      id: "10:10",
      name: "Card",
      type: "RECTANGLE",
      absoluteBoundingBox: { width: 300, height: 180 },
      fills: [
        { type: "SOLID", color: { r: 0.2, g: 0.4, b: 0.6 }, opacity: 0.5 }
      ],
      strokes: [
        { type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 1 }
      ],
      strokeWeight: 2,
      cornerRadius: 12,
      opacity: 0.9
    };

    const parsed = parseNode(mockRect) as ParsedNode;

    expect(parsed).not.toBeNull();
    expect(parsed.type).toBe("RECTANGLE");
    expect(parsed.size).toEqual({ width: 300, height: 180 });
    expect(parsed.fills?.[0]?.type).toBe("SOLID");
    expect(parsed.strokes?.[0]?.type).toBe("SOLID");
    expect(parsed.strokeWeight).toBe(2);
    expect(parsed.cornerRadius).toBe(12);
    expect(parsed.opacity).toBe(0.9);
  });
});

