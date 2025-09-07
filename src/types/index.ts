// src/types/index.ts
export interface FigmaNode {
  id: string;
  name?: string;
  type: string;
  children?: FigmaNode[];
  [key: string]: any;
}

export type Paint = {
  type: string;
  color?: { r: number; g: number; b: number; a?: number };
  opacity?: number;
  imageRef?: string;

  // 👇 Added for convenience in generators/tests
  imageUrl?: string;
};

/**
 * Layout description parsed from container nodes (FRAME/GROUP/CANVAS/COMPONENT)
 */
export interface ParsedLayout {
  layoutMode?: "HORIZONTAL" | "VERTICAL" | "NONE";
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  itemSpacing?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
}

/**
 * ParsedNode is the canonical internal representation used by generators.
 */
export interface ParsedNode {
  id: string;
  name?: string;
  type: string;

  // text
  content?: string;
  style?: Record<string, any>;

  // box
  size?: { width: number; height: number };

  // 👇 Added for convenience in tests
  width?: number;
  height?: number;

  // paints
  fills?: Paint[];
  strokes?: Paint[];
  strokeWeight?: number;
  cornerRadius?: number;
  opacity?: number;

  // children
  children?: ParsedNode[];

  // layout information (for containers)
  layout?: ParsedLayout;
}

