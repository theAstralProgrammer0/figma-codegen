# figma-codegen

CLI tool to generate code from Figma files.

## Installation
git clone <repo>
cd figma-codegen
npm install
npm run build
npm link

## Usage
Set FIGMA_TOKEN env.
figma-codegen --reactstyle
> generate figma_url https://figma.com/file/KEY/Name

For Next.js: cd output/generated-app && npm i && npm run dev

## Supported Nodes
All listed: CANVAS, FRAME, etc.

## Tests
npm test
