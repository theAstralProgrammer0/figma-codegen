#!/bin/bash
#
# Usage:    ./deploy.sh   <FIGMA_FILE_URL>                  <OUTPUT_FOLDER_NAME>
# Example:  ./deploy.sh   "https://www.figma.com/file/..."  "my-next-app"
#
# This script manages the lifecycle of the generated Next.js application:
# 1. Validates input parameters
# 2. Automatically removes and rebuilds the tageted folder for a clean deployment
# 3. Executes the Typescript Generator (assuming it's built to 'dist/app.js').

FIGMA_URL="$1"
OUTPUT_DIR="$2"

# --- 1. Validation ---
if [ -z "$FIGMA_URL" ] || [ -z "$OUTPUT_DIR" ]; then
  echo "Error: Both Figma URL and Output Folder Name must be provided."
  echo "Usage: $0 <FIGMA_FILE_URL> <OUTPUT_FOLDER_NAME>"
  exit 1
fi

echo "--- Figma-to-Next Generator Deployment ---"
echo "Figma URL: $FIGMA_URL"
echo "Output Directory: $OUTPUT_DIR"

# --- 2. Automatic Remove and Rebuild ---
if [ -d "$OUTPUT_DIR" ]; then
  echo -E "[$OUTPUT_DIR] detected.\nRemoving existing directory for a clean build..."
  rm -rf "$OUTPUT_DIR"
fi

# Pre-Check: Ensure generator is built ---
if [ ! -f "dist/app.js" ]; then
  echo -E "Error: Generator tool (dist/app.js) not found.\nPlease run 'npm run build' first."
  exit 1
fi

# --- 3. Execute the TS Generator ---
echo "Running code generator..."
node dist/app.js "$FIGMA_URL" "$OUTPUT_DIR"

# Post-Check: Ensure generator runs successfully without errors ---
if [ $? -ne 0 ]; then
  echo -E "Error: Code generation failed.\nStopping deployment."
  exit 1
fi
echo -E "Code generation successful!!!\nFiles written to $OUTPUT_DIR"
