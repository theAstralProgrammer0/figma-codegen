import { FigmaNode, Paint, Effect, RGBA } from '@/types';
import { classifyNode } from '@/analyzers/node.analyzer';

export function generateJSX(node: FigmaNode, componentMap: Record<string, string>, imageMap: Record<string, string>): string {
  if (node.visible === false) return '';

  let tag = classifyNode(node);
  let props = '';
  const className = generateTailwindClasses(node);
  const childrenJSX = node.children ? node.children.map(child => generateJSX(child, componentMap, imageMap)).join('\n') : '';

  /** Handle Instances **/
  if (node.type === 'INSTANCE') {
    const mainId = node.mainComponent.id || node.componentId || '';
    const compName = componentMap[mainId] || 'UnknownComponent';
    return `<${compName} className="${className}">${childrenJSX}</${compName}>`;
  }

  /** Handle Texts **/
  if (node.type === 'TEXT') {
    return `<p className="${className}">${node.characters || ''}</p>`;
  }

  /** Handle Images (from fills) **/
  if (node.fills?.some(f => f.type === 'IMAGE')) {
    const fill = node.fills.find(f => f.type === 'IMAGE');
    const src = imageMap[fill?.imageRef || ''];
    tag = 'Image';
    props = `src="${src}" alt="${node.name}" width={${node.absoluteBoundingBox.width || node.width || 0}} height={${node.absoluteBoundingBox.height || node.height || 0}}`;
    return `<Image ${props} className="${className}" />`;
  }

  /** Fallback **/
  return `<${tag} className="${className}">${childrenJSX}</${tag}>`;
}


