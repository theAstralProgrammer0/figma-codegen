import { FigmaNode } from '@/types';
import { classifyNode } from '@/analyzers/node.analyzer';
import { generateTailwindClasses } from '@/helpers/tailwind.helper';

export function generateJSX(node: FigmaNode, componentMap: Record<string, string>, imageMap: Record<string, string>): string {
  if (node.visible === false) return '';

  const className = generateTailwindClasses(node);
  const childrenJSX = node.children?.map(child => generateJSX(child, componentMap, imageMap)).join('\n') || '';

  if (node.type === 'INSTANCE') return handleInstanceNode(node, className, componentMap, childrenJSX);
  if (node.type === 'TEXT') return handleTextNode(node, className);
  if (node.fills?.some(f => f.type === 'IMAGE')) return handleImageNode(node, className, imageMap);
  return handleDefaultNode(node, className, childrenJSX);
}

function handleInstanceNode(node: FigmaNode, className: string, componentMap: Record<string, string>, childrenJSX: string): string {
  const mainId = node.mainComponent?.id || node.componentId || '';
  const compName = componentMap[mainId] || 'UnknownComponent';
  return `<${compName} className="${className}">${childrenJSX}</${compName}>`;
}

function handleTextNode(node: FigmaNode, className: string): string {
  return `<p className="${className}">${node.characters || ''}</p>`;
}

function handleImageNode(node: FigmaNode, className: string, imageMap: Record<string, string>): string {
  const fill = node.fills?.find(f => f.type === 'IMAGE');
  const src = imageMap[fill?.imageRef || ''];
  const width = node.absoluteBoundingBox?.width || node.width || 0;
  const height = node.absoluteBoundingBox?.height || node.height || 0;
  const props = `src="${src}" alt="${node.name}" width={${width}} height={${height}}`;
  return `<Image ${props} className="${className}" />`;
}

function handleDefaultNode(node: FigmaNode, className: string, childrenJSX: Record<string, string>): string {
  const tag = classifyNode(node);
  return `<${tag} className="${className}">${childrenJSX}</${tag}>`;
}

