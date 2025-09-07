import { generateReactCode } from "../../src/generator";
import { ParsedNode } from "../../src/types";

describe("react rectangle generator", () => {
  it("outputs backgroundColor, border, borderRadius, opacity, width/height", () => {
    const node: ParsedNode = {
      id: "10:10",
      type: "RECTANGLE",
      name: "Card",
      size: { width: 300, height: 180 },
      fills: [{ type: "SOLID", color: { r: 0.2, g: 0.4, b: 0.6 }, opacity: 0.5 }],
      strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity: 1 }],
      strokeWeight: 2,
      cornerRadius: 12,
      opacity: 0.9
    };

    const code = generateReactCode(node);
    expect(code).toContain("width: 300");
    expect(code).toContain("height: 180");
    expect(code).toContain('backgroundColor: "rgba(51,102,153,0.5)"');
    expect(code).toContain('border: "2px solid rgba(0,0,0,1)"');
    expect(code).toContain("borderRadius: 12");
    expect(code).toContain("opacity: 0.9");
  });
});

