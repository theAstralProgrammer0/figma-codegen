import { parseNode } from "../../src/parser";
import { FigmaNode } from "../../src/types";

describe("ellipse parser", () => {
  it("parses ellipse to size and fills", () => {
    const node: FigmaNode = {
      id: "5:5",
      type: "ELLIPSE",
      name: "Avatar",
      absoluteBoundingBox: { width: 80, height: 80 },
      fills: [{ type: "SOLID", color: { r: 0.5, g: 0.2, b: 0.1 }, opacity: 1 }]
    } as any;

    const parsed = parseNode(node);
    expect(parsed).not.toBeNull();
    expect(parsed!.type).toBe("ELLIPSE");
    expect(parsed!.size).toEqual({ width: 80, height: 80 });
    expect(parsed!.fills?.length).toBeGreaterThan(0);
  });
});

