import { generateReactCode } from "../../src/generator";
import { ParsedNode } from "../../src/types";

describe("frame layout generator", () => {
  it("outputs flex container with gap and padding", () => {
    const node: ParsedNode = {
      id: "f1",
      type: "FRAME",
      children: [
        { id: "t1", type: "TEXT", content: "A" },
        { id: "t2", type: "TEXT", content: "B" }
      ],
      layout: {
        layoutMode: "HORIZONTAL",
        itemSpacing: 12,
        paddingTop: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        primaryAxisAlignItems: "SPACE_BETWEEN",
        counterAxisAlignItems: "CENTER"
      }
    };

    const code = generateReactCode(node);
    expect(code).toContain('display: "flex"');
    expect(code).toContain('flexDirection: "row"');
    expect(code).toContain("gap: 12");
    expect(code).toContain('padding: "8px 8px 8px 8px"');
    expect(code).toContain('justifyContent: "space-between"');
  });
});

