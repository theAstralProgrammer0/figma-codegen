import dotenv from "dotenv";
import { getFile } from "./api/figmaClient";
import { parseNode, ParsedNode } from "./parser/nodeParser";
import { generateReactCode } from "./generator/reactGenerator";
import fs from "fs";
import prettier from "prettier";

dotenv.config();

function logNodeTypes(nodes: any[], depth = 0) {
  for (const node of nodes) {
    console.log(" ".repeat(depth * 2) + `- ${node.type} (${node.name})`);
    if (node.children) {
      logNodeTypes(node.children, depth + 1);
    }
  }
}

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

    const parsedNodes: ParsedNode[] = nodes
      .map((node: any) => parseNode(node))
      .filter((n: any) => n !== null);

    console.log(`📝 Parsed ${parsedNodes.length} nodes`);

    // Wrap in a fragment so JSX is always valid
    const wrappedCode = `
    import React from "react";

    export default function GeneratedUI() {
      return (
        <>
          ${parsedNodes.map((node: ParsedNode) => generateReactCode(node)).join("\n")}
        </>
      );
    }
    `;


    // Format with Prettier
    const formattedCode = await prettier.format(wrappedCode, {
      parser: "typescript",
      singleQuote: true,
      trailingComma: "es5",
    });

    // Save to output file
    fs.writeFileSync("output/GeneratedUI.tsx", formattedCode);

    console.log("🎉 Code generation complete! Check output/GeneratedUI.tsx");

    // After parsing:
    console.log("🔎 Parsed node tree:");
    logNodeTypes(parsedNodes);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}


main();

