import * as process from 'process';
import { fetchFigmaData, collectAndDownloadImages } from '@/parsers/figma.parser';
import { generateNextProject } from '@/generators/nextjs.generator';

async function main() {
  const [_, __, figmaUrl, outputDir] = process.argv;
  if (!figmaUrl || !outputDir) {
    console.error('Usage: node dist/app.js <FIGMA_URL> <OUTPUT_DIR>');
    process.exit(1);
  }

  const file = await fetchFigmaData(figmaUrl);
  const imageMap = await collectAndDownloadImages(file, outputDir);
  await generateNextProject(file, outputDir, imageMap);
  console.log(`Generation complete. Output in ${outputDir}`);
}

main.catch(err => {
  console.error(err);
  process.exit(1);
});
