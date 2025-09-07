import { parseNode } from "../../src/parser";
import { FigmaNode } from "../../src/types";

describe("text parser", () => {
  it("parses text node into ParsedNode with content and style", () => {
    const node: FigmaNode = {
      id: "1:1",
      type: "TEXT",
      name: "Title",
      characters: "Hello World",
      style: { fontSize: 24, fontWeight: 700 }
    } as any;

    const parsed = parseNode(node);
    expect(parsed).not.toBeNull();
    expect(parsed!.type).toBe("TEXT");
    expect(parsed!.content).toBe("Hello World");
    expect(parsed!.style?.fontSize).toBe(24);
  });
});

