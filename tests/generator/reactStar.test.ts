import { renderStar } from "../../src/generator/renderers/starRenderer";
import { ParsedNode } from "../../src/types";

describe("renderStar", () => {
  it("renders a star with correct polygon points and styles", () => {
    const node: ParsedNode = {
      id: "star1",
      type: "STAR",
      size: { width: 100, height: 100 },
      pointCount: 5,
      starInnerRadius: 0.5,
      fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 1 }],
      strokes: [
        { type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 1 },
      ],
      strokeWeight: 2,
    };

    const code = renderStar(node);

    expect(code).toContain("<polygon");
    expect(code).toContain("points=");
    expect(code).toContain("fill=\"rgba(255,0,0,1)\"");
    expect(code).toContain("stroke=\"rgba(0,0,0,1)\"");
    expect(code).toContain("stroke-width=\"2\"");
  });

  it("renders star with no fills as transparent", () => {
    const node: ParsedNode = {
      id: "star2",
      type: "STAR",
      size: { width: 50, height: 50 },
      pointCount: 4,
      starInnerRadius: 0.4,
    };

    const code = renderStar(node);

    expect(code).toContain("fill=\"none\"");
  });
});

