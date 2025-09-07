// src/types/index.ts
export interface FigmaNode {
  id: string;
  name?: string;
  type: string;
  children?: FigmaNode[];
  // keep other properties open for practical parsing
  [key: string]: any;
}

export type Paint = {
  type: string;
  color?: { r: number; g: number; b: number; a?: number };
  opacity?: number;
};

export interface ParsedNode {
  id: string;
  name?: string;
  type: string;
  // text
  content?: string;
  style?: Record<string, any>;

  // box
  size?: { width: number; height: number };

  // paints
  fills?: Paint[];
  strokes?: Paint[];
  strokeWeight?: number;
  cornerRadius?: number;
  opacity?: number;

  // children
  children?: ParsedNode[];
}

