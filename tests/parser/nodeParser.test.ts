import { parseNode } from "../../src/parser/nodeParser";

describe("nodeParser", () => {
  it("should parse a text node", () => {
    const mockNode = {
      id: "1:1",
      name: "Title",
      type: "TEXT",
      characters: "Hello World",
      style: { fontSize: 24, fontWeight: 700 }
    };

    const parsed = parseNode(mockNode);

    expect(parsed).toEqual({
      id: "1:1",
      type: "TEXT",
      name: "Title",
      content: "Hello World",
      style: { fontSize: 24, fontWeight: 700 }
    });
  });

  it("should parse a rectangle node", () => {
    const mockNode = {
      id: "2:2",
      name: "Background",
      type: "RECTANGLE",
      absoluteBoundingBox: { width: 100, height: 200 }
    };

    const parsed = parseNode(mockNode);

    expect(parsed).toEqual({
      id: "2:2",
      type: "RECTANGLE",
      name: "Background",
      size: { width: 100, height: 200 }
    });
  });

  it("should return null for unsupported node types", () => {
    const mockNode = {
      id: "3:3",
      name: "Vector",
      type: "VECTOR"
    };

    const parsed = parseNode(mockNode);
    expect(parsed).toBeNull();
  });
});

