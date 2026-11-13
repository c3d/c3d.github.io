import { classicStyle } from './styles/classic.js';
import { nebulaStyle } from './styles/nebula.js';
import { orbitStyle } from './styles/orbit.js';
import { buildPrintModel } from './model.js';

/**
 * Print style registry — add a style by creating styles/<id>.js and registering here.
 * See cv-source/docs/PRINT_STYLES.md
 */
export const PRINT_STYLES = [nebulaStyle, orbitStyle, classicStyle];

export const DEFAULT_PRINT_STYLE = 'nebula';
export const PRINT_STYLE_STORAGE_KEY = 'c3d-cv-print-style';

export function getPrintStyle(id) {
  return PRINT_STYLES.find((s) => s.id === id) || PRINT_STYLES.find((s) => s.id === DEFAULT_PRINT_STYLE) || PRINT_STYLES[0];
}

export function resolvePrintStyleId({ urlStyle, stored } = {}) {
  const fromUrl = urlStyle && PRINT_STYLES.some((s) => s.id === urlStyle) ? urlStyle : null;
  if (fromUrl) return fromUrl;
  if (stored && PRINT_STYLES.some((s) => s.id === stored)) return stored;
  return DEFAULT_PRINT_STYLE;
}

export function buildModelForStyles(data, themeOrder, printColors) {
  return buildPrintModel(data, { themeOrder, printColors });
}

export { buildPrintModel };
