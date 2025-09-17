export type NodeType = 'DOCUMENT' | 'CANVAS' | 'FRAME' | 'GROUP' | 'VECTOR' | 'RECTANGLE' | 'LINE' | 'ELLIPSE' | 'POLYGON' | 'STAR' | 'TEXT' | 'BOOLEAN_OPERATION' | 'COMPONENT' | 'INSTANCE' | 'COMPONENT_SET';

export interface BaseNode {
  id: string;
  name: string;
  type: NodeType;
  visible?: boolean;
  locked?: boolean;
  opacity?: number;
  blendMode?: BlendMode;
  fills?: Paint[];
  strokes?: Paint[];
  strokeWeight?: number;
  strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  effects?: Effect[];
  absoluteBoundingBox?: Rect;
  constraints?: LayoutConstraint;
}

export interface DocumentNode extends BaseNode {
  type: 'DOCUMENT';
  children: CanvasNode[];
}

export interface CanvasNode extends BaseNode {
  type: 'CANVAS';
  children: (FrameNode | GroupNode | VectorNode)[]; 
  backgroundColor?: Color;
}

// Similar for other nodes...
export interface FrameNode extends BaseNode {
  type: 'FRAME';
  children: Node[];
  background?: Paint[];
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  primaryAxisSizingMode?: 'AUTO' | 'FIXED';
  counterAxisSizingMode?: 'AUTO' | 'FIXED';
  primaryAxisAlignItems?: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'MAX' | 'CENTER' | 'BASELINE';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
}

/**
 * For TextNode: add characters: string, style: TypeStyle { fontFamily: string, fontWeight: number, etc. }
 * For VectorNode: vectorPaths: VectorPath[] { windingRule, data: string }
 * For BooleanOperationNode: booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE'
 * For StarNode: innerRadius: number
 * For PolygonNode: pointCount: number
 * Shared types:
*/
export interface Paint { type: 'SOLID' | 'GRADIENT_LINEAR' | ...; color?: Color; }
export interface Effect { type: 'DROP_SHADOW' | ...; color?: Color; offset?: Vector; }
export interface Rect { x: number; y: number; width: number; height: number; }
export interface Color { r: number; g: number; b: number; a: number; }
export interface Vector { x: number; y: number; }
export type BlendMode = 'NORMAL' | 'MULTIPLY' | 'SCREEN';
export interface LayoutConstraint { horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'SCALE'; vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'SCALE'; }
