import { generateReactCode } from "../../src/generator";
import { ParsedNode } from "../../src/types";

describe("reactGenerator", () => {
  it("should generate JSX for a text node", () => {
    const parsedNode: ParsedNode = {
      id: "1:1",
      type: "TEXT",
      name: "Title",
      content: "Hello World",
      style: { fontSize: 24, fontWeight: 700 }
    };

    const code = generateReactCode(parsedNode);
    expect(code).toContain("Hello World");
    expect(code).toContain("fontSize: 24");
  });

  it("should generate JSX for a rectangle node", () => {
    const parsedNode: ParsedNode = {
      id: "2:2",
      type: "RECTANGLE",
      name: "Background",
      size: { width: 100, height: 200 }
    };

    const code = generateReactCode(parsedNode);
    expect(code).toContain("width: 100");
    expect(code).toContain("height: 200");
  });

  it("should generate JSX for an array of nodes", () => {
    const nodes: ParsedNode[] = [
      {
        id: "1:1",
        type: "TEXT",
        name: "Title",
        content: "Array Test",
        style: { fontSize: 18 }
      },
      {
        id: "2:2",
        type: "RECTANGLE",
        name: "Box",
        size: { width: 120, height: 60 }
      }
    ];

    const code = generateReactCode(nodes);
    expect(code).toContain("Array Test");
    expect(code).toContain("width: 120");
  });
});

