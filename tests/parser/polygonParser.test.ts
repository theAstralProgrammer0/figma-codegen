import { parsePolygon } from "../../src/parser/parsers/polygonParser";
import { FigmaNode } from "../../src/types";

describe("parsePolygon", () => {
  it("parses a polygon node with size and styles", () => {
    const node: FigmaNode = {
      id: "poly1",
      type: "POLYGON",
      name: "Triangle",
      absoluteBoundingBox: { width: 100, height: 100 },
      fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }],
      strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }],
      strokeWeight: 2,
      opacity: 0.8,
      pointCount: 3,
    };

    const parsed = parsePolygon(node);

    expect(parsed.type).toBe("POLYGON");
    expect(parsed.size?.width).toBe(100);
    expect(parsed.size?.height).toBe(100);
    expect(parsed.pointCount).toBe(3);
    expect(parsed.fills?.length).toBe(1);
  });
});

