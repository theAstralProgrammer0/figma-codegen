import dotenv from "dotenv";
import { getFile } from "./api/figmaClient";
import { parseNode } from "./parser/nodeParser";
import { generateReactCode } from "./generator/reactGenerator";
import fs from "fs";

dotenv.config();

async function main() {
  const fileKey = process.env.FIGMA_FILE_KEY;

  if (!fileKey) {
    console.error("❌ Missing FIGMA_FILE_KEY in .env");
    process.exit(1);
  }

  try {
    console.log("📡 Fetching Figma file...");
    const data = await getFile(fileKey);

    if (!data.document?.children) {
      throw new Error("Invalid Figma response structure");
    }

    const nodes = data.document.children;

    console.log(`✅ Got ${nodes.length} top-level nodes`);

    const parsedNodes = nodes
      .map((node: any) => parseNode(node))
      .filter((n: any) => n !== null);

    console.log(`📝 Parsed ${parsedNodes.length} nodes`);

    const generatedCode = parsedNodes
      .map((node: any) => generateReactCode(node))
      .join("\n\n");

    // Save to output file
    fs.writeFileSync("output/GeneratedUI.tsx", generatedCode);

    console.log("🎉 Code generation complete! Check output/GeneratedUI.tsx");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();

