// tests/generator/reactRegularPolygon.test.ts
import { renderRegularPolygon } from "../../src/generator/renderers/regularPolygonRenderer";
import { ParsedNode } from "../../src/types";

describe("renderRegularPolygon", () => {
  it("renders a triangle with correct points and fill", () => {
    const node: ParsedNode = {
      id: "poly1",
      type: "REGULAR_POLYGON",
      size: { width: 100, height: 100 },
      pointCount: 3,
      fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 1 }],
    };

    const code = renderRegularPolygon(node);

    expect(code).toContain("<polygon");
    expect(code).toContain("points=");
    expect(code).toContain('fill="rgba(255,0,0,1)"');
    // when no stroke provided renderer emits stroke="none" and stroke-width="0"
    expect(code).toContain('stroke="none"');
    expect(code).toContain('stroke-width="0"');
  });

  it("renders polygon with stroke", () => {
    const node: ParsedNode = {
      id: "poly2",
      type: "REGULAR_POLYGON",
      size: { width: 80, height: 80 },
      pointCount: 5,
      strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 1 }, opacity: 1 }],
      strokeWeight: 3,
    };

    const code = renderRegularPolygon(node);

    // fill should default to none
    expect(code).toContain('fill="none"');
    expect(code).toContain('stroke="rgba(0,0,255,1)"');
    expect(code).toContain('stroke-width="3"');
  });

  it("renders polygon with no fill or stroke as transparent", () => {
    const node: ParsedNode = {
      id: "poly3",
      type: "REGULAR_POLYGON",
      size: { width: 60, height: 60 },
      pointCount: 6,
    };

    const code = renderRegularPolygon(node);

    expect(code).toContain("<polygon");
    expect(code).toContain('fill="none"');
    expect(code).toContain('stroke="none"');
    expect(code).toContain('stroke-width="0"');
  });
});

