import { parseRegularPolygon } from "../../src/parser/parsers/regularPolygonParser";

describe("parseRegularPolygon", () => {
  it("parses a REGULAR_POLYGON node correctly", () => {
    const node = {
      id: "123",
      name: "Hexagon",
      type: "REGULAR_POLYGON",
      width: 100,
      height: 100,
      pointCount: 6,
      cornerRadius: 5,
      fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }],
      strokes: [],
      strokeWeight: 2,
      opacity: 0.8,
    };

    const parsed = parseRegularPolygon(node);

    expect(parsed).toEqual({
      id: "123",
      name: "Hexagon",
      type: "REGULAR_POLYGON",
      size: { width: 100, height: 100 },
      pointCount: 6,
      cornerRadius: 5,
      fills: node.fills,
      strokes: [],
      strokeWeight: 2,
      opacity: 0.8,
    });
  });
});

