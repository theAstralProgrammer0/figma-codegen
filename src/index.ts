// src/index.ts
import dotenv from "dotenv";
import { getFile } from "./api/figmaClient";
import { parseNode } from "./parser";
import { generateReactCode } from "./generator";
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

    const parsedNodes = nodes
      .map((n: any) => parseNode(n))
      .filter((p: any) => p !== null) as any[];

    console.log(`📝 Parsed ${parsedNodes.length} nodes`);

    // generate code from parsedNodes array (each may be a CANVAS/frame)
    const children = parsedNodes.map((p) => generateReactCode(p)).join("\n\n");

    const wrappedCode = `import React from 'react';

export default function GeneratedUI() {
  return (
    <>
      ${children}
    </>
  );
}
`;

    const formatted = await prettier.format(wrappedCode, { parser: "typescript" });

    fs.mkdirSync("output", { recursive: true });
    fs.writeFileSync("output/GeneratedUI.tsx", formatted, "utf8");

    console.log("🎉 Code generation complete! Check output/GeneratedUI.tsx");
    console.log("🔎 Parsed node tree:");
    logNodeTypes(parsedNodes);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();

