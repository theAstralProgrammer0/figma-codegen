import { generateFrameLayout } from "../../src/generator/frameLayoutGenerator";
import { ParsedNode } from "../../src/types";

describe("frameLayoutGenerator", () => {
  it("generates flex container with layout props", () => {
    const node: ParsedNode = {
      id: "frame1",
      type: "FRAME",
      children: [],
      layout: {
        layoutMode: "HORIZONTAL",
        primaryAxisAlignItems: "CENTER",
        counterAxisAlignItems: "MIN",
        itemSpacing: 12,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
      },
    };
    const code = generateFrameLayout(node, ["<span>Child</span>"]);
    expect(code).toContain("display: flex");
    expect(code).toContain("flex-direction: row");
    expect(code).toContain("justify-content: center");
    expect(code).toContain("gap: 12px");
  });
});
