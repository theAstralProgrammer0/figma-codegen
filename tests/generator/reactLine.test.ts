import { renderLine } from "../../src/generator/renderers/lineRenderer";
import { ParsedNode } from "../../src/types";

describe("renderLine", () => {
  it("renders a horizontal line with default styles", () => {
    const node: ParsedNode = {
      id: "line1",
      type: "LINE",
      size: { width: 120, height: 0 },
      strokeWeight: 2,
      strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }],
    };

    const code = renderLine(node);

    expect(code).toContain("width: 120px");
    expect(code).toContain("height: 2px");
    expect(code).toContain("backgroundColor: \"rgba(0,0,0,1)\"");
  });

  it("falls back to defaults when no strokes", () => {
    const node: ParsedNode = {
      id: "line2",
      type: "LINE",
      size: { width: 50, height: 0 },
    };

    const code = renderLine(node);
    expect(code).toContain("backgroundColor: \"black\"");
  });
});

