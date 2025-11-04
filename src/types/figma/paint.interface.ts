/**
 * Paint styles (solid, gradient, image, etc.)
 */
export interface Paint {
  type:
    | 'SOLID'
    | 'GRADIENT_LINEAR'
    | 'GRADIENT_RADIAL'
    | 'GRADIENT_ANGULAR'
    | 'GRADIENT_DIAMOND'
    | 'IMAGE'
    | string;
  visible?: boolean;
  opacity?: number;
  color?: RGBA;
  gradientStops?: {
    position: number;
    color: RGBA;
  }[];
  imageRef?: string;
}
