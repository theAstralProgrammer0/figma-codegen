// tests/integration/frameLayout.integration.test.ts
import { parseFrameLayout } from "../../src/parser/parsers/frameLayoutParser";
import { generateFrameLayout } from "../../src/generator/frameLayoutGenerator";
import { FigmaNode } from "../../src/types";

describe("Frame layout integration", () => {
  it("parses a horizontal frame and generates correct layout code", () => {
    const node: FigmaNode = {
      id: "1",
      type: "FRAME",
      layoutMode: "HORIZONTAL",
      primaryAxisAlignItems: "CENTER",
      counterAxisAlignItems: "MIN",
      itemSpacing: 12,
      paddingTop: 8,
      paddingRight: 16,
      paddingBottom: 8,
      paddingLeft: 16,
      children: [
        { id: "2", type: "RECTANGLE", children: [] },
        { id: "3", type: "RECTANGLE", children: [] },
      ],
    };

    const parsed = parseFrameLayout(node);
    const output = generateFrameLayout(parsed, ["<div>Child1</div>", "<div>Child2</div>"]);

    expect(output).toContain("display: flex");
    expect(output).toContain("flex-direction: row");
    expect(output).toContain("justify-content: center");
    expect(output).toContain("align-items: flex-start");
    expect(output).toContain("gap: 12px");
    expect(output).toContain("padding: 8px 16px 8px 16px");
    expect(output).toContain("<div>Child1</div>");
    expect(output).toContain("<div>Child2</div>");
  });

  it("parses a vertical frame and generates correct layout code", () => {
    const node: FigmaNode = {
      id: "4",
      type: "FRAME",
      layoutMode: "VERTICAL",
      primaryAxisAlignItems: "MAX",
      counterAxisAlignItems: "CENTER",
      itemSpacing: 20,
      paddingTop: 5,
      paddingRight: 10,
      paddingBottom: 15,
      paddingLeft: 10,
      children: [
        { id: "5", type: "RECTANGLE", children: [] },
        { id: "6", type: "RECTANGLE", children: [] },
      ],
    };

    const parsed = parseFrameLayout(node);
    const output = generateFrameLayout(parsed, ["<div>A</div>", "<div>B</div>"]);

    expect(output).toContain("flex-direction: column");
    expect(output).toContain("justify-content: flex-end");
    expect(output).toContain("align-items: center");
    expect(output).toContain("gap: 20px");
    expect(output).toContain("padding: 5px 10px 15px 10px");
  });
});

