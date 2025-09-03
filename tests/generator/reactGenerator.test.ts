import { generateReactCode } from "../../src/generator/reactGenerator";

describe("reactGenerator", () => {
  it("should generate JSX for a text node", () => {
    const parsedNode = {
      id: "1:1",
      type: "TEXT",
      name: "Title",
      content: "Hello World",
      style: { fontSize: 24, fontWeight: 700 }
    };

    const code = generateReactCode(parsedNode);

    expect(code).toContain("<h1");
    expect(code).toContain("Hello World");
    expect(code).toContain("fontSize: 24");
  });

  it("should generate JSX for a rectangle node", () => {
    const parsedNode = {
      id: "2:2",
      type: "RECTANGLE",
      name: "Background",
      size: { width: 100, height: 200 }
    };

    const code = generateReactCode(parsedNode);

    expect(code).toContain("<div");
    expect(code).toContain("width: 100");
    expect(code).toContain("height: 200");
  });

  it("should return empty string for unsupported node types", () => {
    const parsedNode = {
      id: "3:3",
      type: "VECTOR",
      name: "Vector"
    };

    const code = generateReactCode(parsedNode);
    expect(code).toBe("");
  });
});

