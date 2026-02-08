/**
 * Append alpha transparency to a hex color.
 * hexAlpha('#FF0000', 0.5) → '#FF000080'
 */
export const hexAlpha = (hex, alpha) =>
  `${hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
