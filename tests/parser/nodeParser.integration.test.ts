import { parseNode } from "../../src/parser";
import { FigmaNode } from "../../src/types";

describe("parser integration", () => {
  it("parses a canvas -> frame -> text + rectangle tree", () => {
    const doc: FigmaNode = {
      id: "0",
      type: "CANVAS",
      children: [
        {
          id: "f1",
          type: "FRAME",
          name: "Home",
          children: [
            { id: "t1", type: "TEXT", characters: "Home Title", name: "Title", style: { fontSize: 32 } },
            { id: "r1", type: "RECTANGLE", name: "Hero", absoluteBoundingBox: { width: 600, height: 300 } }
          ]
        }
      ]
    } as any;

    const parsed = parseNode(doc);
    expect(parsed).not.toBeNull();
    expect(parsed!.type).toBe("CANVAS");
    expect(parsed!.children?.length).toBeGreaterThan(0);
    const frame = parsed!.children![0];
    expect(frame.type).toBe("FRAME");
    expect(frame.children?.some((c) => c.type === "TEXT")).toBeTruthy();
    expect(frame.children?.some((c) => c.type === "RECTANGLE")).toBeTruthy();
  });
});

