import { renderPolygon } from "../../src/generator/renderers/polygonRenderer";
import { ParsedNode } from "../../src/types";

describe("renderPolygon", () => {
  it("renders a triangle SVG", () => {
    const node: ParsedNode = {
      id: "poly1",
      type: "POLYGON",
      size: { width: 100, height: 100 },
      pointCount: 3,
      fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }],
      strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }],
      strokeWeight: 2,
      opacity: 1,
    };

    const code = renderPolygon(node);

    expect(code).toContain("<svg");
    expect(code).toContain("<polygon");
    expect(code).toContain("fill=\"rgba(255,0,0,1)\"");
    expect(code).toContain("stroke=\"rgba(0,0,0,1)\"");
    expect(code).toContain("stroke-width=\"2\"");
  });
});

