import { renderImage } from "../../src/generator/renderers/imageRenderer";
import { ParsedNode } from "../../src/types";

describe("renderImage", () => {
  it("renders an image with correct styles", () => {
    const node: ParsedNode = {
      id: "img1",
      type: "IMAGE",
      width: 100,
      height: 80,
      fills: [
        {
          type: "IMAGE",
          imageUrl: "https://example.com/cat.png",
        },
      ],
    };

    const code = renderImage(node);

    expect(code).toContain("backgroundImage");
    expect(code).toContain("https://example.com/cat.png");
    expect(code).toContain("width: 100px");
    expect(code).toContain("height: 80px");
  });

  it("renders empty div if no fills", () => {
    const node: ParsedNode = {
      id: "img2",
      type: "IMAGE",
      width: 50,
      height: 50,
    };

    const code = renderImage(node);
    expect(code).toBe("<div />");
  });
});

