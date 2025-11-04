/**
 * Representation FigmaNode.
 * Supports Flexbox, Grid, Typography, and all layout/visual relevant to
 * Tailwind CSS generation.
 */
export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  visible?: boolean;

  /** Hierarchy **/
  children?: FigmaNode[];

  /** Layout type **/
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  layoutGrow?: number;
  layoutAlign?: 'INHERIT' | 'STRETCH' | 'MIN' | 'CENTER' | 'MAX';
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  layoutGrids?: Grid[];
  gridStyleId?: string;
  layoutPositioning?: 'AUTO' | 'ABSOLUTE';

  /** Flex/Grid alignment **/
  primaryAxisAlignItems?: 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN' | 'SPACE_AROUND';
  counterAxisAlignItems?: 'MIN' | 'MAX' | 'CENTER' | 'BASELINE' | 'STRETCH';
  primaryAxisSizingMode?: 'FIXED' | 'AUTO';
  counterAxisSizingMode?: 'FIXED' | 'AUTO';

  /** Positioning **/
  x?: number;
  y?: number;
  rotation?: number;
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  constraints?: {
    horizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'LEFT_RIGHT' | 'SCALE';
    vertical: 'TOP' | 'BOTTOM' | 'CENTER' | 'TOP_BOTTOM' | 'SCALE';
  };

  /** Spacing & padding **/
  itemSpacing?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;


  /** Dimensions **/
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  resizingConstraint?: number;
  resizingType?: 'FIXED' | 'HUG' | 'FILL';

  /** Flex sizing **/
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | 'AUTO';

  /** Border & Radius **/
  strokeWeight?: number;
  strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  strokeMiterLimit?: number;
  strokes?: Paint[];
  cornerRadius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;

  /** Appearance (fills, opacity, blends, fx) **/
  fills?: Paint[];
  opacity?: number;
  effects?: Effect[];
  blendMode?: string;

  /** Typography **/
  characters?: string;
  fontSize?: number;
  fontName?: { family: string; style: string };
  fontWeight?: number;
  lineHeightPx?: number;
  lineHeightPercent?: number;
  letterSpacing?: number;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  textCase?: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';

  /** Backgrounds & images **/
  backgroundColor?: RGBA;
  background?: Paint[];
  fillGeometry?: any[];
  imageRef?: string;

  /** Shadow / blur / masking **/
  effectStyleId?: string;
  isMask?: boolean;
  maskType?: 'ALPHA' | 'LUMINANCE';

  /** Overflow & clipping **/
  clipsContent?: boolean;
  overflowDirection?: 'NONE' | 'HORIZONTAL' | 'VERTICAL' | 'BOTH';

  /** Animation / transitions **/
  transitionDuration?: number;
  transitionEasing?: string;

  /** Miscellaneous **/
  visibleOverride?: boolean;
  styles?: Record<string, string>;
  componentPropertyReferencesMap?: Record<string, string>;
}