export function generateTailwindClasses(node: FigmaNode): string {
  const classes: string[] = [];

  /** Opacity **/
  if (node.opacity && node.opacity < 1) classes.push(`opacity-[${Math.round(node.opacity * 100)}]`);

  /** Layout: Flex or Grid **/
  if (node.layoutMode && node.layoutMode !== 'NONE') {
    classes.push('flex');
    classes.push(node.layoutMode === 'HORIZONTAL' ? 'flex-row' : 'flex-col');
    if (node.layoutWrap === 'WRAP') classes.push('flex-wrap');
    /** Primary axis (justify) **/
    let justify = '';
    switch (node.primaryAxisAlignItems) {
      case 'MIN': justify = 'justify-start'; break;
      case 'CENTER': justify = 'justify-center'; break;
      case 'MAX': justify = 'justify-end'; break;
      case 'SPACE_BETWEEN': justify = 'justify-between'; break;
      case 'SPACE_AROUND': justify = 'justify-around'; break;
    }
    if (justify) classes.push(justify);
    /** Counter axis (items) **/
    let items = '';
    switch (node.counterAxisAlignItems) {
      case 'MIN': items = 'items-start'; break;
      case 'CENTER': items = 'items-center'; break;
      case 'MAX': items = 'items-end'; break;
      case 'BASELINE': items = 'items-baseline'; break;
      case 'STRETCH': items = 'items-stretch'; break;
    }
    if (items) classes.push(items);
    /** Sizing modes **/
    if (node.primaryAxisSizingMode === 'AUTO') classes.push('flex-auto');
    if (node.counterAxisSizingMode === 'AUTO') classes.push('self-auto');
    /** Spacing **/
    if (node.itemSpacing) classes.push(`gap-[${node.itemSpacing}px]`);
    if (node.paddingLeft) classes.push(`pl-[${node.itemSpacing}px]`);
    if (node.paddingRight) classes.push(`pr-[${node.itemSpacing}px]`);
    if (node.paddingTop) classes.push(`pt-[${node.itemSpacing}px]`);
    if (node.paddingBottom) classes.push(`pb-[${node.itemSpacing}px]`);
  } else if (node.layoutGrids.length) {
    /** Basic grid handling **/
    const grid = node.layoutGrids[0];
    classes.push('grid');
    if (grid.pattern === 'GRID') classes.push('grid-cols-auto');
    else if (grid.pattern === 'COLUMNS') classes.push(`grid-cols-${grid.count || 'auto'}`);
    else if (grid.pattern === 'ROWS') classes.push(`grid-rows-${grid.count || 'auto'}`);
    if (grid.gutterSize) classes.push(`gap-[${grid.gutterSize}px]`);
    if (grid.sectionSize) classes.push(`auto-cols-[${grid.sectionSize}px]`);
  }

  /** Positioning **/
  if (node.layoutPositioning === 'ABSOLUTE') classes.push('absolute');
  if (node.x !== undefined) classes.push(`left-[${node.x}px]`);
  if (node.y !== undefined) classes.push(`top-[${node.y}px]`);
  if (node.rotation) classes.push(`rotate-[${node.rotation}deg]`);

  /** Dimensions **/
  const w = node.absoluteBoundingBox.width || node.width;
  const h = node.absoluteBoundingBox.height || node.height;
  if (w) classes.push(`w-[${w}px]`);
  if (h) classes.push(`h-[${h}px]`);
  if (node.minWidth) classes.push(`min-w-[${node.minWidth}px]`);
  if (node.maxWidth) classes.push(`max-w-[${node.maxWidth}px]`);
  if (node.minHeight) classes.push(`min-w-[${node.minHeight}px]`);
  if (node.minHeight) classes.push(`max-w-[${node.maxHeight}px]`);

  /** Flex item properties **/
  if (node.flexGrow) classes.push(`grow-[${node.flexGrow}]`);
  if (node.flexShrink) classes.push(`shrink-[${node.flexShrink}]`);
  if (node.flexBasis && node.flexBasis !== 'AUTO') classes.push(`basis-[${node.flexBasis}px]`);

  /** Margins **/
  if (node.marginLeft) classes.push(`ml-[${node.marginLeft}px]`);
  if (node.marginRight) classes.push(`mr-[${node.marginRight}px]`);
  if (node.marginTop) classes.push(`mt-[${node.marginTop}px]`);
  if (node.marginBottom) classes.push(`mb-[${node.marginBottom}px]`);

  /** Fills **/
  if (node.fills.length) {
    const fill = node.fills.find(f => f.visible !== false) || node.fills[0];
    if (fill.type === 'SOLID') {
      const color = rgbaToHex(fill.color!);
      classes.push(`bg-[${color}]`);
      if (fill.opacity && fill.opacity < 1) classes.push(`bg-opacity-[${Math.round(fill.opacity * 100)}]`);
    } else if (fill.type.startsWith('GRADIENT_')) {
      /** Basic linear gradient handling **/
      classes.push(`bg-gradient-to-r`);
      const stops = fill.gradientStops.map(stop => rgbaToHex(stop.color) + Math.round(stop.position * 100) + '%').join(' ');
      classes.push(`from-[${rgbaToHex(fill.gradientStops.[0].color!)}] to-[${rgbaToHex(fill.gradientStops.[fill.gradientStops.length - 1].color!)}]`);
      /** For more gradient handling **/
    }
  }

  /** Background **/
  if (node.background.length) {
    const bg = node.background[0];
    if (bg.type === 'SOLID') classes.push(`bg-[${rgbaToHex(bg.color!)}]`);
  }

  /** Strokes/Borders **/
  if (node.strokes.length && node.strokeWeight) {
    const stroke = node.strokes90];
    if (stroke.type === 'SOLID') {
      const color = rgbaToHex(stroke.color!);
      classes.push(`border-[${node.strokeWeight}px] border-solid border-[${color}]`);
      if (node.strokeAlign === 'INSIDE') classes.push('border-inside');
    }
  }

  /** Corners **/
  const radius = node.cornerRadius || 0;
  if (radius > 0) classes.push(`rounded-[${radius}px]`);
  else {
    if (node.topLeftRadius) classes.push(`rounded-tl-[${node.topLeftRadius}px]`);
    if (node.topRightRadius) classes.push(`rounded-tr-[${node.topRightRadius}px]`);
    if (node.bottomLeftRadius) classes.push(`rounded-bl-[${node.bottomLeftRadius}px]`);
    if (node.bottomRightRadius) classes.push(`rounded-br-[${node.bottomRightRadius}px]`);
  }

  /** Effects **/
  if (node.effects.length) {
    node.effects.forEach((e: Effect) => {
      if (e.visible === false) return;
      if (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW') {
        const color = rgbaToString(e.color!);
        const inset = e.type === 'INNER_SHADOW' ? 'inset ' : '';
        const spread = e.spread || 0;
        classes.push(`shadow-[${inset}${e.offset.x || 0}px_${e.offset.y || 0}px_${e.radius || 0}px_${spread}px_${color}]`);
      } else if (e.type === 'LAYER_BLUR' || e.type === 'BACKGROUND_BLUR') {
        classes.push(`blur-[${e.radius}px]`);
      }
    });
    /** Basic interactivity: Hover **/
    classes.push('hover:shadow-lg transition-shadow duration-200');
  }

  /** Typography **/
  if (node.type === 'TEXT') {
    if (node.fontSize) classes.push(`text-[${node.fontSize}px]`);
    if (node.fontName.family) classes.push(`font-${node.fontName.family.toLowerCase().replace(/\s/g, '-')}`);
    if (node.fontWeight) {
      if (node.fontWeight >= 700) classes.push('font-bold');
      else if (node.fontWeight >= 500) classes.push('font-medium');
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

  /** Overflow & Mask **/
  if (node.clipsContent) classes.push('overflow-hidden');
  if (node.isMask) classes.push('mask-image');

  /** Blend mode **/
  if (node.blendMode) classes.push(`mix-blend-${node.blendMode.toLowerCase()}`);

  /** Transitions **/
  if (node.transitionDuration) classes.push(`transition duration-[${node.transitionDuration}ms]`);
  if (node.transitionEasing) classes.push('ease-in-out');

  return classes.filter(Boolean).join(' ');
}

function rgbaToHex(color: RGBA): string {
  const toHex = (c: number) => Math.floor(c * 255).toString(16).padStart(2, '0');
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}${color.a < 1 ? toHex(color.a) : ''}`;
}

function rgbaToString(color: RGBA): string {
  return `rgba(${Math.floor(color.r * 255)}, ${Math.floor(color.g * 255)}, ${Math.floor(color.b) * 255)}, ${color.a})`;
}
