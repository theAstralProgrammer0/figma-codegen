import { parseNode } from "../../src/parser";
import { generateReactCode } from "../../src/generator";
import { FigmaNode } from "../../src/types";

describe("Node parser + generator integration", () => {
  it("parses and generates code for mixed nodes", () => {
    const figmaTree: FigmaNode = {
      id: "100",
      type: "FRAME",
      name: "Root Frame",
      layoutMode: "VERTICAL",
      primaryAxisAlignItems: "CENTER",
      counterAxisAlignItems: "MIN",
      itemSpacing: 20,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 5,
      children: [
        {
          id: "101",
          type: "TEXT",
          name: "Title",
          characters: "Hello Integration",
          style: { fontSize: 28, fontWeight: 700 }
        },
        {
          id: "102",
          type: "RECTANGLE",
          name: "Box",
          absoluteBoundingBox: { width: 200, height: 100 },
          fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
        },
        {
          id: "103",
          type: "POLYGON",
          name: "Triangle",
          absoluteBoundingBox: { width: 200, height: 100 },
          cornerRadius: 12,
          pointCount: 3,
          fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
        }
      ]
    };

    const parsed = parseNode(figmaTree);
    expect(parsed).not.toBeNull();
    expect(parsed?.children?.length).toBe(2);

    const code = generateReactCode(parsed!);

    // Should render a vertical flex container
    expect(code).toContain("flexDirection: \"column\"");
    expect(code).toContain("justifyContent: \"center\"");
    expect(code).toContain("gap: 20");

    // Should contain text content
    expect(code).toContain("Hello Integration");
    expect(code).toContain("fontSize: 28");

    // Should contain rectangle
    expect(code).toContain("width: 200");
    expect(code).toContain("height: 100");
    expect(code).toContain("backgroundColor: \"rgba(255,0,0,1)\"");
  });
});

