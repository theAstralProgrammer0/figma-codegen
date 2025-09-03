# Figma Codegen

## Repository Structure

```filesystem
figma-codegen/
├── src/
│   ├── api/
│   │   └── figmaClient.ts   # Handles Figma API calls
│   ├── parser/
│   │   └── nodeParser.ts    # Translates Figma JSON into usable structure
│   ├── generator/
│   │   └── reactGenerator.ts # Outputs React/Next.js code
│   └── index.ts             # Entry point
├── package.json
└── tsconfig.json
```
