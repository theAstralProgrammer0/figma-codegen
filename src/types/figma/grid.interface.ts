/**
 * Grid representation
 */
export interface Grid {
  pattern: 'COLUMNS' | 'ROWS' | 'GRID';
  sectionSize?: number;
  gutterSize?: number;
  alignment?: 'MIN' | 'MAX' | 'CENTER';
  count?: number;
  offset?: number;
}
