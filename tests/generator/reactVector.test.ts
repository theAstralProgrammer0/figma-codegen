import { renderVector } from "../../src/generator/renderers/vectorRenderer";
import { ParsedNode } from "../../src/types";

describe("renderVector", () => {
  it("renders an SVG with a path", () => {
    const node: ParsedNode = {
      id: "v1",
      type: "VECTOR",
      size: { width: 50, height: 50 },
      vectorPaths: [
        { data: "M10 10 H 40 V 40 H 10 Z", windingRule: "EVENODD" }
      ]
    };

    const code = renderVector(node);

    expect(code).toContain("<svg");
    expect(code).toContain("<path d=\"M10 10 H 40 V 40 H 10 Z\"");
    expect(code).toContain("width=\"50\"");
    expect(code).toContain("height=\"50\"");
  });

  it("renders empty svg if no paths", () => {
    const node: ParsedNode = { id: "v2", type: "VECTOR", size: { width: 10, height: 10 } };
    const code = renderVector(node);
    expect(code).toBe("<svg />");
  });
});

