import { parseFrameLayout } from "../../src/parser/parsers/frameLayoutParser";
import { FigmaNode } from "../../src/types";

describe("frameLayoutParser", () => {
  it("parses frame layout props correctly", () => {
    const node: FigmaNode = {
      id: "123",
      type: "FRAME",
      layoutMode: "HORIZONTAL",
      primaryAxisAlignItems: "CENTER",
      counterAxisAlignItems: "MIN",
      itemSpacing: 16,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 4,
      paddingRight: 4,
      children: [],
    };

    const parsed = parseFrameLayout(node);

    expect(parsed.layout?.layoutMode).toBe("HORIZONTAL");
    expect(parsed.layout?.primaryAxisAlignItems).toBe("CENTER");
    expect(parsed.layout?.itemSpacing).toBe(16);
    expect(parsed.layout?.paddingTop).toBe(8);
  });
});

