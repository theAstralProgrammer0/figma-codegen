import { Paint } from './paint.interface';
import { Effect } from './effect.interface';
import { Grid } from './grid.interface';
import { RGBA } from './color.interface';

/**
 * Representation FigmaNode.
 * Supports Flexbox, Grid, Typography, and layout mappings for Tailwind.
 */
export interface FigmaNode {
  id: string;
  name: string;
  type: 'DOCUMENT' | 'CANVAS' | 'FRAME' | 'GROUP' | 'VECTOR' | 'BOOLEAN' | 'STAR' | 'LINE' | 'ELLIPSE' | 'POLYGON' | 'RECTANGLE' | 'TEXT' | 'SLICE' | 'COMPONENT' | 'COMPONENT_SET' | 'INSTANCE' | 'BOOLEAN_OPERATION' | string;
  visible?: boolean;

  /** Hierarchy **/
  children?: FigmaNode[];

  /** Layout **/
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  layoutGrow?: number;
  layoutAlign?: 'INHERIT' | 'STRETCH' | 'MIN' | 'CENTER' | 'MAX';
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  layoutGrids?: Grid[];
  gridStyleId?: string;
  layoutPositioning?: 'AUTO' | 'ABSOLUTE';

  /** Alignment **/
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

  /** Spacing **/
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

  /** Flex **/
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | 'AUTO';

  /** Borders **/
  strokeWeight?: number;
  strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  strokeMiterLimit?: number;
  strokes?: Paint[];
  cornerRadius?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;

  /** Appearance **/
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

  /** FX **/
  effectStyleId?: string;
  isMask?: boolean;
  maskType?: 'ALPHA' | 'LUMINANCE';

  /** Overflow **/
  clipsContent?: boolean;
  overflowDirection?: 'NONE' | 'HORIZONTAL' | 'VERTICAL' | 'BOTH';

  /** Transitions **/
  transitionDuration?: number;
  transitionEasing?: string;

  /** Components **/
  componentId?: string;
  mainComponent?: { id: string };

  /** Miscellaneous **/
  visibleOverride?: boolean;
  styles?: Record<string, string>;
  componentPropertyReferencesMap?: Record<string, string>;
}
