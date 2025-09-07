// tests/generator/reactEllipse.test.ts
import { generateReactCode } from "../../src/generator";
import { ParsedNode } from "../../src/types";

describe("react ellipse generator", () => {
  it("generates ellipse with size, fill color and borderRadius", () => {
    const parsedNode: ParsedNode = {
      id: "5:5",
      type: "ELLIPSE",
      name: "Avatar",
      size: { width: 80, height: 80 },
      fills: [{ type: "SOLID", color: { r: 0.5, g: 0.2, b: 0.1 }, opacity: 1 }]
    };

    const code = generateReactCode(parsedNode);

    expect(code).toContain("width: 80");
    expect(code).toContain("height: 80");
    // 0.5*255 ≈ 128, 0.2*255 ≈ 51, 0.1*255 ≈ 26 -> rgba(128,51,26,1)
    expect(code).toContain('backgroundColor: "rgba(128,51,26,1)"');
    expect(code).toContain('borderRadius: "50%"');
  });
});

