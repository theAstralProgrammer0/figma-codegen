import fs from "fs";
import path from "path";
import { execSync } from "child_process";

describe("CLI integration", () => {
  const outputPath = path.resolve(__dirname, "../../output/GeneratedUI.tsx");

  beforeAll(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it("runs the CLI and generates a React file", () => {
    // Run CLI (assuming `src/index.ts` is our entry)
    execSync("ts-node src/index.ts --file-id TEST_FILE", {
      stdio: "inherit",
    });

    // Check file was created
    expect(fs.existsSync(outputPath)).toBe(true);

    const code = fs.readFileSync(outputPath, "utf-8");

    // Basic assertions
    expect(code).toContain("import React from \"react\"");
    expect(code).toContain("export default function GeneratedUI()");
    expect(code).toContain("<div"); // Should have rendered at least a frame
  });
});

