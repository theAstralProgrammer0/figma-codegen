import { parseNode } from "../../src/parser";
import { FigmaNode } from "../../src/types";

describe("frame parser with layout", () => {
  it("parses layout props from frame (layoutMode, spacing, padding)", () => {
    const frame: FigmaNode = {
      id: "f1",
      type: "FRAME",
      name: "Row",
      layoutMode: "HORIZONTAL",
      primaryAxisAlignItems: "SPACE_BETWEEN",
      counterAxisAlignItems: "CENTER",
      itemSpacing: 12,
      paddingTop: 8,
      paddingRight: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      children: [
        { id: "t1", type: "TEXT", characters: "A", name: "A" },
        { id: "t2", type: "TEXT", characters: "B", name: "B" }
      ]
    } as any;

    const parsed = parseNode(frame);
    expect(parsed).not.toBeNull();
    expect(parsed!.layout).toBeDefined();
    expect(parsed!.layout!.layoutMode).toBe("HORIZONTAL");
    expect(parsed!.layout!.itemSpacing).toBe(12);
    expect(parsed!.layout!.paddingTop).toBe(8);
  });
});

