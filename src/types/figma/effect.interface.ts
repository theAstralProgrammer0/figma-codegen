/**
 * Shadow, blur, etc.
 */
export interface Effect {
  type:
    |'INNER_SHADOW'
    | 'DROP_SHADOW'
    | 'LAYER_BLUR'
    | 'BACKGROUND_BLUR';
  radius?: number;
  visible?: boolean;
  color?: RGBA;
  offset?: {
    x: number;
    y: number;
  };
  spread?: number;
}
