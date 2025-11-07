import { FigmaNode, RGBA, Effect, Paint } from '@/types';

export function generateTailwindClasses(node: FigmaNode): string {
  const classes = [
    ...getOpacityClasses(node),
    ...getLayoutClasses(node),
    ...getPositionClasses(node),
    ...getDimensionClasses(node),
    ...getFlexItemClasses(node),
    ...getMarginClasses(node),
    ...getFillClasses(node),
    ...getBackgroundClasses(node),
    ...getBorderClasses(node),
    ...getCornerClasses(node),
    ...getEffectClasses(node),
    ...getTypographyClasses(node),
    ...getOverflowClasses(node),
    ...getBlendClasses(node),
    ...getTransitionClasses(node),
  ].filter(Boolean);

  return classes.join(' ');
}

function getOpacityClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.opacity && node.opacity < 1) classes.push(`opacity-[${Math.round(node.opacity * 100)}]`);
  return classes;
}

function getLayouClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.layoutMode && node.layoutMode !== 'NONE') {
    classes.push('flex');
    classes.push(node.layoutMode === 'HORIZONTAL' ? 'flex-row' : 'flex-col')
    if (node.layoutWrap === 'WRAP') classes.push('flex-wrap');
    let justify = '';
    switch (node.primaryAxisAlignItems) {
      case 'MIN': justify = 'justify-start'; break;
      case 'CENTER': justify = 'justify-center'; break;
      case 'MAX': justify = 'justify-end'; break;
      case 'SPACE_BETWEEN': justify = 'justify-between'; break;
      case 'SPACE_AROUND': justify = 'justify-around'; break;
    }
    if (justify) classes.push(justify);
    let items = '';
    switch (node.counterAxisAlignItems) {
      case 'MIN': items = 'items-start'; break;
      case 'CENTER': items = 'items-center'; break;
      case 'MAX': items = 'items-end'; break;
      case 'BASELINE': items = 'items-baseline'; break;
      case 'STRETCH': items = 'items-stretch'; break;
    }
    if (items) classes.push(items);
    if (node.primaryAxisSizingMode === 'AUTO') classes.push('flex-auto');
    if (node.counterAxisSizingMode === 'AUTO') classes.push('self-auto');
    if (node.itemSpacing) classes.push(`gap-[${node.itemSpacing}px]`);
    if (node.paddingLeft) classes.push(`pl-[${node.paddingLeft}px]`);
    if (node.paddingRight) classes.push(`pr-[${node.paddingRight}px]`);
    if (node.paddingTop) classes.push(`pt-[${node.paddingTop}px]`);
    if (node.paddingBottom) classes.push(`pb-[${node.paddingBottom}px]`);
  } else if (node.layoutGrids?.length) {
    // Basic grid handling (first grid only; improve later)
    const grid = node.layoutGrids[0];
    classes.push('grid');
    if (grid.pattern === 'GRID') classes.push('grid-cols-auto');
    else if (grid.pattern === 'COLUMNS') classes.push(`grid-cols-${grid.count || 'auto'}`);
    else if (grid.pattern === 'ROWS') classes.push(`grid-rows-${grid.count || 'auto'}`);
    if (grid.gutterSize) classes.push(`gap-${grid.gutterSize}px]`);
    if (grid.sectionSize) classes.push(`auto-cols-${grid.sectionSize}px]`);
  }
  return classes;
}

function getPositionClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.layoutPositioning === 'ABSOLUTE') classes.push('absolute');
  if (node.x !== undefined) classes.push(`left-[${node.x}px]`);
  if (node.y !== undefined) classes.push(`top-[${node.y}px]`);
  if (node.rotation) classes.push(`rotate-[${node.rotation}deg]`);
  return classes;
}

function getDimensionClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  const w = node.absoluteBoundingBox?.width || node.width;
  const h = node.absoluteBoundingBox?.height || node.height;
  if (w) classes.push(`w-[${w}px]`);
  if (h) classes.push(`w-[${w}px]`);
  if (node.minWidth) classes.push(`min-w-[${minWidth}px]`);
  if (node.maxWidth) classes.push(`max-w-[${maxWidth}px]`);
  if (node.minHeight) classes.push(`min-h-[${minHeight}px]`);
  if (node.maxHeight) classes.push(`max-h-[${maxHeight}px]`);
  return classes;
}

function getFlexItemClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.flexGrow) classes.push(`grow-[${node.flexGrow}]`);
  if (node.flexShrink) classes.push(`shrink-[${node.flexShrink}]`);
  if (node.flexBasis && node.flexBasis !== 'AUTO') classes.push(`basis-[${node.flexBasis}px]`);
  return classes;
}

function getMarginClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.marginLeft) classes.push(`ml-[${node.marginLeft}px]`);
  if (node.marginRight) classes.push(`mr-[${node.marginRight}px]`);
  if (node.marginTop) classes.push(`mt-[${node.marginTop}px]`);
  if (node.marginBottom) classes.push(`mb-[${node.marginBottom}px]`);
  return classes;
}

function getFillClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.fills?.length) {
    const fill = node.fills.find(f => f.visible !== false) || node.fills[0];
    if (fill.type === 'SOLID') {
      const color = rgbaToHex(fill.color!);
      classes.push(`bg-[${color}]`);
      if (fill.opacity && fill.opacity < 1) classes.push(`bg-opacity-[${Math.round(fill.opacity * 100)}]`);
    } else if (fill.type.startsWith('GRADIENT_')) {
      // Basic linear gradient handling (default: bg-gradient-to-r; extend later)
      classes.push('bg-gradient-to-r');
      const stops = fill.gradientStops?.map(stop => `${rgbaToHex(stop.color)} ${Math.round(stop.position * 100)}%`).join(', ') || '';
      if (stops) classes.push(`bg-[linear-gradient(to_right,${stops})]`);
    }
  }
  return classes;
}

function getBackgroundClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.background?.length) {
    const bg = node.background[0];
    if (bg.type === 'SOLID') classes.push(`bg-[${rgbaToHex(bg.color!)}]`);
  }
  return classes;
}

function getBorderClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.strokes?.length && node.strokeWeight) {
    const stroke = node.strokes[0];
    if (stroke.type === 'SOLID') {
      const color = rgbaToHex(stroke.color!);
      classes.push(`border-[${node.strokeWeight}px] border-solid border-[${color}]`);
      if (node.strokeAlign === 'INSIDE') classes.push('border-inside');
    }
  }
  return classes;
}

function getCornerClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  const radius = node.cornerRadius || 0;
  if (radius > 0) classes.push(`rounded-[${radius}px]`);
  else {
    if (node.topLeftRadius) classes.push(`rounded-tl-[${node.topLeftRadius}]`);
    if (node.topRightRadius) classes.push(`rounded-tr-[${node.topRightRadius}]`);
    if (node.bottomLeftRadius) classes.push(`rounded-bl-[${node.bottomLeftRadius}]`);
    if (node.bottomRightRadius) classes.push(`rounded-br-[${node.bottomRightRadius}]`);
  }
  return classes;
}

function getEffectClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.effects?.length) {
    node.effects.forEach((e: Effect) => {
      if (e.visible === false) return;
      if (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') {
        const color = rgbaToString(e.color!);
        const inset = e.type === 'INNER_SHADOW' ? 'inset ' : '';
        const spread = e.spread || 0;
        classes.push(`shadow-[${inset}${e.offset?.x || 0}px_${e.offset?.y || 0}px_${e.radius || 0}px_${spread}px_${color}]`);
      } else if (e.type === 'LAYER_BLUR' || e.type === 'BACKGROUND_BLUR') {
        classes.push(`blur-[${e.radius}px]`);
      }
    });
    // Basic interactivity: Hover (to enhance shadow)
    classes.push('hover:shadow-lg transition-shadow duration-200');
  }
  return classes;
}

function getTypographyClasses(node: FigmaNode): string [] {
  const classes: string[] = [];
  if (node.type === 'TEXT') {
    if (node.fontSize) classes.push(`text-[${node.fontSize}px]`);
    if (node.fontName?.family) classes.push(`font-${node.fontName.family.toLowerCase().replace(/\s\g, '-')}`);
    if (node.fontWeight) {
      if (node.fontWeight >= 700) classes.push('font-bold');
      else if (node.fontWeight >= 500) classes.push('font-mdeium');
      else classes.push('font-normal');
    }
    if (node.lineHeightPx) classes.push(`leading-[${node.lineHeightPx}px]`);
    if (node.letterSpacing) classes.push(`tracking-[${node.letterSpacing}px]`);
    switch (node.textAlignHorizontal) {
      case 'CENTER': classes.push('text-center'); break;
      case 'RIGHT': classes.push('text-right'); break;
      case 'JUSTIFIED': classes.push('text-justify'); break;
    }
    switch (node.textAlignVertical) {
      case 'CENTER': classes.push('align-middle'); break;
      case 'BOTTOM': classes.push('align-bottom'); break;
    }
    switch (node.textCase) {
      case 'UPPER': classes.push('uppercase'); break;
      case 'LOWER': classes.push('lowercase'); break;
      case 'TITLE': classes.push('capitalize'); break;
    }
    switch (node.textDecoration) {
      case 'UNDERLINE': classes.push('underline'); break;
      case 'STRIKETHROUGH': classes.push('line-through'); break;
    }
  }
  return classes;
}

function getOverflowClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.clipsContent) classes.push('overflow-hidden');
  if (node.isMask) classes.push('mask-image');
  return classes;
}

function getBlendClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.blendMode) classes.push(`mix-blend-${node.blendMode.toLowerCase()}`);
  return classes;
}

function getTransitionClasses(node: FigmaNode): string[] {
  const classes: string[] = [];
  if (node.transitionDuration) classes.push(`transition duration-[${node.transitionDuration}ms]`);
  if (node.transitionEasing) classes.push(`ease-in-out`);
  return classes;
}

function rgbaToHex(color: RGBA): string {
  const toHex = (c: number) => Math.floor(c * 255).toString(16).padStart(2, '0');
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${color.a < 1 ? toHex(color.a) : ''}`;
}

function rgbaToString(color: RGBA): string {
  return `rgba(${Math.floor(color.r * 255)}, ${Math.floor(color.g * 255)}, ${Math.floor(color.b * 255)}, ${color.a})`;
}
